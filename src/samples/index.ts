import DecimalChromosome from "../domain/chromosome/DecimalChromosome";
import IChromosome from "../domain/chromosome/IChromosome";
import UniformCrossover from "../domain/crossovers/UniformCrossover";
import FuncFitness from "../domain/fitnesses/FuncFitness";
import GeneticAlgorithm from "../domain/GeneticAlgorithm";
import PartialShuffleMutation from "../domain/mutations/PartialShuffleMutation";
import Population from "../domain/populations/Population";
import { FitnessBasedReinsertion } from "../domain/reinsertion/FitnessBasedReinsertion";
import RouletteWheelSelection from "../domain/selections/RouletteWheelSelection";
import GenerationNumberTermination from "../domain/terminations/GenerationNumberTermination";

// Create a HashMap lookup for fitness
const fitnessMap = (chromosome: IChromosome): number => {
    const hm: Map<IChromosome, number> = new Map();
    if (hm.get(chromosome) === undefined) {
        const fitness = fitnessFunction(chromosome);
        hm.set(chromosome, fitness);
        return fitness;
    }
    return hm.get(chromosome);
};

const fitnessFunction = (chromosome: IChromosome) => {
    let sum = 0;
    for (const genes of chromosome.getGenes()) {
        sum += Number(genes.mValue);
    }
    return sum;
};

const num = 30;

const fitness = new FuncFitness(fitnessMap);

const chromosome = new DecimalChromosome(num, 0, num, false);

// Running the GA
const selection = new RouletteWheelSelection();
const crossover = new UniformCrossover(0.5);
const mutation = new PartialShuffleMutation();
const population = new Population(100, 1000, chromosome);
const termination = new GenerationNumberTermination(100);

const reinsertion = new FitnessBasedReinsertion();

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
        console.log(item.getGenes().toString() + " Fitness: " + fitnessMap(item));
    }
    const best = bestChromosomes[bestChromosomes.length - 1];
    console.log(best.getGenes().toString());
    console.log(fitnessMap(best));
}

start();
