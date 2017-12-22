import {iIntersection} from "./model";
import {TrafficLight} from "../traffic_light/light_light";
import {position} from "../traffic_light/model";

export default class Intersection {

    constructor(private context: CanvasRenderingContext2D, attr: iIntersection) {
        this.render(attr);
    }

    renderLights() {
        new TrafficLight(this.context, {
            x: 10,
            y: 10,
            type: position.north
        });
    }

    render(props) {
        this.context.fillStyle = props.pavementColor;
        this.context.fillRect(props.x - 5, props.y, props.width + 10, props.height);
        this.renderLights();
    }
}
