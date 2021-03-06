import Game from "../../pages/game/game.page";
import GameBoard from "../gameBoard/gameBoard.component";
import { StyledCard } from "./style";
import {StyledButton} from '../../style'
import { Group } from "@visx/group";
import React, { useState, useEffect, useRef } from "react";
import Tile from "../tile/tile.component";
import GameNode from "../vertix/vertix.component";
import {
  calcTileNodesCenterPoint,
  getTileCenterPointByLocation,
  nodesCenterByIdMap,
} from "../../helper";
import GameEdge from "../edge/edge.component";
import { useHistory } from "react-router-dom";

export const GamePreviewCard = (props) => {
  const history = useHistory();

  const generateBoardPreview = () => {
    const hexagonsArr = [];

    const temp = props.game.board.hexs.map((hex) => [
      JSON.stringify(hex.location),
      hex,
    ]);
    const tileMap = new Map(temp);

    tileMap.forEach((tile, locationStr) => {
      hexagonsArr.push(
        <Tile
          onClick={()=>{}}
          tile={tile}
          center={getTileCenterPointByLocation(JSON.parse(locationStr))}
          size={props.gameDims.tileRadius}
        ></Tile>
      );
    });

    return hexagonsArr;
  };

  const generateNodesPreview = () => {
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
                onClick={()=>{}}
                node={ver}
                radius={props.gameDims.tileRadius / 5}
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

  const generateEdgesPreview = () => {
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
          onClick={() => {}}
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
    <StyledCard>
        <svg width={props.gameDims.width} height={props.gameDims.height} transform="scale(1)">
          <image
            xlinkHref={`/static/images/boardBackground.png`}
            x={(props.gameDims.width - props.gameDims.height * 1.14) / 2}
            height={props.gameDims.height}
          />
          <Group width={props.gameDims.width} height={props.gameDims.width}>
            <Group width={props.gameDims.width} height={props.gameDims.width}>
              {generateBoardPreview()}
              {generateNodesPreview()}
              {generateEdgesPreview()}
            </Group>
          </Group>
        </svg>
        <StyledButton onClick={() => history.push(`/game/${props.game._id}`)}>CONTINUE GAME</StyledButton>
    </StyledCard>
  );
};
