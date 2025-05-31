export const getNeighbors = (
  grid: string[][],
  row: number,
  col: number,
  allowDiagnol: boolean
): [number, number][] => {
  const neighbors: [number, number][] = [];
  const directions = [
    [1, 0],
    [0, 1],
    [-1, 0],
    [0, -1],
  ];

  if (allowDiagnol) {
    const diagnolDirections = [
      [1, 1],
      [-1, -1],
      [1, -1],
      [-1, 1],
    ];

    diagnolDirections.map((d) => directions.push(d));
  }

  for (const [dr, dc] of directions) {
    const nr = row + dr,
      nc = col + dc;
    if (nr < 0 || nr >= grid.length || nc < 0 || nc >= grid[0].length) continue;
    neighbors.push([nr, nc]);
  }
  return neighbors;
};
