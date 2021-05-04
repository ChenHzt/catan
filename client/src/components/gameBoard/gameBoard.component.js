import { Group } from "@visx/group";
import React, { useState, useEffect, useRef } from "react";
import Tile from "../tile/tile.component";
// import TileNumber from "../tileNumber/tileNumber.component";
import { connect } from 'react-redux';
import { getGameData } from '../../store/actions/gameActions';

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
          <Tile row={i-2} col ={0} 
            center={{ x: centerLine, y: topRowX + i * tileRadius * 1.5 }}
            size={size}
          ></Tile>
        );
      }

      let numSides = Math.floor(rows[i] / 2);

      for (let j = 1; j < numSides + 1; j++) {
        if (isCentered === 1) {
          hexagonsArr.push(
            <Tile row={i-2} col ={j}
              center={{
                x: centerLine + width/2 + width * (j - 1),
                y: topRowX + i * tileRadius * 1.5,
              }}
              size={size}
            ></Tile>
          );
          hexagonsArr.push(
            <Tile row={i-2} col ={-j-1}
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
            <Tile row={i-1} col ={j}
              center={{
                x: centerLine + width * j,
                y: topRowX + i * tileRadius * 1.5,
              }}
              size={size}
            ></Tile>
          );
          hexagonsArr.push(
            <Tile row={i-2} col ={-j}
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
  </Group>
};

const mapStateToProps = state => {
  console.log(state.game);
  return { game:state.game};
};

export default connect(mapStateToProps,{getGameData})(GameBoard);
