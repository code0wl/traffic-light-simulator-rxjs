import ComponentLifeCycle from "../component_lifecycle/component_lifecycle";

export default class Controls extends ComponentLifeCycle {
    public pauseBtn: HTMLButtonElement;
    public playBtn: HTMLButtonElement;

    constructor() {
        super();
        this.pauseBtn = document.createElement("button");
        this.playBtn = document.createElement("button");
        this.pauseBtn.classList.add("pause");
        this.playBtn.classList.add("play");
    }

    public render() {
        document.appendChild(this.pauseBtn);
        document.appendChild(this.playBtn);
    }
}