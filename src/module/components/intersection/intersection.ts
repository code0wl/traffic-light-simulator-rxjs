import {iIntersection} from "./model";

export default class Intersection {

    constructor(private context: CanvasRenderingContext2D, attr: iIntersection) {
        this.render(attr)
    }

    render(props) {
        console.log(props)
    }
}
