export default class Car {
    readonly width: number;
    readonly height: number;
    readonly color: string;

    constructor(private context: CanvasRenderingContext2D) {
        this.color = "#8a0051";
        this.width = 40;
        this.height = 15;
        this.render()
    }

    render() {
        this.context.fillStyle = this.color;
        this.context.fillRect(window.innerWidth / 2, window.innerHeight / 2, this.width, this.height);
    }
}