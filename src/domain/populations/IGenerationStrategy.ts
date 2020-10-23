import { IPopulation } from "./IPopulation";

interface IGenerationStrategy {
  registerNewGeneration(population: IPopulation): void;
}
