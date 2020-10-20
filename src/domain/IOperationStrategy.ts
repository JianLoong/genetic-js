import { IChromosome } from "./chromosome/IChromosome";
import { ICrossover } from "./crossovers/ICrossover";
import { IMutation } from "./mutations/IMutation";
import { IPopulation } from "./populations/IPopulation";

interface IOperationStrategy {
    cross(population: IPopulation, crossover: ICrossover, crossoverProbability: number, chromosomes: IChromosome[]): IChromosome[];
    mutate(mutation: IMutation, mutationProbability: number, chromosomes: IChromosome[]): void;
}

export { IOperationStrategy };