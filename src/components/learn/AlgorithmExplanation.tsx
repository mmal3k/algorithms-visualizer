interface AlgorithmExplanationProps {
  algorithm: string;
}

import { getAlgorithmInfo } from "@/data/sorting-algorithms";
import CodeDisplay from "./CodeDisplay";
export default function AlgorithmExplanation({
  algorithm,
}: AlgorithmExplanationProps) {
  return (
    <div id="learn" className="mt-20 w-full px-4">
      <h2 className="text-2xl font-bold mb-4">Algorithm Details</h2>
      <div className="flex gap-2">
        {/* algorithms explanation */}
        <div className="w-full flex flex-col gap-4">
          <h3 className="text-xl text-primary font-bold ">
            {getAlgorithmInfo(algorithm).name} Explanation
          </h3>
          <p className="">{getAlgorithmInfo(algorithm).description}</p>
          <h3 className="text-primary text-lg font-bold ">How it works</h3>
          <ol className="list-decimal pl-5">
            {getAlgorithmInfo(algorithm).howItWorks.map((text, index) => (
              <li key={index} className="mb-2">
                {text}
              </li>
            ))}
          </ol>
          <h3 className="text-primary text-lg font-bold ">
            Complexity Analysis
          </h3>
          <div className="w-full pr-4">
            <div className="w-full grid grid-cols-2 gap-4 bg-primary-light/50 rounded-sm p-4">
              <div>
                <h3 className="text-primary font-bold">Time Complexity</h3>
                <p>{getAlgorithmInfo(algorithm).timeComplexity}</p>
              </div>
              <div>
                <h3 className="text-primary font-bold">Space Complexity</h3>
                <p>{getAlgorithmInfo(algorithm).spaceComplexity}</p>
              </div>
              <div>
                <h3 className="text-primary font-bold">Stable</h3>
                <p>{getAlgorithmInfo(algorithm).stable ? "Yes" : "No"}</p>
              </div>
              <div>
                <h3 className="text-primary font-bold">In-place</h3>
                <p>{getAlgorithmInfo(algorithm).inPlace}</p>
              </div>
            </div>
          </div>
          <h3 className="text-primary text-lg font-bold ">Best Use Cases</h3>
          <ul className="list-disc pl-4">
            {getAlgorithmInfo(algorithm).bestUseCases.map((text, index) => (
              <li key={index} className="mb-2">
                {text}
              </li>
            ))}
          </ul>
        </div>
        {/* algorithm code */}

        <CodeDisplay algorithm={algorithm} />
      </div>
    </div>
  );
}
