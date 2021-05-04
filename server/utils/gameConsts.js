// export const numOfTiles = 19;

const BRICK = 'brick';
const DESERT = 'desert';
const ORE = 'ore';
const SHEEP = 'sheep';
const WHEAT = 'wheat';
const WOOD = 'wood';
// export const ANY = 'ANY';

const tileCounts = {};
tileCounts[BRICK] = 3;
tileCounts[DESERT] = 1;
tileCounts[ORE] = 3;
tileCounts[SHEEP] = 4;
tileCounts[WHEAT] = 4;
tileCounts[WOOD] = 4;

// eslint-disable-next-line prettier/prettier
const tileDiceValues = [5,2,6,3,8,10,9,12,11,4,8,10,9,4,5,6,3,11];


// export const Tile = (id, location, resource, value) => {
//   this.id = id;
//   this.location = location;
//   this.resource = resource;
//   this.value = value;
// };

// export const playerColors = [
//   '#D41C0B', // Red
//   '#EDCB0C', // Yellow
//   '#FFFFFA', // White
//   '#0669E3', // Blue
// ];

const payments = {
  settelment: { brick: 1, sheep: 1, wood: 1, wheat: 1 },
  city: { wheat: 2, ore: 3 },
  road: { brick: 1, wood: 1 },
};

module.exports = {
  payments,
  tileCounts,
  tileDiceValues,
};
