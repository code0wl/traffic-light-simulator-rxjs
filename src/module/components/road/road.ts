import {Attributes} from "./model";

export default class Road {
    readonly width: number;
    readonly x: number;
    readonly y: number;
    readonly height: number;
    private color: string;

    constructor(private context: CanvasRenderingContext2D, attr: Attributes) {
        this.color = "#605A4C";
        this.width = attr.width;
        this.height = attr.height;
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

    public render() {
        const context = this.context;
        context.fillStyle = this.color;

        console.log(this);

        if (this.width < this.height && this.width > 40) {
            context.fillRect(this.x + ((this.width / 2) - 1), this.y, 2, this.height);
            context.beginPath();
            context.setLineDash([2, 5]);
            context.moveTo(this.x + ((this.width / 4) - 1), this.y);
            context.lineTo(this.x + ((this.width / 4) - 1), (this.y + this.height));
            context.closePath();
            context.strokeStyle = "#A09383";
            context.lineWidth = 1;
            context.fill();
            context.stroke();

            context.beginPath();
            context.setLineDash([2, 5]);
            context.moveTo(this.x + ((this.width / (4 / 3)) - 1), this.y);
            context.lineTo(this.x + ((this.width / (4 / 3)) - 1), (this.y + this.height));
            context.closePath();
            context.strokeStyle = "#A09383";
            context.lineWidth = 10;
            context.fill();
            context.stroke();

            context.fillStyle = "#A09383";
            context.fillRect(this.x - 10, this.y, 10, this.height);
            context.fillStyle = "#A09383";
            context.fillRect(this.x + this.width, this.y, 10, this.height);

        }
        else if (this.width > this.height && this.height > 40) {
            context.fillStyle = "#333333";
            context.fillRect(this.x, this.y, this.width, 85);

            context.fillStyle = "#c0c0c0";
            context.fillRect(this.x, this.y - 5, this.width, 5);

            context.fillStyle = "#c0c0c0";
            context.fillRect(this.x, this.y + this.height, this.width, 5);

            this.createDottedLinesHorizontal();
        }
        else if (this.width > this.height && this.height < 41) {
            context.fillRect(this.x, this.y + ((this.height / 2) - 1), this.width, 2);
            context.fillStyle = "#A09383";
            context.fillRect(this.x, this.y - 10, this.width, 10);
            context.fillStyle = "#A09383";
            context.fillRect(this.x, this.y + this.height, this.width, 10);
        }
        else if (this.width < this.height && this.width < 41) {
            context.fillRect(this.x + ((this.width / 2) - 1), this.y, 2, this.height);
            context.fillStyle = "#A09383";
            context.fillRect(this.x - 10, this.y, 10, this.height);
            context.fillStyle = "#A09383";
            context.fillRect(this.x + this.width, this.y, 10, this.height);
        }
    }
}