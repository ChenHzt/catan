// create a graph class
class UndirectedGraph {
    // defining vertex array and
    // adjacent list
    constructor(noOfVertices) {
        this.noOfVertices = noOfVertices;
        this.AdjList = new Map();
    }



    // add vertex to the graph
     addVertex(v) {
        // initialize the adjacent list with a
        // null array
        this.AdjList.set(v, []);
    }
    // addEdge(v, w)
    // printGraph()

    // bfs(v)
    // dfs(v)
}