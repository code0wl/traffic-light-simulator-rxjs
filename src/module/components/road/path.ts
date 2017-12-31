import {allowedPaths} from "./model";
import {Paths} from "../../store/store";

export default class Path {

    private lineWidth: number = 2;
    public paths: Array<any>;
    public stroke: string;
    public type: number;
    public points: Array<{ x: number, y: number }>;

    constructor(private context: CanvasRenderingContext2D) {
        const paths = Object.keys(allowedPaths());
        this.paths = paths.map(p => {
            const path = Object.assign(allowedPaths()[p], this);
            Paths[path.direction].push(path);
        });
    }

    public render(path: Path, view: string) {
        this.context.beginPath();
        this.context.moveTo(path.points[0].x, path.points[0].y);
        for (let pt = 1; pt < path.points.length; pt++) {
            const point = path.points[pt];
            this.context.lineTo(point.x, point.y);
        }
        if (view) {
            this.context.strokeStyle = path.stroke;
            this.context.lineWidth = this.lineWidth;
            this.context.stroke();
        }
    }
}
