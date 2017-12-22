import Canvas from "../../engine/canvas/canvas";
import {iCarType} from "./model";

export default class Car {
    public rotation: number;
    private graphic: HTMLElement;
    private model: iCarType;

    constructor(private canvas: Canvas) {
        this.render()
    }

    render() {
    }
}