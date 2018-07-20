import { Observable, of } from "../../../../node_modules/rxjs";
import { animationFrame } from "../../../../node_modules/rxjs/internal/scheduler/animationFrame";
import { repeat } from "../../../../node_modules/rxjs/operators";

export default class AnimationLoop {
  public animationEngine$: Observable<number> = of(0, animationFrame).pipe(
    repeat()
  );
}
