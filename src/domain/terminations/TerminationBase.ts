import IGeneticAlgorithm from "../IGeneticAlgorithm";
import ITermination from "./ITermination";

export default abstract class TerminationBase implements ITermination {
  mHasReached: boolean = false;

  hasReached(geneticAlgorithm: IGeneticAlgorithm): boolean {
    this.mHasReached = this.performHasReached(geneticAlgorithm);
    return this.mHasReached;
  }

  abstract performHasReached(geneticAlgorithm: IGeneticAlgorithm): boolean;
}
