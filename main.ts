import * as Rx from "rxjs";
import Canvas from "./src/module/engine/canvas/canvas";
import {Display, iResolution} from "./src/module/engine/display/display";
import AnimationLoop from "./src/module/engine/animation/animation_engine";
import Road from "./src/module/components/road/road";
import Intersection from "./src/module/components/intersection/intersection";
import Car from "./src/module/components/car/car";
import Path from "./src/module/components/road/path";
import TrafficLight from "./src/module/components/traffic_light/traffic_light";
import {Cars, Intersections, Paths, Roads, TrafficLights} from "./src/module/store/store";

class TrafficLightSimulator {
    private canvas: Canvas;
    private resolution: iResolution;
    private horizontalRoad: Road;
    private verticalRoad: Road;
    private totalCars: number = 100;
    private populateRate: number = 1000;
    private paths: any;

    constructor(public animationLoop: AnimationLoop) {
        this.resolution = Display();
        this.canvas = new Canvas(this.resolution.width, this.resolution.height);
        this.initialiseScene();
        this.initiateObservers();
    }

    private initialiseScene() {
        this.generateRoads();
        this.assignPaths();
        this.generateLights();
        this.generateIntersection();
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
            width: 42,
            height: 42,
            pavementColor: this.horizontalRoad.pavementColor,
            sideWalkColor: this.horizontalRoad.sideWalkColor
        });
    }

    generateLights() {
        new TrafficLight(this.canvas.context, {
            x: Display().width / 2 - 80,
            y: Display().height / 2 - 10,
        });

        new TrafficLight(this.canvas.context, {
            x: Display().width / 2 + 40,
            y: Display().height / 2 - 10,
        });

        new TrafficLight(this.canvas.context, {
            x: Display().width / 2 + 40,
            y: Display().height / 2 - 100,
        });

        new TrafficLight(this.canvas.context, {
            x: Display().width / 2 - 80,
            y: Display().height / 2 - 100,
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

        TrafficLights.map((light) => {
            light.render();
        });
    }
}

new TrafficLightSimulator(new AnimationLoop);