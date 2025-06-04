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

interface AlgorithmExplanationProps {
  algorithm: string;
  type: "sorting" | "pathfinding";
}

import { getAlgorithmInfo as getPathfindingInfo } from "@/data/pathfinding-algorithms";
import { getAlgorithmInfo as getSortingInfo } from "@/data/sorting-algorithms";
import CodeDisplay from "./CodeDisplay";

export default function AlgorithmExplanation({
  algorithm,
  type,
}: AlgorithmExplanationProps) {
  const algorithmInfo =
    type === "sorting"
      ? (getSortingInfo(algorithm) as SortingAlgorithmInfo)
      : (getPathfindingInfo(algorithm) as PathfindingAlgorithmInfo);

  return (
    <div
      id="learn"
      className={`${type === "sorting" ? "mt-10" : "mt-4"} w-full px-4`}
    >
      <h2 className="text-2xl font-bold mb-4">Algorithm Details</h2>
      <div className="flex flex-col md:flex-row gap-4">
        {/* algorithms explanation */}
        <div className="md:w-1/2 flex flex-col gap-4">
          <h3 className="text-xl text-primary font-bold ">
            {algorithmInfo.name} Explanation
          </h3>
          <p className="">{algorithmInfo.description}</p>
          <h3 className="text-primary text-lg font-bold ">How it works</h3>
          <ol className="list-decimal pl-5">
            {algorithmInfo.howItWorks.map((text: string, index: number) => (
              <li key={index} className="mb-2">
                {text}
              </li>
            ))}
          </ol>
          <h3 className="text-primary text-lg font-bold ">
            Complexity Analysis
          </h3>
          <div className="w-full">
            <div className="w-full grid grid-cols-2 gap-4 bg-primary-light/50 rounded-sm p-4">
              <div>
                <h3 className="text-primary font-bold">Time Complexity</h3>
                <p>{algorithmInfo.timeComplexity}</p>
              </div>
              <div>
                <h3 className="text-primary font-bold">Space Complexity</h3>
                <p>{algorithmInfo.spaceComplexity}</p>
              </div>
              {type === "sorting" ? (
                <>
                  <div>
                    <h3 className="text-primary font-bold">Stable</h3>
                    <p>
                      {(algorithmInfo as SortingAlgorithmInfo).stable
                        ? "Yes"
                        : "No"}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-primary font-bold">In-place</h3>
                    <p>{(algorithmInfo as SortingAlgorithmInfo).inPlace}</p>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <h3 className="text-primary font-bold">Guarantees</h3>
                    <p>
                      {(algorithmInfo as PathfindingAlgorithmInfo).guarantees}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-primary font-bold">Limitations</h3>
                    <ul className="list-disc pl-4">
                      {(
                        algorithmInfo as PathfindingAlgorithmInfo
                      ).limitations.map((text: string, index: number) => (
                        <li key={index} className="text-sm">
                          {text}
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              )}
            </div>
          </div>
          <h3 className="text-primary text-lg font-bold ">Best Use Cases</h3>
          <ul className="list-disc pl-4">
            {algorithmInfo.bestUseCases.map((text: string, index: number) => (
              <li key={index} className="mb-2">
                {text}
              </li>
            ))}
          </ul>
        </div>
        {/* algorithm code */}
        <div className="md:w-1/2">
          <CodeDisplay algorithm={algorithm} type={type} />
        </div>
      </div>
    </div>
  );
}
