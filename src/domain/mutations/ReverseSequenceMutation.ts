import { Gene } from "../chromosome/Gene";
import { IChromosome } from "../chromosome/IChromosome";
import { RandomizationProvider } from "../randomizations/RandomizationProvider";
import { SequenceMutationBase } from "./SequenceMutationBase";

class ReverseSequenceMutation extends SequenceMutationBase {

    mutateOnSequence(sequence: Gene[]): Gene[] {
        return sequence.reverse();
    }

}

export { ReverseSequenceMutation }