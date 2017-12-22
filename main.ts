import Canvas from "./src/module/engine/canvas/canvas";
import {Display, iResolution} from "./src/module/engine/display/display";
import AnimationLoop from "./src/module/engine/animation/animation_engine";
import Road from "./src/module/components/road/road";
import Intersection from "./src/module/components/intersection/intersection";

class TrafficLightSimulator {
    public canvas: Canvas;
    private resolution: iResolution;
    private horizontalRoad: Road;
    private verticalRoad: Road;

    constructor(public animationLoop: AnimationLoop) {
        this.resolution = Display();
        this.canvas = new Canvas(this.resolution.width, this.resolution.height);

        this.animationLoop
            .animationEngine$
            .map(() => this.render())
            .subscribe(() => {
                this.generateRoads();
                this.generateIntersection()
            });
    }

    // turn into stream
    generateRoads() {
        this.horizontalRoad = new Road(this.canvas.context, {
            x: 0,
            y: ((this.resolution.height / 2) - 40),
            width: this.resolution.width,
            height: 80,
            type: "horizontal"
        });

        this.verticalRoad = new Road(this.canvas.context, {
            x: ((this.resolution.width / 2) - 40),
            width: 80,
            height: this.resolution.height,
            y: 0,
            type: "vertical"
        });
    };

    generateIntersection() {
        new Intersection(this.canvas.context, {
            x: this.horizontalRoad.attributes.x,
            y: this.verticalRoad.attributes.y,
            width: this.horizontalRoad.attributes.width,
            height: this.horizontalRoad.attributes.height,
            roadVertical: this.verticalRoad,
            roadHorizontal: this.horizontalRoad
        });
    }

    private render() {
        this.canvas.paint();
    }
}

new TrafficLightSimulator(new AnimationLoop);