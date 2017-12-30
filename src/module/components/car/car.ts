import {Cars, Paths} from "../../store/store";
import * as Rx from "rxjs";
import Path from "../road/path";

export default class Car {
    readonly width: number;
    readonly height: number;
    readonly color: string;
    private path: Path;
    private startX: number;
    private endX: number;
    private endY: number;
    private startY: number;
    private percent: number = 0;
    private currentFrame: Rx.BehaviorSubject<{ percent: number }>;

    constructor(private context: CanvasRenderingContext2D) {
        this.path = Paths[Math.floor(Math.random() * Paths.length)];
        this.startX = this.path.points[0].x;
        this.startY = this.path.points[0].y;
        this.endX = this.path.points[this.path.points.length - 1].x;
        this.endY = this.path.points[this.path.points.length - 1].y;
        this.color = "#8a0051";
        this.width = 40;
        this.height = 15;
        this.currentFrame = new Rx.BehaviorSubject({percent: this.percent});
        this.initSubscriptions();
        Cars.push(this);
    }

    initSubscriptions() {
        this.currentFrame
            .scan((acc: any, next) => {
                const dx = this.endX - this.startX;
                const dy = this.endY - this.startY;
                const x = this.startX + dx * next.percent;
                const y = this.startY + dy * next.percent;
                return {x, y};
            })
            .subscribe((coors) => {
                this.context.fillStyle = this.color;
                if (this.path.type === "vertical") {
                    this.context.fillRect(coors.x - (this.height / 2), coors.y, this.height, this.width);
                } else {
                    this.context.fillRect(coors.x, coors.y - (this.height / 2), this.width, this.height);
                }
            });
    }

    render() {
        this.currentFrame
            .next({percent: this.percent += .003});
    }
}