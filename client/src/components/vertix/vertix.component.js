import React, { useState } from "react";
import {playersColors} from '../../consts'

const GameNode = (props) => {
  const { node, center, radius, onClick, build,currentAction } = props;
  const [hover, setHover] = useState(false);

  const renderSettlement = () => {
    if (build && (build.type === "settelment" || build.type === "city"))
      return (
        <image
        xlinkHref={`/static/images/pices/${build.type}/${playersColors[build.player].name}.svg`}
         height={radius*2}
         width={radius*2}
        x="0"
        y="0"
      />
      );


  };


  return (
    <svg
      key={node}
      onClick={() => currentAction==='BUILD_SETTELMENT' || currentAction==='BUILD_CITY'  ? onClick(node) : null}
      width={2 * radius}
      height={2 * radius}
      x={center.x - radius}
      y={center.y - radius}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <circle
        cx={`${radius}`}
        cy={`${radius}`}
        r={radius}
        fill="black"
        fillOpacity={hover && currentAction==='BUILD_SETTELMENT' ? 1.0 : 0.0}
      />

      {renderSettlement()}
    </svg>
  );
};

export default GameNode;
