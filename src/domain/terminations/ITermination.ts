import IGeneticAlgorithm from "../IGeneticAlgorithm";

export default interface ITermination {
  hasReached(geneticAlgorithm: IGeneticAlgorithm): boolean;
}
