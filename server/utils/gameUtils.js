/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-plusplus */
const { Player } = require('../models/player.model');
const { Game } = require('../models/game.model');
const { edgesData, hexasData,mapVerticesNeighbors } = require('../consts/boardGraphConsts');
const { tileCounts, tileDiceValues } = require('../consts/gameConsts');

const initializeItems = (amount) => {
  const items = [];
  for (let i = 0; i < amount; i++) {
    items.push({});
  }
  return items;
};

const initializePlayer = (id, name) => {
  const colors = ['RED', 'YELLOW', 'WHITE', 'BLUE'];
  const player = new Player({
    name,
    color: colors[id],
    settelments: {
      available: initializeItems(5),
      built: [],
    },
    cities: {
      available: initializeItems(4),
      built: [],
    },
    roads: {
      available: initializeItems(15),
      built: [],
    },
    turn:id
  });
  try {
    player.save();
  } catch (e) {
    console.log(e.message);
  }
  return player;
};

const generateRandomBoard = () => {
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  };

  let boardTiles = [];
  for (const key in tileCounts) {
    boardTiles = boardTiles.concat(Array(tileCounts[key]).fill(key));
  }
  shuffleArray(boardTiles);
  let index = 0;
  const temp1 = boardTiles.map((elem) => {
    if (elem === 'desert') return { number: 0, resource: elem };
    return { number: tileDiceValues[index++], resource: elem };
  });
  return temp1;
};

const initializeBoard = () => {
  const board = {
    hexCount: 19,
    hexs: [],
    vertices: [],
    edges: [],
  };

  const randomBoardTiles = generateRandomBoard();

  for (let i = 0; i < 54; i++) {
    board.vertices.push({ vertixId: i });
  }

  board.edges = edgesData.map((edge, index) => {

    return {
      edgeId: index,
      neighborVertices: [edge[0], edge[1]],
    };
  });

  board.hexs = hexasData.map((h, i) => ({
    hexId: i,
    location: h.location,
    vertices: h.vertices,
    resource: randomBoardTiles[i].resource,
    diceNumber: randomBoardTiles[i].number,
  }));

  return board;
};

const createMapFromVertixToHex = (board) => {
  for (let i = 0; i < hexasData.length; i++) {
    hexasData[i].vertices.forEach((v) =>
      board.vertices[v].neighborHexs.push(board.hexs[i])
    );
    // board.vertices[i].neighborVertices.push()
  }
};

const getPlayerData = async (playerId) => {
  const player = await Player.findById({ _id: playerId });
  if (!player) throw new Error(`player doesn't exist`);
  return player;
};

const validatePlayerHasAvailableSettelment = (player) => {
  if (player.settelments.available.length === 0)
    throw new Error(`none of the settelments of the user are avilable`);
};

const validatePlayerHasAvailableCities = (player) => {
  if (player.cities.available.length === 0)
    throw new Error(`none of the cities of the user are avilable`);
};

const validatePlayerHasAvailableRoads = (player) => {
  if (player.roads.available.length === 0)
    throw new Error(`none of the roads of the user are avilable`);
};

const validateLocationIsProvided = (body) => {
  if (!body.location || body.location > 53 || body.location < 0)
    throw new Error('location for the settelment is required');
};

const validateRoadLocationIsProvided = (body) => {
  if (!body.location || body.location > 71 || body.location < 0)
    throw new Error('location for the road is required');
};

const validateLocationIsAvailable = (game, location) => {
  if (game.board.vertices[location].build !== null)
    throw new Error('this location is already ocupied');
  const neighbors = mapVerticesNeighbors.get(location).neighborVertices;
  neighbors.forEach((neighbor) => {
    if (game.board.vertices[neighbor].build != null)
      throw new Error(
        `cant build a settelment in a distance of less then 2 roads from other settelment or city`
      );
  });
  const isThereNeighborRoads = game.board.edges.some(edge => {
    const temp = edge.neighborVertices.includes(location);
    if(temp && edge.road && edge.road.player===game.currentTurn)
      return true;
    return false;
  });

  if(!isThereNeighborRoads)
    throw new Error(`you don't have a path to this location`);
};

const validateRoadLocationIsAvailable = (game, location) => {
  if (game.board.edges[location].road !== null)
    throw new Error('this location is already ocupied');
  const neighborVertices = game.board.edges[location].neighborVertices;
  const isThereNearBuild = neighborVertices.some(ver => game.board.vertices[ver].build && game.board.vertices[ver].build.player===game.currentTurn);
  if(isThereNearBuild) return;
  const isThereNeighborRoads = game.board.edges.some(edge => {
    const temp = edge.neighborVertices.some(ver => neighborVertices.includes(ver));
    if(temp && edge.road && edge.road.player===game.currentTurn)
      return true;
    return false;
  });

  if(!isThereNeighborRoads)
    throw new Error(`you cant build road without a path to your settelment`)
};

// eslint-disable-next-line prettier/prettier
// const validatePlayerIsAllowedToBuildRoadInLocation = (player,game,location) => {
//   const flag = false;
//   // eslint-disable-next-line prettier/prettier
//   const currentPlayerNeighborBuild = game.board.edges[location].neighborVertices
//   .filter((neighbor) =>
//     game.board.vertices[neighbor].build.player.equal(player._id)
//   );
//   // eslint-disable-next-line no-useless-return
//   if (currentPlayerNeighborBuild.length > 0) return;
// };

const validatePlayerHasSettelmentInLocation = (player, location) => {
  const settelmentToReplaceIndex = player.settelments.built.findIndex(
    (settelment) => settelment.location === location
  );
  if (settelmentToReplaceIndex === -1)
    throw new Error(`player dosen't have a settelment in this location`);
  return settelmentToReplaceIndex;
};

const validateDiceValueIsValid = (dice) => {
  if (!dice || dice < 1 || dice > 12)
    throw new Error('dice value need to be in the range 1-12');
};

const buildNewSettelment = (player, game, location) => {
  const settelmentItem = player.settelments.available.shift();
  settelmentItem.location = location;

  player.settelments.built.push(settelmentItem);

  game.board.vertices[location].build = {
    player: game.currentTurn,
    type: 'settelment',
    id: settelmentItem._id,
  };
};

const upgradeSettelmentToCity = (player, game, location) => {
  const settelmentToReplaceIndex = validatePlayerHasSettelmentInLocation(
    player,
    location
  );
  const settelmentItem = player.settelments.built.splice(
    settelmentToReplaceIndex,
    1
  );
  settelmentItem[0].location = null;

  player.settelments.available.push(settelmentItem[0]);

  const cityItem = player.cities.available.shift();
  cityItem.location = location;

  player.cities.built.push(cityItem);

  game.board.vertices[location].build = {
    player: game.currentTurn,
    type: 'city',
    id: cityItem._id,
  };
};

const buildRoad = (player, game, roadLocation) => {
  const roadItem = player.roads.available.shift();
  roadItem.location = roadLocation;

  player.roads.built.push(roadItem);

  game.board.edges[roadLocation].road = {
    player: game.currentTurn,
    type: 'road',
    id: roadItem._id,
  };
};

const getResourcesSetupRound = (game, player, location) => {
  const newResources = { brick: 0, wood: 0, wheat: 0, sheep: 0, ore: 0 };
  const { neighborHexs } = game.board.vertices[location];
  neighborHexs
    .forEach((neighbor) => (newResources[neighbor.resource] += 1));
  for (const key in newResources) {
    player.resourceCards[key] += newResources[key];
  }
};

const payWithResources = (player, payment) => {
  const resources = Object.keys(payment);
  resources.forEach((element) => {
    if (player.resourceCards[element] < payment[element])
      throw new Error('not enough resorces available');
    player.resourceCards[element] -= payment[element];
  });
};

const getResourcesForPlayer = (player, game, dice) => {
  const newResources = { brick: 0, wood: 0, wheat: 0, sheep: 0, ore: 0 };
  const { settelments } = player;
  if (settelments.built.length > 0)
    settelments.built.forEach((settelment) => {
      const { neighborHexs } = game.board.vertices[settelment.location];
      neighborHexs
        .filter((neighbor) => neighbor.diceNumber === dice)
        .forEach((neighbor) => (newResources[neighbor.resource] += 1));
    });

  const { cities } = player;

  if (cities.built.length > 0)
    cities.built.forEach((city) => {
      const { neighborHexs } = game.board.vertices[city.location];
      neighborHexs
        .filter((neighbor) => neighbor.diceNumber === dice)
        .forEach((neighbor) => (newResources[neighbor.resource] += 2));
    });
  for (const key in newResources) {
    player.resourceCards[key] += newResources[key];
  }
};

module.exports = {
  initializePlayer,
  initializeBoard,
  getPlayerData,
  buildNewSettelment,
  buildRoad,
  upgradeSettelmentToCity,
  payWithResources,
  getResourcesSetupRound,
  // createMapFromHexToVertix,
  createMapFromVertixToHex,
  getResourcesForPlayer,
  validations: {
    validateLocationIsAvailable,
    validateRoadLocationIsAvailable,
    validateLocationIsProvided,
    validateRoadLocationIsProvided,
    validatePlayerHasAvailableSettelment,
    validatePlayerHasAvailableCities,
    validatePlayerHasAvailableRoads,
    validatePlayerHasSettelmentInLocation,
    // validatePlayerIsAllowedToBuildRoadInLocation,
    validateDiceValueIsValid,
  },
};
