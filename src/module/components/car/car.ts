import Canvas from "../../engine/canvas/canvas";
import {ICarType} from "./model";
import * as Rx from "rxjs/Rx";
import {Colors, Seats} from "../../store/store";

export default class Car {
    public rotation: number;
    private graphic: HTMLElement;
    private model: ICarType;

    constructor(private canvas: Canvas) {
        this.render()
    }

    render() {
        const c = Rx.Observable.range(0, Colors.length);
        const s = Rx.Observable.range(0, Seats.length);

        return Rx.Observable
            .merge(c, s)
            .subscribe()
    }
}