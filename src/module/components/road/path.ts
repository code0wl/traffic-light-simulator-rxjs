import {allowedPaths} from "./model";
import {Paths} from "../../store/store";

export default class Path {

    private lineWidth: number = 1;
    public paths: any;

    constructor(private context: CanvasRenderingContext2D) {
        const paths = Object.keys(allowedPaths());
        this.paths = paths.map(p => {
            const path = allowedPaths()[p];
            Paths.push(path);
        });
    }

    public render(path) {
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
