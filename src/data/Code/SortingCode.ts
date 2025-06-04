export const SortingCode = (algorithm: string) => {
  const codes = {
    bubble: {
      javascript: `function bubbleSort(arr) {
  const n = arr.length;
  let swapped;
  
  for (let i = 0; i < n; i++) {
    swapped = false;
    
    // Last i elements are already in place
    for (let j = 0; j < n - i - 1; j++) {
      // Compare adjacent elements
      if (arr[j] > arr[j + 1]) {
        // Swap them if they are in the wrong order
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swapped = true;
      }
    }
    
    // If no swapping occurred in this pass, array is sorted
    if (!swapped) break;
  }
  
  return arr;
}

// Example usage:
const array = [64, 34, 25, 12, 22, 11, 90];
console.log(bubbleSort([...array]));  // [11, 12, 22, 25, 34, 64, 90]`,
      python: `def bubble_sort(arr):
    n = len(arr)
    
    # Traverse through all array elements
    for i in range(n):
        swapped = False
        
        # Last i elements are already in place
        for j in range(0, n - i - 1):
            # Compare adjacent elements
            if arr[j] > arr[j + 1]:
                # Swap if current element is greater than next
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = True
        
        # If no swapping occurred in this pass, array is sorted
        if not swapped:
            break
    
    return arr

# Example usage:
array = [64, 34, 25, 12, 22, 11, 90]
print(bubble_sort(array.copy()))  # [11, 12, 22, 25, 34, 64, 90]`,
      java: `import java.util.Arrays;

public class BubbleSort {
    public static void bubbleSort(int[] arr) {
        int n = arr.length;
        boolean swapped;
        
        for (int i = 0; i < n; i++) {
            swapped = false;
            
            // Last i elements are already in place
            for (int j = 0; j < n - i - 1; j++) {
                // Compare adjacent elements
                if (arr[j] > arr[j + 1]) {
                    // Swap them if they are in the wrong order
                    int temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                    swapped = true;
                }
            }
            
            // If no swapping occurred in this pass, array is sorted
            if (!swapped) break;
        }
    }
    
    public static void main(String[] args) {
        int[] array = {64, 34, 25, 12, 22, 11, 90};
        bubbleSort(array);
        System.out.println(Arrays.toString(array));  // [11, 12, 22, 25, 34, 64, 90]
    }
}`,
      c: `#include <stdio.h>

void bubbleSort(int arr[], int n) {
    int i, j, temp;
    int swapped;
    
    for (i = 0; i < n; i++) {
        swapped = 0;
        
        // Last i elements are already in place
        for (j = 0; j < n - i - 1; j++) {
            // Compare adjacent elements
            if (arr[j] > arr[j + 1]) {
                // Swap them if they are in the wrong order
                temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
                swapped = 1;
            }
        }
        
        // If no swapping occurred in this pass, array is sorted
        if (swapped == 0)
            break;
    }
}

int main() {
    int array[] = {64, 34, 25, 12, 22, 11, 90};
    int n = sizeof(array) / sizeof(array[0]);
    
    bubbleSort(array, n);
    
    // Print sorted array
    printf("Sorted array: ");
    for (int i = 0; i < n; i++) {
        printf("%d ", array[i]);
    }
    // Output: 11 12 22 25 34 64 90
    
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>

void bubbleSort(std::vector<int>& arr) {
    int n = arr.size();
    bool swapped;
    
    for (int i = 0; i < n; i++) {
        swapped = false;
        
        // Last i elements are already in place
        for (int j = 0; j < n - i - 1; j++) {
            // Compare adjacent elements
            if (arr[j] > arr[j + 1]) {
                // Swap them if they are in the wrong order
                std::swap(arr[j], arr[j + 1]);
                swapped = true;
            }
        }
        
        // If no swapping occurred in this pass, array is sorted
        if (!swapped)
            break;
    }
}

int main() {
    std::vector<int> array = {64, 34, 25, 12, 22, 11, 90};
    bubbleSort(array);
    
    // Print sorted array
    for (int num : array) {
        std::cout << num << " ";
    }
    // Output: 11 12 22 25 34 64 90
    
    return 0;
}`,
    },
    merge: {
      javascript: `function mergeSort(arr) {
  // Base case: arrays with 0 or 1 element are already sorted
  if (arr.length <= 1) return arr;
  
  // Split the array into two halves
  const mid = Math.floor(arr.length / 2);
  const left = arr.slice(0, mid);
  const right = arr.slice(mid);
  
  // Recursively sort both halves
  return merge(
    mergeSort(left),
    mergeSort(right)
  );
}

function merge(left, right) {
  let result = [];
  let leftIndex = 0;
  let rightIndex = 0;
  
  // Compare elements from both arrays and add the smaller one to the result
  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] < right[rightIndex]) {
      result.push(left[leftIndex]);
      leftIndex++;
    } else {
      result.push(right[rightIndex]);
      rightIndex++;
    }
  }
  
  // Add remaining elements
  return result
    .concat(left.slice(leftIndex))
    .concat(right.slice(rightIndex));
}

// Example usage:
const array = [38, 27, 43, 3, 9, 82, 10];
console.log(mergeSort([...array]));  // [3, 9, 10, 27, 38, 43, 82]`,
      python: `def merge_sort(arr):
    # Base case: arrays with 0 or 1 element are already sorted
    if len(arr) <= 1:
        return arr
    
    # Split the array into two halves
    mid = len(arr) // 2
    left = arr[:mid]
    right = arr[mid:]
    
    # Recursively sort both halves
    left = merge_sort(left)
    right = merge_sort(right)
    
    # Merge the sorted halves
    return merge(left, right)

def merge(left, right):
    result = []
    left_idx, right_idx = 0, 0
    
    # Compare elements from both arrays and add the smaller one to the result
    while left_idx < len(left) and right_idx < len(right):
        if left[left_idx] < right[right_idx]:
            result.append(left[left_idx])
            left_idx += 1
        else:
            result.append(right[right_idx])
            right_idx += 1
    
    # Add remaining elements
    result.extend(left[left_idx:])
    result.extend(right[right_idx:])
    
    return result

# Example usage:
array = [38, 27, 43, 3, 9, 82, 10]
print(merge_sort(array))  # [3, 9, 10, 27, 38, 43, 82]`,
      java: `import java.util.Arrays;

public class MergeSort {
    public static void mergeSort(int[] arr, int left, int right) {
        if (left < right) {
            // Find the middle point
            int mid = left + (right - left) / 2;
            
            // Sort first and second halves
            mergeSort(arr, left, mid);
            mergeSort(arr, mid + 1, right);
            
            // Merge the sorted halves
            merge(arr, left, mid, right);
        }
    }
    
    public static void merge(int[] arr, int left, int mid, int right) {
        // Calculate sizes of two subarrays to be merged
        int n1 = mid - left + 1;
        int n2 = right - mid;
        
        // Create temp arrays
        int[] L = new int[n1];
        int[] R = new int[n2];
        
        // Copy data to temp arrays
        for (int i = 0; i < n1; ++i)
            L[i] = arr[left + i];
        for (int j = 0; j < n2; ++j)
            R[j] = arr[mid + 1 + j];
        
        // Merge the temp arrays
        int i = 0, j = 0;
        int k = left;
        while (i < n1 && j < n2) {
            if (L[i] <= R[j]) {
                arr[k] = L[i];
                i++;
            } else {
                arr[k] = R[j];
                j++;
            }
            k++;
        }
        
        // Copy remaining elements of L[] if any
        while (i < n1) {
            arr[k] = L[i];
            i++;
            k++;
        }
        
        // Copy remaining elements of R[] if any
        while (j < n2) {
            arr[k] = R[j];
            j++;
            k++;
        }
    }
    
    public static void main(String[] args) {
        int[] array = {38, 27, 43, 3, 9, 82, 10};
        mergeSort(array, 0, array.length - 1);
        System.out.println(Arrays.toString(array));  // [3, 9, 10, 27, 38, 43, 82]
    }
}`,
      cpp: `#include <iostream>
#include <vector>

void merge(std::vector<int>& arr, int left, int mid, int right) {
    int n1 = mid - left + 1;
    int n2 = right - mid;
    
    // Create temp arrays
    std::vector<int> L(n1), R(n2);
    
    // Copy data to temp arrays
    for (int i = 0; i < n1; i++)
        L[i] = arr[left + i];
    for (int j = 0; j < n2; j++)
        R[j] = arr[mid + 1 + j];
    
    // Merge the temp arrays back into arr[left..right]
    int i = 0, j = 0, k = left;
    
    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) {
            arr[k] = L[i];
            i++;
        } else {
            arr[k] = R[j];
            j++;
        }
        k++;
    }
    
    // Copy the remaining elements of L[], if there are any
    while (i < n1) {
        arr[k] = L[i];
        i++;
        k++;
    }
    
    // Copy the remaining elements of R[], if there are any
    while (j < n2) {
        arr[k] = R[j];
        j++;
        k++;
    }
}

void mergeSort(std::vector<int>& arr, int left, int right) {
    if (left < right) {
        // Find the middle point
        int mid = left + (right - left) / 2;
        
        // Sort first and second halves
        mergeSort(arr, left, mid);
        mergeSort(arr, mid + 1, right);
        
        // Merge the sorted halves
        merge(arr, left, mid, right);
    }
}

int main() {
    std::vector<int> array = {38, 27, 43, 3, 9, 82, 10};
    mergeSort(array, 0, array.size() - 1);
    
    // Print sorted array
    for (int num : array) {
        std::cout << num << " ";
    }
    // Output: 3 9 10 27 38 43 82
    
    return 0;
}`,
      c: `#include <stdio.h>
#include <stdlib.h>

void merge(int arr[], int left, int mid, int right) {
    int i, j, k;
    int n1 = mid - left + 1;
    int n2 = right - mid;
    
    // Create temp arrays
    int* L = (int*)malloc(n1 * sizeof(int));
    int* R = (int*)malloc(n2 * sizeof(int));
    
    // Copy data to temp arrays
    for (i = 0; i < n1; i++)
        L[i] = arr[left + i];
    for (j = 0; j < n2; j++)
        R[j] = arr[mid + 1 + j];
    
    // Merge the temp arrays back into arr[left..right]
    i = 0;
    j = 0;
    k = left;
    
    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) {
            arr[k] = L[i];
            i++;
        } else {
            arr[k] = R[j];
            j++;
        }
        k++;
    }
    
    // Copy the remaining elements of L[], if there are any
    while (i < n1) {
        arr[k] = L[i];
        i++;
        k++;
    }
    
    // Copy the remaining elements of R[], if there are any
    while (j < n2) {
        arr[k] = R[j];
        j++;
        k++;
    }
    
    free(L);
    free(R);
}

void mergeSort(int arr[], int left, int right) {
    if (left < right) {
        // Find the middle point
        int mid = left + (right - left) / 2;
        
        // Sort first and second halves
        mergeSort(arr, left, mid);
        mergeSort(arr, mid + 1, right);
        
        // Merge the sorted halves
        merge(arr, left, mid, right);
    }
}

int main() {
    int array[] = {38, 27, 43, 3, 9, 82, 10};
    int n = sizeof(array) / sizeof(array[0]);
    
    mergeSort(array, 0, n - 1);
    
    // Print sorted array
    printf("Sorted array: ");
    for (int i = 0; i < n; i++) {
        printf("%d ", array[i]);
    }
    // Output: 3 9 10 27 38 43 82
    
    return 0;
}`,
    },
    heap: {
      javascript: `function heapSort(arr) {
  const n = arr.length;
  
  // Build a max heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(arr, n, i);
  }
  
  // Extract elements from the heap one by one
  for (let i = n - 1; i > 0; i--) {
    // Move current root to the end
    [arr[0], arr[i]] = [arr[i], arr[0]];
    
    // Call heapify on the reduced heap
    heapify(arr, i, 0);
  }
  
  return arr;
}

function heapify(arr, n, i) {
  let largest = i;
  const left = 2 * i + 1;
  const right = 2 * i + 2;
  
  // Check if left child is larger than root
  if (left < n && arr[left] > arr[largest]) {
    largest = left;
  }
  
  // Check if right child is larger than largest so far
  if (right < n && arr[right] > arr[largest]) {
    largest = right;
  }
  
  // If largest is not the root
  if (largest !== i) {
    [arr[i], arr[largest]] = [arr[largest], arr[i]];
    
    // Recursively heapify the affected sub-tree
    heapify(arr, n, largest);
  }
}

// Example usage:
const array = [12, 11, 13, 5, 6, 7];
console.log(heapSort([...array]));  // [5, 6, 7, 11, 12, 13]`,
      python: `def heap_sort(arr):
    n = len(arr)
    
    # Build a max heap
    for i in range(n // 2 - 1, -1, -1):
        heapify(arr, n, i)
    
    # Extract elements from the heap one by one
    for i in range(n - 1, 0, -1):
        # Move current root to the end
        arr[0], arr[i] = arr[i], arr[0]
        
        # Call heapify on the reduced heap
        heapify(arr, i, 0)
    
    return arr

def heapify(arr, n, i):
    largest = i
    left = 2 * i + 1
    right = 2 * i + 2
    
    # Check if left child exists and is greater than root
    if left < n and arr[left] > arr[largest]:
        largest = left
    
    # Check if right child exists and is greater than largest so far
    if (right < n and arr[right] > arr[largest]):
        largest = right
    
    # If largest is not the root
    if largest != i:
        arr[i], arr[largest] = arr[largest], arr[i]
        
        # Recursively heapify the affected sub-tree
        heapify(arr, n, largest)

# Example usage:
array = [12, 11, 13, 5, 6, 7]
print(heap_sort(array.copy()))  # [5, 6, 7, 11, 12, 13]`,
      java: `import java.util.Arrays;

public class HeapSort {
    public static void heapSort(int[] arr) {
        int n = arr.length;
        
        // Build a max heap
        for (int i = n / 2 - 1; i >= 0; i--)
            heapify(arr, n, i);
        
        // Extract elements from the heap one by one
        for (int i = n - 1; i > 0; i--) {
            // Move current root to the end
            int temp = arr[0];
            arr[0] = arr[i];
            arr[i] = temp;
            
            // Call heapify on the reduced heap
            heapify(arr, i, 0);
        }
    }
    
    public static void heapify(int[] arr, int n, int i) {
        int largest = i;
        int left = 2 * i + 1;
        int right = 2 * i + 2;
        
        // Check if left child is larger than root
        if (left < n && arr[left] > arr[largest])
            largest = left;
        
        // Check if right child is larger than largest so far
        if (right < n && arr[right] > arr[largest])
            largest = right;
        
        // If largest is not the root
        if (largest != i) {
            int swap = arr[i];
            arr[i] = arr[largest];
            arr[largest] = swap;
            
            // Recursively heapify the affected sub-tree
            heapify(arr, n, largest);
        }
    }
    
    public static void main(String[] args) {
        int[] array = {12, 11, 13, 5, 6, 7};
        heapSort(array);
        System.out.println(Arrays.toString(array));  // [5, 6, 7, 11, 12, 13]
    }
}`,
      cpp: `#include <iostream>
#include <vector>

void heapify(std::vector<int>& arr, int n, int i) {
    int largest = i;
    int left = 2 * i + 1;
    int right = 2 * i + 2;
    
    // Check if left child is larger than root
    if (left < n && arr[left] > arr[largest])
        largest = left;
    
    // Check if right child is larger than largest so far
    if (right < n && arr[right] > arr[largest])
        largest = right;
    
    // If largest is not the root
    if (largest != i) {
        std::swap(arr[i], arr[largest]);
        
        // Recursively heapify the affected sub-tree
        heapify(arr, n, largest);
    }
}

void heapSort(std::vector<int>& arr) {
    int n = arr.size();
    
    // Build a max heap
    for (int i = n / 2 - 1; i >= 0; i--)
        heapify(arr, n, i);
    
    // Extract elements from the heap one by one
    for (int i = n - 1; i > 0; i--) {
        // Move current root to the end
        std::swap(arr[0], arr[i]);
        
        // Call heapify on the reduced heap
        heapify(arr, i, 0);
    }
}

int main() {
    std::vector<int> array = {12, 11, 13, 5, 6, 7};
    heapSort(array);
    
    // Print sorted array
    for (int num : array) {
        std::cout << num << " ";
    }
    // Output: 5 6 7 11 12 13
    
    return 0;
}`,
      c: `#include <stdio.h>

void swap(int* a, int* b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}

void heapify(int arr[], int n, int i) {
    int largest = i;
    int left = 2 * i + 1;
    int right = 2 * i + 2;
    
    // Check if left child is larger than root
    if (left < n && arr[left] > arr[largest])
        largest = left;
    
    // Check if right child is larger than largest so far
    if (right < n && arr[right] > arr[largest])
        largest = right;
    
    // If largest is not the root
    if (largest != i) {
        swap(&arr[i], &arr[largest]);
        
        // Recursively heapify the affected sub-tree
        heapify(arr, n, largest);
    }
}

void heapSort(int arr[], int n) {
    // Build a max heap
    for (int i = n / 2 - 1; i >= 0; i--)
        heapify(arr, n, i);
    
    // Extract elements from the heap one by one
    for (int i = n - 1; i > 0; i--) {
        // Move current root to the end
        swap(&arr[0], &arr[i]);
        
        // Call heapify on the reduced heap
        heapify(arr, i, 0);
    }
}

int main() {
    int array[] = {12, 11, 13, 5, 6, 7};
    int n = sizeof(array) / sizeof(array[0]);
    
    heapSort(array, n);
    
    // Print sorted array
    printf("Sorted array: ");
    for (int i = 0; i < n; i++) {
        printf("%d ", array[i]);
    }
    // Output: 5 6 7 11 12 13
    
    return 0;
}`,
    },
    quick: {
      javascript: `function quickSort(arr, low = 0, high = arr.length - 1) {
  if (low < high) {
    // Partition the array and get the pivot index
    const pivotIndex = partition(arr, low, high);
    
    // Recursively sort the sub-arrays
    quickSort(arr, low, pivotIndex - 1);
    quickSort(arr, pivotIndex + 1, high);
  }
  
  return arr;
}

function partition(arr, low, high) {
  // Choose the rightmost element as the pivot
  const pivot = arr[high];
  let i = low - 1;
  
  // Move all elements smaller than the pivot to the left
  for (let j = low; j < high; j++) {
    if (arr[j] <= pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  
  // Place the pivot in its correct position
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  
  return i + 1;
}

// Example usage:
const array = [10, 7, 8, 9, 1, 5];
console.log(quickSort([...array]));  // [1, 5, 7, 8, 9, 10]`,
      python: `def quick_sort(arr, low=0, high=None):
    if high is None:
        high = len(arr) - 1
    
    if low < high:
        # Partition the array and get the pivot index
        pivot_index = partition(arr, low, high)
        
        # Recursively sort the sub-arrays
        quick_sort(arr, low, pivot_index - 1)
        quick_sort(arr, pivot_index + 1, high)
    
    return arr

def partition(arr, low, high):
    # Choose the rightmost element as the pivot
    pivot = arr[high]
    i = low - 1
    
    # Move all elements smaller than the pivot to the left
    for j in range(low, high):
        if arr[j] <= pivot:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]
    
    # Place the pivot in its correct position
    arr[i + 1], arr[high] = arr[high], arr[i + 1]
    
    return i + 1

# Example usage:
array = [10, 7, 8, 9, 1, 5]
print(quick_sort(array.copy()))  # [1, 5, 7, 8, 9, 10]`,
      java: `import java.util.Arrays;

public class QuickSort {
    public static void quickSort(int[] arr, int low, int high) {
        if (low < high) {
            // Partition the array and get the pivot index
            int pivotIndex = partition(arr, low, high);
            
            // Recursively sort the sub-arrays
            quickSort(arr, low, pivotIndex - 1);
            quickSort(arr, pivotIndex + 1, high);
        }
    }
    
    public static int partition(int[] arr, int low, int high) {
        // Choose the rightmost element as the pivot
        int pivot = arr[high];
        int i = low - 1;
        
        // Move all elements smaller than the pivot to the left
        for (int j = low; j < high; j++) {
            if (arr[j] <= pivot) {
                i++;
                
                // Swap arr[i] and arr[j]
                int temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
        }
        
        // Place the pivot in its correct position
        int temp = arr[i + 1];
        arr[i + 1] = arr[high];
        arr[high] = temp;
        
        return i + 1;
    }
    
    public static void main(String[] args) {
        int[] array = {10, 7, 8, 9, 1, 5};
        quickSort(array, 0, array.length - 1);
        System.out.println(Arrays.toString(array));  // [1, 5, 7, 8, 9, 10]
    }
}`,
      cpp: `#include <iostream>
#include <vector>

int partition(std::vector<int>& arr, int low, int high) {
    // Choose the rightmost element as the pivot
    int pivot = arr[high];
    int i = low - 1;
    
    // Move all elements smaller than the pivot to the left
    for (int j = low; j < high; j++) {
        if (arr[j] <= pivot) {
            i++;
            std::swap(arr[i], arr[j]);
        }
    }
    
    // Place the pivot in its correct position
    std::swap(arr[i + 1], arr[high]);
    
    return i + 1;
}

void quickSort(std::vector<int>& arr, int low, int high) {
    if (low < high) {
        // Partition the array and get the pivot index
        int pivotIndex = partition(arr, low, high);
        
        // Recursively sort the sub-arrays
        quickSort(arr, low, pivotIndex - 1);
        quickSort(arr, pivotIndex + 1, high);
    }
}

int main() {
    std::vector<int> array = {10, 7, 8, 9, 1, 5};
    quickSort(array, 0, array.size() - 1);
    
    // Print sorted array
    for (int num : array) {
        std::cout << num << " ";
    }
    // Output: 1 5 7 8 9 10
    
    return 0;
}`,
      c: `#include <stdio.h>

void swap(int* a, int* b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}

int partition(int arr[], int low, int high) {
    // Choose the rightmost element as the pivot
    int pivot = arr[high];
    int i = low - 1;
    
    // Move all elements smaller than the pivot to the left
    for (int j = low; j < high; j++) {
        if (arr[j] <= pivot) {
            i++;
            swap(&arr[i], &arr[j]);
        }
    }
    
    // Place the pivot in its correct position
    swap(&arr[i + 1], &arr[high]);
    
    return i + 1;
}

void quickSort(int arr[], int low, int high) {
    if (low < high) {
        // Partition the array and get the pivot index
        int pivotIndex = partition(arr, low, high);
        
        // Recursively sort the sub-arrays
        quickSort(arr, low, pivotIndex - 1);
        quickSort(arr, pivotIndex + 1, high);
    }
}

int main() {
    int array[] = {10, 7, 8, 9, 1, 5};
    int n = sizeof(array) / sizeof(array[0]);
    
    quickSort(array, 0, n - 1);
    
    // Print sorted array
    printf("Sorted array: ");
    for (int i = 0; i < n; i++) {
        printf("%d ", array[i]);
    }
    // Output: 1 5 7 8 9 10
    
    return 0;
}`,
    },
  };
  return codes[algorithm as keyof typeof codes];
};
