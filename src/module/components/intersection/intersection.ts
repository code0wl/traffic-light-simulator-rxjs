import {iIntersection} from "./model";
import {Intersections} from "../../store/store";

export default class Intersection {
    public attributes: iIntersection;
    private pavementColor: string = "#333333";

    constructor(private context: CanvasRenderingContext2D, attr: iIntersection) {
        this.attributes = attr;
        Intersections.push(this);
    }

    public render() {
        this.context.fillStyle = this.pavementColor;
        this.context.fillRect(this.attributes.x - 6, this.attributes.y, this.attributes.width + 12, this.attributes.height);
    }
}
