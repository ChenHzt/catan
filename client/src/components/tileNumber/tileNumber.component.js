import { Group } from "@visx/group";
import React, { useState, useEffect, useRef } from "react";
import Hexagon from "../hexagon/hexagon.component";

const TileNumber = ({ center, value, radius }) => {
  const numberColor = [8, 6].includes(parseInt(value)) ? "red" : "black";
  return (
    <Group>
      <circle
        cx={`${center.x}`}
        cy={`${center.y}`}
        r={radius}
        fill={"white"}
        stroke={`#000000`}
        strokeWidth={radius / 10}
      />
      <text
        x={`${center.x}`}
        y={`${center.y}`}
        fontSize={10 + 6 - Math.abs(value - 7) * 2}
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
