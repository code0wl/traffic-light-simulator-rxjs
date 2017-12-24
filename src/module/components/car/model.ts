import {Display} from "../../engine/display/display";

export interface Path {
    lineWidth: number,
    stroke: string,
    points: Array<Object>
}

const windowWidth = Display().width;
const windowHeight = Display().height;

export const RegisterPaths = () => {

    const eastToWest = {
        lineWidth: 1,
        stroke: "blue",
        points: [{x: 0, y: windowHeight / 2 - 10}, {x: windowWidth, y: windowHeight / 2 - 10}]
    };

    const eastToNorth = {
        lineWidth: 1,
        stroke: "red",
        points: [
            {x: windowWidth, y: windowHeight / 2 - 30},
            {x: windowWidth / 2 + 30, y: windowHeight / 2 - 30},
            {x: windowWidth / 2 + 30, y: 0},
        ]
    };

    const eastToSouth = {
        lineWidth: 1,
        stroke: "orange",
        points: [
            {x: windowWidth, y: windowHeight / 2 - 10},
            {x: windowWidth / 2 - 30, y: windowHeight / 2 - 10},
            {x: windowWidth / 2 - 30, y: windowHeight},
        ]
    };

    return {
        eastToWest, eastToNorth, eastToSouth
    }

};