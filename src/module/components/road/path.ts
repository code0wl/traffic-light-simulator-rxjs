import {allowedPaths} from "./model";
import {Paths} from "../../store/store";

export default class Path {

    private lineWidth: number = 1;

    constructor(private context: CanvasRenderingContext2D) {
        const paths = Object.keys(allowedPaths());
        paths.map(path => {
            const p = allowedPaths()[path];
            Paths.push(p);
            this.draw(p);
        });
    }

    private draw(path) {
        this.context.beginPath();

        this.context.moveTo(path.points[0].x, path.points[0].y);

        for (let pt = 1; pt < path.points.length; pt++) {
            const point = path.points[pt];
            this.context.lineTo(point.x, point.y);
        }

        this.context.strokeStyle = path.stroke;
        this.context.lineWidth = this.lineWidth;

        this.context.stroke();
    }
}
