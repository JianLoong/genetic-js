import IRandomization from "./IRandomization";

export default abstract class RandomizationBase implements IRandomization {
  abstract getDouble(min?: number, max?: number): number;
  abstract getFloat(min?: number, max?: number): number;
  abstract getInt(min: number, max: number): number;

  getInts(length: number, min: number, max: number): number[] {
    const result = [];
    for (let index = 0; index < length; index++) {
      result.push(this.getInt(min, max));
    }

    return result;
  }

  abstract getUniqueInts(length: number, min: number, max: number): number[];
}
