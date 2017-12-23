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
            x: props.x - 9,
            y: props.y - 20,
            position: position.vertical
        });

        new TrafficLight(this.context, {
            x: props.x + 75,
            y: props.y - 65,
            position: position.vertical
        });

        new TrafficLight(this.context, {
            x: props.x + 35,
            y: props.y + 20,
            position: position.horizontal
        });

        new TrafficLight(this.context, {
            x: props.x - 10,
            y: props.y - 63,
            position: position.horizontal
        });
    }

    render() {
        this.context.fillStyle = this.attributes.pavementColor;
        this.context.fillRect(this.attributes.x - 5, this.attributes.y, this.attributes.width + 10, this.attributes.height);
        this.renderLights(this.attributes);
    }
}
