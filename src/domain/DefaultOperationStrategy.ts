import IChromosome from "./chromosome/IChromosome";
import ICrossover from "./crossovers/ICrossover";
import IOperationStrategy from "./IOperationStrategy";
import IMutation from "./mutations/IMutation";
import IPopulation from "./populations/IPopulation";
import RandomizationProvider from "./randomization/RandomizationProvider";

export default class DefaultOperationStrategy implements IOperationStrategy {
  cross(
    population: IPopulation,
    crossover: ICrossover,
    crossoverProbability: number,
    parents: IChromosome[]
  ): IChromosome[] {
    const minSize: number = population.minSize;
    let offspring: IChromosome[] = [];
    for (let i = 0; i < minSize; i += crossover.parentNumber) {
      const selectedParents = parents.slice(2).splice(0, crossover.parentNumber);
      if (selectedParents.length === crossover.parentNumber &&
        RandomizationProvider.current.getDouble() <= crossoverProbability) {

        const cross = crossover.cross(selectedParents);

        offspring = offspring.concat(cross);
      }
    }

    return offspring;
  }
  mutate(
    mutation: IMutation,
    mutationProbability: number,
    chromosomes: IChromosome[]): void {

    for (const chromosome of chromosomes) {
      mutation.mutate(chromosome, mutationProbability);

    }
  }
}
