/* eslint-disable no-plusplus */
const { Game } = require('../models/game.model');
const { Player } = require('../models/player.model');
const { edgesData, hexasData } = require('../consts/boardGraphConsts');

const initializeItems = (amount) => {
  const items = [];
  for (let i = 0; i < amount; i++) {
    items.push({});
  }
  return items;
};

const initializePlayer = (id) => {
  const colors = ['RED', 'YELLOW', 'WHITE', 'BLUE'];
  const player = new Player({
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
  });
  try {
    player.save();
  } catch (e) {
    console.log(e.message);
  }
  return player;
};

const initializeBoard = () => {
  const board = {
    hexCount: 19,
    hexs: [],
    vertices: [],
    edges: [],
  };

  for (let i = 0; i < 54; i++) {
    board.vertices.push({ vertixId: i, neighborVertices: [] });
  }

  board.edges = edgesData.map((edge, index) => {
    board.vertices[edge[0]].neighborVertices.push(edge[1]);
    board.vertices[edge[1]].neighborVertices.push(edge[0]);
    return {
      edgeId: index,
      neighborVertices: [edge[0], edge[1]],
    };
  });

  board.hexs = hexasData.map((h, i) => ({
    hexId: i,
    location: h.location,
    vertices: h.vertices,
  }));

  return board;
};

const initializeGame = () => {
  const players = [];
  for (let i = 0; i < 4; i++) {
    players.push(initializePlayer(i));
  }
  const game = new Game({
    playersNum: 4,
    currentTurn: 1,
    isActive: true,
    players: players.map((p) => p._id),
    board: initializeBoard(),
  });
  game.save();
};

module.exports = { initializeGame };
