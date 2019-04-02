import Car from "../../components/car/car";

export const hasIntersect = (cars: Car[], currentPercent: number) =>
  cars.find(car => {
    return car.percent - currentPercent < 0;
  });
