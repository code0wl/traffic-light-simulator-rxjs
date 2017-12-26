import {Cars, Paths} from "../../store/store";
import Path from "../road/path";

export default class Car {
    readonly width: number;
    readonly height: number;
    readonly color: string;
    private path: Path;

    constructor(private context: CanvasRenderingContext2D) {
        this.assignPath();
        this.color = "#8a0051";
        this.width = 40;
        this.height = 15;
        this.context.fillStyle = this.color;
        Cars.push(this);
    }

    assignPath() {
        this.path = Paths[Math.floor(Math.random() * Paths.length)];
    }

    render() {
        Cars.map((car, index) => {
            this.context.clearRect(10, index, this.width, this.height);
            this.context.fillRect(10, index, this.width, this.height);
        });
    }
}