import Canvas from "../../engine/canvas/canvas";

export default class Road {
    constructor(private canvas: Canvas, private context: CanvasRenderingContext2D) {
        console.log(this);
    }
}