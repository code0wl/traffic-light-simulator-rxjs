import {iIntersection} from "./model";
import {Intersections} from "../../store/store";

export default class Intersection {

    private attributes: iIntersection;

    constructor(private context: CanvasRenderingContext2D, attr: iIntersection) {
        this.attributes = attr;
        Intersections.push(this);
    }

    public render() {
        this.context.fillStyle = this.attributes.pavementColor;
        this.context.fillRect(this.attributes.x - 6, this.attributes.y, this.attributes.width + 12, this.attributes.height);
    }
}
