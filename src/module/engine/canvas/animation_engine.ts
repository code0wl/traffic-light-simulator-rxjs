import Canvas from "./canvas";

export default class AnimationLoop {

    constructor(private canvas: Canvas) {
    }

    public render() {
        requestAnimationFrame(() => this.render());
    }

}