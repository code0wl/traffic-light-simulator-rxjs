import Car from "../../components/car/car";

export const hasIntersect = (cars: Car[], currentPercent: number) =>
  cars.find(({ percent }) => {
    console.log(currentPercent - percent < 0);
    return percent - currentPercent > 0;
  });
