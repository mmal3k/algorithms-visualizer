export interface PathfindingStep {
    type : "path" | "visit",
    position : [number, number]
}