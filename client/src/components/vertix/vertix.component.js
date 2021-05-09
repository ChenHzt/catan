import React, { useState } from "react";


const GameNode = (props) => {
  const { node, center, radius, onClick, build } = props;
  const [hover, setHover] = useState(false);

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

      {renderSettlement()}
    </svg>
  );
};

export default GameNode;
