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
import Control from "./src/module/components/control/control";
import "./main.css";

class TrafficLightSimulator {
    private canvas: Canvas;
    private resolution: iResolution;
    private horizontalRoad: Road;
    private verticalRoad: Road;
    private populateRate: number = 500;
    private path: Path;
    private intersection: Intersection;
    private trafficLightState: number = 0;
    public controls: Control;

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
        this.generateControls();
    }

    private generateControls() {
        this.controls = new Control();
    }

    private initiateObservers() {
        const horizontalLane$ = Rx.Observable
            .interval(this.populateRate)
            .map(() => this.carStream("horizontal"));

        const verticalLane$ = Rx.Observable
            .interval(this.populateRate)
            .map(() => this.carStream("vertical"));

        const trafficLights$ = Rx.Observable
            .interval(5000)
            .startWith(0)
            .scan(acc => acc ? 0 : 1);

        const traffic$ = Rx.Observable
            .merge(trafficLights$)
            .map(state => {
                this.trafficLightState = state;
                return state;
            })
            .switchMap(state => state ? horizontalLane$ : verticalLane$);

        this.animationLoop
            .animationEngine$
            .merge(traffic$)
            .subscribe(this.animate)
    }

    carStream = (direction: string) => {
        new Car(this.canvas.context, direction);
    };

    assignPaths() {
        this.path = new Path(this.canvas.context);
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
        this.intersection = new Intersection(this.canvas.context, {
            x: this.verticalRoad.attributes.x,
            y: this.horizontalRoad.attributes.y,
            width: 42,
            height: 42
        });
    }

    generateLights() {
        new TrafficLight(this.canvas.context, {
            type: "horizontal",
            x: Display().width / 2 - 80,
            y: Display().height / 2 - 10
        });

        new TrafficLight(this.canvas.context, {
            type: "vertical",
            x: Display().width / 2 - 30,
            y: Display().height / 2 - 80
        });

        new TrafficLight(this.canvas.context, {
            type: "vertical",
            x: Display().width / 2 - 10,
            y: Display().height / 2 + 40
        });

        new TrafficLight(this.canvas.context, {
            type: "horizontal",
            x: Display().width / 2 + 40,
            y: Display().height / 2 - 30
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

        Object.keys(Paths).map((directionPaths) => {
            Paths[directionPaths].map((path: Path) => {
                this.path.render(path, this.controls.wireframeView);
            });
        });

        Object.keys(Cars).map((directionPaths, index) => {
            Cars[directionPaths].map(car => {
                if (this.trafficLightState === index || car.percent >= .4) {
                    car.render(.004);
                } else {
                    // calc if car did not pass the intersection yet
                    car.render(0);
                }
            });
        });

        TrafficLights.map((light) => {
            light.render(this.trafficLightState);
        });
    }
}

new TrafficLightSimulator(new AnimationLoop);