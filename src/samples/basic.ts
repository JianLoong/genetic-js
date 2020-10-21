import { Gene } from "../domain/chromosome/Gene";
import { IChromosome } from "../domain/chromosome/IChromosome";
import { IntegerChromosome } from "../domain/chromosome/IntegerChromosome";
import { OrderedCrossover } from "../domain/crossovers/OrderedCrossover";
import { FuncFitness } from "../domain/fitnesses/FuncFitness";
import { GeneticAlgorithm } from "../domain/GeneticAlgorithm";
import { ReverseSequenceMutation } from "../domain/mutations/ReverseSequenceMutation";
import { Population } from "../domain/populations/Population";
import { EliteSelection } from "../domain/selections/EliteSelection";



// Create your own fitness function.
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
var chromosome = new IntegerChromosome(0, 20);

// Running the GA
var selection = new EliteSelection();
var crossover = new OrderedCrossover();
var mutation = new ReverseSequenceMutation();
var population = new Population(50, 70, chromosome);


var ga = new GeneticAlgorithm(population, fitness, selection, crossover, mutation);
//console.log(ga);
console.log(ga.bestChromosome);

//ga.evaluateFitness();
for (let index = 0; index < 100; index++) {
    ga.evolveOneGeneration();
}

console.log(ga.bestChromosome[9]);






