interface CodeDisplayProps {
  algorithm: string;
  type: "sorting" | "pathfinding";
}
interface SortingAlgorithmInfo {
  name: string;
  description: string;
  timeComplexity: string;
  spaceComplexity: string;
  stable: boolean;
  howItWorks: string[];
  bestUseCases: string[];
  inPlace: string;
}

interface PathfindingAlgorithmInfo {
  name: string;
  description: string;
  timeComplexity: string;
  spaceComplexity: string;
  guarantees: string;
  howItWorks: string[];
  bestUseCases: string[];
  limitations: string[];
}

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PathfindingCode } from "@/data/Code/PathfindingCode";
import { SortingCode } from "@/data/Code/SortingCode";
import { getAlgorithmInfo as getPathfindingInfo } from "@/data/pathfinding-algorithms";
import { getAlgorithmInfo as getSortingInfo } from "@/data/sorting-algorithms";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function CodeDisplay({ algorithm, type }: CodeDisplayProps) {
  const code =
    type === "sorting" ? SortingCode(algorithm) : PathfindingCode(algorithm);

  const algorithmInfo =
    type === "sorting"
      ? (getSortingInfo(algorithm) as SortingAlgorithmInfo)
      : (getPathfindingInfo(algorithm) as PathfindingAlgorithmInfo);

  return (
    <div className="w-full">
      <Tabs defaultValue="javascript" className="w-full">
        <div className="flex justify-around items-center mb-4">
          <h3 className="text-xl font-bold text-primary">
            {algorithmInfo.name} Implementation
          </h3>
          <TabsList className="bg-primary-light/50 rounded-none">
            <TabsTrigger
              value="javascript"
              className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-none"
            >
              JavaScript
            </TabsTrigger>
            <TabsTrigger
              value="python"
              className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-none"
            >
              Python
            </TabsTrigger>
            <TabsTrigger
              value="java"
              className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-none"
            >
              Java
            </TabsTrigger>
            <TabsTrigger
              value="cpp"
              className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-none"
            >
              C++
            </TabsTrigger>
            <TabsTrigger
              value="c"
              className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-none"
            >
              C
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="javascript">
          <SyntaxHighlighter
            language="javascript"
            style={vscDarkPlus}
            showLineNumbers={true}
            wrapLines={true}
            customStyle={{
              margin: 0,
              borderRadius: "0.375rem",
              fontSize: "14px",
              lineHeight: "1.5",
            }}
          >
            {code.javascript}
          </SyntaxHighlighter>
        </TabsContent>
        <TabsContent value="python">
          <SyntaxHighlighter
            language="python"
            style={vscDarkPlus}
            showLineNumbers={true}
            wrapLines={true}
            customStyle={{
              margin: 0,
              borderRadius: "0.375rem",
              fontSize: "14px",
              lineHeight: "1.5",
            }}
          >
            {code.python}
          </SyntaxHighlighter>
        </TabsContent>
        <TabsContent value="java">
          <SyntaxHighlighter
            language="java"
            style={vscDarkPlus}
            showLineNumbers={true}
            wrapLines={true}
            customStyle={{
              margin: 0,
              borderRadius: "0.375rem",
              fontSize: "14px",
              lineHeight: "1.5",
            }}
          >
            {code.java}
          </SyntaxHighlighter>
        </TabsContent>
        <TabsContent value="cpp">
          <SyntaxHighlighter
            language="cpp"
            style={vscDarkPlus}
            showLineNumbers={true}
            wrapLines={true}
            customStyle={{
              margin: 0,
              borderRadius: "0.375rem",
              fontSize: "14px",
              lineHeight: "1.5",
            }}
          >
            {code.cpp}
          </SyntaxHighlighter>
        </TabsContent>
        <TabsContent value="c">
          <SyntaxHighlighter
            language="c"
            style={vscDarkPlus}
            showLineNumbers={true}
            wrapLines={true}
            customStyle={{
              margin: 0,
              borderRadius: "0.375rem",
              fontSize: "14px",
              lineHeight: "1.5",
            }}
          >
            {code.c}
          </SyntaxHighlighter>
        </TabsContent>
      </Tabs>
    </div>
  );
}
