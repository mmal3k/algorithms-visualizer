"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";
import { Pause, Play, RotateCcw, Settings, StepForward } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
export default function SortingVisualizer() {
  const [array, setArray] = useState<number[]>([]);
  const [speed, setSpeed] = useState<number>(10);
  const [isSorting, setIsSorting] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [totalSteps, setTotalSteps] = useState(0);
  const [sortingAlgorithm, setSortingAlgorithm] = useState<string>("bubble");
  const [arraySize, setArraySize] = useState(20);

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

  const togglePause = () => {
    setIsPaused(!isPaused);
  };

  const startSorting = () => {
    setIsSorting(true);
  };

  const stepForward = () => {};

  const resetSortingState = () => {
    setIsPaused(false);
    setIsSorting(false);
    setCurrentStep(0);
    setTotalSteps(0);
  };
  return (
    <div className="flex flex-col items-center gap-8 ">
      <div className="flex items-center gap-4 py-2 shadow-md backdrop-blur w-full mb-10 px-10">
        <Button
          className="flex items-center h-10 bg-blue-600 text-white px-4 rounded-md"
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
          <SelectTrigger className="h-10 w-40 bg-white border-blue-400">
            <SelectValue placeholder="Select algorithm" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem className="cursor-pointer" value="bubble">
              Bubble Sort
            </SelectItem>
            <SelectItem className="cursor-pointer" value="merge">
              Merge Sort
            </SelectItem>
            <SelectItem className="cursor-pointer" value="quick">
              Quick Sort
            </SelectItem>
            <SelectItem className="cursor-pointer" value="heap">
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
              className="bg-blue-50 h-10 border-blue-200 text-blue-700 hover:bg-blue-100"
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
                className="bg-green-50 h-10 border-green-200 text-green-700 hover:bg-green-100"
              >
                <StepForward className="h-4 w-4" />
              </Button>
            )}
          </>
        ) : (
          <Button
            onClick={startSorting}
            size="sm"
            className="bg-primary h-10 text-white text-sm"
          >
            <Play className="h-4 w-4 mr-2" />
            Start
          </Button>
        )}

        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className=" border-blue-200 text-blue-700 hover:bg-blue-100 ml-auto h-10"
            >
              <Settings className="h-4 w-4" />
            </Button>
          </SheetTrigger>
          <SheetContent className="bg-gradient-to-b from-white to-blue-50">
            <SheetHeader>
              <SheetTitle className="text-blue-800">Settings</SheetTitle>
              <SheetDescription>Customize the visualization</SheetDescription>
            </SheetHeader>
            <div className="space-y-6 mt-6">
              <div>
                <label className="text-sm font-medium mb-2 block text-blue-700">
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
                <div className="text-center text-sm text-blue-600 mt-1">
                  {array.length} elements
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block text-blue-700">
                  Animation Speed
                </label>
                <Slider
                  value={[speed]}
                  min={1}
                  max={100}
                  step={1}
                  onValueChange={(value) => setSpeed(value[0])}
                />
                <div className="text-center text-sm text-blue-600 mt-1">
                  {speed}% speed
                </div>
              </div>

              {isSorting && (
                <div>
                  <label className="text-sm font-medium mb-2 block text-blue-700">
                    Progress
                  </label>
                  <div className="text-sm text-blue-600">
                    Step {currentStep} of {totalSteps}
                  </div>
                  <div className="w-full bg-blue-100 rounded-full h-2 mt-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <div className="flex items-end gap-1 h-[400px] w-full max-w-6xl mt-20">
        {array.map((value, index) => (
          <div
            key={index}
            className={`flex-1 bg-primary rounded-t-sm transition-all duration-300 ease-in-out`}
            style={{
              height: `${value}%`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
