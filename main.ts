import Canvas from "./src/module/engine/canvas/canvas";
import {Display, iResolution} from "./src/module/engine/display/display";
import AnimationLoop from "./src/module/engine/animation/animation_engine";
import Road from "./src/module/components/road/road";
import Intersection from "./src/module/components/intersection/intersection";
import Car from "./src/module/components/car/car";
import {Cars, Intersections, Paths, Roads} from "./src/module/store/store";
import * as Rx from "rxjs";
import Path from "./src/module/components/road/path";

class TrafficLightSimulator {
    private canvas: Canvas;
    private resolution: iResolution;
    private horizontalRoad: Road;
    private verticalRoad: Road;
    private totalCars: number = 10;
    private populateRate: number = 500;
    private paths: any;

    constructor(public animationLoop: AnimationLoop) {
        this.resolution = Display();
        this.canvas = new Canvas(this.resolution.width, this.resolution.height);
        this.generateRoads();
        this.assignPaths();
        this.generateIntersection();
        this.initiateObservers();
    }

    initiateObservers() {
        const cars$ = Rx.Observable
            .interval(this.populateRate)
            .take(this.totalCars)
            .map(this.carStream);

        this.animationLoop
            .animationEngine$
            .merge(cars$)
            .subscribe(this.animate)
    }

    carStream = () => {
        new Car(this.canvas.context);
    };

    assignPaths() {
        this.paths = new Path(this.canvas.context);
    }

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
    }

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

    private animate = () => {
        this.canvas.render();

        Roads.map(road => {
            road.render();
        });

        Intersections.map((intersection) => {
            intersection.render();
        });

        Paths.map((path) => {
            this.paths.render(path);
        });

        Cars.map((car) => {
            car.render();
        });
    }
}

new TrafficLightSimulator(new AnimationLoop);