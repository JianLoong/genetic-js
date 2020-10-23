import { IChromosome } from "./chromosome/IChromosome";

interface IGeneticAlgorithm {
  generationsNumber: number;
  bestChromosome: IChromosome;
}

export { IGeneticAlgorithm };
