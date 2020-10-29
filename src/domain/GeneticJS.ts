import UniformCrossover from "./crossovers/UniformCrossover";
import GeneticAlgorithm from "./GeneticAlgorithm";

/**
 * This file is the main entry point of the library.
 */
const createGA = (population, fitness, selection, crossover, mutation, reinsertion, termination) => {

    if (crossover === undefined)
        crossover = new UniformCrossover(0.5);

    const ga = new GeneticAlgorithm(
        population,
        fitness,
        selection,
        crossover,
        mutation,
        reinsertion,
        termination
    );
    return ga;
}

