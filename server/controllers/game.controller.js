/* eslint-disable no-plusplus */
const mongoose = require("mongoose");
const { Game } = require("../models/game.model");
const gameUtils = require("../utils/gameUtils");
const gameConsts = require("../consts/gameConsts");
const { Player } = require("../models/player.model");

const getGameData = async (req, res) => {
  res.status(200).json(req.game);
};

const createNewGame = async (req, res) => {
  try {
    const playersData = req.body.players;
    const players = [];
    for (let i = 0; i < playersData.length; i++) {
      players.push(gameUtils.initializePlayer(i, playersData[i]));
    }
    const game = new Game({
      playersNum: playersData.length,
      players: players.map((p) => p._id),
      board: gameUtils.initializeBoard(),
      creator: req.user._id,
    });
    await game.save();
    // gameUtils.createMapFromHexToVertix(game.board);
    gameUtils.createMapFromVertixToHex(game.board);
    await game.save();
    const filter = { _id: game._id, creator:req.user._id };
    const gameObj = await Game.findOne(filter).populate('players');
    res.status(200).send(gameObj);
  } catch (e) {
    return res.status(400).send(e.message);
  }
};

const buildSettelment = async (req, res) => {
  try {
    const { game } = req;
    const player = game.players[game.currentTurn];

    gameUtils.validations.validatePlayerHasAvailableSettelment(player);
    gameUtils.validations.validateLocationIsProvided(req.body);
    gameUtils.validations.validateLocationIsAvailable(game, req.body.location);

    if (game.phase === gameConsts.phases.SETUP_ROUND_2_PHASE)
      gameUtils.getResourcesSetupRound(game,player,req.body.location)
    
    if (game.phase === gameConsts.phases.GAME_PHASE)
      gameUtils.payWithResources(player, gameConsts.payments.settelment);

    gameUtils.buildNewSettelment(player, game, req.body.location);
    player.victoryPoints += 1;
    const session = await mongoose.startSession();

    await session.withTransaction(async () => {
      game.save();
      player.save();
    });

    session.endSession();

    return res.status(200).send(game);
  } catch (e) {
    return res.status(400).send({ error: e.message });
  }
};

const buildCity = async (req, res) => {
  try {
    const { game } = req;

    const player = game.players[game.currentTurn];

    gameUtils.validations.validatePlayerHasAvailableCities(player);

    gameUtils.validations.validateLocationIsProvided(req.body);

    gameUtils.validations.validatePlayerHasSettelmentInLocation(
      player,
      req.body.location
    );
    if (game.phase === gameConsts.phases.GAME_PHASE)
      gameUtils.payWithResources(player, gameConsts.payments.city);

    gameUtils.upgradeSettelmentToCity(player, game, req.body.location);
    player.victoryPoints += 1;
    const session = await mongoose.startSession();

    await session.withTransaction(async () => {
      game.save();
      player.save();
    });

    session.endSession();

    return res.status(200).send(game);
  } catch (e) {
    return res.status(400).send({ error: e.message });
  }
};

const buildRoad = async (req, res) => {
  try {
    const { game } = req;

    const player = game.players[game.currentTurn];

    gameUtils.validations.validatePlayerHasAvailableRoads(player);
    gameUtils.validations.validateRoadLocationIsProvided(req.body);
    gameUtils.validations.validateRoadLocationIsAvailable(
      game,
      req.body.location
    );

    if (game.phase === gameConsts.phases.GAME_PHASE)
      gameUtils.payWithResources(player, gameConsts.payments.road);
    gameUtils.buildRoad(player, game, req.body.location);

    const session = await mongoose.startSession();

    await session.withTransaction(async () => {
      game.save();
      player.save();
    });

    session.endSession();

    return res.status(200).send(game);
  } catch (e) {
    return res.status(400).send({ error: e.message });
  }
};

const resourceDistribution = async (req, res) => {
  try {
    const { game } = req;

    const { dice } = req.body;
    gameUtils.validations.validateDiceValueIsValid(dice);

    const session = await mongoose.startSession();
    await session.withTransaction(async () => {
      const { players } = game;
      players.forEach((player) => {
        gameUtils.getResourcesForPlayer(player, game, dice);
        player.save();
      });
      game.dice = dice;
      game.diceRolledInCurrentTurn = true;
      game.save();
    });
    session.endSession();

    res.status(200).json(game);
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
};

const getValidActionForPlayer = async (req, res) => {
  const { game } = req;
  const player = game.players[game.currentTurn];
  const actions = [];
  try {
    switch (game.phase) {
      case gameConsts.phases.SETUP_ROUND_1_PHASE:
        if (player.settelments.built.length === 0)
          actions.push(gameConsts.actions.BUILD_SETTELMENT);
        else if (player.roads.built.length === 0)
          actions.push(gameConsts.actions.BUILD_ROAD);
        break;

      case gameConsts.phases.SETUP_ROUND_2_PHASE:
        if (player.settelments.built.length === 1)
          actions.push(gameConsts.actions.BUILD_SETTELMENT);
        else if (player.roads.built.length === 1)
          actions.push(gameConsts.actions.BUILD_ROAD);
        break;

      case gameConsts.phases.GAME_PHASE:
        if (
          player.resourceCards.wood >= 1 &&
          player.resourceCards.brick >= 1 &&
          player.roads.available.length > 0
        )
          actions.push(gameConsts.actions.BUILD_ROAD);
        if (
          player.resourceCards.wood >= 1 &&
          player.resourceCards.brick >= 1 &&
          player.resourceCards.wheat >= 1 &&
          player.resourceCards.sheep >= 1 &&
          player.settelments.available.length > 0
        )
          actions.push(gameConsts.actions.BUILD_SETTELMENT);
        if (
          player.resourceCards.ore >= 3 &&
          player.resourceCards.wheat >= 2 &&
          player.settelments.built.length > 0 &&
          player.cities.available.length > 0
        )
          actions.push(gameConsts.actions.BUILD_CITY);
        if (
          player.resourceCards.ore >= 1 &&
          player.resourceCards.wheat >= 1 &&
          player.resourceCards.sheep >= 1
        )
          actions.push(gameConsts.actions.BUY_DEVELOPMENT_CARD);
        if (player.developmentCards.knights > 0)
          actions.push(gameConsts.actions.ACTIVATE_KNIGHT);
    }
    res.status(200).send(actions);
  } catch (e) {
    res.status(400).send(e.message);
  }
};

const getValidVerticesForPlayerToBuildSettelment = (req, res) => {
  const { game } = req;

  const validVertices = [];
  try {
    for (let i = 0; i < game.board.vertices.length; i++) {
      try {
        switch (game.phase) {
          case "SETUP_ROUND_1":
          case "SETUP_ROUND_2":
          case "GAME":
            gameUtils.validations.validateLocationIsAvailable(game, i);
            validVertices.push(i);
            break;
          //TODO: check if the user has road to there
        }
      } catch (e) {
        console.log(e.message);
      }
    }
    res.status(200).send(validVertices);
  } catch (e) {
    res.status(400).send(e.message);
  }
};

const getValidEdgesForPlayerToBuildRoad = (req, res) => {
  const validEdges = [];
  const { Game } = req;
  try {
    for (let i = 0; i < game.board.edges.length; i++) {
      try {
        switch (game.phase) {
          case "SETUP_ROUND_1":
          case "SETUP_ROUND_2":
          case "GAME":
            gameUtils.validations.validateRoadLocationIsAvailable(game, i);
            validEdges.push(i);
            break;
          //TODO: check if the user has road to there
        }
      } catch (e) {}
    }
    res.status(200).send(validEdges);
  } catch (e) {
    res.status(400).send(e.message);
  }
};

const getValidVerticesForPlayerToBuildCity = (req, res) => {
  const validVertices = [];
  const { game } = req;
  try {
    for (let i = 0; i < game.board.edges.length; i++) {
      try {
        switch (game.phase) {
          case "SETUP_ROUND_1":
          case "SETUP_ROUND_2":
          case "GAME":
            gameUtils.validations.validatePlayerHasSettelmentInLocation(
              game.players[game.currentTurn],
              i
            );
            validVertices.push(i);
            break;
        }
      } catch (e) {}
    }
    res.status(200).send(validVertices);
  } catch (e) {
    res.status(400).send(e.message);
  }
};

const setCurrentAction = (req, res) => {
  const { game } = req;
  try {
    game.actionActive = req.body.currentAction;
    game.save();
    res.status(200).send(game.actionActive);
  } catch (e) {
    res.status(400).send(e.message);
  }
};

const endTurn = (req, res) => {
  const { game } = req;
  try {
    if (game.players[game.currentTurn].victoryPoints  >= 10) {
      game.phase = gameConsts.phases.GAME_DONE_PHASE;
      game.save();
      res
        .status(200)
        .send({ currentTurn: game.currentTurn, phase: game.phase });
    }
    if (game.phase === gameConsts.phases.SETUP_ROUND_1_PHASE) {
      if (game.currentTurn === game.players.length - 1)
        game.phase = gameConsts.phases.SETUP_ROUND_2_PHASE;
      else game.currentTurn = game.currentTurn + 1;
    } else if (game.phase === gameConsts.phases.SETUP_ROUND_2_PHASE) {
      if (game.currentTurn === 0) game.phase = gameConsts.phases.GAME_PHASE;
      else game.currentTurn = game.currentTurn - 1;
    } else game.currentTurn = (game.currentTurn + 1) % game.players.length;
    game.dice = 0;
    game.diceRolledInCurrentTurn = false;
    game.save();
    res.status(200).send(game);
  } catch (e) {
    res.status(400).send(e.message);
  }
};

const placeRobber = (req, res) => {
  const { game } = req;
  try {
    const prevRobber = game.board.hexs.find((hex) => hex.robber === true);
    prevRobber.robber = false;
    game.board.hexs[req.body.hexId].robber = true;
    game.diceRolledInCurrentTurn = true;
    game.dice=7;
    game.save();
    res.status(200).send(game);
  } catch (e) {
    res.status(400).send(e.message);
  }
};

const buyDevelopmentCard = (req, res) => {
  const { game } = req;
  try {
    const player = game.players[game.currentTurn];
    if (game.phase === gameConsts.phases.GAME_PHASE)
      gameUtils.payWithResources(player, gameConsts.payments.developmentCard);
    player.developmentCards.knights += 1;
    game.save();
    player.save();
    res.status(200).send(game);
  } catch (e) {
    res.status(400).send(e.message);
  }
};

const activateKnightCard = (req, res) => {
  const { game } = req;
  try {
    const player = game.players[game.currentTurn];
    player.developmentCards.knights -= 1;
    const prevRobber = game.board.hexs.find((hex) => hex.robber === true);
    prevRobber ? (prevRobber.robber = false) : null;
    game.board.hexs[req.body.hexId].robber = true;
    player.activatedKnights += 1;
    if(player.activatedKnights >=3 && player.activatedKnights > game.largestArmy.knightsNum){
      const prevOwnerLargestArmy = Player.findById(game.largestArmy.owner);
      prevOwnerLargestArmy.victoryPoints -= 2;
      prevOwnerLargestArmy.save();
      game.largestArmy.owner = player._id;
      player.victoryPoints += 2
      game.largestArmy.knightsNum = player.activatedKnights;
    }
    game.save();
    player.save();
    res.status(200).send(game);
  } catch (e) {
    res.status(400).send(e.message);
  }
};

module.exports = {
  createNewGame,
  getGameData,
  buildSettelment,
  buildCity,
  buildRoad,
  resourceDistribution,
  getValidActionForPlayer,
  getValidVerticesForPlayerToBuildSettelment,
  getValidEdgesForPlayerToBuildRoad,
  getValidVerticesForPlayerToBuildCity,
  setCurrentAction,
  endTurn,
  placeRobber,
  buyDevelopmentCard,
  activateKnightCard,
};
