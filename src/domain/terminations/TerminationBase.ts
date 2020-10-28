import IGeneticAlgorithm from "../IGeneticAlgorithm";
import ITermination from "./ITermination";

export default abstract class TerminationBase implements ITermination {
  private m_hasReached: boolean;

  hasReached(geneticAlgorithm: IGeneticAlgorithm): boolean {
    return this.m_hasReached;
  }

  abstract performHasReached(geneticAlgorithm: IGeneticAlgorithm): boolean;
}
