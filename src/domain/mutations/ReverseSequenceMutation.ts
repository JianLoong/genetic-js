import Gene from "../chromosome/Gene";
import SequenceMutationBase from "./SequenceMutationBase";

export default class ReverseSequenceMutation extends SequenceMutationBase {

  mutateOnSequence(sequence: Gene[]): Gene[] {
    const seq = [...sequence];
    return seq.reverse();
  }
}
