import {iRoad} from "./model";
import {Roads} from "../../store/store";

export default class Road {
    public sideWalkColor: string = "#c0c0c0";
    public pavementColor: string = "#333333";
    public attributes: iRoad;
    private color: string;

    constructor(private context: CanvasRenderingContext2D, attr: iRoad) {
        this.attributes = attr;
        Roads.push(this);
    }

    private createDottedLinesHorizontal() {
        const context = this.context;
        context.fillRect(this.attributes.x, this.attributes.y + ((this.attributes.height / 2) - 1), this.attributes.width, 2);
        context.beginPath();
        context.setLineDash([2, 5]);
        context.moveTo(this.attributes.x, this.attributes.y + ((this.attributes.height / 4) - 1));
        context.lineTo((this.attributes.x + this.attributes.width), this.attributes.y + ((this.attributes.height / 4) - 1));
        context.closePath();
        context.strokeStyle = "#FFFFFF";
        context.lineWidth = 1;
        context.fill();
        context.stroke();

        context.beginPath();
        context.setLineDash([2, 5]);
        context.moveTo(this.attributes.x, this.attributes.y + ((this.attributes.height / (4 / 3)) - 1));
        context.lineTo((this.attributes.x + this.attributes.width), this.attributes.y + ((this.attributes.height / (4 / 3)) - 1));
        context.closePath();
        context.strokeStyle = "#FFFFFF";
        context.lineWidth = 1;
        context.fill();
        context.stroke();
    }

    private createDottedLinesVertical() {
        const context = this.context;

        context.fillRect(this.attributes.x + ((this.attributes.width / 2) - 1), this.attributes.y, 2, this.attributes.height);
        context.beginPath();
        context.setLineDash([2, 5]);
        context.moveTo(this.attributes.x + ((this.attributes.width / 4) - 1), this.attributes.y);
        context.lineTo(this.attributes.x + ((this.attributes.width / 4) - 1), (this.attributes.y + this.attributes.height));
        context.closePath();
        context.strokeStyle = this.sideWalkColor;
        context.lineWidth = 1;
        context.fill();
        context.stroke();

        context.beginPath();
        context.setLineDash([2, 5]);
        context.moveTo(this.attributes.x + ((this.attributes.width / (4 / 3)) - 1), this.attributes.y);
        context.lineTo(this.attributes.x + ((this.attributes.width / (4 / 3)) - 1), (this.attributes.y + this.attributes.height));
        context.closePath();
        context.strokeStyle = "#A09383";
        context.lineWidth = 1;
        context.fill();
        context.stroke();
    }

    public render() {
        const context = this.context;
        context.fillStyle = this.color;

        if (this.attributes.type === "vertical") {
            context.fillStyle = this.pavementColor;
            context.fillRect(this.attributes.x, this.attributes.y, 85, this.attributes.height);

            context.fillStyle = this.sideWalkColor;
            context.fillRect(this.attributes.x - 5, this.attributes.y, 5, this.attributes.height);

            context.fillStyle = this.sideWalkColor;
            context.fillRect(this.attributes.x + this.attributes.width, this.attributes.y, 5, this.attributes.height);

            this.createDottedLinesVertical();

        } else {
            context.fillStyle = this.pavementColor;
            context.fillRect(this.attributes.x, this.attributes.y, this.attributes.width, 85);

            context.fillStyle = this.sideWalkColor;
            context.fillRect(this.attributes.x, this.attributes.y - 5, this.attributes.width, 5);

            context.fillStyle = this.sideWalkColor;
            context.fillRect(this.attributes.x, this.attributes.y + this.attributes.height, this.attributes.width, 5);

            this.createDottedLinesHorizontal();
        }
    }
}