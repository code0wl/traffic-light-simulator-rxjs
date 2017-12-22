import {iIntersection} from "./model";

export default class Intersection {

    constructor(private context: CanvasRenderingContext2D, attr: iIntersection) {
        this.render(attr);
    }

    render(props) {
        this.context.fillStyle = props.pavementColor;
        this.context.fillRect(props.x - 5, props.y, props.width + 10, props.height);
    }
}
