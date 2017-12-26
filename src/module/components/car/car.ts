import {Cars, Paths} from "../../store/store";
import {animatePath, x, y} from "../road/model";

export default class Car {
    readonly width: number;
    readonly height: number;
    readonly color: string;
    private path: any;

    constructor(private context: CanvasRenderingContext2D) {
        this.path = Paths[Math.floor(Math.random() * Paths.length)];
        this.color = "#8a0051";
        this.width = 40;
        this.height = 15;
        this.context.fillStyle = this.color;
        Cars.push(this);
    }

    render() {
        animatePath(this.path.points);
        this.context.fillStyle = this.color;
        this.context.fillRect(x, y, this.width, this.height);
    }
}