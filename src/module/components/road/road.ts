import {iRoad} from "./model";

export default class Road {
    public sideWalkColor: string = "#c0c0c0";
    public pavementColor: string = "#333333";
    private color: string;
    public attributes: iRoad;

    constructor(private context: CanvasRenderingContext2D, attr: iRoad) {
        this.attributes = attr;
        this.render(attr);
    }

    private createDottedLinesHorizontal(props) {
        const context = this.context;
        context.fillRect(props.x, props.y + ((props.height / 2) - 1), props.width, 2);
        context.beginPath();
        context.setLineDash([2, 5]);
        context.moveTo(props.x, props.y + ((props.height / 4) - 1));
        context.lineTo((props.x + props.width), props.y + ((props.height / 4) - 1));
        context.closePath();
        context.strokeStyle = "#FFFFFF";
        context.lineWidth = 1;
        context.fill();
        context.stroke();

        context.beginPath();
        context.setLineDash([2, 5]);
        context.moveTo(props.x, props.y + ((props.height / (4 / 3)) - 1));
        context.lineTo((props.x + props.width), props.y + ((props.height / (4 / 3)) - 1));
        context.closePath();
        context.strokeStyle = "#FFFFFF";
        context.lineWidth = 1;
        context.fill();
        context.stroke();
    }

    private createDottedLinesVertical(props) {
        const context = this.context;

        context.fillRect(props.x + ((props.width / 2) - 1), props.y, 2, props.height);
        context.beginPath();
        context.setLineDash([2, 5]);
        context.moveTo(props.x + ((props.width / 4) - 1), props.y);
        context.lineTo(props.x + ((props.width / 4) - 1), (props.y + props.height));
        context.closePath();
        context.strokeStyle = this.sideWalkColor;
        context.lineWidth = 1;
        context.fill();
        context.stroke();

        context.beginPath();
        context.setLineDash([2, 5]);
        context.moveTo(props.x + ((props.width / (4 / 3)) - 1), props.y);
        context.lineTo(props.x + ((props.width / (4 / 3)) - 1), (props.y + props.height));
        context.closePath();
        context.strokeStyle = "#A09383";
        context.lineWidth = 1;
        context.fill();
        context.stroke();
    }

    public render(props) {
        const context = this.context;
        context.fillStyle = this.color;

        if (props.type === "vertical") {
            context.fillStyle = this.pavementColor;
            context.fillRect(props.x, props.y, 85, props.height);

            context.fillStyle = this.sideWalkColor;
            context.fillRect(props.x - 5, props.y, 5, props.height);

            context.fillStyle = this.sideWalkColor;
            context.fillRect(props.x + props.width, props.y, 5, props.height);

            this.createDottedLinesVertical(props);

        } else {
            context.fillStyle = this.pavementColor;
            context.fillRect(props.x, props.y, props.width, 85);

            context.fillStyle = this.sideWalkColor;
            context.fillRect(props.x, props.y - 5, props.width, 5);

            context.fillStyle = this.sideWalkColor;
            context.fillRect(props.x, props.y + props.height, props.width, 5);

            this.createDottedLinesHorizontal(props);
        }
    }
}