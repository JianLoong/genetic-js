import IChromosome from "../chromosome/IChromosome";
import IPopulation from "../populations/IPopulation";

export interface IReinsertion {
    canCollapse: boolean;
    selectChromosome(population: IPopulation, offspring: IChromosome[], parents: IChromosome[]): IChromosome[];
}