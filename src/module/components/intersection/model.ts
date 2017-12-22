import Road from "../road/road";

export interface iIntersection {
    x: number;
    y: number;
    width: number;
    height: number;
    roadVertical: Road;
    roadHorizontal: Road;
}