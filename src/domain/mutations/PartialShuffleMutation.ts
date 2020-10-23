import { Gene } from "../chromosome/Gene";
import { SequenceMutationBase } from "./SequenceMutationBase";

class PartialShuffleMutation extends SequenceMutationBase {
  mutateOnSequence(sequence: Gene[]): Gene[] {
    let mutated = sequence.sort(() => 0.5 - Math.random());
    return mutated;
  }
}

export { PartialShuffleMutation };
