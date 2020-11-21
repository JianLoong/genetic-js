import IChromosome from "../chromosome/IChromosome";
import IPopulation from "../populations/IPopulation";

export default interface IReinsertion {
    canCollapse: boolean;
    canExpand: boolean;
    selectChromosome(population: IPopulation, offspring: IChromosome[], parents: IChromosome[]): IChromosome[];
}