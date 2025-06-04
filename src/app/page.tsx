"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRight, BarChart2, GitGraph } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [activeTab, setActiveTab] = useState("pathfinding");
  return (
    <div className="min-h-screen bg-gradient-to-br">
      <div className="py-12 px-4 md:px-6">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-primary mb-4">
            Algorithm Visualizer
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Interactive visualizations to help you understand how different
            algorithms work. Explore, learn, and see algorithms in action.
          </p>
        </header>

        <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
          <Card className="flex flex-col justify-between overflow-hidden border-2 border-blue-100 shadow-lg hover:shadow-xl transition-shadow">
            <div className="h-48 bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center">
              <BarChart2 className="h-24 w-24 text-white" />
            </div>
            <CardHeader>
              <CardTitle className="text-2xl text-blue-700">
                Sorting Algorithms
              </CardTitle>
              <CardDescription>
                Visualize how different sorting algorithms organize data
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Explore bubble sort, merge sort, quick sort, and heap sort
                through interactive visualizations. Compare their efficiency and
                understand their mechanics.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                  Bubble Sort
                </span>
                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                  Merge Sort
                </span>
                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                  Quick Sort
                </span>
                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                  Heap Sort
                </span>
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full bg-blue-600 hover:bg-blue-700">
                <Link href="/visualizer/sorting">
                  Explore Sorting Algorithms
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>

          <Card className="flex flex-col justify-between overflow-hidden border-2 border-blue-100 shadow-lg hover:shadow-xl transition-shadow">
            <div className="h-48 bg-gradient-to-r from-blue-400 to-blue-600  flex items-center justify-center">
              <GitGraph className="h-24 w-24 text-white" />
            </div>
            <CardHeader>
              <CardTitle className="text-2xl text-blue-700">
                Pathfinding Algorithms
              </CardTitle>
              <CardDescription>
                Visualize how different pathfinding algorithms find routes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Explore Dijkstra's algorithm, A* search, BFS, and DFS through
                interactive visualizations. See how they find paths in mazes and
                understand their differences.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                  Dijkstra's Algorithm
                </span>
                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                  A* Search
                </span>
                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                  Breadth-First Search
                </span>
                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                  Depth-First Search
                </span>
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full bg-blue-600 hover:bg-blue-700">
                <Link href="/visualizer/pathfinding">
                  Explore Pathfinding Algorithms
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Why Visualize Algorithms?
          </h2>
          <div className="max-w-3xl mx-auto grid gap-6 md:grid-cols-3">
            <div className="p-4 bg-white rounded-lg shadow">
              <h3 className="font-semibold text-lg mb-2 text-blue-700">
                Learn by Seeing
              </h3>
              <p className="text-gray-600">
                Visual representations help you understand complex algorithms
                more intuitively than code alone.
              </p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow">
              <h3 className="font-semibold text-lg mb-2 text-blue-700">
                Compare Efficiency
              </h3>
              <p className="text-gray-600">
                See firsthand how different algorithms perform on the same data,
                and understand their trade-offs.
              </p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow">
              <h3 className="font-semibold text-lg mb-2 text-blue-700">
                Interactive Learning
              </h3>
              <p className="text-gray-600">
                Adjust parameters and watch how algorithms adapt to different
                situations.
              </p>
            </div>
          </div>
        </div>

        <footer className="mt-16 text-center text-gray-500 text-sm">
          <p>
            Algorithm Visualizer - An interactive tool for learning algorithms
            through visualization
          </p>
        </footer>
      </div>
    </div>
  );
}
