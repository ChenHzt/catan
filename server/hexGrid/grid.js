/* eslint-disable no-plusplus */
/* eslint-disable max-classes-per-file */

class Vertix {
  constructor(id) {
    this.id = id;
    this.build = null;
    // this.edges = [];
    this.neighborVertices = [];
  }
}

class Edge {
  constructor(id, vertices) {
    this.id = id;
    this.road = null;
    vertices.forEach((vertix, i, arr) => {
      vertix.neighborVertices.push(arr[(i + 1) % 2]);
    });
  }
}

class Hex {
  constructor(id, vertices) {
    this.id = id;
    this.vertices = vertices;
  }
}

class HexGrid {
  constructor(hexCount, vertices, edges) {
    this.hexCount = hexCount;
    this.hexs = [];
    this.vertices = [];
    for (let i = 0; i < vertices.length * 6; i++) {
      this.vertices.push(new Vertix(i));
    }

    this.edges = edges.map(
      (edge, index) =>
        new Edge(index, [this.vertices[edge[0]], this.vertices[edge[1]]])
    );

    for (let i = 0; i < hexCount; i++) {
      const hexVertices = vertices[i].map(
        (vertixId) => this.vertices[vertixId]
      );
      this.hexs.push(new Hex(i, hexVertices));
    }
  }
}

const verticesw = [
  [0, 1, 2, 8, 9, 10],
  [2, 3, 4, 10, 11, 12],
  [4, 5, 6, 12, 13, 14],
  [7, 8, 9, 17, 18, 19],
  [9, 10, 11, 19, 20, 21],
  [11, 12, 13, 21, 22, 23],
  [13, 14, 15, 23, 24, 25],
  [16, 17, 18, 27, 28, 29],
  [18, 19, 20, 29, 30, 31],
  [20, 21, 22, 31, 32, 33],
  [22, 23, 24, 33, 34, 35],
  [24, 25, 26, 35, 36, 37],
  [28, 29, 30, 38, 39, 40],
  [30, 31, 32, 40, 41, 42],
  [32, 33, 34, 42, 43, 44],
  [34, 35, 36, 44, 45, 46],
  [39, 40, 41, 47, 48, 49],
  [41, 42, 43, 49, 50, 51],
  [43, 44, 45, 51, 52, 53],
];

const edgesw = [
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

const hexx = new HexGrid(19, verticesw, edgesw);
