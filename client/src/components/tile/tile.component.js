import { Group } from "@visx/group";
import React, { useState,useEffect,useRef } from "react";
import Hexagon from "../hexagon/hexagon.component";
import TileNumber from "../tileNumber/tileNumber.component";

const Tile = ({size,center,tile}) => {
  console.log(size);
  return (
    <Group>
        <Hexagon center={center} size={size} backgroundImg='/static/images/desertTile.png' ></Hexagon>
        <TileNumber value='12' center={center} radius={size/5}></TileNumber>
    </Group>
  );
};


export default Tile;
