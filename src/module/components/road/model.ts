import {Display} from "../../engine/display/display";

export interface iRoad {
    x: number;
    y: number;
    width: number;
    height: number;
    type: string;
}

export const allowedPaths = () => {
    const eastToWest = {
        type: "horizontal",
        stroke: "blue",
        points: [
            {x: Display().width, y: Display().height / 2 - 10},
            {x: 0, y: Display().height / 2 - 10}
        ]
    };

    const westToEast = {
        type: "horizontal",
        stroke: "yellow",
        points: [
            {x: 0, y: Display().height / 2 + 10},
            {x: Display().width, y: Display().height / 2 + 10}
        ]
    };

    const southToNorth = {
        type: "vertical",
        stroke: "red",
        points: [
            {x: Display().width / 2 - 30, y: Display().height},
            {x: Display().width / 2 - 30, y: 0},
        ]
    };

    const northToSouth = {
        type: "vertical",
        stroke: "orange",
        points: [
            {x: Display().width / 2 - 30, y: 0},
            {x: Display().width / 2 - 30, y: Display().height},
        ]
    };

    return {
        eastToWest,
        northToSouth,
        southToNorth,
        westToEast
    }
};