import IChromosome from "../chromosome/IChromosome";
import IPopulation from "../populations/IPopulation";
import { ReinsertionBase } from "./ReinsertionBase";

export class FitnessBasedReinsertion extends ReinsertionBase {
    constructor() {
        super(false, true);
    }


    performSelectChromosome(population: IPopulation, offspring: IChromosome[], parents: IChromosome[]): IChromosome[] {
        if (offspring.length > population.maxSize) {
            const selected = offspring.sort((a, b) => b.fitness - b.fitness).slice(0, population.maxSize - 1);
            return selected;
        }

        return offspring;
    }

}