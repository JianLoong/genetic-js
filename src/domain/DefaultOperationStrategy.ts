import { IChromosome } from "./chromosome/IChromosome";
import { ICrossover } from "./crossovers/ICrossover";
import { IOperationStrategy } from "./IOperationStrategy";
import { IMutation } from "./mutations/IMutation";
import { IPopulation } from "./populations/IPopulation";

class DefaultOperationStrategy implements IOperationStrategy {
    cross(population: IPopulation, crossover: ICrossover, crossoverProbability: number, parents: IChromosome[]): IChromosome[] {
        let minSize: number = population.minSize;
        let offspring: IChromosome[] = [];
        for (let i = 0; i < minSize; i += crossover.parentNumber) {
            let selectedParents = parents.slice(2).splice(0, crossover.parentNumber);

            let cross = crossover.cross(selectedParents);

            offspring = offspring.concat(cross);
        }

        return offspring;
    }
    mutate(mutation: IMutation, mutationProbability: number, chromosomes: IChromosome[]): void {
        for (let index = 0; index < chromosomes.length; index++) {
            mutation.mutate(chromosomes[index], mutationProbability);
        }
    }

}

export { DefaultOperationStrategy }