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
    adamChromosome: IChromosome;

    constructor(minSize: number, maxSize: number, adamChromosome: IChromosome) {
        if (minSize < 2) throw new Error();
        if (maxSize < minSize) throw new Error();

        this.creationDate = new Date();
        this.minSize = minSize;
        this.maxSize = maxSize;
        this.generations = [];

    }
    createNewGeneration(chromosomes?: IChromosome[]): void {

    }


    createInitialGeneration(): void {
        this.generations = [];
        this.generationNumber = 0;
        let chromosomes = [];

        for (let i = 0; i < this.minSize; i++) {
            let c = this.adamChromosome.createNew();

            if (c == null) {
                throw new Error("");
            }



            chromosomes.push(c);
        }

        //this.createNewGeneration(chromosomes);

    }
    endCurrentGeneration(): void {
        this.currentGeneration.end(this.maxSize);

    }

}

export { Population };