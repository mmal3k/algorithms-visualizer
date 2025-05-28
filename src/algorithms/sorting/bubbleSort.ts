import { SortStep } from "@/types/sorting";

export const bubbleSort = (arr: number[]) => {
  const n = arr.length;
  const steps: SortStep[] = [];
  const arrCopy = [...arr];

  steps.push({
    type: "compare",
    indices: [0, n],
    array: [...arrCopy],
  });

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      steps.push({
        type: "compare",
        indices: [j, j + 1],
        array: [...arrCopy],
      });
      if (arrCopy[j] > arrCopy[j + 1]) {
        [arrCopy[j], arrCopy[j + 1]] = [arrCopy[j + 1], arrCopy[j]];
        steps.push({
          type: "swap",
          indices: [j, j + 1],
          array: [...arrCopy],
        });
      }
    }
    steps.push({
      type: "sorted",
      indices: [n - i - 1],
      array: [...arrCopy],
    });
  }

  return steps;
};
