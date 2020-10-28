import IChromosome from "../chromosome/IChromosome";

export default class Generation {
  chromosomes: IChromosome[];

  constructor(num: number, chromosomes: IChromosome[]) {
    if (num < 1) {
      throw new Error("Generation number " + num + "is invalid.");
    }

    if (chromosomes.length < 2) {
      throw new Error("A generation should have at least 2 chromosome");
    }
    this.num = num;
    this.creationDate = new Date();
    this.chromosomes = chromosomes;
  }
  private bestChromosomes: IChromosome;
  private creationDate: Date;
  private num: number;

  end(chromosomesNumber: number): void {
    this.chromosomes = this.chromosomes
      .filter((chromosome) => this.validateChromosome(chromosome) === true)
      .sort((a, b) => b.fitness - a.fitness);

    this.chromosomes = this.chromosomes.slice(0, chromosomesNumber);

    this.bestChromosomes = this.chromosomes[0];
  }

  getChromosome(): IChromosome[] {
    return this.chromosomes;
  }

  toString() {
    // return "";
    return this.bestChromosomes.getGenes().toString();
  }

  validateChromosome(chromosome: IChromosome): boolean {
    if (chromosome.fitness == null) throw new Error("No fitness");
    return true;
  }
}
