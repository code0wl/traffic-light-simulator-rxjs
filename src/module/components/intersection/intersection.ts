import {iIntersection} from "./model";

export default class Intersection {

    constructor(private context: CanvasRenderingContext2D, attr: iIntersection) {
        this.render(attr);
    }

    render(props) {
        const context = this.context;
        context.fillStyle = props.pavementColor;
        context.fillRect(props.x - 5, props.y, props.width + 10, props.height);
    }
}
