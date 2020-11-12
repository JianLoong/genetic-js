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
    if (isMaximized)
      clone.sort((a, b) => (b.fitness || 0) - (a.fitness || 0));
    else
      clone.sort((a, b) => (a.fitness || 0) - (b.fitness || 0));
    return clone;
  }
}
