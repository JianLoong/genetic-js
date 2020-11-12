import Gene from "../chromosome/Gene";
import IChromosome from "../chromosome/IChromosome";
import RandomizationProvider from "../randomization/RandomizationProvider";
import MutationBase from "./MutationBase";

export default abstract class SequenceMutationBase extends MutationBase {

  abstract mutateOnSequence(sequence: Gene[]): Gene[];

  performMutate(chromosome: IChromosome, probability: number) {
    this.validateLength(chromosome);

    const r = RandomizationProvider.current;

    if (r.getDouble() <= probability) {
      const indexes = r
        .getUniqueInts(2, 0, chromosome.length)
        .sort((a, b) => a - b);
      const firstIndex = indexes[0];
      const secondIndex = indexes[1];
      const sequence = chromosome.getGenes().slice(firstIndex, secondIndex);
      const mutatedSequence = this.mutateOnSequence(sequence);

      chromosome.replaceGenes(firstIndex, mutatedSequence);
    }
  }
  protected validateLength(chromosome: IChromosome) {
    if (chromosome.length < 3) {
      throw new Error(
        "SequenceMutationBase - A chromosome should have at least 3 genes"
      );
    }
  }
}
