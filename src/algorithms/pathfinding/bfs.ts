import { NODE_WALL } from "@/constants/nodes";
import { PathfindingStep } from "@/types/pathfinding";
import { getNeighbors } from "./getNeighbors";

export const bfs = (
  grid: string[][],
  startNode: [number, number],
  endNode: [number, number],
  allowDiagonal: boolean
): PathfindingStep[] => {
  const steps: PathfindingStep[] = [];
  const rows = grid.length,
    cols = grid[0].length;

  const visited = Array(rows)
    .fill(0)
    .map(() => Array(cols).fill(false));

  const previous = Array(rows)
    .fill(0)
    .map(() => Array(cols).fill([-1, -1]));

  const queue: [number, number][] = [[startNode[0], startNode[1]]];
  visited[startNode[0]][startNode[1]] = true;

  while (queue.length > 0) {
    const [row, col] = queue.shift()!;

    steps.push({
      type: "visit",
      position: [row, col],
    });

    if (row === endNode[0] && col === endNode[1]) break;

    const neighbors = getNeighbors(grid, row, col, allowDiagonal);

    for (const [nr, nc] of neighbors) {
      if (!visited[nr][nc] && grid[nr][nc] !== NODE_WALL) {
        visited[nr][nc] = true;
        previous[nr][nc] = [row, col];
        queue.push([nr, nc]);
      }
    }
  }

  // Reconstruct path
  if (previous[endNode[0]][endNode[1]][0] !== -1) {
    let current: [number, number] = [endNode[0], endNode[1]];
    const path: [number, number][] = [];

    while (current[0] !== startNode[0] || current[1] !== startNode[1]) {
      path.unshift(current);
      current = previous[current[0]][current[1]];
    }
    path.unshift(startNode);

    for (const [row, col] of path) {
      steps.push({
        type: "path",
        position: [row, col],
      });
    }
  }

  return steps;
};
