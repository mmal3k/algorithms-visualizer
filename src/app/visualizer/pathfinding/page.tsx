"use client";

import { Button } from "@/components/ui/button";
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
import { useEffect, useRef, useState } from "react";
const NODE_START = "start";
const NODE_END = "end";
const NODE_WALL = "wall";
const NODE_VISITED = "visited";
const NODE_PATH = "path";
const NODE_CURRENT = "current";

export default function PathfindingVisualizer() {
  const [grid, setGrid] = useState<string[][]>([]);
  const [algorithm, setAlgorithm] = useState<string>("dijkstra");
  const [gridSize, setGridSize] = useState<[number, number]>([
    25,
    Math.floor(25 * 1.6),
  ]);
  const [gridCols, setGridCols] = useState<number>(40);
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

  const animationTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const visualizationStepsRef = useRef<any[]>([]);
  const isMouseDownRef = useRef(false);
  const dragNodeRef = useRef<string | null>(null);

  const initialzeGrid = () => {
    const newGrid: string[][] = Array(gridSize[0])
      .fill(0)
      .map(() => Array(gridSize[1]).fill(""));

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

    setGrid(newGrid);
    resetVisualizationState();
  };

  const resetVisualizationState = () => {
    setCurrentStep(0);
    setTotalSteps(0);
    setIsPaused(false);
    if (animationTimeoutRef.current) {
      clearTimeout(animationTimeoutRef.current);
    }
    visualizationStepsRef.current = [];
  };

  useEffect(() => {
    initialzeGrid();
  }, [gridSize]);

  const clearWalls = () => {
    const newGrid = [...grid].map((row) => [...row]);

    const rows = newGrid.length;
    const cols = newGrid[0].length;
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        if (newGrid[i][j] === "wall") {
          newGrid[i][j] = "";
        }
      }
    }

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
        newGrid[row][col] == NODE_END;
        setEndNode([row, col]);
        setGrid(newGrid);
      }
      return;
    }
    if (isDrawing && grid[row][col] === "") {
      const newGrid = [...grid].map((row) => [...row]);
      newGrid[row][col] = NODE_WALL;
      setGrid(newGrid);
    } else if (isErasing && grid[row][col] === NODE_WALL) {
      const newGrid = [...grid].map((row) => [...row]);
      newGrid[row][col] = "";
      setGrid(newGrid);
    }
  };

  const handleMouseUp = () => {
    dragNodeRef.current = null;
    isMouseDownRef.current = false;
    setIsDrawing(false);
    setIsErasing(false);
  };

  const startAnimation = () => {
    setIsVisualizing(true);
  };

  const togglePause = () => {
    setIsPaused((prev) => !prev);
  };

  const stepForward = () => {};
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
          ? `bg-gradient-to-br from-purple-100 to-purple-200 shadow-sm`
          : "bg-white border border-gray-200 hover:bg-gray-50";
    }
  };

  return (
    <div>
      <div className="flex items-center gap-4 py-2 shadow-md backdrop-blur w-full mb-5 px-10 bg-ui-background/50">
        <Button className="h-10 w-40">
          <RotateCcw className="w-4 h-4 mr-2" />
          Clear path
        </Button>
        <Select value={algorithm} onValueChange={setAlgorithm}>
          <SelectTrigger className="h-10 w-44 bg-ui-background border-ui-border">
            <SelectValue placeholder={"Select algorithm"} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem
              className="cursor-pointer hover:bg-primary-light"
              value="dijkstra"
            >
              Dijkstra algorithm
            </SelectItem>
            <SelectItem
              className="cursor-pointer hover:bg-primary-light"
              value="a*"
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
          <Button className="h-10" onClick={startAnimation}>
            <Play className="h-4 w-4 mr-2" />
            Start
          </Button>
        )}
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant={"outline"}
              size={"sm"}
              className="border-ui-border text-ui-foreground hover:bg-ui-accent ml-auto h-10"
            >
              <Settings className="h-4 w-4" />
            </Button>
          </SheetTrigger>
          <SheetContent className="bg-gradient-to-b from-ui-background to-ui-muted">
            <SheetHeader>
              <SheetTitle className="text-ui-foreground">Settings</SheetTitle>
              <SheetDescription>Customize the visualization</SheetDescription>
            </SheetHeader>
            <div className="mt-6 space-y-6">
              <div>
                <label className="font-medium text-sm mb-2 block">
                  Grid size
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
                <div className="text-sm text-primary text-center font-medium mt-1 block">
                  {gridSize[0]} x {gridSize[1]}
                </div>
              </div>
              <div>
                <label className="font-medium text-sm mb-2 block">
                  Animation speed
                </label>
                <Slider
                  value={[speed]}
                  min={1}
                  max={100}
                  step={1}
                  onValueChange={(value) => setSpeed(value[0])}
                />
                <div className="text-sm text-primary text-center mt-1 font-medium block">
                  {speed}%
                </div>
              </div>
              <Button
                className="w-full bg-orange-50 hover:bg-orange-100 text-orange-700 border border-orange-200"
                onClick={clearWalls}
              >
                Clear Walls
              </Button>
              <Button className="w-full bg-green-50 hover:bg-green-100 border border-green-300 text-green-700">
                Reset Grid
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Main Visualzation area  */}
      <div className="flex-1 flex items-center justify-center ">
        <div
          className={`grid rounded-lg shadow-lg border border-blue-200`}
          style={{
            gridTemplateColumns: `repeat(${gridSize[1]}, minmax(0, 1fr))`,
            gridTemplateRows: `repeat(${gridSize[0]}, minmax(0, 1fr))`,
            width: `calc(${gridSize[1]} / ${gridSize[0]} * min(80vh, 80vw))`,
            height: `min(80vh, 80vw)`,
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
                )} border border-black-100`}
                onMouseDown={() => handleMouseDown(rowIndex, colIndex)}
                onMouseEnter={() => handleMouseEnter(rowIndex, colIndex)}
                onMouseUp={handleMouseUp}
              ></div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
