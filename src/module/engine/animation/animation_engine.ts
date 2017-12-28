import * as Rx from "rxjs";

export default class AnimationLoop {
    public animationEngine$: Rx.Observable<number> = Rx.Observable
        .of(0, Rx.Scheduler.animationFrame)
        .share()
        .repeat()
}