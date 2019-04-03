import Car from "../../components/car/car";

const intersects = rect => {
  return !(
    rect.x > this.x + this.w ||
    rect.x + rect.w < this.x ||
    rect.y > this.y + this.h ||
    rect.y + rect.h < this.y
  );
};

export const hasIntersects = (currentPercent: number, cars: Car[]) => {
  for (let i = 0, r; (r = cars[i]); i++) {
    if (intersects(currentPercent)) return true;
  }
  return false;
};
