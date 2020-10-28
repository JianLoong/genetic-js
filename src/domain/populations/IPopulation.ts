import IChromosome from "../chromosome/IChromosome";
import Generation from "./Generation";

export default interface IPopulation {
  bestChromosome: IChromosome;
  creationDate: Date;
  currentGeneration: Generation;
  generationNumber: number;
  generations: Generation[];
  maxSize: number;
  minSize: number;

  createInitialGeneration(): void;
  createNewGeneration(chromosomes?: IChromosome[]): void;
  endCurrentGeneration(): void;
}
