import React, { useState } from "react";
import { connect } from "react-redux";
import Settlement from '../vertix/settelment.component'
const renderSettlement = (node, containerWidth) => {
  const { settlement } = node;
  if (settlement) {
    return (
        <Settlement color="red"/>
    );
  } else {
    return null;
  }
};


const GameNode = (props) => {
  const { node, center, radius, onClick } = props;
  const [hover, setHover] = useState(false);
  // console.log(node);
  return (
    <svg
      width={2 * radius}
      height={2 * radius}
      x={center.x - radius}
      y={center.y - radius}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      // onClick={() => onClick(node)}
    >
      <circle
        cx={`${radius}`}
        cy={`${radius}`}
        r={radius}
        fill="black"
        fillOpacity={hover ? 1.0 : 0.0}
      />
      {/* {renderSettlement(node, 2 * radius)}
      {renderCity(node, 2 * radius)} */}
    </svg>
  );
};



export default GameNode