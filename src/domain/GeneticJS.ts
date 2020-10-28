import { GeneticAlgorithm, UniformCrossover } from "."
import IFitness from "./fitnesses/IFitness";
/**
 * This file is the main entry point of the library.
 */
const createGA = (population, fitness: IFitness, selection, crossover, mutation, reinsertion) => {

    if (crossover === undefined)
        crossover = new UniformCrossover(0.5);

    const ga = new GeneticAlgorithm(
        population,
        fitness,
        selection,
        crossover,
        mutation,
        reinsertion
    );
    return ga;
}

const start = (ga: GeneticAlgorithm, generationNumber: number) => {
    ga.start(generationNumber);
}