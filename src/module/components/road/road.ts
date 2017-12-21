import {Attributes} from "./model";

export default class Road {
    readonly width: number;
    readonly x: number;
    readonly y: number;
    readonly height: number;
    readonly type: string;
    readonly sideWalkColor: string = "#c0c0c0";
    readonly pavementColor: string = "#333333";
    private color: string;


    constructor(private context: CanvasRenderingContext2D, attr: Attributes) {
        this.color = "#605A4C";
        this.width = attr.width;
        this.height = attr.height;
        this.type = attr.type;
        this.x = attr.x;
        this.y = attr.y;
        this.render();
    }

    private createDottedLinesHorizontal() {
        const context = this.context;
        context.fillRect(this.x, this.y + ((this.height / 2) - 1), this.width, 2);
        context.beginPath();
        context.setLineDash([2, 5]);
        context.moveTo(this.x, this.y + ((this.height / 4) - 1));
        context.lineTo((this.x + this.width), this.y + ((this.height / 4) - 1));
        context.closePath();
        context.strokeStyle = "#FFFFFF";
        context.lineWidth = 1;
        context.fill();
        context.stroke();

        context.beginPath();
        context.setLineDash([2, 5]);
        context.moveTo(this.x, this.y + ((this.height / (4 / 3)) - 1));
        context.lineTo((this.x + this.width), this.y + ((this.height / (4 / 3)) - 1));
        context.closePath();
        context.strokeStyle = "#FFFFFF";
        context.lineWidth = 1;
        context.fill();
        context.stroke();
    }

    private createDottedLinesVertical() {
        const context = this.context;

        context.fillRect(this.x + ((this.width / 2) - 1), this.y, 2, this.height);
        context.beginPath();
        context.setLineDash([2, 5]);
        context.moveTo(this.x + ((this.width / 4) - 1), this.y);
        context.lineTo(this.x + ((this.width / 4) - 1), (this.y + this.height));
        context.closePath();
        context.strokeStyle = this.sideWalkColor;
        context.lineWidth = 1;
        context.fill();
        context.stroke();

        context.beginPath();
        context.setLineDash([2, 5]);
        context.moveTo(this.x + ((this.width / (4 / 3)) - 1), this.y);
        context.lineTo(this.x + ((this.width / (4 / 3)) - 1), (this.y + this.height));
        context.closePath();
        context.strokeStyle = "#A09383";
        context.lineWidth = 1;
        context.fill();
        context.stroke();
    }

    public render() {
        const context = this.context;
        context.fillStyle = this.color;

        if (this.type === "vertical") {
            context.fillStyle = this.pavementColor;
            context.fillRect(this.x, this.y, 85, this.height);

            context.fillStyle = this.sideWalkColor;
            context.fillRect(this.x - 5, this.y, 5, this.height);

            context.fillStyle = this.sideWalkColor;
            context.fillRect(this.x + this.width, this.y, 5, this.height);

            this.createDottedLinesVertical();

        } else {
            context.fillStyle = this.pavementColor;
            context.fillRect(this.x, this.y, this.width, 85);

            context.fillStyle = this.sideWalkColor;
            context.fillRect(this.x, this.y - 5, this.width, 5);

            context.fillStyle = this.sideWalkColor;
            context.fillRect(this.x, this.y + this.height, this.width, 5);

            this.createDottedLinesHorizontal();
        }
    }
}