const { Game } = require('../models/game.model');

const findGame = async (req, res, next) => {
  try {
    const gameId = req.params.gid;
    const userId = req.user._id;
    const playerId = req.params.pid;
    const filter = { _id: gameId, creator:userId };
    if (playerId) filter.players = playerId;
    const gameObj = await Game.findOne(filter).populate('players');
    if (!gameObj) throw new Error(`game with id ${gameId} doesn't exist`);
    
    req.game = gameObj;
    
    next();
  } catch (e) {
    return res.status(400).send({ error: e.message });
  }
};

module.exports = findGame;
