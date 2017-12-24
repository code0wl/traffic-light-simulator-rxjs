import Canvas from "./src/module/engine/canvas/canvas";
import {Display, iResolution} from "./src/module/engine/display/display";
import AnimationLoop from "./src/module/engine/animation/animation_engine";
import Road from "./src/module/components/road/road";
import Intersection from "./src/module/components/intersection/intersection";
import Car from "./src/module/components/car/car";
import {Cars} from "./src/module/store/store";

class TrafficLightSimulator {
    public canvas: Canvas;
    private resolution: iResolution;
    private horizontalRoad: Road;
    private verticalRoad: Road;
    private cars: Array<Car>;

    constructor(public animationLoop: AnimationLoop) {
        this.resolution = Display();
        this.canvas = new Canvas(this.resolution.width, this.resolution.height);
        this.cars = Cars;

        this.animationLoop
            .animationEngine$
            .map(() => this.render())
            .subscribe(() => {
                this.generateRoads();
                this.generateIntersection();
                this.carStream();
            });
    }


    carStream() {
        new Car(this.canvas.context, {
            id: 0,
            type: "horizontal"
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
            x: this.verticalRoad.attributes.x,
            y: this.horizontalRoad.attributes.y,
            width: this.verticalRoad.attributes.width,
            height: this.horizontalRoad.attributes.height,
            pavementColor: this.horizontalRoad.pavementColor,
            sideWalkColor: this.horizontalRoad.sideWalkColor
        });
    }

    private render() {
        this.canvas.paint();
    }
}

new TrafficLightSimulator(new AnimationLoop);