import Path from "./path";

export default class Car {
    readonly width: number;
    readonly height: number;
    readonly color: string;
    readonly path: Path;

    constructor(private context: CanvasRenderingContext2D) {
        this.color = "#8a0051";
        this.width = 40;
        this.height = 15;
        this.path = new Path(this.context);
        this.render();
    }

    getLineXYatPercent(startPt, endPt, percent) {
        const dx = endPt.x - startPt.x;
        const dy = endPt.y - startPt.y;
        const px = startPt.x + dx * percent;
        const py = startPt.y + dy * percent;
        return {px, py};
    }

    render() {
        console.log('rendering car');
        this.context.fillStyle = this.color;
        this.context.fillRect(0, 0, this.width, this.height);
    }
}