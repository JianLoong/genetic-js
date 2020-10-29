import Float32Encoding from "../commons/Float32Encoding";
import DecimalChromosome from "../domain/chromosome/DecimalChromosome";
import FloatingPointChromosome from "../domain/chromosome/FloatingPointChromosome";
import IChromosome from "../domain/chromosome/IChromosome";
import UniformCrossover from "../domain/crossovers/UniformCrossover";
import FuncFitness from "../domain/fitnesses/FuncFitness";
import GeneticAlgorithm from "../domain/GeneticAlgorithm";
import PartialShuffleMutation from "../domain/mutations/PartialShuffleMutation";
import Population from "../domain/populations/Population";
import { FitnessBasedReinsertion } from "../domain/reinsertion/FitnessBasedReinsertion";
import RouletteWheelSelection from "../domain/selections/RouletteWheelSelection";
import { GenerationNumberTermination, TimeEvolvingTermination } from "../domain/terminations/Index";

const chromosome = new FloatingPointChromosome([0, 0], [100, 100]);

const fitnessFunction = (chromosome: IChromosome) => {
    const c = chromosome as FloatingPointChromosome;
    const sum = 0;
    const genes = c.originalValue;
    const values = [];
    for (let i = 0; i < genes.length; i = i + 32) {
        const sliced = genes.slice(i, i + 32).toString().replace(/,/g, "");
        values.push(Float32Encoding.convertBinToFloat32(sliced));
    }
    return values[0] - values[1];
}


function chunk(arr, chunkSize): any[] {
    const R = [];
    for (let i = 0, len = arr.length; i < len; i += chunkSize)
        R.push(arr.slice(i, i + chunkSize));
    return R;
}

const fitness = new FuncFitness(fitnessFunction);

// Running the GA
const selection = new RouletteWheelSelection();
const crossover = new UniformCrossover(0.5);
const mutation = new PartialShuffleMutation();
const population = new Population(100, 1000, chromosome);
const termination = new GenerationNumberTermination(500);

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
}

start();
