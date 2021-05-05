import { Group } from "@visx/group";
import React, { useState, useEffect, useRef } from "react";
import Tile from "../tile/tile.component";
// import TileNumber from "../tileNumber/tileNumber.component";
import { connect } from "react-redux";
import { getGameData } from "../../store/actions/gameActions";
import Settlement from "../vertix/settelment.component";
import GameNode from "../vertix/vertix.component";
import {calcTileNodesCenterPoint} from '../../helper'
const GameBoard = (props) => {
  const generateBoard = (centerLine, topRowX, tileRadius) => {
    const rows = [3, 4, 5, 4, 3];
    const hexagonsArr = [];
    const size = tileRadius;
    const width = size * Math.sqrt(3);
    const temp = props.game.board.hexs.map((hex) => [
      JSON.stringify(hex.location),
      hex,
    ]);
    const tileMap = new Map(temp);

    console.log(tileMap);

    const oddRToCube = (row, col) => {
      const x = col - (row - (row & 1)) / 2;
      const z = row;
      const y = -x - z;
      return JSON.stringify({ x, y, z });
    };

    for (let i = 0; i < rows.length; i++) {
      let isCentered = i % 2;
      if (isCentered === 0) {
        hexagonsArr.push(
          <Tile
            tile={tileMap.get(oddRToCube(i - 2, 0))}
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
              tile={tileMap.get(oddRToCube(i - 2, j - 1))}
              center={{
                x: centerLine + width / 2 + width * (j - 1),
                y: topRowX + i * tileRadius * 1.5,
              }}
              size={size}
            ></Tile>
          );
          hexagonsArr.push(
            <Tile
              tile={tileMap.get(oddRToCube(i - 2, -j))}
              center={{
                x: centerLine - width / 2 - width * (j - 1),
                y: topRowX + i * tileRadius * 1.5,
              }}
              size={size}
            ></Tile>
          );
        } else {
          hexagonsArr.push(
            <Tile
              tile={tileMap.get(oddRToCube(i - 2, j))}
              center={{
                x: centerLine + width * j,
                y: topRowX + i * tileRadius * 1.5,
              }}
              size={size}
            ></Tile>
          );
          hexagonsArr.push(
            <Tile
              tile={tileMap.get(oddRToCube(i - 2, -j))}
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

  const generateNodes = () => {
    const arr=[];
    const DoneNodeSet = new Set();
    props.game.board.hexs.forEach((hex) => {
      const hexVertices = [hex.vertices[0],hex.vertices[1],hex.vertices[2],hex.vertices[5],hex.vertices[4],hex.vertices[3]]
      hexVertices
      .forEach((ver,i) => !DoneNodeSet.has(ver) ? arr.push(<GameNode node={ver} radius='10' center={calcTileNodesCenterPoint(hex.location,60,i)}></GameNode>) : null)
      hexVertices.forEach(DoneNodeSet.add, DoneNodeSet)
    });
    console.log(arr);
    return arr;
  };

  return <Group>
    {generateBoard(402, 122, 60)}
    {generateNodes()}
    {/* <GameNode node={3} radius='10' center={{x: 392, y: 52}}></GameNode> */}
    {/* <GameNode node={3} radius='10' center={{x: 246.11542731880104, y: 152}}></GameNode> */}
    </Group>;
};

const mapStateToProps = (state) => {
  return { game: state.game };
};

export default connect(mapStateToProps, { getGameData })(GameBoard);
