import FloatingPointChromosome from "../domain/chromosome/FloatingPointChromosome";
import IChromosome from "../domain/chromosome/IChromosome";
import UniformCrossover from "../domain/crossovers/UniformCrossover";
import FuncFitness from "../domain/fitnesses/FuncFitness";
import GeneticAlgorithm from "../domain/GeneticAlgorithm";
import FlipBitMutation from "../domain/mutations/FlipBitMutation";
import Population from "../domain/populations/Population";
import { ElitistReinsertion } from "../domain/reinsertion/ElitistReinsertion";
import EliteSelection from "../domain/selections/EliteSelection";
import GenerationNumberTermination from "../domain/terminations/GenerationNumberTermination";

const chromosome = new FloatingPointChromosome([0, 0, 0, 0], [998, 680, 998, 680], true);

const displayValues = (chromosome: IChromosome): string => {
    const c = chromosome as FloatingPointChromosome;
    return c.expand().toString();
}

const convertToMin = (value) => {
    return 1 / (1 + value);
}

const fitnessFunction = (chromosome: IChromosome) => {
    const c = chromosome as FloatingPointChromosome;
    const values = c.expand();

    const x1 = values[0];
    const y1 = values[1];
    const x2 = values[2];
    const y2 = values[3];

    if (x1 < c.minValue[0] || x1 > c.maxValue[0])
        return -1;
    if (y1 < c.minValue[1] || y1 > c.maxValue[1])
        return -1;
    if (x2 < c.minValue[2] || x2 > c.maxValue[2])
        return -1;
    if (y2 < c.minValue[3] || y2 > c.maxValue[3])
        return -1;

    const result = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    return convertToMin(result);
}

const fitness = new FuncFitness(fitnessFunction);

// Running the GA
const selection = new EliteSelection();
const crossover = new UniformCrossover(0.5);
const mutation = new FlipBitMutation();
const population = new Population(500, 1000, chromosome);
const termination = new GenerationNumberTermination(1000);

const reinsertion = new ElitistReinsertion();

const ga = new GeneticAlgorithm(
    population,
    fitness,
    selection,
    crossover,
    mutation,
    reinsertion,
    termination
);

export function start() {
    const bestChromosomes = ga.start();

    const set = new Set([...bestChromosomes]);

    for (const item of set) {
        console.log(displayValues(item) + " Fitness: " + item.fitness);
    }
    const best = bestChromosomes[bestChromosomes.length - 1];
    // const best = ga.bestChromosome;
    console.log(best.getGenes().toString());
    console.log(fitnessFunction(best));
    console.log(displayValues(best));
}

start();