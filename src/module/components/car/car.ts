import Canvas from "../../engine/canvas/canvas";
import {ICarType} from "./model";
import * as Rx from "rxjs/Rx";

export default class Car {
    public rotation: number;
    private graphic: HTMLElement;
    private model: ICarType;

    constructor(private canvas: Canvas) {
        this.render()
    }

    render() {
    }
}