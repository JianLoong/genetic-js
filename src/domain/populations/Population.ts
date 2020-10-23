import { Gene } from "../chromosome/Gene";
import { IChromosome } from "../chromosome/IChromosome";
import { Generation } from "./Generation";
import { IPopulation } from "./IPopulation";

class Population implements IPopulation {
  creationDate: Date;
  generations: Generation[];
  currentGeneration: Generation;
  generationNumber: number;
  minSize: number;
  maxSize: number;
  bestChromosome: IChromosome;
  adamChromosome: IChromosome;

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

  createNewGeneration(chromosomes?: IChromosome[]): void {
    this.currentGeneration = new Generation(
      ++this.generationNumber,
      chromosomes
    );
    this.generations.push(this.currentGeneration);
  }

  createInitialGeneration(): void {
    this.generations = [];
    this.generationNumber = 0;
    let chromosomes = [];

    for (let i = 0; i < this.minSize; i++) {
      let c = this.adamChromosome.createNew();

      if (c == null) {
        throw new Error("");
      }

      chromosomes.push(c);
    }

    this.createNewGeneration(chromosomes);
  }
  endCurrentGeneration(): void {
    this.currentGeneration.end(this.maxSize);
    if (
      this.bestChromosome.fitness <
        this.currentGeneration.chromosomes[0].fitness ||
      this.bestChromosome == undefined
    ) {
      this.bestChromosome = this.currentGeneration.chromosomes[0];
    }
  }

  toString = () => {
    let str = "";
    for (let i = 0; i < this.generations.length; i++) {
      str += this.generations[i].toString();
    }
    return str;
  };
}

export { Population };
