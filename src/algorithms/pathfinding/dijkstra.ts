import { NODE_WALL } from "@/constants/nodes";
import { PathfindingStep } from "@/types/pathfinding";
import { getNeighbors } from "./getNeighbors";

export const dijkstra = (
  grid: string[][],
  startNode: [number, number],
  endNode: [number, number],
  weights: number[][],
  allowDiagnol: boolean
) => {
  const steps: PathfindingStep[] = [];
  const newGrid = [...grid].map((row) => [...row]);
  const visited: boolean[][] = Array(newGrid.length)
    .fill(0)
    .map(() => Array(newGrid[0].length).fill(false));

  const distances: number[][] = Array(newGrid.length)
    .fill(0)
    .map(() => Array(newGrid[0].length).fill(Number.POSITIVE_INFINITY));

  const previous: [number, number][][] = Array(newGrid.length)
    .fill(0)
    .map(() => Array(newGrid[0].length).fill([-1, -1]));

  distances[startNode[0]][startNode[1]] = 0;

  const unvisited: [number, number, number][] = [
    [startNode[0], startNode[1], 0],
  ];

  while (unvisited.length > 0) {
    unvisited.sort((a, b) => a[2] - b[2]);
    const [row, col, distance] = unvisited.shift()!;

    if (visited[row][col]) continue;
    visited[row][col] = true;

    steps.push({
      type: "visit",
      position: [row, col],
    });

    if (row == endNode[0] && col == endNode[1]) break;

    const neighbors = getNeighbors(grid, row, col, allowDiagnol);

    for (const [nRow, nCol] of neighbors) {
      if (!visited[nRow][nCol] && grid[nRow][nCol] !== NODE_WALL) {
        const newDistance = distance + weights[nRow][nCol];
        if (newDistance < distances[nRow][nCol]) {
          distances[nRow][nCol] = newDistance;
          previous[nRow][nCol] = [row, col];
          unvisited.push([nRow, nCol, newDistance]);
        }
      }
    }
  }

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
