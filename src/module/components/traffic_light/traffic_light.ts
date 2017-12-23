import {iLight, position} from "./model";

export class TrafficLight {
    readonly height: number;
    readonly width: number;
    public attributes: iLight;

    constructor(private context: CanvasRenderingContext2D, attr: iLight) {
        this.attributes = attr;

        if (attr.position === position.vertical) {
            this.height = 45;
            this.width = 3;
        } else {
            this.height = 3;
            this.width = 45;
        }

        this.render();
    }

    private generateLights() {

    }

    private generatePole() {
        this.context.fillStyle = "#978d5a";
        this.context.fillRect(this.attributes.x + 5, this.attributes.y + 60, this.width, this.height);
    }

    render() {
        this.context.save();
        this.generatePole();
        this.generateLights();
        this.context.restore();
    }

}