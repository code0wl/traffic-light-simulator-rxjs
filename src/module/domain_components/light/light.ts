import Canvas from "../../engine/canvas/canvas";
import ComponentLifeCycle from "../../engine/component_lifecycle/component_lifecycle";

export class TrafficLight extends ComponentLifeCycle {
    private graphic: HTMLElement;
    private width: number;
    private height: number;

    constructor(private canvas: Canvas, dimension: { height: number, width: number }) {
        super();
        this.width = dimension.width;
        this.height = dimension.height;
    }

    render() {
        console.log('rendering lights');
    }

}