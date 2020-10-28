import IPopulation from "./IPopulation";

export default interface IGenerationStrategy {
  registerNewGeneration(population: IPopulation): void;
}
