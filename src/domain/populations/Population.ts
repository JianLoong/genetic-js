import { Gene } from "../chromosome/Gene";
import { IChromosome } from "../chromosome/IChromosome";
import { Generation } from "./Generation";
import { IPopulation } from "./IPopulation";

class Population implements IPopulation {

    creationDate: Date;
    generations: Generation[];
    currentGeneration: Generation;
    generationNumber: number;
    minSize: number;
    maxSize: number;
    bestChromosome: IChromosome;
   
    constructor(minSize: number, maxSize: number, adamChromosome: IChromosome) {
        if (minSize < 2) throw new Error();
        if (maxSize < minSize) throw new Error();

        this.creationDate = new Date();
        this.minSize = minSize;
        this.maxSize = maxSize;
        this.generations = [];

    }
   

    createInitialGeneration(): void {
        throw new Error("Method not implemented.");
    }
    createNewGeneration(): void {
        throw new Error("Method not implemented.");
    }
    endCurrentGeneration(): void {
        throw new Error("Method not implemented.");
    }

}

export {Population};