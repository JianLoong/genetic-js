import IGeneticAlgorithm from "../IGeneticAlgorithm";
import ITermination from "./ITermination";

export default abstract class TerminationBase implements ITermination {
  private mHasReached: boolean;

  hasReached(geneticAlgorithm: IGeneticAlgorithm): boolean {
    this.mHasReached = this.performHasReached(geneticAlgorithm);
    return this.mHasReached;
  }

  abstract performHasReached(geneticAlgorithm: IGeneticAlgorithm): boolean;
}
