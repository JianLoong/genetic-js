import { IGeneticAlgorithm } from "../IGeneticAlgorithm";
import { TerminationBase } from "./TerminationBase";

class GenerationNumberTermination extends TerminationBase {
  public expectedGenerationNumber: number;

  constructor(expectedGenerationNumber?: number) {
    super();
    if (
      expectedGenerationNumber == undefined ||
      expectedGenerationNumber == null
    )
      this.expectedGenerationNumber = 100;
    this.expectedGenerationNumber = expectedGenerationNumber;
  }

  performHasReached(geneticAlgorithm: IGeneticAlgorithm): boolean {
    return geneticAlgorithm.generationsNumber >= this.expectedGenerationNumber;
  }
}

export { GenerationNumberTermination };
