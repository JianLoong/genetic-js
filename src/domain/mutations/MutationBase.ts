import { IChromosome } from "../chromosome/IChromosome";
import { IMutation } from "./IMutation";

abstract class MutationBase implements IMutation {
    mutate(chromosome: IChromosome, probability: number) {
        this.performMutate(chromosome, probability);
    }
    isOrdered: boolean;

    abstract performMutate(chromosome: IChromosome, probability: number);

}

export {MutationBase};