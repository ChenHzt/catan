// export const numOfTiles = 19;

const BRICK = 'brick';
const DESERT = 'desert';
const ORE = 'ore';
const SHEEP = 'sheep';
const WHEAT = 'wheat';
const WOOD = 'wood';

const tileCounts = {};
tileCounts[BRICK] = 3;
tileCounts[DESERT] = 1;
tileCounts[ORE] = 3;
tileCounts[SHEEP] = 4;
tileCounts[WHEAT] = 4;
tileCounts[WOOD] = 4;

// eslint-disable-next-line prettier/prettier
const tileDiceValues = [5,2,6,3,8,10,9,12,11,4,8,10,9,4,5,6,3,11];


const payments = {
  settelment: { brick: 1, sheep: 1, wood: 1, wheat: 1 },
  city: { wheat: 2, ore: 3 },
  road: { brick: 1, wood: 1 },
  developmentCard: { wheat:1,sheep:1,ore:1 },
};

//game phases
const GAME_PHASE='GAME'
const SETUP_ROUND_1_PHASE='SETUP_ROUND_1'
const SETUP_ROUND_2_PHASE='SETUP_ROUND_2'
const GAME_DONE_PHASE='END'


//game actions
const BUILD_SETTELMENT = 'BUILD_SETTELMENT'
const BUILD_CITY = 'BUILD_CITY'
const BUILD_ROAD = 'BUILD_ROAD'
const BUY_DEVELOPMENT_CARD = 'BUY_DEVELOPMENT_CARD'
const ACTIVATE_KNIGHT = 'ACTIVATE_KNIGHT'

module.exports = {
  payments,
  tileCounts,
  tileDiceValues,
  phases:{
    GAME_PHASE,
    SETUP_ROUND_1_PHASE,
    SETUP_ROUND_2_PHASE,
    GAME_DONE_PHASE,
  },
  actions:{
    BUILD_ROAD,
    BUILD_CITY,
    BUILD_SETTELMENT,
    BUY_DEVELOPMENT_CARD,
    ACTIVATE_KNIGHT
  }
};
