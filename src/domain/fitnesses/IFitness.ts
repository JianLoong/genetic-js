import { IChromosome } from "../chromosome/IChromosome";

interface IFitness {
    evaluate(chromosome: IChromosome): number;
}

export {IFitness}