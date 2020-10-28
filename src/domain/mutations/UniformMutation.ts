import IChromosome from "../chromosome/IChromosome";
import MutationBase from "./MutationBase";

export default class UniformMutation extends MutationBase {
    performMutate(chromosome: IChromosome, probability: number): void {
        throw new Error("Method not implemented.");
    }

}