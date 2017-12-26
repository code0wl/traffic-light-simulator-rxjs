export default class Canvas {

    public context: CanvasRenderingContext2D;
    public width: number;
    public height: number;
    private canvas: HTMLCanvasElement;

    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.canvas = document.createElement("canvas");
        this.context = this.canvas.getContext("2d");
    }

    public render() {
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.context.fillStyle = "#238a52";
        this.context.fillRect(0, 0, this.width, this.height);
        this.canvas.classList.add("physics-canvas");
        document.body.appendChild(this.canvas);
    }

}