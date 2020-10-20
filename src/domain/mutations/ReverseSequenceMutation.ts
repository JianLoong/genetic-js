import { IChromosome } from "../chromosome/IChromosome";
import { SequenceMutationBase } from "./SequenceMutationBase";

class ReverseSequenceMutation extends SequenceMutationBase {
    mutateOnSequence(): void {
        throw new Error("Method not implemented.");
    }
    performMutate(chromosome: IChromosome, probability: number) {
        throw new Error("Method not implemented.");
    }
}

export { ReverseSequenceMutation }