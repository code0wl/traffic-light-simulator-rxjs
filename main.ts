import Canvas from "./src/module/engine/canvas/canvas";
import {Display, iResolution} from "./src/module/engine/display/display";
import AnimationLoop from "./src/module/engine/animation/animation_engine";

class TrafficLightSimulator {
    public canvas: Canvas;
    public cars: number = 12;
    public lights: number = 12;
    private resolution: iResolution;

    constructor(public animationLoop: AnimationLoop) {
        this.resolution = Display();
        this.canvas = new Canvas(this.resolution.width, this.resolution.height);

        this.animationLoop.animationEngine$
            .subscribe(this.render)
    }

    private render() {
        console.log("rendering latest values")
    }
}

new TrafficLightSimulator(new AnimationLoop);