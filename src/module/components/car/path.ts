import * as Rx from "rxjs";
import {RegisterPaths} from "./model";
import {Cars} from "../../store/store";

export default class Path {

    private path: any = RegisterPaths();

    constructor(private context: CanvasRenderingContext2D) {

        const direction$ = Rx.Observable
            .of(Cars)
            .map((x) => x.length)
            .partition((x: number) => x % 2 === 0);

        const horizontal = direction$[0];
        const vertical = direction$[1];

        horizontal.subscribe(x => this.setHorizontalPath());
        vertical.subscribe(() => this.setVerticalPath());
    }

    setHorizontalPath() {
        this.draw(this.path.eastToWest);
        this.draw(this.path.eastToNorth);
        this.draw(this.path.eastToSouth);
    }

    setVerticalPath() {
        console.log('called vertical')
    }

    private draw(path) {
        this.context.save();
        this.context.beginPath();

        this.context.moveTo(path.points[0].x, path.points[0].y);

        for (let pt = 1; pt < path.points.length; pt++) {
            const point = path.points[pt];
            this.context.lineTo(point.x, point.y);
        }

        this.context.strokeStyle = path.stroke;
        this.context.lineWidth = path.lineWidth;

        this.context.stroke();
        this.context.restore();
    }
}