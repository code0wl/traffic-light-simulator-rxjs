import { Observable, of } from "rxjs";
import { animationFrame } from "rxjs/internal/scheduler/animationFrame";
import { repeat } from "rxjs/operators";

export default class AnimationLoop {
  public animationEngine$: Observable<number> = of(0, animationFrame).pipe(
    repeat()
  );
}
