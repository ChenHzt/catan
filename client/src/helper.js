const oddRToCube = (row, col) => {
  const x = col - (row - (row & 1)) / 2;
  const z = row;
  const y = -x - z;
  return JSON.stringify({ x, y, z });
};

const calcTilesCenterPoint = (tileRadius, centerLine, topRowX) => {
  const rows = [3, 4, 5, 4, 3];
  const size = tileRadius;
  const width = size * Math.sqrt(3);
  const tileCoordsMap = new Map();
  for (let i = 0; i < rows.length; i++) {
    let isCentered = i % 2;
    if (isCentered === 0) {
      tileCoordsMap.set(oddRToCube(i - 2, 0), {
        x: centerLine,
        y: topRowX + i * tileRadius * 1.5,
      });
    }

    let numSides = Math.floor(rows[i] / 2);
    for (let j = 1; j < numSides + 1; j++) {
      if (isCentered === 1) {
        tileCoordsMap.set(oddRToCube(i - 2, j - 1), {
          x: centerLine + width / 2 + width * (j - 1),
          y: topRowX + i * tileRadius * 1.5,
        });
        tileCoordsMap.set(oddRToCube(i - 2, -j), {
          x: centerLine - width / 2 - width * (j - 1),
          y: topRowX + i * tileRadius * 1.5,
        });
      } else {
        tileCoordsMap.set(oddRToCube(i - 2, j), {
          x: centerLine + width * j,
          y: topRowX + i * tileRadius * 1.5,
        });
        tileCoordsMap.set(oddRToCube(i - 2, -j), {
          x: centerLine - width * j,
          y: topRowX + i * tileRadius * 1.5,
        });
      }
    }
  }

  return tileCoordsMap;
};

let tileCenterByLocationMap=new Map();
let prevCalcData = {tileRadius:0,centerLine:0,topRowX:0}

export const calcTileCenterByLocationMap = (tileRadius,centerLine,topRowX) =>{
  if(prevCalcData.tileRadius === tileRadius
    && prevCalcData.centerLine === centerLine
    && prevCalcData.topRowX === topRowX)
      return tileCenterByLocationMap;
  tileCenterByLocationMap = calcTilesCenterPoint(tileRadius,centerLine,topRowX)
  return tileCenterByLocationMap;
}


export const getTileCenterPointByLocation = (tileLocation) => {
  const temp = tileCenterByLocationMap.get(JSON.stringify(tileLocation));
  return temp;
};


export const nodesCenterByIdMap = new Map()
export const calcTileNodesCenterPoint = (tileLocation, tileRadius, i,vertixNumber) => {
  const locationLabel = [
    "top",
    "top-right",
    "bottom-right",
    "bottom",
    "bottom-left",
    "top-left",
  ];
  const tileCenter = getTileCenterPointByLocation(tileLocation);
  const angle_deg = 60 * (i-2) - 30;
  const angle_rad = (Math.PI / 180) * angle_deg;
  const centerLocation = {
    x: tileCenter.x + tileRadius * Math.cos(angle_rad),
    y: tileCenter.y + tileRadius * Math.sin(angle_rad),
  };
  nodesCenterByIdMap.set(vertixNumber,centerLocation)
  return centerLocation;
};


export const calcNodeCenterByLocationMap = (tileRadius,centerLine,topRowX) =>{
  // if(prevCalcData.tileRadius === tileRadius
  //   && prevCalcData.centerLine === centerLine
  //   && prevCalcData.topRowX === topRowX)
  //     return nodesCenterByIdMap;
  tileNodesCenterByLocationMap = calcTileNodesCenterPoint(tileRadius,centerLine,topRowX)
  return tileNodesCenterByLocationMap;
}


export const calcTileEdgesCenterPoint = (tileLocation, tileRadius, i) => {
  const locationLabel = [
    "top",
    "top-right",
    "bottom-right",
    "bottom",
    "bottom-left",
    "top-left",
  ];
  const tileCenter = getTileCenterPointByLocation(tileLocation);
  const angle_deg = 60 * i ;
  const angle_rad = (Math.PI / 180) * angle_deg;
  return {
    x: tileCenter.x + tileRadius * Math.cos(angle_rad),
    y: tileCenter.y + tileRadius * Math.sin(angle_rad),
  };
};
