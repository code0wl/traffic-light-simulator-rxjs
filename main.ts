import Canvas from "./src/module/engine/canvas/canvas";
import {Display, iResolution} from "./src/module/engine/display/display";
import ComponentLifeCycle from "./src/module/engine/component_lifecycle/component_lifecycle";
import AnimationLoop from "./src/module/engine/canvas/animation_engine";


class TrafficLightSimulator extends ComponentLifeCycle {

    public canvas: Canvas;
    public cars: number;
    public lights: number;
    private resolution: iResolution;
    private animationLoop: AnimationLoop;

    constructor() {
        super();
        this.resolution = Display();
        this.canvas = new Canvas(this.resolution.width, this.resolution.height);
    }

    render() {
        this.animationLoop = new AnimationLoop(this.canvas);
    }
}

new TrafficLightSimulator();