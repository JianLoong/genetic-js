import IChromosome from "../chromosome/IChromosome";
import IPopulation from "../populations/IPopulation";
import IReinsertion from "./IReinsertion";

export abstract class ReinsertionBase implements IReinsertion {
    canCollapse: boolean;
    canExpand: boolean;

    constructor(canCollapse: boolean, canExpand: boolean) {
        this.canCollapse = canCollapse;
        this.canExpand = canExpand;
    }

    abstract performSelectChromosome(
        population: IPopulation,
        offspring: IChromosome[],
        parents: IChromosome[]
    ): IChromosome[];

    selectChromosome(population: IPopulation, offspring: IChromosome[], parents: IChromosome[]) {
        if (offspring.length === 0)
            throw new Error("There are no offsprings.");

        if (!this.canExpand && offspring.length < population.minSize) {
            throw new Error("Chromosome cannot be selected as the number of offsprings exceed the min size of the population.");
        }

        return this.performSelectChromosome(population, offspring, parents);
    }

}