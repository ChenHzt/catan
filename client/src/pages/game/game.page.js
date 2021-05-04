import React from "react";
// import { GridGenerator, Hexagon, HexGrid, Layout } from 'react-hexgrid';
import Hexagon from "../../components/hexagon/hexagon.component";
// import Hexagon from 'react-hexagon';
import { Group } from "@visx/group";
import GameBoard from "../../components/gameBoard/gameBoard.component";

function Game() {
  return (
    <div style={{height:'100vh' , background:'url(/static/images/tableBackground.jpg) no-repeat center center/cover '}}>
      <svg width={700} height={500}>
      <image xlinkHref={'/static/images/boardBackground.png'} width={700} height={500} x='0' y="0" />
        <rect width="100%" height="100%" fillOpacity={0} />
        <Group>
          <GameBoard />
        </Group>
      </svg>
    </div>
  );
}

export default Game;
