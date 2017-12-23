import {iIntersection} from "./model";
import {TrafficLight} from "../traffic_light/traffic_light";
import {position} from "../traffic_light/model";

export default class Intersection {

    private attributes: iIntersection;

    constructor(private context: CanvasRenderingContext2D, attr: iIntersection) {
        this.attributes = attr;
        this.render();
    }

    renderLights(props) {
        new TrafficLight(this.context, {
            x: props.x - 10,
            y: props.y - 20,
            type: position.north
        });

        new TrafficLight(this.context, {
            x: props.x - 10,
            y: props.y - 20,
            type: position.north
        });
    }

    render() {
        this.context.fillStyle = this.attributes.pavementColor;
        this.context.fillRect(this.attributes.x - 5, this.attributes.y, this.attributes.width + 10, this.attributes.height);
        this.renderLights(this.attributes);
    }
}
