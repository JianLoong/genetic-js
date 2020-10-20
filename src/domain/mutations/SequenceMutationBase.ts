import { IChromosome } from "../chromosome/IChromosome";
import { MutationBase } from "./MutationBase";

abstract class SequenceMutationBase extends MutationBase {
    performMutate(chromosome: IChromosome, probability: number) {

    }

    validateLength(chromosome: IChromosome): void {

    }
}

export { SequenceMutationBase }