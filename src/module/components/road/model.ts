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
        direction: "horizontal",
        stroke: "blue",
        points: [
            {x: Display().width, y: Display().height / 2 - 30},
            {x: 0, y: Display().height / 2 - 30}
        ]
    };

    const westToEast = {
        direction: "horizontal",
        stroke: "yellow",
        points: [
            {x: 0, y: Display().height / 2 - 10},
            {x: Display().width, y: Display().height / 2 - 10}
        ]
    };

    const southToNorth = {
        direction: "vertical",
        stroke: "red",
        points: [
            {x: Display().width / 2 - 10, y: Display().height},
            {x: Display().width / 2 - 10, y: 0},
        ]
    };

    const northToSouth = {
        direction: "vertical",
        stroke: "orange",
        points: [
            {x: Display().width / 2 - 30, y: 0},
            {x: Display().width / 2 - 30, y: Display().height},
        ]
    };

    return {
        northToSouth,
        southToNorth,
        eastToWest,
        westToEast
    }
};