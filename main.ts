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
    private populateRate: number = 1000;
    private paths: any;
    private trafficLightState: number = 0;

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
            Paths[directionPaths].map((path) => {
                this.paths.render(path);
            });
        });

        Object.keys(Cars).map((directionPaths, index) => {
            if (index === this.trafficLightState) {
                Cars[directionPaths].map((car) => {
                    car.render(.004);
                });
            } else {
                Cars[directionPaths].map((car) => {
                    car.render(0);
                });
            }
        });

        TrafficLights.map((light) => {
            light.render(this.trafficLightState);
        });
    }
}

new TrafficLightSimulator(new AnimationLoop);