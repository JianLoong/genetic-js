import { Gene } from "../chromosome/Gene";
import { IChromosome } from "../chromosome/IChromosome";
import { RandomizationProvider } from "../randomizations/RandomizationProvider";
import { MutationBase } from "./MutationBase";

abstract class SequenceMutationBase extends MutationBase {
  protected validateLength(chromosome: IChromosome) {
    if (chromosome.length < 3) {
      throw new Error(
        "SequenceMutationBase - A chromosome shuld have at least 3 genes"
      );
    }
  }

  performMutate(chromosome: IChromosome, probability: number) {
    this.validateLength(chromosome);

    let r = RandomizationProvider.current;

    if (r.getDouble() <= probability) {
      let indexes = r
        .getUniqueInts(2, 0, chromosome.length)
        .sort((a, b) => a - b);
      let firstIndex = indexes[0];
      let secondIndex = indexes[1];
      let sequenceLength = secondIndex - firstIndex + 1;
      let sequence = chromosome.getGenes().slice(firstIndex, secondIndex);
      let mutatedSequence = this.mutateOnSequence(sequence);

      chromosome.replaceGenes(firstIndex, mutatedSequence);
    }
  }

  abstract mutateOnSequence(sequence: Gene[]): Gene[];
}

export { SequenceMutationBase };
