"use client";

import {
  bubbleSort,
  heapSort,
  mergeSort,
  quickSort,
} from "@/algorithms/sorting";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { SortStep } from "@/types/sorting";
import {
  ArrowLeft,
  HelpCircle,
  Pause,
  Play,
  RotateCcw,
  Settings,
  StepForward,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import { usePathname } from "next/navigation";

import AlgorithmExplanation from "@/components/learn/AlgorithmExplanation";

export default function SortingVisualizer() {
  const [array, setArray] = useState<number[]>([]);
  const [speed, setSpeed] = useState<number>(10);
  const [isSorting, setIsSorting] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [totalSteps, setTotalSteps] = useState(0);
  const [sortingAlgorithm, setSortingAlgorithm] = useState<string>("bubble");
  const [arraySize, setArraySize] = useState(20);
  const [comparingIndices, setComparingIndices] = useState<number[]>([]);
  const [swappingIndices, setSwappingIndices] = useState<number[]>([]);
  const [sortedIndices, setSortedIndices] = useState<number[]>([]);
  const speedRef = useRef(speed)

  const sortingStepsRef = useRef<SortStep[]>([]);
  const animationTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isPausedRef = useRef(isPaused);

  const pathname = usePathname();

  const generateRandomArray = () => {
    const newArray = [];
    for (let i = 0; i < arraySize; i++) {
      newArray.push(Math.floor(Math.random() * 95) + 5);
    }
    setArray(newArray);
    resetSortingState();
  };

  useEffect(() => {
    generateRandomArray();
  }, []);

  useEffect(() => {
    isPausedRef.current = isPaused;
  }, [isPaused]);

  useEffect(()=>{
    speedRef.current = speed
  },[speed])

  const startSorting = () => {
    resetSortingState();
    setIsSorting(true);
    let sortingSteps: SortStep[] = [];

    switch (sortingAlgorithm) {
      case "bubble":
        sortingSteps = bubbleSort([...array]);
        break;
      case "merge":
        sortingSteps = mergeSort([...array]);
        break;
      case "heap":
        sortingSteps = heapSort([...array]);
        break;
      case "quick":
        sortingSteps = quickSort([...array]);
        break;
      default:
        sortingSteps = bubbleSort([...array]);
    }

    sortingStepsRef.current = sortingSteps;
    setTotalSteps(sortingSteps.length);

    animateSort(0, sortingSteps);
  };

  const animateSort = (stepIndex: number, steps: SortStep[]) => {
    if (stepIndex >= steps.length) {
      setIsSorting(false);
      return;
    }
    setCurrentStep(stepIndex);

    const step = steps[stepIndex];
    setArray(step.array);

    if (step.type === "compare") {
      setComparingIndices(step.indices);
      setSwappingIndices([]);
    } else if (step.type === "swap") {
      setComparingIndices([]);
      setSwappingIndices(step.indices);
    } else if (step.type === "sorted") {
      setComparingIndices([]);
      setSwappingIndices([]);
      setSortedIndices((prev) => [...prev, ...step.indices]);
    }

    const delay = Math.max(5, 300 - speedRef.current * 3);
    if (!isPausedRef.current) {
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }
      animationTimeoutRef.current = setTimeout(() => {
        animateSort(stepIndex + 1, steps);
      }, delay);
    }
  };

  const togglePause = async () => {
    if (isPaused) {
      await setIsPaused(false);
      animateSort(currentStep + 1, sortingStepsRef.current);
    } else {
      await setIsPaused(true);
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }
    }
  };

  const stepForward = () => {
    if (currentStep + 1 >= totalSteps) return;

    if (animationTimeoutRef.current) {
      clearTimeout(animationTimeoutRef.current);
    }

    animateSort(currentStep + 1, sortingStepsRef.current);
  };

  const resetSortingState = () => {
    setIsPaused(false);
    setIsSorting(false);
    setCurrentStep(0);
    setTotalSteps(0);
    setComparingIndices([]);
    setSwappingIndices([]);
    setSortedIndices([]);
    if (animationTimeoutRef.current) {
      clearTimeout(animationTimeoutRef.current);
    }
    sortingStepsRef.current = [];
  };

  const getBarColor = (index: number) => {
    if (sortedIndices.includes(index)) {
      return "bg-gradient-to-t from-sort-sorted to-sort-sorted/80 shadow-lg";
    } else if (swappingIndices.includes(index)) {
      return "bg-gradient-to-t from-sort-swapping to-sort-swapping/80 shadow-lg";
    } else if (comparingIndices.includes(index)) {
      return "bg-gradient-to-t from-sort-comparing to-sort-comparing/80 shadow-lg";
    } else {
      return "bg-sort-default";
    }
  };

  return (
    <div className="relative flex flex-col items-center">
      <div className="w-full shadow-md py-2 mb-4">
        <div className="hidden relative md:flex flex-wrap items-center justify-between gap-4  backdrop-blur w-full px-4 sm:px-10 bg-ui-background/50 ">
          <Link
            className="bg-primary hover:bg-primary-hover h-10 w-10 flex items-center justify-center rounded-sm"
            href={"/"}
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </Link>
          <Button
            className="flex items-center h-10 w-full sm:w-auto bg-button-primary-bg text-button-primary-text px-4 rounded-md hover:bg-button-primary-hover"
            onClick={() => generateRandomArray()}
            disabled={isSorting && !isPaused}
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Generate New Array
          </Button>
          <Select
            value={sortingAlgorithm}
            onValueChange={setSortingAlgorithm}
            disabled={isSorting && !isPaused}
          >
            <SelectTrigger className="h-10 w-full sm:w-40 bg-ui-background border-ui-border">
              <SelectValue placeholder="Select algorithm" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem
                className="cursor-pointer hover:bg-primary-light"
                value="bubble"
              >
                Bubble Sort
              </SelectItem>
              <SelectItem
                className="cursor-pointer hover:bg-primary-light"
                value="merge"
              >
                Merge Sort
              </SelectItem>
              <SelectItem
                className="cursor-pointer hover:bg-primary-light"
                value="quick"
              >
                Quick Sort
              </SelectItem>
              <SelectItem
                className="cursor-pointer hover:bg-primary-light"
                value="heap"
              >
                Heap Sort
              </SelectItem>
            </SelectContent>
          </Select>

          {isSorting ? (
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={togglePause}
                className="bg-button-secondary-bg text-button-secondary-text hover:bg-button-secondary-hover h-10 border-ui-border"
              >
                {isPaused ? (
                  <Play className="h-4 w-4" />
                ) : (
                  <Pause className="h-4 w-4" />
                )}
              </Button>
              {isPaused && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={stepForward}
                  className="bg-button-success-bg text-button-success-text hover:bg-button-success-hover h-10 border-ui-border"
                >
                  <StepForward className="h-4 w-4" />
                </Button>
              )}
            </>
          ) : (
            <Button
              onClick={startSorting}
              className="bg-button-primary-bg text-button-primary-text hover:bg-button-primary-hover h-10"
            >
              <Play className="h-4 w-4 mr-2" />
              Start
            </Button>
          )}
          <div className="relative">
            <label className="absolute -top-4 left-1/2 -translate-x-1/2 text-primary font-bold text-sm text-center mb-2 whitespace-nowrap">
              Speed {speed}%
            </label>
            <Slider
              value={[speed]}
              min={1}
              max={100}
              step={1}
              onValueChange={(value) => setSpeed(value[0])}
              className="w-24 sm:w-30 top-2"
            />
          </div>
          <div className="relative">
            <label className="absolute -top-4 left-1/2 -translate-x-1/2 text-primary font-bold text-sm text-center mb-2 whitespace-nowrap">
              Size {array.length}
            </label>
            <Slider
              value={[array.length]}
              min={10}
              max={100}
              step={1}
              onValueChange={(value) => {
                setArraySize(value[0]);
                generateRandomArray();
              }}
              className="w-24 sm:w-30 top-2"
              disabled={isSorting && !isPaused}
            />
          </div>
          <Button
            variant="outline"
            size="sm"
            className="mr-4 sm:mr-10 bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100 h-10"
            asChild
          >
            <Link href={"#learn"}>
              <HelpCircle className="h-4 w-4" />
              Learn
            </Link>
          </Button>
          <div className="flex items-center mr-4 sm:mr-10">
            <Link
              href="/visualizer/sorting"
              className={`p-2 transition-colors text-sm ${
                pathname === "/visualizer/sorting"
                  ? "bg-primary hover:bg-primary-hover text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              Sorting
            </Link>
            <Link
              href="/visualizer/pathfinding"
              className={`p-2 transition-colors text-sm ${
                pathname === "/visualizer/pathfinding"
                  ? "bg-primary hover:bg-primary-hover text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              Pathfinding
            </Link>
          </div>
        </div>
        {/* mobile  */}
        <div className="flex items-center justify-between w-full md:hidden px-2">
          <div className="flex gap-2">
            <Link
              className="bg-primary hover:bg-primary-hover h-10 w-10 flex items-center justify-center rounded-sm"
              href={"/"}
            >
              <ArrowLeft className="w-5 h-5 text-white" />
            </Link>
            {isSorting ? (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={togglePause}
                  className="bg-button-secondary-bg text-button-secondary-text hover:bg-button-secondary-hover h-10 border-ui-border"
                >
                  {isPaused ? (
                    <Play className="h-4 w-4" />
                  ) : (
                    <Pause className="h-4 w-4" />
                  )}
                </Button>
                {isPaused && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={stepForward}
                    className="bg-button-success-bg text-button-success-text hover:bg-button-success-hover h-10 border-ui-border"
                  >
                    <StepForward className="h-4 w-4" />
                  </Button>
                )}
              </>
            ) : (
              <Button
                onClick={startSorting}
                className="bg-button-primary-bg text-button-primary-text hover:bg-button-primary-hover h-10"
              >
                <Play className="h-4 w-4 mr-2" />
                Start
              </Button>
            )}
          </div>
          <div className="flex gap-2">
            <div className="flex items-center">
              <Link
                href="/visualizer/sorting"
                className={`p-2 transition-colors text-sm rounded-l-md ${
                  pathname === "/visualizer/sorting"
                    ? "bg-primary hover:bg-primary-hover text-white"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
              >
                Sorting
              </Link>
              <Link
                href="/visualizer/pathfinding"
                className={`p-2 transition-colors text-sm  rounded-r-md ${
                  pathname === "/visualizer/pathfinding"
                    ? "bg-primary hover:bg-primary-hover text-white"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
              >
                Pathfinding
              </Link>
            </div>
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-ui-border text-ui-foreground hover:bg-ui-accent h-10"
                >
                  <Settings className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent className="bg-gradient-to-b from-ui-background to-ui-muted">
                <SheetHeader>
                  <SheetTitle className="text-ui-foreground">
                    Settings
                  </SheetTitle>
                  <SheetDescription>
                    Customize the visualization
                  </SheetDescription>
                </SheetHeader>
                <Button
                  className="mt-4 flex items-center h-10 w-full sm:w-auto bg-button-primary-bg text-button-primary-text px-4 rounded-md hover:bg-button-primary-hover"
                  onClick={() => generateRandomArray()}
                  disabled={isSorting && !isPaused}
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Generate New Array
                </Button>
                <Select
                  value={sortingAlgorithm}
                  onValueChange={setSortingAlgorithm}
                  disabled={isSorting && !isPaused}
                >
                  <SelectTrigger className="mt-4 h-10 w-full sm:w-40 bg-ui-background border-ui-border">
                    <SelectValue placeholder="Select algorithm" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem
                      className="cursor-pointer hover:bg-primary-light"
                      value="bubble"
                    >
                      Bubble Sort
                    </SelectItem>
                    <SelectItem
                      className="cursor-pointer hover:bg-primary-light"
                      value="merge"
                    >
                      Merge Sort
                    </SelectItem>
                    <SelectItem
                      className="cursor-pointer hover:bg-primary-light"
                      value="quick"
                    >
                      Quick Sort
                    </SelectItem>
                    <SelectItem
                      className="cursor-pointer hover:bg-primary-light"
                      value="heap"
                    >
                      Heap Sort
                    </SelectItem>
                  </SelectContent>
                </Select>
                <div className="space-y-6 mt-6">
                  <div>
                    <label className="text-sm font-medium mb-2 block text-ui-foreground">
                      Array Size
                    </label>
                    <Slider
                      value={[array.length]}
                      min={10}
                      max={100}
                      step={1}
                      onValueChange={(value) => {
                        setArraySize(value[0]);
                        generateRandomArray();
                      }}
                      disabled={isSorting && !isPaused}
                    />
                    <div className="text-center text-sm text-primary mt-1">
                      {array.length} elements
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block text-ui-foreground">
                      Animation Speed
                    </label>
                    <Slider
                      value={[speed]}
                      min={1}
                      max={100}
                      step={1}
                      onValueChange={(value) => setSpeed(value[0])}
                    />
                    <div className="text-center text-sm text-primary mt-1">
                      {speed}% speed
                    </div>
                  </div>

                  {isSorting && (
                    <div>
                      <label className="text-sm font-medium mb-2 block text-ui-foreground">
                        Progress
                      </label>
                      <div className="text-sm text-primary">
                        Step {currentStep} of {totalSteps}
                      </div>
                      <div className="w-full bg-ui-muted rounded-full h-2 mt-2">
                        <div
                          className="bg-primary h-2 rounded-full transition-all duration-300"
                          style={{
                            width: `${(currentStep / totalSteps) * 100}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      <div className="text-sm font-medium flex gap-2 md:gap-0 md:flex-col self-start ml-4">
        <div className="flex items-center gap-1 md:gap-4">
          <div className="w-3 h-3 rounded-sm bg-gradient-to-t from-sort-sorted to-sort-sorted/80"></div>
          Sorted
        </div>
        <div className="flex items-center gap-1 md:gap-4">
          <div className="w-3 h-3 rounded-sm bg-gradient-to-t from-sort-swapping to-sort-swapping/80 shadow-lg"></div>
          Swapping
        </div>
        <div className="flex items-center gap-1 md:gap-4">
          <div className="w-3 h-3 rounded-sm bg-gradient-to-t from-sort-comparing to-sort-comparing/80 shadow-lg"></div>
          Comparing
        </div>
      </div>
      {isSorting && (
        <div className="hidden md:flex absolute top-20 text-center font-bold right-4 text-sm gap-2 md:gap-0 md:flex-col self-end ml-4">
          <label className="text-sm  mb-2 block text-ui-foreground">
            Progress
          </label>
          <div className="text-sm text-primary">
            Step {currentStep} of {totalSteps}
          </div>
          <div className="w-full bg-ui-muted rounded-full h-2 mt-2">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{
                width: `${(currentStep / totalSteps) * 100}%`,
              }}
            ></div>
          </div>
        </div>
      )}
      <div className="flex items-end gap-1 h-[400px] w-full max-w-6xl mt-20 px-4 sm:px-0 mb-8">
        {array.map((value, index) => (
          <div
            key={index}
            className={`${getBarColor(
              index
            )} flex-1 rounded-t-sm transition-all duration-300 ease-in-out relative`}
            style={{
              height: `${value}%`,
            }}
          >
            <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 text-xs text-ui-foreground">
              {value}
            </div>
          </div>
        ))}
      </div>

      <AlgorithmExplanation algorithm={sortingAlgorithm} type="sorting" />
    </div>
  );
}
