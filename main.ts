import Canvas from "./src/module/engine/canvas/canvas";
import { Display, iResolution } from "./src/module/engine/display/display";
import AnimationLoop from "./src/module/engine/animation/animation_engine";
import Road from "./src/module/components/road/road";
import Intersection from "./src/module/components/intersection/intersection";
import Car from "./src/module/components/car/car";
import Path from "./src/module/components/road/path";
import TrafficLight from "./src/module/components/traffic_light/traffic_light";
import {
  Cars,
  Intersections,
  Paths,
  Roads,
  TrafficLights
} from "./src/module/store/store";
import Control from "./src/module/components/control/control";
import "./main.css";
import { interval } from "./node_modules/rxjs";
import {
  map,
  startWith,
  scan,
  switchMap,
  merge
} from "./node_modules/rxjs/operators";
// import { hasIntersect } from "./src/module/engine/collision/collision";

class TrafficLightSimulator {
  private canvas: Canvas;
  private resolution: iResolution;
  private horizontalRoad: Road;
  private verticalRoad: Road;
  private populateRateThrottle: number = 500;
  private path: Path;
  private intersection: Intersection;
  private trafficLightState: number = 0;
  public controls: Control;
  private cars;

  constructor(public animationLoop: AnimationLoop) {
    this.resolution = Display();
    this.cars = Cars;
    this.canvas = new Canvas(this.resolution.width, this.resolution.height);
    this.initialiseScene();
    this.initiateObservers();
  }

  private initialiseScene() {
    this.generateRoads();
    this.assignPaths();
    this.generateLights(this.canvas.context);
    this.generateIntersection();
    this.generateControls();
  }

  private generateControls() {
    this.controls = new Control();
  }

  private initiateObservers() {
    const horizontalLane$ = interval(this.populateRateThrottle).pipe(
      map(() => this.carStream("horizontal"))
    );

    const verticalLane$ = interval(this.populateRateThrottle).pipe(
      map(() => this.carStream("vertical"))
    );

    const trafficLights$ = interval(5000).pipe(
      startWith(0),
      scan(acc => (acc ? 0 : 1))
    );

    const traffic$ = trafficLights$.pipe(
      map(state => {
        this.trafficLightState = state;
        return state;
      }),
      switchMap(state => (state ? horizontalLane$ : verticalLane$))
    );

    this.animationLoop.animationEngine$
      .pipe(merge(traffic$))
      .subscribe(this.animate);
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
      y: this.resolution.height / 2 - 40,
      width: this.resolution.width,
      height: 80,
      type: "horizontal"
    });

    this.verticalRoad = new Road(this.canvas.context, {
      x: this.resolution.width / 2 - 40,
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

  generateLights(canvas) {
    [
      {
        type: "horizontal",
        x: Display().width / 2 - 80,
        y: Display().height / 2 - 10
      },
      {
        type: "vertical",
        x: Display().width / 2 - 30,
        y: Display().height / 2 - 80
      },
      {
        type: "vertical",
        x: Display().width / 2 - 10,
        y: Display().height / 2 + 40
      },
      {
        type: "horizontal",
        x: Display().width / 2 + 40,
        y: Display().height / 2 - 30
      }
    ].forEach(light => {
      new TrafficLight(canvas, light);
    });
  }

  fullSpeed(car: Car) {
    car.render(0.004, this.controls.wireframeView);
  }

  slowSpeed(car: Car) {
    car.render(0.002, this.controls.wireframeView);
  }

  garbageCollect() {
    this.cars = Object.keys(Cars).map(directionPaths =>
      Cars[directionPaths].filter(car => car.percent < 1)
    );
  }

  stop(car: Car) {
    car.render(0, this.controls.wireframeView);
  }

  park(car: Car) {
    if (car) {
      console.log(car);
    }
    //   car.render(0, this.controls.wireframeView);
  }

  private animate = () => {
    this.garbageCollect();
    if (this.controls.pause) {
      return;
    }

    this.canvas.render();

    Roads.map(road => road.render());

    Intersections.map(intersection => intersection.render());

    Object.keys(Paths).map(directionPaths =>
      Paths[directionPaths].map((path: Path) =>
        this.path.render(path, this.controls.wireframeView)
      )
    );

    this.cars.map((directionPaths, index) =>
      directionPaths.map(car => {
        if (this.trafficLightState === index) {
          this.fullSpeed(car);
        } else {
          if (car.percent > 0.4) {
            this.fullSpeed(car);
          } else if (car.percent < 0.39) {
            // this.park(hasIntersect(directionPaths, car.percent));
            this.slowSpeed(car);
          } else {
            this.stop(car);
          }
        }
      })
    );

    TrafficLights.map(light => {
      light.render(this.trafficLightState);
    });
  };
}

new TrafficLightSimulator(new AnimationLoop());
