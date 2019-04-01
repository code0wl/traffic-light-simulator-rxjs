import Car from "../../components/car/car";

export const hasIntersect = (cars: Car[], currentPercent: number) =>
  cars.find(({ percent }) => {
    console.log(currentPercent - percent);
    // return percent - currentPercent > 2;
    return true
  });
