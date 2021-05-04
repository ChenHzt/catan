import { Group } from "@visx/group";
import React, { useState, useEffect, useRef } from "react";
import Tile from "../tile/tile.component";
// import TileNumber from "../tileNumber/tileNumber.component";

const GameBoard = () => {
  const generateBoard = (centerLine, topRowX, tileRadius) => {
    const rows = [3, 4, 5, 4, 3];
    const hexagonsArr = [];
    const size = tileRadius;
    const width = size*Math.sqrt(3);
    for (let i = 0; i < rows.length; i++) {
      let isCentered = i % 2;
      if (isCentered === 0) {
        hexagonsArr.push(
          <Tile
            center={{ x: centerLine, y: topRowX + i * tileRadius * 1.5 }}
            size={size}
          ></Tile>
        );
      }

      let numSides = Math.floor(rows[i] / 2);

      for (let j = 1; j < numSides + 1; j++) {
        if (isCentered === 1) {
          hexagonsArr.push(
            <Tile
              center={{
                x: centerLine + width/2 + width * (j - 1),
                y: topRowX + i * tileRadius * 1.5,
              }}
              size={size}
            ></Tile>
          );
          hexagonsArr.push(
            <Tile
              center={{
                x: centerLine - width /2 - width * (j - 1),
                y: topRowX + i * tileRadius * 1.5,
              }}
              size={size}
            ></Tile>
          );
        } 
        else {
          hexagonsArr.push(
            <Tile
              center={{
                x: centerLine + width * j,
                y: topRowX + i * tileRadius * 1.5,
              }}
              size={size}
            ></Tile>
          );
          hexagonsArr.push(
            <Tile
              center={{
                x: centerLine - width * j,
                y: topRowX + i * tileRadius * 1.5,
              }}
              size={size}
            ></Tile>
          );
        }
      }
    }
    return hexagonsArr;
  };
  return <Group>
      {generateBoard(400,500/8,500/8)}
  </Group>;
};

export default GameBoard;
