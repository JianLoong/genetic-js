import { FuncFitness } from "../..";
import IChromosome from "../chromosome/IChromosome";
import IPopulation from "../populations/IPopulation";
import { ReinsertionBase } from "./ReinsertionBase";

export default class ElitistReinsertion extends ReinsertionBase {
    constructor(isMaximized?: boolean) {
        super(false, true);
        if (isMaximized === undefined)
            this.isMaximized = true;
        else
            this.isMaximized = isMaximized;
    }

    private isMaximized: boolean;

    performSelectChromosome(population: IPopulation, offspring: IChromosome[], parents: IChromosome[]): IChromosome[] {
        const diff = population.minSize - offspring.length;
        let best: IChromosome[] = [];

        // If there are less offsprings than the min size
        if (diff > 0) {
            best = FuncFitness.sort(parents, this.isMaximized).slice(0, diff);
        }

        const result = offspring.concat(best);
        return result;
    }

}