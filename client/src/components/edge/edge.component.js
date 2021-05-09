import React, { useState } from "react";

const GameEdge = (props) => {
  const { edge, center, slope, size, build } = props;
  const [hover, setHover] = useState(false);
  const len = size * 0.6;
  console.log(props);

  const renderRoad = () => {
    if (build !== null) {
      return (
        <rect
          x={center.x - len / 2}
          y={center.y - 5}
          width={len}
          height={15}
          fill="lightgreen"
          transform={`rotate(${slope},${center.x},${center.y})`}

        />
      );
    }
  };

  return (
    <svg
      onClick={() => props.onClick(edge)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <rect
        x={center.x - len / 2}
        y={center.y - 5}
        width={len}
        height={10}
        fill="lightgreen"
        transform={`rotate(${slope},${center.x},${center.y})`}
        fillOpacity={hover ? 1.0 : 0.0}
      />

      {renderRoad()}
    </svg>
  );
};

export default GameEdge;
