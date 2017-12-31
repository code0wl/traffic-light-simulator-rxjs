import {Cars, Paths} from "../../store/store";
import * as Rx from "rxjs";
import Path from "../road/path";

export default class Car {
    readonly width: number;
    readonly height: number;
    public path: Path;
    public percent: number = 0;
    private startX: number;
    private endX: number;
    private endY: number;
    private graphic: HTMLImageElement;
    private wireFrame: boolean = false;
    private startY: number;
    private currentFrame: Rx.BehaviorSubject<{ percent: number, frame: boolean }>;

    constructor(private context: CanvasRenderingContext2D, direction) {
        this.path = Paths[direction][Math.floor(Math.random() * Paths[direction].length)];
        this.startX = this.path.points[0].x;
        this.startY = this.path.points[0].y;
        this.endX = this.path.points[this.path.points.length - 1].x;
        this.endY = this.path.points[this.path.points.length - 1].y;
        this.width = 40;
        this.height = 15;
        this.initGraphic();
        this.currentFrame = new Rx.BehaviorSubject({percent: this.percent, frame: this.wireFrame});
        this.initSubscriptions(direction);
        Cars[direction].push(this);
    }

    initGraphic() {
        this.graphic = new Image();
        this.graphic.src = `assets/images/${Math.floor(Math.random() * 9)}.png`;
        this.graphic.height = this.height;
        this.graphic.width = this.width;
    }

    initSubscriptions(direction) {
        this.currentFrame
            .scan((acc: any, next) => {
                const dx = this.endX - this.startX;
                const dy = this.endY - this.startY;
                const x = this.startX + dx * next.percent;
                const y = this.startY + dy * next.percent;
                return {x, y, percent: next.percent, frame: next.frame};
            })
            .map(coors => {
                if (coors.frame) {
                    this.context.fillStyle = this.path.stroke;
                    direction === "vertical" ? this.setVerticalDirection(coors) : this.setHorizontalDirection(coors);
                } else {
                    direction === "vertical" ? this.setVerticalDirectionGraphic(coors) : this.setHorizontalDirectionGraphic(coors);
                }
                return coors;
            })
            .takeWhile(x => x.percent <= 1)
            .subscribe();

    }

    private setVerticalDirectionGraphic(coors) {
        this.context.drawImage(this.graphic, coors.x - (49 / 2), coors.y, 50, 40);
    }

    private setHorizontalDirectionGraphic(coors) {
        this.context.translate(coors.x, coors.y - 25);
        this.context.rotate(90 * Math.PI / 180);
        this.context.translate(-coors.x, -coors.y);
        this.context.drawImage(this.graphic, coors.x, coors.y - 25, 50, 50);
        this.context.setTransform(1, 0, 0, 1, 0, 0);
    }

    private setVerticalDirection(coors) {
        this.context.fillRect(coors.x - (this.height / 2), coors.y, this.height, this.width);
    }

    private setHorizontalDirection(coors) {
        this.context.fillRect(coors.x, coors.y - (this.height / 2), this.width, this.height);
    }

    public render(speed, frame) {
        this.currentFrame.next({percent: this.percent += speed, frame});
    }
}