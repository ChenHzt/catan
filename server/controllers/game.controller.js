/* eslint-disable no-plusplus */
const mongoose = require("mongoose");
const { Game } = require("../models/game.model");
const gameUtils = require("../utils/gameUtils");
const gameConsts = require("../utils/gameConsts");

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
      currentTurn: 1,
      isActive: true,
      players: players.map((p) => p._id),
      board: gameUtils.initializeBoard(),
      creator: req.user._id,
    });
    await game.save();
    // gameUtils.createMapFromHexToVertix(game.board);
    gameUtils.createMapFromVertixToHex(game.board);
    await game.save();
    res.status(200).send(game);
  } catch (e) {
    return res.status(400).send(e.message);
  }
};

const buildSettelment = async (req, res) => {
  try {
    const { game } = req;
    // const playerId = req.params.pid;

    // const player = await gameUtils.getPlayerData(playerId);
    const player = game.players[game.currentTurn];

    gameUtils.validations.validatePlayerHasAvailableSettelment(player);
    gameUtils.validations.validateLocationIsProvided(req.body);
    gameUtils.validations.validateLocationIsAvailable(game, req.body.location);

    if(game.phase === 'Game')
      gameUtils.payWithResources(player, gameConsts.payments.settelment);

    gameUtils.buildNewSettelment(player, game, req.body.location);
    const session = await mongoose.startSession();

    await session.withTransaction(async () => {
      await game.save();
      // await player.save();
    });

    session.endSession();

    return res.status(200).send({ game, player });
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
    if(game.phase === 'Game')
      gameUtils.payWithResources(player, gameConsts.payments.city);

    gameUtils.upgradeSettelmentToCity(player, game, req.body.location);
    const session = await mongoose.startSession();

    await session.withTransaction(async () => {
      await game.save();
      // await player.save();
    });

    session.endSession();

    return res.status(200).send({ game, player });
  } catch (e) {
    return res.status(400).send({ error: e.message });
  }
};

const buildRoad = async (req, res) => {
  try {
    const { game } = req;
    // const playerId = req.params.pid;

    const player = game.players[game.currentTurn];


    gameUtils.validations.validatePlayerHasAvailableRoads(player);
    gameUtils.validations.validateRoadLocationIsProvided(req.body);
    gameUtils.validations.validateRoadLocationIsAvailable(game, req.body.location);

    if(game.phase === 'Game')
      gameUtils.payWithResources(player, gameConsts.payments.road);
    gameUtils.buildRoad(player, game, req.body.location);

    const session = await mongoose.startSession();

    await session.withTransaction(async () => {
      await game.save();
      // await player.save();
    });

    session.endSession();

    return res.status(200).send({ game, player });
  } catch (e) {
    return res.status(400).send({ error: e.message });
  }
};

const resourceDistribution = async (req, res) => {
  try {
    const { dice } = req.body;
    gameUtils.validations.validateDiceValueIsValid(dice);
    const game = await Game.findOne({ _id: req.params.gid }).populate(
      "players"
    );

    const { players } = game;
    players.forEach((player) => {
      gameUtils.getResourcesForPlayer(player, game, dice);
      player.save();
    });
    res.status(200).json(game);
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
};

const getValidActionForPlayer = async (req, res) => {
  const { game, user } = req;
  const player = game.players[game.currentTurn - 1];
  const actions = [];
  try {
    switch (game.phase) {
      case "SETUP_ROUND_1":
        if (player.settelments.built.length === 0)
          actions.push("BUILD_SETTELMENT");
        else if (player.roads.built.length === 0) actions.push("BUILD_ROAD");
        else
          throw new Error(
            "on first phase of the game each user can build 1 new settelment and 1 new road"
          );
        break;
      case "SETUP_ROUND_2":
        if (player.settelments.built.length === 1)
          actions.push("BUILD_SETTELMENT");
        else if (player.roads.built.length === 1) actions.push("BUILD_ROAD");
        else
          throw new Error(
            "on second phase of the game each user can build 1 new settelment and 1 new road"
          );
        break;
      case "GAME":
        if (player.resourceCards.wood >= 1 && player.resourceCards.brick >= 1)
          actions.push("BUILD_ROAD");
        if (
          player.resourceCards.wood >= 1 &&
          player.resourceCards.brick >= 1 &&
          player.resourceCards.wheat >= 1 &&
          player.resourceCards.sheep >= 1
        )
          actions.push("BUILD_SETTELMENT");
        if (player.resourceCards.ore >= 3 && player.resourceCards.wheat >= 2)
          actions.push("BUILD_CITY");
        if (
          player.resourceCards.ore >= 1 &&
          player.resourceCards.wheat >= 1 &&
          player.resourceCards.sheep >= 1
        )
          actions.push("BUY_DEVELOPMENT_CARD");
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
      try{
        switch (game.phase) {
          case "SETUP_ROUND_1":
          case "SETUP_ROUND_2":
          case "GAME":
            gameUtils.validations.validateLocationIsAvailable(game, i);
            validVertices.push(i);      
            break;
          //TODO: check if the user has road to there   
      }
    }
      catch(e){
        console.log(e.message)
      } 
    }
    res.status(200).send(validVertices)
  } catch (e) {
    res.status(400).send(e.message);
  }
};


const getValidEdgesForPlayerToBuildRoad = (req,res) =>{
  const validEdges = []
  const {Game} = req;
  try {
    for (let i = 0; i < game.board.edges.length; i++) {
      try{
        switch (game.phase) {
          case "SETUP_ROUND_1":
          case "SETUP_ROUND_2":
          case "GAME":
            gameUtils.validations.validateRoadLocationIsAvailable(game, i);
            validEdges.push(i);      
            break;
          //TODO: check if the user has road to there   
      }
    }
      catch(e){
      } 
    }
    res.status(200).send(validEdges)
  } catch (e) {
    res.status(400).send(e.message);
  }
}

const getValidVerticesForPlayerToBuildCity = (req,res) =>{
  const validVertices = []
  const {game} = req;
  try {
    for (let i = 0; i < game.board.edges.length; i++) {
      try{
        switch (game.phase) {
          case "SETUP_ROUND_1":
          case "SETUP_ROUND_2":
          case "GAME":
            gameUtils.validations.validatePlayerHasSettelmentInLocation(game.players[game.currentTurn-1],i);
            validVertices.push(i);      
            break;   
      }
    }
      catch(e){
      } 
    }
    res.status(200).send(validVertices)
  } catch (e) {
    res.status(400).send(e.message);
  }
}


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
};
