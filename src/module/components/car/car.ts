import {Cars, Paths} from "../../store/store";
import * as Rx from "rxjs";

export default class Car {
    readonly width: number;
    readonly height: number;
    readonly color: string;
    private path: any;
    private startX: number;
    private endX: number;
    private endY: number;
    private startY: number;
    private currentFrame: Rx.BehaviorSubject<{ x: number, y: number }>;

    constructor(private context: CanvasRenderingContext2D) {
        this.path = Paths[Math.floor(Math.random() * Paths.length)];
        this.startX = this.path.points[0].x;
        this.startY = this.path.points[0].y;
        this.endX = this.path.points[1].x;
        this.endY = this.path.points[1].y;
        this.color = "#8a0051";
        this.width = 40;
        this.height = 15;
        this.currentFrame = new Rx.BehaviorSubject({x: this.startX, y: this.startY});
        this.initSubscriptions();
        Cars.push(this);
    }

    initSubscriptions() {
        this.currentFrame
            .subscribe((coors) => {
                this.context.fillStyle = this.color;
                this.context.fillRect(coors.x, coors.y, this.width, this.height);
            });
    }

    render() {
        this.currentFrame
            .next({x: this.endX++, y: this.endY});
    }
}