import IChromosome from "../chromosome/IChromosome";
import IPopulation from "../populations/IPopulation";
import RandomizationProvider from "../randomization/RandomizationProvider";
import { ReinsertionBase } from "./ReinsertionBase";

export class UniformReinsertion extends ReinsertionBase {
    constructor() {
        super(false, true);
    }

    performSelectChromosome(population: IPopulation, offspring: IChromosome[], parents: IChromosome[]): IChromosome[] {
        while (offspring.length < population.minSize) {
            const random = RandomizationProvider.current.getInt(0, offspring.length);
            offspring.push(offspring[random]);
        }
        return offspring;
    }
}