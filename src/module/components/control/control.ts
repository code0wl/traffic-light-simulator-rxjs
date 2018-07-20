import { fromEvent } from "rxjs";

export default class Control {
  private container: HTMLDivElement;
  private viewPaths: HTMLInputElement;
  private view: string;

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

  initSubscriptions() {
    fromEvent(this.viewPaths, "click").subscribe(
      (event: any) => (this.wireframeView = event.target.checked)
    );
  }

  render() {
    this.container = document.createElement("div");
    this.viewPaths = document.createElement("input");
    this.viewPaths.type = "checkbox";
    this.container.textContent = "Behind the scenes";
    this.container.appendChild(this.viewPaths);
    this.container.classList.add("view-controls");
    document.body.appendChild(this.container);
  }
}
