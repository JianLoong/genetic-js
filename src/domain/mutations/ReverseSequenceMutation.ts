import Gene from "../chromosome/Gene";
import SequenceMutationBase from "./SequenceMutationBase";

export default class ReverseSequenceMutation extends SequenceMutationBase {

  mutateOnSequence(sequence: Gene[]): Gene[] {
    return sequence.reverse();
  }
}
