const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
  location: {
    type: Number,
    default: null,
  },
});

const PlayerSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  turn:{
    type:Number,
    require:true
  },
  color: {
    type: String,
    enum: ["RED", "YELLOW", "BLUE", "WHITE"],
    require: true,
  },
  settelments: {
    available: [ItemSchema],
    built: [ItemSchema],
  },
  cities: {
    available: [ItemSchema],
    built: [ItemSchema],
  },
  roads: {
    available: [ItemSchema],
    built: [ItemSchema],
  },
  activatedKnights: {
    type: Number,
    default: 0,
  },
  victoryPoints: {
    type: Number,
    default: 0,
  },
  resourceCards: {
    brick: {
      type: Number,
      default: 0,
    },
    ore: {
      type: Number,
      default: 0,
    },
    sheep: {
      type: Number,
      default: 0,
    },
    wood: {
      type: Number,
      default: 0,
    },
    wheat: {
      type: Number,
      default: 0,
    },
  },
  developmentCards: {
    victoryPoints: {
      type: Number,
      default: 0,
    },
    knights: {
      type: Number,
      default: 0,
    },
    monopoly: {
      type: Number,
      default: 0,
    },
    roadBuilding: {
      type: Number,
      default: 0,
    },
    yearOfPlenty: {
      type: Number,
      default: 0,
    },
  },
});

const Player = mongoose.model("Player", PlayerSchema);

module.exports = {
  Player,
  ItemSchema,
};
