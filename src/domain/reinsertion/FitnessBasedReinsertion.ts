import { FuncFitness } from "../..";
import IChromosome from "../chromosome/IChromosome";
import IPopulation from "../populations/IPopulation";
import { ReinsertionBase } from "./ReinsertionBase";

export default class FitnessBasedReinsertion extends ReinsertionBase {
    constructor(isMaximized?: boolean) {
        super(false, true);
        if (isMaximized === undefined)
            this.isMaximized = true;
        else
            this.isMaximized = isMaximized;
    }

    private isMaximized: boolean;

    performSelectChromosome(population: IPopulation, offspring: IChromosome[], parents: IChromosome[]): IChromosome[] {
        if (offspring.length > population.maxSize) {
            const selected = FuncFitness.sort(offspring, this.isMaximized).slice(0, population.maxSize - 1);
            return selected;
        }

        if (offspring.length === 0)
            return parents;
        return offspring;
    }
}