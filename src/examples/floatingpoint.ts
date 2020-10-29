import Float32Encoding from "../commons/Float32Encoding";
import FloatingPointChromosome from "../domain/chromosome/FloatingPointChromosome";
import IChromosome from "../domain/chromosome/IChromosome";
import UniformCrossover from "../domain/crossovers/UniformCrossover";
import FuncFitness from "../domain/fitnesses/FuncFitness";
import GeneticAlgorithm from "../domain/GeneticAlgorithm";
import FlipBitMutation from "../domain/mutations/FlipBitMutation";
import Population from "../domain/populations/Population";
import { FitnessBasedReinsertion } from "../domain/reinsertion/FitnessBasedReinsertion";
import EliteSelection from "../domain/selections/EliteSelection";
import { FitnessStagnationTermination } from "../domain/terminations/Index";

const chromosome = new FloatingPointChromosome([0, 0, 0, 0], [998, 680, 998, 680]);

const displayValues = (chromosome: IChromosome): string => {
    const c = chromosome as FloatingPointChromosome;
    const genes = c.originalValue;
    const values = [];
    for (let i = 0; i < genes.length; i = i + 32) {
        const sliced = genes.slice(i, i + 32).toString().replace(/,/g, "");
        values.push(Float32Encoding.convertBinToFloat32(sliced));
    }

    const x1 = values[0];
    const y1 = values[1];
    const x2 = values[2];
    const y2 = values[3];
    return x1 + "," + y1 + "," + x2 + "," + y2;
}

const fitnessFunction = (chromosome: IChromosome) => {
    const c = chromosome as FloatingPointChromosome;
    const genes = c.originalValue;
    const values = [];
    for (let i = 0; i < genes.length; i = i + 32) {
        const sliced = genes.slice(i, i + 32).toString().replace(/,/g, "");
        values.push(Float32Encoding.convertBinToFloat32(sliced));
    }

    const x1 = values[0];
    const y1 = values[1];
    const x2 = values[2];
    const y2 = values[3];
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))
}



const fitness = new FuncFitness(fitnessFunction);

// Running the GA
const selection = new EliteSelection();
const crossover = new UniformCrossover(0.5);
const mutation = new FlipBitMutation();
const population = new Population(100, 1000, chromosome);
const termination = new FitnessStagnationTermination(100);

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
        console.log(item.getGenes().toString() + " Fitness: " + fitnessFunction(item));
    }
    const best = bestChromosomes[bestChromosomes.length - 1];
    // const best = ga.bestChromosome;
    console.log(best.getGenes().toString());
    console.log(fitnessFunction(best));
    console.log(displayValues(best));
}

start();
