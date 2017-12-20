import Canvas from "../../engine/canvas/canvas";

export class TrafficLight {
    private graphic: HTMLElement;
    private width: number;
    private height: number;

    constructor(private canvas: Canvas, dimension: { height: number, width: number }) {
        this.width = dimension.width;
        this.height = dimension.height;
    }

    render() {
        console.log("rendering lights");
    }

}