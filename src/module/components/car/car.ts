import Path from "./path";

export default class Car {
    readonly width: number;
    readonly height: number;
    readonly color: string;
    readonly path: Path;

    constructor(private context: CanvasRenderingContext2D, attributes: { type: string }) {
        this.color = "#8a0051";
        this.width = 40;
        this.height = 15;
        this.path = new Path(this.context, attributes.type);
        this.render()
    }

    render() {
        this.context.fillStyle = this.color;
        this.context.fillRect(window.innerWidth / 2, window.innerHeight / 2, this.width, this.height);
    }
}