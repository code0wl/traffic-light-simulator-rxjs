import { Display } from "../../engine/display/display";

export interface iRoad {
  x: number;
  y: number;
  width: number;
  height: number;
  type: string;
}

export enum Roads {
  eastToWest,
  westToEast,
  southToNorth,
  northToSouth
}

export const allowedPaths = () => {
  const eastToWest = {
    type: Roads.eastToWest,
    direction: "horizontal",
    stroke: "blue",
    points: [
      { x: Display().width, y: Display().height / 2 - 30 },
      { x: 0, y: Display().height / 2 - 30 }
    ]
  };

  const westToEast = {
    type: Roads.westToEast,
    direction: "horizontal",
    stroke: "yellow",
    points: [
      { x: 0, y: Display().height / 2 - 10 },
      { x: Display().width, y: Display().height / 2 - 10 }
    ]
  };

  const southToNorth = {
    type: Roads.southToNorth,
    direction: "vertical",
    stroke: "white",
    points: [
      { x: Display().width / 2 - 10, y: Display().height },
      { x: Display().width / 2 - 10, y: 0 }
    ]
  };

  const northToSouth = {
    type: Roads.northToSouth,
    direction: "vertical",
    stroke: "orange",
    points: [
      { x: Display().width / 2 - 30, y: 0 },
      { x: Display().width / 2 - 30, y: Display().height }
    ]
  };

  return {
    northToSouth,
    southToNorth,
    eastToWest,
    westToEast
  };
};
