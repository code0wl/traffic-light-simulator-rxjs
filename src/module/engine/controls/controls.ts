import {IControl} from "./model";

export default class Controls {
    public controls: IControl;

    constructor() {
        this.controls = {
            pause: "Pause",
            play: "Play"
        }
    }
}