import {Canvas} from "./src/module/components/canvas/canvas";
import {Display} from "./src/module/components/display/display";

class TrafficLightSimulator {
    constructor() {
        const resolution = Display();
        new Canvas(resolution.width, resolution.height);
    }
}

new TrafficLightSimulator();