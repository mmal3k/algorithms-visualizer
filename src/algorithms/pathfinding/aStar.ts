import { NODE_WALL } from "@/constants/nodes";
import { PathfindingStep } from "@/types/pathfinding";
import { getNeighbors } from "./getNeighbors";

export const aStar = (
  grid: string[][],
  startNode: [number, number],
  endNode: [number, number],
  weights: number[][],
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
  //distances
  const gScore: number[][] = Array(rows)
    .fill(0)
    .map(() => Array(cols).fill(Number.POSITIVE_INFINITY));
  //heuristic
  const fScore: number[][] = Array(rows)
    .fill(0)
    .map(() => Array(cols).fill(Number.POSITIVE_INFINITY));

  gScore[startNode[0]][startNode[1]] = 0;
  fScore[startNode[0]][startNode[1]] = heuristic(
    startNode[0],
    startNode[1],
    endNode,
    allowDiagonal
  );

  const openSet: [number, number, number][] = [
    [startNode[0], startNode[1], fScore[startNode[0]][startNode[1]]],
  ];

  while (openSet.length > 0) {
    openSet.sort((a, b) => a[2] - b[2]);

    const [row, col] = openSet.shift()!;

    if (visited[row][col]) continue;

    steps.push({
      type: "visit",
      position: [row, col],
    });

    if (row == endNode[0] && col == endNode[1]) break;

    const neighbors = getNeighbors(grid, row, col, allowDiagonal);

    for (const [nr, nc] of neighbors) {
      if (!visited[nr][nc] && grid[nr][nc] !== NODE_WALL) {
        const tentativeGScore = gScore[row][col] + weights[nr][nc];

        if (tentativeGScore < gScore[nr][nc]) {
          previous[nr][nc] = [row, col];
          gScore[nr][nc] = tentativeGScore;
          fScore[nr][nc] = heuristic(nr, nc, endNode, allowDiagonal);

          if (!openSet.some(([r, c]) => r === nr && c === nc)) {
            openSet.push([nr, nc, fScore[nr][nc]]);
          }
        }
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

    for (const [row, col] of path) {
      steps.push({
        type: "path",
        position: [row, col],
      });
    }
  }

  return steps;
};

const heuristic = (
  row: number,
  col: number,
  endNode: [number, number],
  allowDiagonal: boolean
): number => {
  const dx = Math.abs(row - endNode[0]);
  const dy = Math.abs(col - endNode[1]);
  return allowDiagonal ? Math.max(dx, dy) : dx + dy;
};
