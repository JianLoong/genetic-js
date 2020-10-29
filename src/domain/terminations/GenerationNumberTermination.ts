import IGeneticAlgorithm from "../IGeneticAlgorithm";
import TerminationBase from "./TerminationBase";

export default class GenerationNumberTermination extends TerminationBase {
  public expectedGenerationNumber: number;

  constructor(expectedGenerationNumber?: number) {
    super();
    if (
      expectedGenerationNumber === undefined ||
      expectedGenerationNumber === null
    )
      this.expectedGenerationNumber = 100;
    else
      this.expectedGenerationNumber = expectedGenerationNumber;
  }

  performHasReached(geneticAlgorithm: IGeneticAlgorithm): boolean {
    return geneticAlgorithm.generationsNumber >= this.expectedGenerationNumber;
  }
}
