import { Group } from "@visx/group";
import React, { useState, useEffect, useRef } from "react";
import Hexagon from "../hexagon/hexagon.component";

const TileNumber = ({ center, value, radius ,background}) => {
  const numberColor = [8, 6].includes(parseInt(value)) ? "red" : "black";
  return (
    <Group>
      <circle
        cx={`${center.x}`}
        cy={`${center.y}`}
        r={radius}
        fill={background}
      />
      <text
        x={`${center.x}`}
        y={`${center.y}`}
        fontSize={25  - Math.abs(value - 7) * 3}
        fontWeight='500'
        dominantBaseline="middle"
        textAnchor="middle"
        fill={numberColor}
      >
        {`${value}`}
      </text>
     
    </Group>
  );
};

export default TileNumber;
