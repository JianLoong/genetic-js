import { IGeneticAlgorithm } from "../IGeneticAlgorithm";

interface ITermination {
  hasReached(geneticAlgorithm: IGeneticAlgorithm): boolean;
}

export { ITermination };
