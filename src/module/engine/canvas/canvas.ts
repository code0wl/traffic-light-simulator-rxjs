export default class Canvas {

    public context: CanvasRenderingContext2D;
    private canvas: HTMLCanvasElement;
    private width: number;
    private height: number;

    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.canvas = document.createElement("canvas");
        this.context = this.canvas.getContext("2d");
        this.render();
    }

    paint() {
        this.context.fillStyle = "#238a52";
        this.context.clearRect(0, 0, this.width, this.height);
        this.context.fillRect(0, 0, this.width, this.height);
    }

    public render() {
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.canvas.classList.add("physics-canvas");
        document.body.appendChild(this.canvas);
    }

}