import IChromosome from "../chromosome/IChromosome";
import IPopulation from "../populations/IPopulation";
import { ReinsertionBase } from "./ReinsertionBase";

export class ElitistReinsertion extends ReinsertionBase {
    constructor(isMaximized: boolean = true) {
        super(false, true);
        this.isMaximized = isMaximized;
    }
    private isMaximized: boolean;

    performSelectChromosome(population: IPopulation, offspring: IChromosome[], parents: IChromosome[]): IChromosome[] {
        const diff = population.minSize - offspring.length;
        let best: IChromosome[] = [];

        if (diff > 0) {
            // const bestParents = [...parents];
            if (this.isMaximized)
                best = parents.sort((a, b) => b.fitness - a.fitness).slice(0, diff);
            else
                best = parents.sort((a, b) => a.fitness - b.fitness).slice(0, diff);
        }

        const result = offspring.concat(best);
        return result;
    }

}