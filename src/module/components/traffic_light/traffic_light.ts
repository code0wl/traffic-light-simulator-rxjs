import {iLight} from "./model";
import {TrafficLights} from "../../store/store";

export default class TrafficLight {
    readonly height: number;
    readonly width: number;
    public attributes: iLight;
    private type: string;

    constructor(private context: CanvasRenderingContext2D, attr: iLight) {
        this.attributes = attr;
        this.height = 45;
        this.width = 3;
        this.type = attr.type;
        TrafficLights.push(this);
    }

    public render(state) {
        let showLights;
        if (this.type === "horizontal") {
            showLights = state ? "green" : "red";
        } else {
            showLights = state ? "red" : "green";
        }
        this.context.beginPath();
        this.context.arc(this.attributes.x, this.attributes.y, 7, 0, 2 * Math.PI, false);
        this.context.fillStyle = showLights;
        this.context.fill();
    }
}