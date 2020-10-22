import { IChromosome } from "../chromosome/IChromosome";
import { MutationBase } from "./MutationBase";

abstract class SequenceMutationBase extends MutationBase {
    abstract performMutate(chromosome: IChromosome, probability: number);

    abstract mutateOnSequence(): void;
}

export { SequenceMutationBase }