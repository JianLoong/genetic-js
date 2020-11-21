import IChromosome from "../chromosome/IChromosome";
import IFitness from "./IFitness";

export default class FuncFitness implements IFitness {

  constructor(func: (chromosome: IChromosome) => number) {
    this.mFunc = func;
  }

  private mFunc: (chromosome: IChromosome) => number;

  evaluate(chromosome: IChromosome): number {
    return this.mFunc(chromosome);
  }

  static sort(chromosomes: IChromosome[], isMaximized: boolean = true): IChromosome[] {
    const clone = [...chromosomes];

    if (isMaximized) {
      clone.sort((a, b) => {
        if (a.fitness === undefined || b.fitness === undefined)
          throw new Error("Chromosomes cannot be sorted because their fitness has not been evaluated.");
        return b.fitness - a.fitness;
      })
    }
    else {
      clone.sort((a, b) => {
        if (a.fitness === undefined || b.fitness === undefined)
          throw new Error("Chromosomes cannot be sorted because their fitness has not been evaluated.");
        return a.fitness - b.fitness;
      })
    }
    return clone;
  }
}
