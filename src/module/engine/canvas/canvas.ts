export default class Canvas {

    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;
    private width: number;
    private height: number;

    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.canvas = document.createElement("canvas");
        this.context = this.canvas.getContext("2d");
        this.render();
    }

    public getCanvas(): HTMLCanvasElement {
        return this.canvas;
    }

    get CanvasContext(): CanvasRenderingContext2D {
        return this.context;
    }

    public render() {
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.canvas.classList.add("physics-canvas");
        document.body.appendChild(this.canvas);
    }
}