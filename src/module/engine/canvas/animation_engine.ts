import Canvas from "./canvas";
import * as Rx from "rxjs";

export default class AnimationLoop {
    public animationEngine$: Rx.Observable<any>;

    constructor(private canvas: Canvas) {
        this.animationEngine$ = Rx.Observable
            .of(0, Rx.Scheduler.animationFrame)
            .repeat()
    }
}