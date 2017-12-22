import {iLight} from "./model";

export class TrafficLight {
    readonly height: number;
    readonly width: number;
    public attributes: iLight;

    constructor(private context: CanvasRenderingContext2D, attr: iLight) {
        this.height = 10;
        this.width = 10;
        this.attributes = attr;
        this.render(attr);
    }

    render(props) {
        this.context.fillStyle = "#FFFFFF";
        this.context.fillRect(props.x, props.y - 5, props.width, 5);
    }

}