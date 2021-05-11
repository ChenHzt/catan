const express = require('express');
const gameController = require('../controllers/game.controller');
const findGame = require('../middelware/findGame');
const {auth} = require('../middelware/auth')


const router = express.Router();

router.post('/', auth, gameController.createNewGame);
router.get('/:gid',[auth,findGame], gameController.getGameData);

router.post(
  '/:gid/buildSettelment',
  [auth,findGame],
  gameController.buildSettelment
);

router.post('/:gid/buildCity', [auth,findGame], gameController.buildCity);
router.post('/:gid/buildRoad', [auth,findGame], gameController.buildRoad);
router.post(
  '/:gid/distributeResources',
  [auth,findGame],
  gameController.resourceDistribution
);
router.get('/:gid/getValidActions',[auth,findGame],gameController.getValidActionForPlayer)
router.get('/:gid/getValidPlacesForSettelment',[auth,findGame],gameController.getValidVerticesForPlayerToBuildSettelment);
router.get('/:gid/getValidPlacesForRoad',[auth,findGame],gameController.getValidEdgesForPlayerToBuildRoad);
router.get('/:gid/getValidPlacesForCity',[auth,findGame],gameController.getValidVerticesForPlayerToBuildCity);
router.post('/:gid/currentAction',[auth,findGame],gameController.setCurrentAction);
router.post('/:gid/endTurn',[auth,findGame],gameController.endTurn);
router.post('/:gid/placeRobber',[auth,findGame],gameController.placeRobber);
router.post('/:gid/buyDevelopmentCard',[auth,findGame],gameController.buyDevelopmentCard);
router.post('/:gid/activateKnight',[auth,findGame],gameController.activateKnightCard);
module.exports = router;
