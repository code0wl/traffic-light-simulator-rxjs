import { Cars, Paths } from "../../store/store";
import Path from "../road/path";
import { Roads } from "../road/model";
import { scan, map, takeWhile } from "rxjs/operators";
import { BehaviorSubject } from "rxjs";

export default class {
  readonly width: number;
  readonly height: number;
  public path: Path;
  public percent: number = 0;
  private startX: number;
  private endX: number;
  public positionX;
  public positionY;
  private endY: number;
  private graphic: HTMLImageElement;
  private wireFrame: boolean = false;
  private startY: number;
  private currentFrame$: BehaviorSubject<{
    percent: number;
    frame: boolean;
    complete?: boolean;
  }>;

  constructor(private context: CanvasRenderingContext2D, direction: string) {
    this.path =
      Paths[direction][Math.floor(Math.random() * Paths[direction].length)];
    this.startX = this.path.points[0].x;
    this.startY = this.path.points[0].y;
    this.endX = this.path.points[this.path.points.length - 1].x;
    this.endY = this.path.points[this.path.points.length - 1].y;
    this.width = 40;
    this.height = 15;
    this.initGraphic();
    this.currentFrame$ = new BehaviorSubject({
      percent: this.percent,
      frame: this.wireFrame,
      complete: false
    });
    this.initSubscriptions(direction);
    Cars[direction].push(this);
  }

  initGraphic() {
    this.graphic = new Image();
    this.graphic.src = `assets/images/${Math.floor(Math.random() * 9)}.png`;
    this.graphic.height = this.height;
    this.graphic.width = this.width;
  }

  initSubscriptions(direction: string) {
    this.currentFrame$
      .pipe(
        scan((_, next) => {
          const dx = this.endX - this.startX;
          const dy = this.endY - this.startY;
          const x = this.startX + dx * next.percent;
          const y = this.startY + dy * next.percent;

          this.positionY = y;
          this.positionX = x

          return {
            x,
            y,
            percent: next.percent,
            frame: Boolean(next.frame)
          };
        }),
        map(coors => {
          const d = direction === "vertical";
          if (coors.frame) {
            this.context.fillStyle = this.path.stroke;
            d
              ? this.setVerticalDirection(coors)
              : this.setHorizontalDirection(coors);
          } else {
            d
              ? this.setVerticalDirectionGraphic(coors)
              : this.setHorizontalDirectionGraphic(coors);
          }
          return coors;
        }),
        takeWhile(({ percent }) => percent <= 1)
      )
      .subscribe();
  }

  private setVerticalDirectionGraphic(coors) {
    const isNorthToSouth = this.path.type === Roads.northToSouth;
    const angle = isNorthToSouth ? -180 : 0;

    this.context.translate(coors.x, coors.y);
    this.context.rotate((angle * Math.PI) / 180);
    this.context.translate(-coors.x, -coors.y);
    this.context.drawImage(this.graphic, coors.x - 25, coors.y, 50, 40);
    this.context.setTransform(1, 0, 0, 1, 0, 0);
  }

  private setHorizontalDirectionGraphic(coors) {
    const isEastToWest = this.path.type === Roads.eastToWest;
    const angle = isEastToWest ? -90 : 90;
    const offset = isEastToWest ? 25 : -25;
    this.context.translate(coors.x, coors.y + offset);
    this.context.rotate((angle * Math.PI) / 180);
    this.context.translate(-coors.x, -coors.y + offset);
    this.context.drawImage(this.graphic, coors.x, coors.y, 50, 50);
    this.context.setTransform(1, 0, 0, 1, 0, 0);
  }

  private setVerticalDirection(coors) {
    this.context.fillRect(
      coors.x - this.height / 2,
      coors.y,
      this.height,
      this.width
    );
  }

  private setHorizontalDirection(coors) {
    this.context.fillRect(
      coors.x,
      coors.y - this.height / 2,
      this.width,
      this.height
    );
  }

  public render(speed, frame) {
    this.currentFrame$.next({
      percent: this.percent += speed,
      frame
    });
  }
}
