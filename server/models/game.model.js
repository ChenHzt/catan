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
        type: mongoose.Schema.Types.ObjectId,
        ref: "Player",
      },
    },
    default: null,
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
        type: mongoose.Schema.Types.ObjectId,
        ref: "Player",
      },
    },
    default: null,
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
    default: 1,
    validate(value) {
      if (value > this.playersNum)
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
  },
});

const Game = mongoose.model("Game", GameSchema);

module.exports = {
  Game,
  BoardSchema,
  HexSchema,
  VertixSchema,
  EdgeSchema,
};
