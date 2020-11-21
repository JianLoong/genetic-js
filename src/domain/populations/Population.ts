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
    this.currentGeneration = new Generation(0, []);

    this.createInitialGeneration();
  }

  createInitialGeneration(): void {
    this.generations = [];
    this.generationNumber = 0;
    const chromosomes: IChromosome[] = [];

    for (let i = 0; i < this.minSize; i++) {
      const c = this.adamChromosome.createNew();
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
    if (this.bestChromosome.fitness === undefined)
      throw new Error("The fitness of the best chromosome needs to be evaluated.");

    if (this.currentGeneration.chromosomes[0].fitness === undefined)
      throw new Error("Generation cannot be ended as their fitness has not been evaluated.");


    this.currentGeneration.end(this.maxSize);

    if (this.isMaximized) {
      if (
        this.bestChromosome.fitness <
        this.currentGeneration.chromosomes[0].fitness
      ) {
        this.bestChromosome = this.currentGeneration.chromosomes[0];
      }
    } else {
      if (
        this.currentGeneration.chromosomes[0].fitness < this.bestChromosome.fitness
      ) {
        this.bestChromosome = this.currentGeneration.chromosomes[0];
      }
    }
  }
}
