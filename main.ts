import Canvas from "./src/module/engine/canvas/canvas";
import {Display, iResolution} from "./src/module/engine/display/display";
import AnimationLoop from "./src/module/engine/animation/animation_engine";
import Road from "./src/module/components/road/road";
import {Roads} from "./src/module/store/store";

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
            });

        this.roadStream();
    }

    roadStream() {
        // create road factory
        var road = new Road(this.canvas.context);
        road.x = 0;
        road.y = ((this.resolution.height / 2) - 40);
        road.width = this.resolution.width;
        road.height = 80;

        Roads.push(road);

        var road = new Road(this.canvas.context);
        road.x = 0;
        road.y = ((this.resolution.height / 2) - 40);
        road.width = 80;
        road.height = this.resolution.height;

        Roads.push(road);

        Roads.map(road => {
            road.render();
        })
    }

    private render() {
        this.roadStream();
        this.canvas.paint();
    }
}

new TrafficLightSimulator(new AnimationLoop);