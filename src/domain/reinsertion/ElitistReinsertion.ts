import IChromosome from "../chromosome/IChromosome";
import IPopulation from "../populations/IPopulation";
import { ReinsertionBase } from "./ReinsertionBase";

export class ElitistReinsertion extends ReinsertionBase {
    constructor() {
        super(false, true);
    }


    performSelectChromosome(population: IPopulation, offspring: IChromosome[], parents: IChromosome[]): IChromosome[] {
        const diff = population.minSize - offspring.length;
        let best: IChromosome[] = [];

        if (diff > 0) {
            const bestParents = [...parents];
            best = bestParents.sort((a, b) => b.fitness - a.fitness).slice(0, diff);
        }

        const result = offspring.concat(best);
        return result;
    }

}