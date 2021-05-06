import { Polygon } from "@visx/shape";
import React, { useState,useEffect,useRef } from "react";

const Hexagon = ({ size, center, backgroundImg, onClick}) => {
  const rotate = 30;

  const shapeSide = size;

  const shapeWidth = Math.sqrt(3) * size;

  const shapeHeight = 2 * size;

  let shapeCenter = { x: shapeWidth / 2, y: shapeHeight / 2 };
  
  let x = 0;
  let y = 0;

  if (!!center) {
    x = center.x -  shapeWidth / 2;
    y = center.y - shapeHeight / 2;
  }

  return (
    <svg width={shapeWidth} height={shapeHeight} x={x} y={y} onClick={onClick}>
      {/* <defs>
        <pattern id="pattern-checkers" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
          <image xlinkHref={backgroundImg} width={shapeWidth} height={shapeHeight} x='0' y="0" />
          
        </pattern>

      </defs> */}
      <Polygon
        sides={6}
        size={shapeSide}
        rotate={rotate}
        fill={'#DBAF53'}
        center={shapeCenter}
      />
      <image xlinkHref={backgroundImg} width={shapeWidth} height={shapeHeight} x='0' y="0" />
    </svg>
  );
};


export default Hexagon;
