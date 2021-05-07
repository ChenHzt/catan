const hexasData = [
  { location: { x: 0, y: 2, z: -2 }, vertices: [0, 1, 2, 8, 9, 10] },
  { location: { x: 1, y: 1, z: -2 }, vertices: [2, 3, 4, 10, 11, 12] },
  { location: { x: 2, y: 0, z: -2 }, vertices: [4, 5, 6, 12, 13, 14] },
  { location: { x: -1, y: 2, z: -1 }, vertices: [7, 8, 9, 17, 18, 19] },
  { location: { x: 0, y: 1, z: -1 }, vertices: [9, 10, 11, 19, 20, 21] },
  { location: { x: 1, y: 0, z: -1 }, vertices: [11, 12, 13, 21, 22, 23] },
  { location: { x: 2, y: -1, z: -1 }, vertices: [13, 14, 15, 23, 24, 25] },
  { location: { x: -2, y: 2, z: 0 }, vertices: [16, 17, 18, 27, 28, 29] },
  { location: { x: -1, y: 1, z: 0 }, vertices: [18, 19, 20, 29, 30, 31] },
  { location: { x: 0, y: 0, z: 0 }, vertices: [20, 21, 22, 31, 32, 33] },
  { location: { x: 1, y: -1, z: 0 }, vertices: [22, 23, 24, 33, 34, 35] },
  { location: { x: 2, y: -2, z: 0 }, vertices: [24, 25, 26, 35, 36, 37] },
  { location: { x: -2, y: 1, z: 1 }, vertices: [28, 29, 30, 38, 39, 40] },
  { location: { x: -1, y: 0, z: 1 }, vertices: [30, 31, 32, 40, 41, 42] },
  { location: { x: 0, y: -1, z: 1 }, vertices: [32, 33, 34, 42, 43, 44] },
  { location: { x: 1, y: -2, z: 1 }, vertices: [34, 35, 36, 44, 45, 46] },
  { location: { x: -2, y: 0, z: 2 }, vertices: [39, 40, 41, 47, 48, 49] },
  { location: { x: -1, y: -1, z: 2 }, vertices: [41, 42, 43, 49, 50, 51] },
  { location: { x: 0, y: -2, z: 2 }, vertices: [43, 44, 45, 51, 52, 53] },
];

const edgesData = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 4],
  [4, 5],
  [5, 6],
  [0, 8],
  [2, 10],
  [4, 12],
  [6, 14],
  [7, 8],
  [8, 9],
  [9, 10],
  [10, 11],
  [11, 12],
  [12, 13],
  [13, 14],
  [14, 15],
  [7, 17],
  [9, 19],
  [11, 21],
  [13, 23],
  [15, 25],
  [16, 17],
  [17, 18],
  [18, 19],
  [19, 20],
  [20, 21],
  [21, 22],
  [22, 23],
  [23, 24],
  [24, 25],
  [25, 26],
  [16, 27],
  [18, 29],
  [20, 31],
  [22, 33],
  [24, 35],
  [26, 37],
  [27, 28],
  [28, 29],
  [29, 30],
  [30, 31],
  [31, 32],
  [32, 33],
  [33, 34],
  [34, 35],
  [35, 36],
  [36, 37],
  [28, 38],
  [30, 40],
  [32, 42],
  [34, 44],
  [36, 46],
  [38, 39],
  [39, 40],
  [40, 41],
  [41, 42],
  [42, 43],
  [43, 44],
  [44, 45],
  [45, 46],
  [39, 47],
  [41, 49],
  [43, 51],
  [45, 53],
  [47, 48],
  [48, 49],
  [49, 50],
  [50, 51],
  [51, 52],
  [52, 53],
];

const mapVerticesNeighbors = new Map();
for(let i=0;i<54;i++)
  mapVerticesNeighbors.set(i,{neighborVertices:[],neighborHexs:[],neighborEdges:[]})

  edgesData.forEach((edge,i) => {
  mapVerticesNeighbors.get(edge[0]).neighborVertices.push(edge[1]);
  mapVerticesNeighbors.get(edge[1]).neighborVertices.push(edge[0]);
  
  mapVerticesNeighbors.get(edge[0]).neighborEdges.push(i);
  mapVerticesNeighbors.get(edge[1]).neighborEdges.push(i);
});

hexasData.forEach((hex,i) =>{
  hex.vertices.forEach(ver => {
    mapVerticesNeighbors.get(ver).neighborHexs.push(i);
  })
})


module.exports = { hexasData, edgesData,mapVerticesNeighbors};
