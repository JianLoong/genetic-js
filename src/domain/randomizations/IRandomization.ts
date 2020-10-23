interface IRandomization {
  getInt(min: number, max: number): number;
  getInts(length: number, min: number, max: number): number[];
  getUniqueInts(length: number, min: number, max: number): number[];
  getFloat(min?: number, max?: number): number;
  getDouble(min?: number, max?: number): number;
}

export { IRandomization };
