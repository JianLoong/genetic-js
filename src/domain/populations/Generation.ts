import IChromosome from "../chromosome/IChromosome";

export default class Generation {
  public bestChromosome: IChromosome;
  chromosomes: IChromosome[];

  constructor(num: number, chromosomes: IChromosome[], isMaximized: boolean = true) {
    if (num < 1) {
      throw new Error("Generation number " + num + "is invalid.");
    }

    if (chromosomes.length < 2) {
      throw new Error("A generation should have at least 2 chromosome");
    }
    this.num = num;
    this.creationDate = new Date();
    this.chromosomes = chromosomes;
    this.isMaximized = isMaximized;
    this.bestChromosome = undefined;
  }
  private creationDate: Date;
  private isMaximized: boolean;
  private num: number;

  end(chromosomesNumber: number): void {
    if (this.isMaximized) {
      this.chromosomes = this.chromosomes
        .filter((chromosome) => this.validateChromosome(chromosome) === true)
        .sort((a, b) => b.fitness - a.fitness);
    } else {
      this.chromosomes = this.chromosomes
        .filter((chromosome) => this.validateChromosome(chromosome) === true)
        .sort((a, b) => a.fitness - b.fitness);
    }

    this.chromosomes = this.chromosomes.slice(0, chromosomesNumber);

    this.bestChromosome = Object.assign(this.chromosomes[0], this.bestChromosome);
  }

  getChromosome(): IChromosome[] {
    return this.chromosomes;
  }

  toString() {
    // return "";
    return this.bestChromosome.getGenes().toString();
  }

  validateChromosome(chromosome: IChromosome): boolean {
    if (chromosome.fitness == null) throw new Error("No fitness");
    return true;
  }
}
