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
        stroke: "blue",
        points: [
            {x: Display().width, y: Display().height / 2 - 10},
            {x: 0, y: Display().height / 2 - 10}
        ]
    };

    const westToEast = {
        stroke: "yellow",
        points: [
            {x: 0, y: Display().height / 2 + 10},
            {x: Display().width, y: Display().height / 2 + 10}
        ]
    };

    const eastToNorth = {
        stroke: "red",
        points: [
            {x: Display().width, y: Display().height / 2 - 30},
            {x: Display().width / 2 + 30, y: Display().height / 2 - 30},
            {x: Display().width / 2 + 30, y: 0},
        ]
    };

    const eastToSouth = {
        stroke: "orange",
        points: [
            {x: Display().width, y: Display().height / 2 - 10},
            {x: Display().width / 2 - 30, y: Display().height / 2 - 10},
            {x: Display().width / 2 - 30, y: Display().height},
        ]
    };

    return {
        eastToWest,
        eastToNorth,
        eastToSouth,
        westToEast
    }
};