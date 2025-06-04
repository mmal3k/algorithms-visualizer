export const getAlgorithmInfo = (pathfindingAlgorithm: string) => {
  const algorithms = {
    dijkstra: {
      name: "Dijkstra's Algorithm",
      description:
        "A weighted graph search algorithm that finds the shortest path between nodes by considering the cost of each edge. It guarantees the optimal path when all edge weights are non-negative.",
      timeComplexity: "O((V + E) log V)",
      spaceComplexity: "O(V)",
      guarantees: "Optimal path when all weights are non-negative",
      howItWorks: [
        "Initialize distances to all nodes as infinity except the start node (0)",
        "Use a priority queue to always process the node with the smallest distance",
        "For each node, update distances to its neighbors if a shorter path is found",
        "Continue until the target node is reached or all nodes are processed",
        "Reconstruct the path by backtracking from the target node",
      ],
      bestUseCases: [
        "Finding shortest paths in weighted graphs with non-negative weights",
        "Navigation systems and GPS applications",
        "Network routing protocols",
        "When optimality is required and all weights are non-negative",
      ],
      limitations: [
        "Cannot handle negative edge weights",
        "May be slower than A* for single-target searches",
        "Processes all nodes in the graph",
      ],
    },
    astar: {
      name: "A* Algorithm",
      description:
        "An informed search algorithm that uses a heuristic function to estimate the cost to reach the goal. It combines the advantages of Dijkstra's algorithm and greedy best-first search.",
      timeComplexity: "O(b^d) where b is branching factor and d is depth",
      spaceComplexity: "O(b^d)",
      guarantees: "Optimal path when heuristic is admissible",
      howItWorks: [
        "Use a priority queue ordered by f(n) = g(n) + h(n)",
        "g(n) is the cost from start to current node",
        "h(n) is the heuristic estimate to goal",
        "Process nodes with lowest f(n) first",
        "Update costs and paths when better routes are found",
        "Continue until target is reached or no more nodes to explore",
      ],
      bestUseCases: [
        "Pathfinding in games and robotics",
        "When you have a good heuristic estimate",
        "Single-target shortest path problems",
        "When optimality is desired with better performance than Dijkstra's",
      ],
      limitations: [
        "Requires a good heuristic function",
        "Memory usage can be high for large graphs",
        "May not be optimal with inadmissible heuristics",
      ],
    },
    bfs: {
      name: "Breadth-First Search",
      description:
        "An unweighted graph search algorithm that explores all nodes at the present depth before moving to nodes at the next depth level. It guarantees the shortest path in terms of number of edges.",
      timeComplexity: "O(V + E)",
      spaceComplexity: "O(V)",
      guarantees: "Shortest path in terms of number of edges",
      howItWorks: [
        "Start at the root node and explore all neighbors",
        "Use a queue to maintain the order of nodes to visit",
        "Mark nodes as visited to avoid cycles",
        "Continue level by level until target is found",
        "Reconstruct path using parent pointers",
      ],
      bestUseCases: [
        "Finding shortest path in unweighted graphs",
        "Web crawling and social network analysis",
        "GPS navigation systems (when distance is not a factor)",
        "When all edges have equal weight",
      ],
      limitations: [
        "Does not consider edge weights",
        "May explore many unnecessary nodes",
        "Not suitable for weighted graphs",
      ],
    },
    dfs: {
      name: "Depth-First Search",
      description:
        "An unweighted graph search algorithm that explores as far as possible along each branch before backtracking. It's memory efficient but doesn't guarantee the shortest path.",
      timeComplexity: "O(V + E)",
      spaceComplexity: "O(V)",
      guarantees: "None (does not guarantee shortest path)",
      howItWorks: [
        "Start at the root node and explore as far as possible",
        "Use a stack (or recursion) to maintain the path",
        "Backtrack when reaching a dead end",
        "Mark nodes as visited to avoid cycles",
        "Continue until target is found or all nodes are explored",
      ],
      bestUseCases: [
        "Maze solving and puzzle games",
        "Topological sorting",
        "Cycle detection in graphs",
        "When memory usage is a concern",
      ],
      limitations: [
        "Does not guarantee shortest path",
        "May get stuck in deep paths",
        "Not suitable for weighted graphs",
        "Can be inefficient for large graphs",
      ],
    },
  };
  return algorithms[pathfindingAlgorithm as keyof typeof algorithms];
};
