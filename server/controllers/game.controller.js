/* eslint-disable no-plusplus */
const mongoose = require('mongoose');
const { Game } = require('../models/game.model');
const gameUtils = require('../utils/gameUtils');
const gameConsts = require('../utils/gameConsts');

const getGameData = async (req,res) =>{
    res.status(200).json(req.game)
}



const createNewGame = async (req, res) => {
  try {
    const playersData = req.body.players;
    const players = [];
    for (let i = 0; i < playersData.length; i++) {
      players.push(gameUtils.initializePlayer(i, playersData[i].name));
    }
    const game = new Game({
      playersNum: playersData.length,
      currentTurn: 1,
      isActive: true,
      players: players.map((p) => p._id),
      board: gameUtils.initializeBoard(),
      creator:req.user._id
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
    const playerId = req.params.pid;

    const player = await gameUtils.getPlayerData(playerId);

    gameUtils.validations.validatePlayerHasAvailableSettelment(player);
    gameUtils.validations.validateLocationIsProvided(req.body);
    gameUtils.validations.validateLocationIsAvailable(game, req.body.location);

    gameUtils.payWithResources(player, gameConsts.payments.settelment);

    gameUtils.buildNewSettelment(player, game, req.body.location);
    const session = await mongoose.startSession();

    await session.withTransaction(async () => {
      await game.save();
      await player.save();
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
    const playerId = req.params.pid;

    const player = await gameUtils.getPlayerData(playerId);

    gameUtils.validations.validatePlayerHasAvailableCities(player);

    gameUtils.validations.validateLocationIsProvided(req.body);

    gameUtils.validations.validatePlayerHasSettelmentInLocation(
      player,
      req.body.location
    );

    gameUtils.payWithResources(player, gameConsts.payments.city);

    gameUtils.upgradeSettelmentToCity(player, game, req.body.location);
    const session = await mongoose.startSession();

    await session.withTransaction(async () => {
      await game.save();
      await player.save();
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
    const playerId = req.params.pid;

    const player = await gameUtils.getPlayerData(playerId);

    gameUtils.validations.validatePlayerHasAvailableRoads(player);
    gameUtils.validations.validateRoadLocationIsProvided(req.body);
    gameUtils.validations.validateLocationIsAvailable(game, req.body.location);

    gameUtils.payWithResources(player, gameConsts.payments.road);
    gameUtils.buildRoad(player, game, req.body.location);

    const session = await mongoose.startSession();

    await session.withTransaction(async () => {
      await game.save();
      await player.save();
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
      'players'
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

module.exports = {
  createNewGame,
  getGameData,
  buildSettelment,
  buildCity,
  buildRoad,
  resourceDistribution,
};
