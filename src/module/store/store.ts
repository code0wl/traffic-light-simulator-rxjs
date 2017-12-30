import Road from "../components/road/road";
import Path from "../components/road/path";
import Intersection from "../components/intersection/intersection";
import TrafficLight from "../components/traffic_light/traffic_light";

export const Roads: Array<Road> = [];
export const Paths: { vertical: Array<Path>, horizontal: Array<Path> } = {vertical: [], horizontal: []};
export const Cars: { vertical: Array<Path>, horizontal: Array<Path> } = {vertical: [], horizontal: []};
export const Intersections: Array<Intersection> = [];
export const TrafficLights: Array<TrafficLight> = [];
