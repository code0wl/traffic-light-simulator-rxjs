import Canvas from "./src/module/engine/canvas/canvas";
import {Display, iResolution} from "./src/module/engine/display/display";
import AnimationLoop from "./src/module/engine/animation/animation_engine";
import Road from "./src/module/components/road/road";
import Intersection from "./src/module/components/intersection/intersection";
import {Roads, Intersections} from "./src/module/store/store";

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
                this.IntersectionStream();
            });
    }

    // turn into stream
    private roadStream() {
        const hRoad = new Road(this.canvas.context, {
            x: 0,
            y: ((this.resolution.height / 2) - 40),
            width: this.resolution.width,
            height: 80,
            type: "horizontal"
        });

        const vRoad = new Road(this.canvas.context, {
            x: ((this.resolution.width / 2) - 40),
            width: 80,
            height: this.resolution.height,
            y: 0,
            type: "vertical"
        });

        Roads.push(vRoad, hRoad);
    }

    private IntersectionStream() {
        const intersection = new Intersection(this.canvas.context, {
            x: ((this.resolution.width / 2) - 40),
            width: 80,
            height: this.resolution.height,
            y: 0,
            type: "vertical"
        });

        Intersections.push(intersection);
    }

    private render() {
        this.canvas.paint();
    }
}

new TrafficLightSimulator(new AnimationLoop);