interface CodeDisplayProps {
  algorithm: string;
}

type Language = "javascript" | "python" | "java" | "cpp" | "c";

import { getAlgorithmInfo } from "@/data/sorting-algorithms";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";

import { SortingCode } from "@/data/Code/SortingCode";
import { TabsContent } from "@radix-ui/react-tabs";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function CodeDisplay({ algorithm }: CodeDisplayProps) {
  const code = SortingCode(algorithm);
  console.log(code["python"]);
  return (
    <div className="w-full">
      <Tabs defaultValue="javascript">
        <div className="flex justify-around items-center mb-4">
          <h3 className="text-xl font-bold text-primary">
            {getAlgorithmInfo(algorithm).name} Implementation
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
        <div className="relative">
          {["javascript", "python", "java", "cpp", "c"].map((l) => (
            <TabsContent key={l} value={l} className="">
              <SyntaxHighlighter
                language={l}
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
                {code[l as Language]}
              </SyntaxHighlighter>
            </TabsContent>
          ))}
        </div>
      </Tabs>
    </div>
  );
}
