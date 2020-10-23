import { RandomizationBase } from "./RandomizationBase";

class BasicRandomization extends RandomizationBase {
  getUniqueInts(length: number, min: number, max: number): number[] {
    let stub = [];
    for (let i = 0; i < length; i++) {
      stub.push(min++);
    }
    return stub
      .sort(() => {
        return 0.5 - Math.random();
      })
      .slice(0, length);
  }
  getInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
  }

  getFloat(min?: number, max?: number): number {
    return Math.random() * (max - min) + min;
  }
  getDouble(min?: number, max?: number): number {
    if (min == undefined || max == undefined) return Math.random();
    return Math.random() * (max - min) + min;
  }
}

export { BasicRandomization };
