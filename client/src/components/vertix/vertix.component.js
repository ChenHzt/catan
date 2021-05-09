import React, { useState } from "react";
import { connect } from "react-redux";
// import Settlement from "../vertix/settelment.component";
// const renderSettlement = (node, containerWidth) => {
//   const { settlement } = node;
//   if (settlement) {
//     return <Settlement color="red" />;
//   } else {
//     return null;
//   }
// };

const GameNode = (props) => {
  const { node, center, radius, onClick, build } = props;
  const [hover, setHover] = useState(false);
  // console.log(node);

  const renderSettlement = () => {
    if (build && build.type === "settelment")
      return (
        <image
        xlinkHref={"/static/images/pices/settelments/blue.svg"}
         height={20}
         width={20}
        x="0"
        y="0"
      />
      );


  };
  return (
    <svg
      onClick={() => onClick(node)}
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
      {renderSettlement()}
    </svg>
  );
};

export default GameNode;
