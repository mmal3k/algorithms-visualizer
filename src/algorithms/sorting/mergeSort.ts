import { SortStep } from "@/types/sorting";

export const mergeSort = (arr: number[]): SortStep[] => {
  const steps: SortStep[] = [];
  const arrCopy = [...arr];

  const merge = (start: number, mid: number, end: number) => {
    steps.push({
      type: "compare",
      indices: [start, end],
      array: [...arrCopy],
    });

    const leftSize = mid - start + 1;
    const rightSize = end - mid;

    const leftArr = arrCopy.slice(start, mid + 1);
    const rightArr = arrCopy.slice(mid + 1, end + 1);

    let i = 0,
      j = 0,
      k = start;

    while (i < leftSize && j < rightSize) {
      steps.push({
        type: "compare",
        indices: [start + i, mid + 1 + j],
        array: [...arrCopy],
      });
      if (leftArr[i] <= rightArr[j]) {
        arrCopy[k] = leftArr[i];
        steps.push({
          type: "swap",
          indices: [k],
          array: [...arrCopy],
        });
        i += 1;
      } else {
        arrCopy[k] = rightArr[j];
        steps.push({
          type: "swap",
          indices: [k],
          array: [...arrCopy],
        });
        j += 1;
      }
      k += 1;
    }

    while (i < leftSize) {
      arrCopy[k] = leftArr[i];
      steps.push({
        type: "swap",
        indices: [k],
        array: [...arrCopy],
      });
      i += 1;
      k += 1;
    }

    while (j < rightSize) {
      arrCopy[k] = rightArr[j];
      steps.push({
        type: "swap",
        indices: [k],
        array: [...arrCopy],
      });
      j += 1;
      k += 1;
    }
  };

  const mergeSortHelper = (start: number, end: number) => {
    if (start < end) {
      const mid = Math.floor((start + end) / 2);

      mergeSortHelper(start, mid);
      mergeSortHelper(mid + 1, end);
      merge(start, mid, end);
    }
  };

  mergeSortHelper(0, arr.length - 1);

  steps.push({
    type: "sorted",
    indices: Array.from({ length: arrCopy.length }, (_, i) => i),
    array: [...arrCopy],
  });

  return steps;
};
