import { Group } from "@visx/group";
import React, { useState, useEffect, useRef } from "react";
import Tile from "../tile/tile.component";
// import TileNumber from "../tileNumber/tileNumber.component";
import { connect } from "react-redux";
import { getGameData } from "../../store/actions/gameActions";
import Settlement from "../vertix/settelment.component";
import GameNode from "../vertix/vertix.component";
import { calcTileNodesCenterPoint,getTileCenterPointByLocation } from "../../helper";
const GameBoard = (props) => {
  const generateBoard = (tileRadius) => {
    const hexagonsArr = [];
    const temp = props.game.board.hexs.map((hex) => [
      JSON.stringify(hex.location),
      hex,
    ]);
    const tileMap = new Map(temp);

    tileMap.forEach((tile,locationStr) =>{
      hexagonsArr.push(<Tile
                tile={tile}
                center={getTileCenterPointByLocation(JSON.parse(locationStr))}
                size={props.tileRadius}
              ></Tile>)
    })

    return hexagonsArr;
  };

  const generateNodes = () => {
    const arr = [];
    const DoneNodeSet = new Set();
    props.game.board.hexs.forEach((hex) => {
      const hexVertices = [
        hex.vertices[0],
        hex.vertices[1],
        hex.vertices[2],
        hex.vertices[5],
        hex.vertices[4],
        hex.vertices[3],
      ];
      hexVertices.forEach((ver, i) =>
        !DoneNodeSet.has(ver)
          ? arr.push(
              <GameNode
                node={ver}
                radius="10"
                center={calcTileNodesCenterPoint(hex.location, props.tileRadius, i)}
              ></GameNode>
            )
          : null
      );
      hexVertices.forEach(DoneNodeSet.add, DoneNodeSet);
    });
    console.log(arr);
    return arr;
  };

  

  return (
    <svg width={'100%'} height={props.height} transform="scale(1)">
      <image
        // xlinkHref={"/static/images/boardBackground.png"}
         height={props.height}
        x="0"
        y="0"
      />
      <Group width={props.width} height={props.width} >
        <Group width={props.width} height={props.width} >
          {generateBoard()}
          {generateNodes()}
        </Group>
      </Group>
    </svg>
  );
};

const mapStateToProps = (state) => {
  return { game: state.game };
};

export default connect(mapStateToProps, { getGameData })(GameBoard);
