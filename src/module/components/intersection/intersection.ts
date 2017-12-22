import {iIntersection} from "./model";

export default class Intersection {
    readonly attributes: iIntersection;

    constructor(private context: CanvasRenderingContext2D, attr: iIntersection) {
        this.attributes = Object.assign(attr, {roadVertical: attr.roadVertical, roadHorizontal: attr.roadHorizontal});
        this.render()
    }

    render() {
        console.log(this.attributes);
    }
}
