const express = require('express');
const gameController = require('../controllers/game.controller');
const findGame = require('../middelware/findGame');
const {auth} = require('../middelware/auth')


const router = express.Router();

router.post('/', auth, gameController.createNewGame);
router.get('/:gid',[auth,findGame], gameController.getGameData);

router.post(
  '/:gid/player/:pid/buildSettelment',
  findGame,
  gameController.buildSettelment
);

router.post('/:gid/player/:pid/buildCity', findGame, gameController.buildCity);
router.post('/:gid/player/:pid/buildRoad', findGame, gameController.buildRoad);
router.post(
  '/:gid/distributeResources',
  findGame,
  gameController.resourceDistribution
);
router.get('/:gid/getValidActions',[auth,findGame],gameController.getValidActionForPlayer)
router.get('/:gid/getValidPlacesForSettelment',[auth,findGame],gameController.getValidVerticesForPlayerToBuildSettelment);
router.get('/:gid/getValidPlacesForRoad',[auth,findGame],gameController.getValidEdgesForPlayerToBuildRoad);
router.get('/:gid/getValidPlacesForCity',[auth,findGame],gameController.getValidVerticesForPlayerToBuildCity);
module.exports = router;
