import { SortStep } from "@/types/sorting";

export const quickSort = (arr: number[]) => {
  const steps: SortStep[] = [];
  const n = arr.length;
  const arrCopy = [...arr];

  // Add initial compare step
  steps.push({
    type: "compare",
    indices: [0, n],
    array: [...arrCopy],
  });

  const partition = (arr: number[], low: number, high: number): number => {
    const pivot = arr[high];
    let i = low - 1;
    for (let j = low; j < high; j++) {
      steps.push({
        type: "compare",
        indices: [j, high],
        array: [...arrCopy],
      });
      if (arr[j] < pivot) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
        steps.push({
          type: "swap",
          indices: [i, j],
          array: [...arrCopy],
        });
      }
    }

    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    steps.push({
      type: "swap",
      indices: [i + 1, high],
      array: [...arrCopy],
    });
    return i + 1;
  };

  const quickSortHelper = (arr: number[], low: number, high: number) => {
    if (low < high) {
      const pi: number = partition(arr, low, high);
      steps.push({
        type: "sorted",
        indices: [pi],
        array: [...arrCopy],
      });
      quickSortHelper(arr, low, pi - 1);
      quickSortHelper(arr, pi + 1, high);
    }
  };

  quickSortHelper(arrCopy, 0, n - 1);

  // Add final sorted step
  steps.push({
    type: "sorted",
    indices: Array.from({ length: arrCopy.length }, (_, i) => i),
    array: [...arrCopy],
  });

  return steps;
};
