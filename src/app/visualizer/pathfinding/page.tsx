"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PathfindingStep } from "@/types/pathfinding";

import { aStar, bfs, dfs, dijkstra } from "@/algorithms/pathfinding";
import {
  ArrowLeft,
  HelpCircle,
  Pause,
  Play,
  Settings,
  StepForward,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

import {
  NODE_CURRENT,
  NODE_END,
  NODE_PATH,
  NODE_START,
  NODE_VISITED,
  NODE_WALL,
} from "@/constants/nodes";

import AlgorithmExplanation from "@/components/learn/AlgorithmExplanation";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import dynamic from "next/dynamic";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function PathfindingVisualizer() {
  const pathname = usePathname();
  const [grid, setGrid] = useState<string[][]>([]);
  const [algorithm, setAlgorithm] = useState<string>("dijkstra");
  const [gridSize, setGridSize] = useState<[number, number]>([
    25,
    Math.floor(25 * 1.6),
  ]);
  const [speed, setSpeed] = useState<number>(10);
  const [startNode, setStartNode] = useState<[number, number]>([2, 2]);
  const [endNode, setEndNode] = useState<[number, number]>([22, 22]);
  const [isPaused, setIsPaused] = useState(false);
  const [isVisualizing, setIsVisualizing] = useState(false);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [totalSteps, setTotalSteps] = useState<number>(0);
  const [showWeights, setShowWeights] = useState(false);
  const [weights, setWeights] = useState<number[][]>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isErasing, setIsErasing] = useState(false);
  const [allowDiagonal, setAllowDiagonal] = useState(false);

  const animationTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const visualizationStepsRef = useRef<PathfindingStep[]>([]);
  const isMouseDownRef = useRef(false);
  const dragNodeRef = useRef<string | null>(null);
  const isPausedRef = useRef(isPaused);
  const speedRef = useRef(speed);

  const initialzeGrid = () => {
    const newGrid: string[][] = Array(gridSize[0])
      .fill(0)
      .map(() => Array(gridSize[1]).fill(""));

    const newWeights: number[][] = Array(gridSize[0])
      .fill(0)
      .map(() => Array(gridSize[1]).fill(1));

    const newStartNode: [number, number] = [2, 2];

    const newEndNode: [number, number] = [gridSize[0] - 3, gridSize[1] - 3];

    newGrid[newStartNode[0]][newStartNode[1]] = NODE_START;
    newGrid[newEndNode[0]][newEndNode[1]] = NODE_END;

    setStartNode(newStartNode);
    setEndNode(newEndNode);

    // Add random walls

    if (gridSize[0] > 5) {
      for (let i = 0; i < gridSize[0] * 4; i++) {
        const row = Math.floor(Math.random() * gridSize[0]);
        const col = Math.floor(Math.random() * gridSize[1]);
        if (newGrid[row][col] === "") {
          newGrid[row][col] = NODE_WALL;
        }
      }
    }

    // add weights to the grid

    for (let i = 0; i < newGrid.length; i++) {
      for (let j = 0; j < newGrid[i].length; j++) {
        if (newGrid[i][j] == "") {
          newWeights[i][j] = Math.floor(Math.random() * 9 + 2);
        }
      }
    }

    setWeights(newWeights);
    setGrid(newGrid);
    resetVisualizationState();
  };

  const resetVisualizationState = () => {
    setCurrentStep(0);
    setTotalSteps(0);
    setIsPaused(false);
    setIsVisualizing(false);
    if (animationTimeoutRef.current) {
      clearTimeout(animationTimeoutRef.current);
    }
    visualizationStepsRef.current = [];
  };

  useEffect(() => {
    initialzeGrid();
  }, [gridSize]);

  useEffect(() => {
    isPausedRef.current = isPaused;
  }, [isPaused]);

  useEffect(() => {
    speedRef.current = speed;
  }, [speed]);

  const clearWalls = () => {
    const newGrid = [...grid].map((row) => [...row]);
    const newWeights = [...weights].map((row) => [...row]);

    // Only update cells that are walls
    newGrid.forEach((row, i) => {
      row.forEach((cell, j) => {
        if (cell === NODE_WALL) {
          newGrid[i][j] = "";
          newWeights[i][j] = Math.floor(Math.random() * 9 + 2);
        }
      });
    });

    setWeights(newWeights);
    setGrid(newGrid);
    resetVisualizationState();
  };

  const handleMouseDown = (row: number, col: number) => {
    isMouseDownRef.current = true;
    const newGrid = [...grid].map((row) => [...row]);

    if (newGrid[row][col] === NODE_START) {
      dragNodeRef.current = NODE_START;
    } else if (newGrid[row][col] === NODE_END) {
      dragNodeRef.current = NODE_END;
    } else if (newGrid[row][col] === NODE_WALL) {
      setIsErasing(true);
      newGrid[row][col] = "";
      setGrid(newGrid);
    } else {
      setIsDrawing(true);
      newGrid[row][col] = NODE_WALL;
      setGrid(newGrid);
    }
  };

  const handleMouseEnter = (row: number, col: number) => {
    if (!isMouseDownRef.current) return;

    if (dragNodeRef.current === NODE_START) {
      if (
        grid[row][col] === "" ||
        grid[row][col] === NODE_PATH ||
        grid[row][col] === NODE_VISITED
      ) {
        const newGrid = [...grid].map((row) => [...row]);
        newGrid[startNode[0]][startNode[1]] = "";
        newGrid[row][col] = NODE_START;
        setStartNode([row, col]);
        setGrid(newGrid);
      }
      return;
    }

    if (dragNodeRef.current === NODE_END) {
      if (
        grid[row][col] === "" ||
        grid[row][col] === NODE_PATH ||
        grid[row][col] === NODE_VISITED
      ) {
        const newGrid = [...grid].map((row) => [...row]);
        newGrid[endNode[0]][endNode[1]] = "";
        newGrid[row][col] = NODE_END;
        setEndNode([row, col]);
        setGrid(newGrid);
      }
      return;
    }
    if (isDrawing && grid[row][col] === "") {
      const newGrid = [...grid].map((row) => [...row]);
      newGrid[row][col] = NODE_WALL;
      setGrid(newGrid);
      return;
    } else if (isErasing && grid[row][col] === NODE_WALL) {
      const newGrid = [...grid].map((row) => [...row]);
      newGrid[row][col] = "";
      setGrid(newGrid);
      return;
    }
  };

  const handleMouseUp = () => {
    dragNodeRef.current = null;
    isMouseDownRef.current = false;
    setIsDrawing(false);
    setIsErasing(false);
  };

  const togglePause = async () => {
    if (isPaused) {
      await setIsPaused(false);
      animateVisualization(currentStep + 1, visualizationStepsRef.current);
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

    animateVisualization(currentStep + 1, visualizationStepsRef.current);
  };

  // Get node color based on its state
  const getNodeColor = (nodeType: string, row: number, col: number) => {
    switch (nodeType) {
      case NODE_START:
        return "bg-gradient-to-br from-green-400 to-green-600 shadow-lg border-2 border-green-300";
      case NODE_END:
        return "bg-gradient-to-br from-red-400 to-red-600 shadow-lg border-2 border-red-300";
      case NODE_WALL:
        return "bg-gradient-to-br from-gray-700 to-gray-900 shadow-md";
      case NODE_VISITED:
        return "bg-gradient-to-br from-blue-300 to-blue-500 shadow-sm";
      case NODE_PATH:
        return "bg-gradient-to-br from-orange-400 to-orange-600 shadow-lg";
      case NODE_CURRENT:
        return "bg-gradient-to-br from-purple-400 to-purple-600 shadow-lg";
      default:
        return showWeights && weights[row][col] > 1
          ? `bg-primary-light`
          : "bg-white border border-gray-200 hover:bg-gray-50";
    }
  };

  const startVisualization = () => {
    clearPath();

    setIsVisualizing(true);
    let steps: PathfindingStep[] = [];

    switch (algorithm) {
      case "dijkstra":
        steps = dijkstra(grid, startNode, endNode, weights, allowDiagonal);
        break;
      case "astar":
        steps = aStar(grid, startNode, endNode, weights, allowDiagonal);
        break;
      case "dfs":
        steps = dfs(grid, startNode, endNode, allowDiagonal);
        break;
      case "bfs":
        steps = bfs(grid, startNode, endNode, allowDiagonal);
        break;
      default:
        steps = dijkstra(grid, startNode, endNode, weights, allowDiagonal);
        break;
    }

    visualizationStepsRef.current = steps;
    setTotalSteps(steps.length);
    animateVisualization(0, steps);
  };

  const animateVisualization = (stepIdx: number, steps: PathfindingStep[]) => {
    if (stepIdx >= steps.length) {
      setIsVisualizing(false);
      return;
    }

    const step = steps[stepIdx];
    setCurrentStep(stepIdx);

    setGrid((prevGrid) => {
      const newGrid = prevGrid.map((r) => [...r]);
      const [r, c] = step.position;

      if (
        step.type === "visit" &&
        newGrid[r][c] !== NODE_START &&
        newGrid[r][c] !== NODE_END
      ) {
        newGrid[r][c] = NODE_VISITED;
      } else if (
        step.type === "path" &&
        newGrid[r][c] !== NODE_START &&
        newGrid[r][c] !== NODE_END
      ) {
        newGrid[r][c] = NODE_PATH;
      }

      return newGrid;
    });

    const delay = Math.max(5, 300 - speedRef.current * 3);

    if (!isPausedRef.current) {
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }
      animationTimeoutRef.current = setTimeout(() => {
        animateVisualization(stepIdx + 1, steps);
      }, delay);
    }
  };

  const clearPath = () => {
    setGrid((prevGrid) => {
      const newGrid = prevGrid.map((r) => [...r]);
      const rows = newGrid.length;
      const cols = newGrid[0].length;

      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          if (
            newGrid[i][j] === NODE_PATH ||
            newGrid[i][j] === NODE_VISITED ||
            newGrid[i][j] === NODE_CURRENT
          ) {
            newGrid[i][j] = "";
          }
        }
      }
      newGrid[startNode[0]][startNode[1]] = NODE_START;
      newGrid[endNode[0]][endNode[1]] = NODE_END;
      return newGrid;
    });
    resetVisualizationState();
  };
  return (
    <div>
      <div className="flex flex-wrap items-center gap-4 py-2 shadow-md backdrop-blur w-full px-2 bg-ui-background/50">
        {/* Mobile Controls */}
        <div className="flex items-center justify-between w-full md:hidden">
          <div className="flex items-center gap-2">
            <Link
              className="bg-primary hover:bg-primary-hover h-10 w-10 flex items-center justify-center rounded-sm"
              href={"/"}
            >
              <ArrowLeft className="w-5 h-5 text-white" />
            </Link>
            {isVisualizing ? (
              <>
                <Button
                  variant={"outline"}
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
              <Button className="h-10" onClick={startVisualization}>
                <Play className="h-4 w-4 mr-2" />
                Start
              </Button>
            )}
          </div>

          <div className="flex gap-4">
            <div className="flex items-center ">
              <Link
                href="/visualizer/sorting"
                className={`p-2 rounded-l-md transition-colors text-sm ${
                  pathname === "/visualizer/sorting"
                    ? "bg-primary hover:bg-primary-hover text-white"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
              >
                Sorting
              </Link>
              <Link
                href="/visualizer/pathfinding"
                className={`p-2 rounded-r-md transition-colors text-sm ${
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
                <Button variant="outline" size="sm" className="h-10">
                  <Settings className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent className="w-[300px] sm:w-[400px] bg-white">
                <SheetHeader>
                  <SheetTitle>Controls</SheetTitle>
                </SheetHeader>
                <div className="mt-6 space-y-6">
                  <Button className="h-10 w-full" onClick={clearPath}>
                    Clear path
                  </Button>
                  <div>
                    <label className="font-medium text-sm mb-2 block">
                      Algorithm
                    </label>
                    <Select value={algorithm} onValueChange={setAlgorithm}>
                      <SelectTrigger className="h-10 w-full bg-ui-background border-ui-border">
                        <SelectValue placeholder={"Select algorithm"} />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        <SelectItem
                          className="cursor-pointer hover:bg-primary-light"
                          value="dijkstra"
                        >
                          Dijkstra algorithm
                        </SelectItem>
                        <SelectItem
                          className="cursor-pointer hover:bg-primary-light"
                          value="astar"
                        >
                          A* algorithm
                        </SelectItem>
                        <SelectItem
                          className="cursor-pointer hover:bg-primary-light"
                          value="dfs"
                        >
                          Depth first Search
                        </SelectItem>
                        <SelectItem
                          className="cursor-pointer hover:bg-primary-light"
                          value="bfs"
                        >
                          Breadth first search
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="font-medium text-sm mb-2 block">
                      Grid Size
                    </label>
                    <Slider
                      value={[gridSize[0]]}
                      min={10}
                      max={40}
                      step={1}
                      onValueChange={(value) =>
                        setGridSize([value[0], Math.floor(value[0] * 1.6)])
                      }
                    />
                    <div className="text-sm text-primary text-center mt-1">
                      {gridSize[0]} x {gridSize[1]}
                    </div>
                  </div>

                  <div>
                    <label className="font-medium text-sm mb-2 block">
                      Speed
                    </label>
                    <Slider
                      value={[speed]}
                      min={1}
                      max={100}
                      step={1}
                      onValueChange={(value) => setSpeed(value[0])}
                    />
                    <div className="text-sm text-primary text-center mt-1">
                      {speed}%
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <Label>Allow Diagonal</Label>
                    <Switch
                      checked={allowDiagonal}
                      onCheckedChange={setAllowDiagonal}
                      className="data-[state=checked]:bg-primary data-[state=unchecked]:bg-gray-400"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label>Show Weights</Label>
                    <Switch
                      checked={showWeights}
                      onCheckedChange={setShowWeights}
                      className="data-[state=checked]:bg-primary data-[state=unchecked]:bg-gray-400"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <Button
                      className="w-full bg-orange-50 hover:bg-orange-100 text-orange-700 border border-orange-200"
                      onClick={clearWalls}
                    >
                      Clear Walls
                    </Button>
                    <Button
                      className="w-full bg-green-50 hover:bg-green-100 border border-green-300 text-green-700"
                      onClick={initialzeGrid}
                    >
                      Reset Grid
                    </Button>
                  </div>

                  {isVisualizing && (
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

        {/* Desktop Controls */}
        <div className="hidden md:flex flex-wrap items-center justify-between w-full gap-6">
          <Link
            className="bg-primary hover:bg-primary-hover h-10 w-10 flex items-center justify-center rounded-sm"
            href={"/"}
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </Link>
          <Button className="h-10 w-fit" onClick={clearPath}>
            Clear path
          </Button>
          <Select value={algorithm} onValueChange={setAlgorithm}>
            <SelectTrigger className="h-10 w-44 bg-ui-background border-ui-border">
              <SelectValue placeholder={"Select algorithm"} />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem
                className="cursor-pointer hover:bg-primary-light"
                value="dijkstra"
              >
                Dijkstra algorithm
              </SelectItem>
              <SelectItem
                className="cursor-pointer hover:bg-primary-light"
                value="astar"
              >
                A* algorithm
              </SelectItem>
              <SelectItem
                className="cursor-pointer hover:bg-primary-light"
                value="dfs"
              >
                Depth first Search
              </SelectItem>
              <SelectItem
                className="cursor-pointer hover:bg-primary-light"
                value="bfs"
              >
                Breadth first search
              </SelectItem>
            </SelectContent>
          </Select>

          {isVisualizing ? (
            <>
              <Button
                variant={"outline"}
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
            <Button className="h-10" onClick={startVisualization}>
              <Play className="h-4 w-4 mr-2" />
              Start
            </Button>
          )}

          <div className="relative">
            <label className="absolute -top-4 left-1/2 -translate-x-1/2 text-primary font-bold text-sm text-center mb-2 whitespace-nowrap">
              {/* Size {gridSize[0]} x {gridSize[1]} */}
              {`Size : ${gridSize[0]} x ${gridSize[1]}`}
            </label>
            <Slider
              value={[gridSize[0]]}
              min={10}
              max={40}
              step={1}
              className="w-24 sm:w-30 top-2"
              onValueChange={(value) =>
                setGridSize([value[0], Math.floor(value[0] * 1.6)])
              }
            />
          </div>

          <div className="relative">
            <label className="absolute -top-4 left-1/2 -translate-x-1/2 font-bold text-primary text-sm text-center mb-2 whitespace-nowrap">
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
          <div className="relative w-20 bg-black">
            <Label className="absolute -top-5 left-1/2 -translate-x-1/2 font-bold text-primary text-sm text-center mb-2 whitespace-nowrap">
              Allow Diagnol
            </Label>
            <Switch
              checked={allowDiagonal}
              onCheckedChange={setAllowDiagonal}
              className="absolute left-1/2 -translate-x-1/2 top-2/3   data-[state=checked]:bg-primary data-[state=unchecked]:bg-gray-400"
            ></Switch>
          </div>
          <div className="relative w-20">
            <Label className="absolute -top-5 left-1/2 -translate-x-1/2 font-bold text-primary text-sm text-center mb-2 whitespace-nowrap">
              Show Weights
            </Label>
            <Switch
              checked={showWeights}
              onCheckedChange={setShowWeights}
              className="absolute left-1/2 -translate-x-1/2 top-2/3   data-[state=checked]:bg-primary data-[state=unchecked]:bg-gray-400"
            ></Switch>
          </div>
          <Button
            className=" bg-orange-50 hover:bg-orange-100 text-orange-700 border border-orange-200"
            onClick={clearWalls}
          >
            Clear Walls
          </Button>
          <Button
            className=" bg-green-50 hover:bg-green-100 border border-green-300 text-green-700"
            onClick={initialzeGrid}
          >
            Reset Grid
          </Button>
          <Button
            variant="outline"
            size="sm"
            className=" bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100 h-10"
            asChild
          >
            <Link href={"#learn"}>
              <HelpCircle className="h-4 w-4" />
            </Link>
          </Button>
          <div className="flex items-center">
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
      </div>

      {/* Main Visualization area */}
      <div className="relative flex-1 flex items-center justify-center pt-10 px-4 sm:px-0">
        <div className="text-sm font-medium absolute flex lg:flex-col -top-4 lg:top-10 left-2 w-20 h-20 gap-2 lg:gap-0">
          <div className="flex items-center gap-1 lg:gap-4">
            <div className="w-3 h-3 rounded-sm bg-gradient-to-br from-green-400 to-green-600 shadow-lg border-2 border-green-300"></div>
            Start
          </div>
          <div className="flex items-center gap-1 lg:gap-4">
            <div className="w-3 h-3 rounded-sm bg-gradient-to-br from-red-400 to-red-600 shadow-lg border-2 border-red-300"></div>
            End
          </div>
          <div className="flex items-center gap-1 lg:gap-4">
            <div className="w-3 h-3 rounded-sm bg-gradient-to-br from-gray-700 to-gray-900 shadow-md"></div>
            Wall
          </div>
          <div className="flex items-center gap-1 lg:gap-4">
            <div className="w-3 h-3 rounded-sm bg-gradient-to-br from-blue-300 to-blue-500 shadow-sm"></div>
            Visited
          </div>
          <div className="flex items-center gap-1 lg:gap-4">
            <div className="w-3 h-3 rounded-sm bg-gradient-to-br from-orange-400 to-orange-600 shadow-lg"></div>
            Path
          </div>
        </div>
        {isVisualizing && (
          <div className="hidden md:block absolute -top-3 md:top-10 right-6 text-center font-bold">
            <label className="text-sm mb-1 block text-blue-700">Progress</label>
            <div className="text-sm text-blue-600">
              Step {currentStep} of {totalSteps}
            </div>
            <div className="w-full bg-blue-100 rounded-full h-2 mt-2">
              <div
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{
                  width: `${(currentStep / totalSteps) * 100}%`,
                }}
              ></div>
            </div>
          </div>
        )}
        <div
          className={`grid rounded-lg shadow-lg border border-blue-200`}
          style={{
            gridTemplateColumns: `repeat(${gridSize[1]}, minmax(0, 1fr))`,
            gridTemplateRows: `repeat(${gridSize[0]}, minmax(0, 1fr))`,
            width: `calc(${gridSize[1]} / ${gridSize[0]} * min(80vh, 80vw))`,
            height: `min(80vh, 80vw)`,
            maxWidth: "100%",
            maxHeight: "100%",
          }}
          onMouseLeave={handleMouseUp}
        >
          {grid.map((row, rowIndex) =>
            row.map((cell, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={`${getNodeColor(
                  cell,
                  rowIndex,
                  colIndex
                )} flex justify-center items-center text-sm border border-black-100 ${
                  rowIndex == 0 || rowIndex == grid.length - 1
                    ? "rounded-t-sm"
                    : ""
                } ${
                  colIndex == 0 || colIndex == grid[0].length - 1
                    ? "rounded-b-sm"
                    : ""
                }`}
                onMouseDown={() => handleMouseDown(rowIndex, colIndex)}
                onMouseEnter={() => handleMouseEnter(rowIndex, colIndex)}
                onMouseUp={handleMouseUp}
              >
                {showWeights &&
                  weights[rowIndex][colIndex] > 1 &&
                  grid[rowIndex][colIndex] === "" &&
                  weights[rowIndex][colIndex]}
              </div>
            ))
          )}
        </div>
      </div>
      <AlgorithmExplanation algorithm={algorithm} type="pathfinding" />
    </div>
  );
}
