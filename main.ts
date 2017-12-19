import Canvas from "./src/module/engine/canvas/canvas";
import {Display, iResolution} from "./src/module/engine/display/display";
import AnimationLoop from "./src/module/engine/canvas/animation_engine";
import * as Rx from "rxjs";


class TrafficLightSimulator {
    public canvas: Canvas;
    public cars: number;
    public lights: number;
    private resolution: iResolution;
    private animationLoop: AnimationLoop;

    constructor() {
        this.resolution = Display();
        this.canvas = new Canvas(this.resolution.width, this.resolution.height);
        this.animationLoop = new AnimationLoop(this.canvas);

        this.animationLoop.animationEngine$
            .subscribe(() => {
                console.log("animation engine");
            });
    }
}

new TrafficLightSimulator();