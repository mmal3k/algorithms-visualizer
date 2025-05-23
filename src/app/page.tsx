"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { useState } from "react";
import PathfindingVisualizer from "./visualizer/pathfinding/page";
import SortingVisualizer from "./visualizer/sorting/page";

export default function Home() {
  const [activeTab, setActiveTab] = useState("sorting");
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-primary px-10">
        <div className="flex h-14 items-center justify-between">
          <div className="text-xl font-bold text-white">logo</div>
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-auto"
          >
            <TabsList className="grid w-full grid-cols-2 p-1 bg-white/20 border-white/30">
              <TabsTrigger
                value="sorting"
                className="text-sm px-1 text-white data-[state=active]:bg-white data-[state=active]:text-blue-600"
              >
                Sorting
              </TabsTrigger>
              <TabsTrigger
                value="pathfinding"
                className="text-sm px-1 text-white data-[state=active]:bg-white data-[state=active]:text-blue-600"
              >
                Pathfinding
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </header>
      <main className="">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
          <TabsContent value="sorting" className="mt-0 h-full">
            <SortingVisualizer />
          </TabsContent>
          <TabsContent value="pathfinding" className="mt-0 h-full">
            <PathfindingVisualizer />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
