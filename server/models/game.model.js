const mongoose = require("mongoose");

const HexSchema = new mongoose.Schema({
  hexId: {
    type: Number,
    require: true,
  },
  location: {
    x: {
      type: Number,
    },
    y: {
      type: Number,
    },
    z: {
      type: Number,
    },
  },
  resource: {
    type: String,
    enum: ["brick", "desert", "wood", "wheat", "sheep", "ore"],
    require: true,
  },
  vertices: [{ type: Number }],
  diceNumber: {
    type: Number,
    require: true,
  },
  robber: {
    type: Boolean,
    default: false,
    index: true,
  },
});

const VertixSchema = new mongoose.Schema({
  vertixId: {
    type: Number,
    require: true,
  },
  build: {
    type: {
      player: {
        type: Number,
      },
      buildType: {
        type: String,
        enum: ["settelment", "city"],
      },
    },
    default: null,
    sparse: true,
  },
  neighborVertices: [
    {
      type: Number,
    },
  ],
  neighborHexs: [HexSchema],
});

const EdgeSchema = new mongoose.Schema({
  edgeId: {
    type: Number,
    require: true,
  },
  road: {
    type: {
      player: {
        type: Number,
      },
    },
    default: null,
    sparse: true,
  },
  neighborVertices: [
    {
      type: Number,
    },
  ],
});

const BoardSchema = new mongoose.Schema({
  hexCount: {
    type: Number,
    default: 19,
  },
  hexs: [HexSchema],
  vertices: [VertixSchema],
  edges: [EdgeSchema],
});

const GameSchema = new mongoose.Schema({
  playersNum: {
    type: Number,
    require: true,
    validate(value) {
      if (value < 3 || value > 4)
        throw new Error("this game is for 3-4 players only");
    },
  },
  currentTurn: {
    type: Number,
    default: 0,
    validate(value) {
      if (value >= this.playersNum)
        throw new Error(
          `current turn can't be ${value} because there are only ${this.playersNum} players`
        );
    },
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  players: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Player",
    },
  ],
  board: BoardSchema,
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true,
    index:true
  },
  phase: {
    type: String,
    enum: ["SETUP_ROUND_1", "SETUP_ROUND_2", "GAME", "END"],
    default: "SETUP_ROUND_1",
  },
  actionActive: {
    type: String,
    default: "NONE",
    enum: [
      "NONE",
      "BUILD_SETTELMENT",
      "BUILD_ROAD",
      "BUILD_CITY",
      "BUY_DEVELOPMENT_CARD",
      "PLACE_ROBBER",
    ],
  },
  dice: {
    type: Number,
    default: 0,
  },
  creationDate:{
    type:Date,
    default: Date.now
  }
});

const Game = mongoose.model("Game", GameSchema);

module.exports = {
  Game,
  BoardSchema,
  HexSchema,
  VertixSchema,
  EdgeSchema,
};
