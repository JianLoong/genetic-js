import { DecimalChromosome } from "../..";
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
  isMaximized: boolean;
  maxSize: number;
  minSize: number;

  constructor(minSize: number, maxSize: number, adamChromosome: IChromosome, isMaximized: boolean = true) {
    if (minSize < 2) throw new Error();
    if (maxSize < minSize) throw new Error();

    this.creationDate = new Date();
    this.minSize = minSize;
    this.maxSize = maxSize;
    this.generations = [];
    this.adamChromosome = adamChromosome;
    this.bestChromosome = adamChromosome;
    this.isMaximized = isMaximized;
    this.generationNumber = 0;
    this.currentGeneration = new Generation(0, [new DecimalChromosome(10, 0, 10)])

    this.createInitialGeneration();
  }

  createInitialGeneration(): void {
    this.generations = [];
    this.generationNumber = 0;
    const chromosomes: IChromosome[] = [];

    for (let i = 0; i < this.minSize; i++) {
      const c = this.adamChromosome.createNew();

      if (c == null) {
        throw new Error("Initial chromosome cannot be created.");
      }

      chromosomes.push(c);
    }

    this.createNewGeneration(chromosomes);
  }

  createNewGeneration(chromosomes: IChromosome[]): void {
    this.currentGeneration = new Generation(
      ++this.generationNumber,
      chromosomes,
      this.isMaximized
    );
    this.generations.push(this.currentGeneration);
  }
  endCurrentGeneration(): void {
    this.currentGeneration.end(this.maxSize);
    if (
      (this.bestChromosome.fitness || 0) <
      (this.currentGeneration.chromosomes[0].fitness || new DecimalChromosome(10, 0, 10)) ||
      this.bestChromosome === undefined
    ) {
      this.bestChromosome = this.currentGeneration.chromosomes[0];
    }
  }
}
