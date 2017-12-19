import Canvas from "./src/module/engine/canvas/canvas";
import {Display, iResolution} from "./src/module/engine/display/display";
import AnimationLoop from "./src/module/engine/animation/animation_engine";
import * as Rx from "rxjs";

class TrafficLightSimulator {
    public canvas: Canvas;
    public cars: number = 12;
    public lights: number = 12;
    public pause: HTMLButtonElement;
    private resolution: iResolution;

    constructor(public animationLoop: AnimationLoop) {
        this.resolution = Display();
        this.pause = document.querySelector(".pause");
        this.canvas = new Canvas(this.resolution.width, this.resolution.height);
        this.startSimulation();
    }

    private startSimulation() {
        this.animationLoop.animationEngine$
            .takeUntil(Rx.Observable.fromEvent(this.pause, "click"))
            .subscribe(this.render);
    }

    private render() {
        console.log("rendering latest values")
    }
}

new TrafficLightSimulator(new AnimationLoop);