import { IChromosome } from "../domain/chromosome/IChromosome";
import { IntegerChromosome } from "../domain/chromosome/IntegerChromosome";
import { UniformCrossover } from "../domain/crossovers/UniformCrossover";
import { FuncFitness } from "../domain/fitnesses/FuncFitness";
import { GeneticAlgorithm } from "../domain/GeneticAlgorithm";
import { ReverseSequenceMutation } from "../domain/mutations/ReverseSequenceMutation";
import { Population } from "../domain/populations/Population";
import { EliteSelection } from "../domain/selections/EliteSelection";


const fitnessFunction = function (chromosome: IChromosome) {
    let genes = chromosome.getGenes();
    let fitness = 0;
    for (let i = 0; i < genes.length; i++) {
        fitness += parseInt(genes[i].m_value.toString());
    }
    return fitness;
}

var fitness = new FuncFitness(fitnessFunction);

// Create your own chromosome
var chromosome = new IntegerChromosome(0, 500);

// Running the GA
var selection = new EliteSelection();
var crossover = new UniformCrossover(0.5);
var mutation = new ReverseSequenceMutation();
var population = new Population(20, 70, chromosome);


var ga = new GeneticAlgorithm(population, fitness, selection, crossover, mutation);
console.log(ga.bestChromosome);

for (let i = 0; i < 15; i++) {
    ga.evolveOneGeneration();
    console.log(ga.bestChromosome[ga.bestChromosome.length - 1].toString());
}
