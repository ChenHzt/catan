import { Group } from "@visx/group";
import React, { useState,useEffect,useRef } from "react";
import Hexagon from "../hexagon/hexagon.component";
import TileNumber from "../tileNumber/tileNumber.component";

const Tile = ({size,center,row,col}) => {
  const oddRToCube = (row,col) =>{
    const x = col- (row + (row&1)) / 2;
    const z = row;
    const y = -x-z
    return ([x,y,z])
  } 
  
  return (
    <Group>
        <Hexagon center={center} size={size} backgroundImg='/static/images/desertTile.png' ></Hexagon>
        <TileNumber value={oddRToCube(row,col)} center={center} radius={size/2}></TileNumber>
    </Group>
  );
};


export default Tile;
