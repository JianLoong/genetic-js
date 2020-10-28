import IChromosome from "../chromosome/IChromosome";
import Generation from "./Generation";
import IPopulation from "./IPopulation";

export default class Population implements IPopulation {
  public adamChromosome: IChromosome;
  bestChromosome: IChromosome;
  creationDate: Date;
  currentGeneration: Generation;
  generationNumber: number;
  generations: Generation[];
  maxSize: number;
  minSize: number;

  constructor(minSize: number, maxSize: number, adamChromosome: IChromosome) {
    if (minSize < 2) throw new Error();
    if (maxSize < minSize) throw new Error();

    this.creationDate = new Date();
    this.minSize = minSize;
    this.maxSize = maxSize;
    this.generations = [];
    this.adamChromosome = adamChromosome;
    this.bestChromosome = adamChromosome;

    this.createInitialGeneration();
  }

  createInitialGeneration(): void {
    this.generations = [];
    this.generationNumber = 0;
    const chromosomes = [];

    for (let i = 0; i < this.minSize; i++) {
      const c = this.adamChromosome.createNew();

      if (c == null) {
        throw new Error("");
      }

      chromosomes.push(c);
    }

    this.createNewGeneration(chromosomes);
  }

  createNewGeneration(chromosomes?: IChromosome[]): void {
    this.currentGeneration = new Generation(
      ++this.generationNumber,
      chromosomes
    );
    this.generations.push(this.currentGeneration);
  }
  endCurrentGeneration(): void {
    this.currentGeneration.end(this.maxSize);
    if (
      this.bestChromosome.fitness <
      this.currentGeneration.chromosomes[0].fitness ||
      this.bestChromosome === undefined
    ) {
      this.bestChromosome = this.currentGeneration.chromosomes[0];
    }
  }

  toString = () => {
    let str = "";
    for (const generation of this.generations) {
      str += this.generations.toString();
    }
    return str;
  };
}
