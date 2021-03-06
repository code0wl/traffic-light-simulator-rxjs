import { fromEvent } from "rxjs";
import { Cars, resetStore } from "../../store/store";

export default class Control {
  private container: HTMLDivElement;
  private viewPaths: HTMLInputElement;
  private pauseSimulation: HTMLInputElement;
  private resetSimulation: HTMLButtonElement;
  private view: string;
  private pauseSim: string;

  constructor() {
    this.render();
    this.initSubscriptions();
  }

  set wireframeView(view) {
    this.view = view;
  }

  get wireframeView() {
    return this.view;
  }

  set pause(pause) {
    this.pauseSim = pause;
  }

  get pause() {
    return this.pauseSim;
  }

  initSubscriptions() {
    fromEvent(this.viewPaths, "click").subscribe(
      (event: any) => (this.wireframeView = event.target.checked)
    );

    fromEvent(this.pauseSimulation, "click").subscribe(
      (event: any) => (this.pause = event.target.checked)
    );

    fromEvent(this.resetSimulation, "click").subscribe(this.reset);
  }

  reset() {
    resetStore();
  }

  render() {
    const labels = ["Behind the scenes", "Pause"].map(label => {
      const l = document.createElement("label");
      l.textContent = label;
      return l;
    });

    this.container = document.createElement("div");

    this.viewPaths = document.createElement("input");
    this.viewPaths.type = "checkbox";

    this.pauseSimulation = document.createElement("input");
    this.pauseSimulation.type = "checkbox";

    this.resetSimulation = document.createElement("button");
    this.resetSimulation.textContent = "Restart";

    this.container.appendChild(labels[0]);
    this.container.appendChild(this.viewPaths);

    this.container.appendChild(labels[1]);
    this.container.appendChild(this.pauseSimulation);

    this.container.appendChild(this.resetSimulation);

    this.container.classList.add("view-controls");
    document.body.appendChild(this.container);
  }
}
