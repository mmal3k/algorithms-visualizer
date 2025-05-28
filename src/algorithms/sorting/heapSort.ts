import { SortStep } from "@/types/sorting";

export const heapSort = (arr: number[]) => {
  const n = arr.length;
  const arrCopy = [...arr];
  const steps: SortStep[] = [];

  const heapify = (size: number, i: number) => {
    let parentIdx = i;
    const leftChildIdx = 2 * i + 1,
      rightChildIdx = 2 * i + 2;

    if (leftChildIdx < size) {
      steps.push({
        type: "compare",
        indices: [parentIdx, leftChildIdx],
        array: [...arrCopy],
      });
      if (arrCopy[parentIdx] < arrCopy[leftChildIdx]) {
        parentIdx = leftChildIdx;
      }
    }

    if (rightChildIdx < size) {
      steps.push({
        type: "compare",
        indices: [parentIdx, rightChildIdx],
        array: [...arrCopy],
      });
      if (arrCopy[parentIdx] < arrCopy[rightChildIdx]) {
        parentIdx = rightChildIdx;
      }
    }

    if (parentIdx !== i) {
      [arrCopy[i], arrCopy[parentIdx]] = [arrCopy[parentIdx], arrCopy[i]];
      steps.push({
        type: "swap",
        indices: [i, parentIdx],
        array: [...arrCopy],
      });
      heapify(size, parentIdx);
    }
  };

  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(n, i);
  }

  for (let i = n - 1; i >= 0; i--) {
    [arrCopy[0], arrCopy[i]] = [arrCopy[i], arrCopy[0]];
    steps.push({
      type: "swap",
      indices: [0, i],
      array: [...arrCopy],
    });
    steps.push({
      type: "sorted",
      indices: [i],
      array: [...arrCopy],
    });
    heapify(i, 0);
  }

  return steps;
};
