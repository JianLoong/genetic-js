import { FuncFitness } from "../..";
import IChromosome from "../chromosome/IChromosome";

export default class Generation {
  public bestChromosome?: IChromosome;
  chromosomes: IChromosome[];
  public creationDate: Date;
  public num: number;

  constructor(num: number, chromosomes: IChromosome[], isMaximized: boolean = true) {

    this.num = num;
    this.creationDate = new Date();
    this.chromosomes = chromosomes;
    this.isMaximized = isMaximized;
    this.bestChromosome = undefined;
  }
  private isMaximized: boolean;

  end(chromosomesNumber: number): void {
    // if (this.isMaximized) {
    //   this.chromosomes = this.chromosomes
    //     .filter((chromosome) => this.validateChromosome(chromosome) === true)
    //     .sort((a, b) => b.fitness - a.fitness);
    // } else {
    //   this.chromosomes = this.chromosomes
    //     .filter((chromosome) => this.validateChromosome(chromosome) === true)
    //     .sort((a, b) => a.fitness - b.fitness);
    // }
    if (this.isMaximized) {
      this.chromosomes = FuncFitness
        .sort(this.chromosomes)
        .filter((chromosome) => this.validateChromosome(chromosome));
    } else {
      this.chromosomes = FuncFitness
        .sort(this.chromosomes, false)
        .filter((chromosome) => this.validateChromosome(chromosome));
    }

    this.chromosomes = this.chromosomes.slice(0, chromosomesNumber);

    this.bestChromosome = Object.assign(this.chromosomes[0], this.bestChromosome);
  }

  getChromosome(): IChromosome[] {
    return this.chromosomes;
  }

  public maximized(condition: boolean) {
    this.isMaximized = condition;
  }

  validateChromosome(chromosome: IChromosome): boolean {
    if (chromosome.fitness == null) throw new Error("No fitness");
    return true;
  }
}
