import {iLight} from "./model";

export class TrafficLight {
    readonly height: number;
    readonly width: number;
    public attributes: iLight;

    constructor(private context: CanvasRenderingContext2D, attr: iLight) {
        this.height = 45;
        this.width = 3;
        this.attributes = attr;
        this.render();
    }

    private generateLights() {

    }

    private generatePole() {
        this.context.fillStyle = "#FFFFFF";
        this.context.fillRect(this.attributes.x + 5, this.attributes.y + 60, this.width, this.height);
    }

    render() {
        this.context.save();
        this.generatePole();
        this.generateLights();
        this.context.restore();
    }

}