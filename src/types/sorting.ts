export interface SortStep {
  type: "compare" | "swap" | "sorted";
  indices: number[];
  array: number[];
}
