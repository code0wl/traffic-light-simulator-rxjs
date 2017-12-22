import {iIntersection} from "./model";
import Road from "../road/road";

export default class Intersection {
    readonly x: number;
    readonly y: number;
    readonly height: number;
    readonly width: number;
    readonly roadHorizontal: Road;
    readonly roadVertical: Road;

    constructor(private context: CanvasRenderingContext2D, attr: iIntersection) {
        this.x = attr.x;
        this.y = attr.y;
        this.width = attr.width;
        this.height = attr.height;
        this.roadVertical = attr.roadVertical;
        this.roadHorizontal = attr.roadHorizontal;
    }
}
