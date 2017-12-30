import {iIntersection} from "./model";
import {TrafficLight} from "../traffic_light/traffic_light";
import {position} from "../traffic_light/model";
import {Intersections} from "../../store/store";

export default class Intersection {

    private attributes: iIntersection;

    constructor(private context: CanvasRenderingContext2D, attr: iIntersection) {
        this.attributes = attr;
        Intersections.push(this);
    }

    renderLights() {
        new TrafficLight(this.context, {
            x: this.attributes.x - 10,
            y: this.attributes.y - 63,
            position: position.horizontal
        });
    }

    public render() {
        this.context.fillStyle = this.attributes.pavementColor;
        this.context.fillRect(this.attributes.x - 6, this.attributes.y, this.attributes.width + 12, this.attributes.height);
        this.renderLights();
    }
}
