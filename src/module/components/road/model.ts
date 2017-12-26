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
            {x: 0, y: Display().height / 2 - 10},
            {x: Display().width, y: Display().height / 2 - 10}
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
        eastToSouth
    }

};

// convert to scan when works
export let x;
export let y;

export const animatePath = (coors) => {
    // get starting point
    const start = coors[0];
    const end = coors[1];

    return coors.map((coor) => {
        if (end.x) {
            x = end.x--;
        }

        if (end.y) {
            y = end.y--;
        }
    });
};