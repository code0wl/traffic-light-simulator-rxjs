import * as Rx from "rxjs";
import {RegisterPaths} from "./model";

export default class Path {

    private path: any = RegisterPaths();

    constructor(private context: CanvasRenderingContext2D, type: string) {

        const vertical$ = Rx.Observable
            .of(type)
            .filter(x => x !== "vertical")
            .map(() => this.setVerticalPath());

        const horizontal$ = Rx.Observable
            .of(type)
            .filter(x => x !== "horizontal")
            .map(() => this.setHorizontalPath());

        Rx.Observable
            .merge(vertical$, horizontal$)
            .subscribe();

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

        // beginPath
        this.context.beginPath();

        // move to the beginning point of this path
        this.context.moveTo(path.points[0].x, path.points[0].y);

        // draw lines to each point on the path
        for (let pt = 1; pt < path.points.length; pt++) {
            const point = path.points[pt];
            this.context.lineTo(point.x, point.y);
        }

        // set the path styles (color & linewidth)
        this.context.strokeStyle = path.stroke;
        this.context.lineWidth = path.lineWidth;

        // stroke this path
        this.context.stroke();

    }
}