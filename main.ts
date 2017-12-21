import Canvas from "./src/module/engine/canvas/canvas";
import {Display, iResolution} from "./src/module/engine/display/display";
import AnimationLoop from "./src/module/engine/animation/animation_engine";
import Road from "./src/module/components/road/road";

class TrafficLightSimulator {
    public canvas: Canvas;
    private resolution: iResolution;

    constructor(public animationLoop: AnimationLoop) {
        this.resolution = Display();
        this.canvas = new Canvas(this.resolution.width, this.resolution.height);

        this.animationLoop
            .animationEngine$
            .subscribe(() => {
                this.render();
                this.roadStream();
            });
    }

    // turn into stream
    roadStream() {
        new Road(this.canvas.context, {
            x: 0,
            y: ((this.resolution.height / 2) - 40),
            width: this.resolution.width,
            height: 80,
            type: "horizontal"
        });

        new Road(this.canvas.context, {
            x: ((this.resolution.width / 2) - 40),
            width: 80,
            height: this.resolution.height,
            y: 0,
            type: "vertical"
        });
    }

    private render() {
        this.canvas.paint();
    }
}

new TrafficLightSimulator(new AnimationLoop);