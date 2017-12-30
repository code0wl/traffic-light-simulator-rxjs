import {iLight} from "./model";
import {TrafficLights} from "../../store/store";

export default class TrafficLight {
    readonly height: number;
    readonly width: number;
    public attributes: iLight;

    constructor(private context: CanvasRenderingContext2D, attr: iLight) {
        this.attributes = attr;
        this.height = 45;
        this.width = 3;
        TrafficLights.push(this);
    }

    public render() {
        this.context.fillStyle = "#978d5a";
        this.context.fillRect(this.attributes.x, this.attributes.y, this.width, this.height);
    }
}