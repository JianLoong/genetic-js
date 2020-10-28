import RandomizationBase from "./RandomizationBase";

export default class BasicRandomization extends RandomizationBase {
  getDouble(min?: number, max?: number): number {
    if (min === undefined || max === undefined) return Math.random();
    return Math.random() * (max - min) + min;
  }

  getFloat(min?: number, max?: number): number {
    return Math.random() * (max - min) + min;
  }
  getInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
  }
  getUniqueInts(length: number, min: number, max: number): number[] {
    const stub = [];
    for (let i = min; i < max; i++) {
      stub.push(i);
    }
    return stub
      .sort(() => {
        return 0.5 - Math.random();
      })
      .slice(0, length);
  }
}
