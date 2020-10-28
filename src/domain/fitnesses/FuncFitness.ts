import IChromosome from "../chromosome/IChromosome";
import IFitness from "./IFitness";

export default class FuncFitness implements IFitness {
  mFunc: (chromosome: IChromosome) => number;

  constructor(f: (chromosome: IChromosome) => number) {
    this.mFunc = f;
  }

  evaluate(chromosome: IChromosome): number {
    return this.mFunc(chromosome);
  }
}
