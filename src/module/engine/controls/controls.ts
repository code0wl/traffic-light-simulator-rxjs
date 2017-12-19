import * as Rx from "rxjs/Rx";

export default class Controls {
    public toggle$: Rx.Observable<MouseEvent>;
    public container: HTMLDivElement;
    private toggle: HTMLButtonElement;

    constructor() {
        this.toggle = document.createElement("button");
        this.container = document.createElement("div");
        this.container.classList.add("controls");

        this.render();
        this.attachEvents();
    }

    public attachEvents() {
        this.toggle$ = Rx.Observable.fromEvent(this.toggle, "click");
    }

    public render() {
        this.container.appendChild(this.toggle);
        document.body.appendChild(this.container);
    }
}