import { IRandomization } from "./IRandomization";

abstract class RandomizationBase implements IRandomization {
    abstract getInt(min: number, max: number): number;

    getInts(length: number, min: number, max: number): number[] {
        let result = [];
        for (let index = 0; index < length; index++) {
            result.push(this.getInt(min, max));
        }

        return result;
    }

    abstract getUniqueInts(length: number, min: number, max: number): number[];
    abstract getFloat(min?: number, max?: number): number;
    abstract getDouble(min?: number, max?: number): number;

}

export { RandomizationBase }