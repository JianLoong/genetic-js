import Gene from "../chromosome/Gene";
import SequenceMutationBase from "./SequenceMutationBase";

export default class PartialShuffleMutation extends SequenceMutationBase {
  mutateOnSequence(sequence: Gene[]): Gene[] {
    const seq = [...sequence];
    const mutated = seq.sort(() => 0.5 - Math.random());

    return mutated;
  }
}
