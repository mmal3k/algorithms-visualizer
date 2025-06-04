export const getAlgorithmInfo = (sortingAlgorithm: string) => {
  const algorithms = {
    bubble: {
      name: "Bubble Sort",
      description:
        "A simple comparison-based algorithm that repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order.",
      timeComplexity: "O(n²)",
      spaceComplexity: "O(1)",
      stable: true,
      howItWorks: [
        "Compare adjacent elements in the array",
        "Swap them if they are in the wrong order",
        "Continue through the array until no more swaps are needed",
        "The largest elements 'bubble' to the end with each pass",
      ],
      bestUseCases: [
        "Educational purposes and understanding basic sorting concepts",
        "Small data sets where simplicity is more important than efficiency",
        "When the list is already almost sorted (adaptive implementation)",
      ],
      inPlace: "Yes",
    },
    merge: {
      name: "Merge Sort",
      description:
        "An efficient, stable, divide-and-conquer algorithm that divides the array into halves, sorts them, and merges them back together.",
      timeComplexity: "O(n log n)",
      spaceComplexity: "O(n)",
      stable: true,
      howItWorks: [
        "Divide the array into two halves",
        "Recursively sort both halves",
        "Merge the sorted halves back together",
        "Continue until the entire array is sorted",
      ],
      bestUseCases: [
        "When stable sorting is needed (preserves order of equal elements)",
        "When consistent performance is required (always O(n log n))",
        "External sorting of large data sets that don't fit in memory",
      ],
      inPlace: "No",
    },
    quick: {
      name: "Quick Sort",
      description:
        "An efficient divide-and-conquer algorithm that selects a pivot element and partitions the array around it.",
      timeComplexity: "O(n log n) avg, O(n²) worst",
      spaceComplexity: "O(log n)",
      stable: false,
      howItWorks: [
        "Choose a pivot element from the array",
        "Partition elements: smaller to left, larger to right",
        "Recursively sort the sub-arrays",
        "Combine the results",
      ],
      bestUseCases: [
        "General-purpose sorting with excellent average-case performance",
        "When in-place sorting is required to save memory",
        "Internal sorting where average performance matters more than worst-case",
      ],
      inPlace: "Yes",
    },
    heap: {
      name: "Heap Sort",
      description:
        "A comparison-based algorithm that uses a binary heap data structure to sort elements.",
      timeComplexity: "O(n log n)",
      spaceComplexity: "O(1)",
      stable: false,
      howItWorks: [
        "Build a max heap from the input array",
        "Extract the maximum element (root) and place it at the end",
        "Restore the heap property",
        "Repeat until all elements are sorted",
      ],
      bestUseCases: [
        "When guaranteed O(n log n) performance is needed",
        "When memory usage is a concern (in-place algorithm)",
        "Priority queue implementations",
      ],
      inPlace: "Yes",
    },
  };
  return algorithms[sortingAlgorithm as keyof typeof algorithms];
};
