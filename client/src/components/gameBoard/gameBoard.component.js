import { Group } from "@visx/group";
import React, { useState, useEffect, useRef } from "react";
import Tile from "../tile/tile.component";
import { connect } from "react-redux";
import {
  getGameData,
  buildSettelment,
  buildRoad,
  buildCity,
  setCurrentAction,
  placeRobber,
  activateKnight
} from "../../store/actions/gameActions";
import GameNode from "../vertix/vertix.component";
import {
  calcTileNodesCenterPoint,
  getTileCenterPointByLocation,
  nodesCenterByIdMap,
} from "../../helper";
import GameEdge from "../edge/edge.component";

const GameBoard = (props) => {
  const onNodeClicked = (node) => {
    if (props.currentAction === 'BUILD_SETTELMENT' ) {
      props.buildSettelment(props.game._id, node);
      props.setCurrentAction(props.game._id,'NONE');
    }
    if(props.currentAction === 'BUILD_CITY'){
      props.buildCity(props.game._id, node);
      props.setCurrentAction(props.game._id,'NONE');
    }
  };
  const onEdgeClicked = (edge) => {
    if (props.currentAction === 'BUILD_ROAD') {
      props.buildRoad(props.game._id, edge.edgeId);
      props.setCurrentAction(props.game._id,'NONE');
    }
  };

  const placeRobber = (tile) =>{
    if(props.currentAction === 'PLACE_ROBBER'){
      props.placeRobber(props.game._id, tile.hexId);
      props.setCurrentAction(props.game._id,'NONE');      
    }
    if(props.currentAction === 'ACTIVATE_KNIGHT'){
      props.activateKnight(props.game._id, tile.hexId);
      props.setCurrentAction(props.game._id,'NONE');      
    }
  }

  const generateBoard = (tileRadius) => {
    const hexagonsArr = [];
    const temp = props.game.board.hexs.map((hex) => [
      JSON.stringify(hex.location),
      hex,
    ]);
    const tileMap = new Map(temp);

    tileMap.forEach((tile, locationStr) => {
      hexagonsArr.push(
        <Tile
          onClick={placeRobber}
          tile={tile}
          center={getTileCenterPointByLocation(JSON.parse(locationStr))}
          size={props.gameDims.tileRadius}
        ></Tile>
      );
    });

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
                currentAction={props.currentAction}
                build={props.game.board.vertices[ver].build}
                onClick={onNodeClicked}
                node={ver}
                radius={props.gameDims.tileRadius/5}
                center={calcTileNodesCenterPoint(
                  hex.location,
                  props.gameDims.tileRadius,
                  i,
                  ver
                )}
              ></GameNode>
            )
          : null
      );
      hexVertices.forEach(DoneNodeSet.add, DoneNodeSet);
    });
    return arr;
  };

  const generateEdges = () => {
    return props.game.board.edges.map((edge) => {
      const centerNode1 = nodesCenterByIdMap.get(edge.neighborVertices[0]);
      const centerNode2 = nodesCenterByIdMap.get(edge.neighborVertices[1]);

      const edgeCenter = {
        x: (centerNode1.x + centerNode2.x) / 2,
        y: (centerNode1.y + centerNode2.y) / 2,
      };
      let slope;
      if (centerNode1.x === centerNode2.x) slope = 90;
      else
        slope =
          Math.atan(
            (centerNode1.y - centerNode2.y) / (centerNode1.x - centerNode2.x)
          ) *
          (180 / Math.PI);

      const size =
        ((centerNode1.y - centerNode2.y) ** 2 +
          (centerNode1.x - centerNode2.x) ** 2) **
        0.5;
      return (
        <GameEdge
          currentAction={props.currentAction}
          onClick={onEdgeClicked}
          build={props.game.board.edges[edge.edgeId].road}
          slope={slope}
          size={size}
          center={edgeCenter}
          edge={edge}
        />
      );
    });
  };

  return (
    <svg width={"100%"} height={props.gameDims.height} transform="scale(1)">
      <image xlinkHref={`/static/images/boardBackground.png`} x={(props.gameDims.width - 662)/2} height={props.gameDims.height} />
      <Group width={props.gameDims.width} height={props.gameDims.width}>
        <Group width={props.gameDims.width} height={props.gameDims.width}>
          {generateBoard()}
          {generateNodes()}
          {generateEdges()}
        </Group>
      </Group>
    </svg>
  );
};

const mapStateToProps = (state) => {
  return {
    game: state.game,
    locations: state.locations,
    error: state.error,
    currentAction: state.currentAction,
    gameDims: state.gameDims,
  };
};

export default connect(mapStateToProps, {
  getGameData,
  buildSettelment,
  buildRoad,
  setCurrentAction,
  placeRobber,
  buildCity,
  activateKnight
})(GameBoard);
