interface IRandomization {
    getInt(min: number, max: number): number;
    getInts(length: number, min: number, max: number): number[];
    getUniqueInts(length: number, min: number, max: number): number[];
}

export { IRandomization }