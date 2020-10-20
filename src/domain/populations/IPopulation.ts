import { IChromosome } from "../chromosome/IChromosome";
import { Generation } from "./Generation";

interface IPopulation {
    creationDate: Date;
    generations: Generation[];
    currentGeneration: Generation;
    generationNumber: number;
    minSize: number;
    maxSize: number;
    bestChromosome: IChromosome;

    createInitialGeneration(): void;
    createNewGeneration(chromosomes?: IChromosome[]): void;
    endCurrentGeneration(): void;

}

export { IPopulation };