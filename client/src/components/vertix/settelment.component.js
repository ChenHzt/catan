import React from "react";

const Settlement = ({ color, ...props }) => {
  return (
    <svg
    viewBox={'0 0 70 70'}
    width="32"
    height="48"
    xmlns="http://www.w3.org/2000/svg"
    // xmlns:xlink="http://www.w3.org/1999/xlink"
    overflow="hidden"
  >
    <defs>
      <clipPath id="clip0">
        <rect x="598" y="459" width="32" height="48" />
      </clipPath>
    </defs>
    <g clip-path="url(#clip0)" transform="translate(-598 -459)">
      <rect x="598" y="478" width="31" height="28" fill={color} />
      <path
        d="M598 478 613.5 460 629 478Z"
        fill={color}
        fill-rule="evenodd"
      />
    </g>
  </svg>
  )
};

export default Settlement;
