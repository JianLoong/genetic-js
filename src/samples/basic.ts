import { Gene } from "../domain/chromosome/Gene";
import { IChromosome } from "../domain/chromosome/IChromosome";
import { IntegerChromosome } from "../domain/chromosome/IntegerChromosome";
import { OrderedCrossover } from "../domain/crossovers/OrderedCrossover";
import { FuncFitness } from "../domain/fitnesses/FuncFitness";
import { GeneticAlgorithm } from "../domain/GeneticAlgorithm";
import { ReverseSequenceMutation } from "../domain/mutations/ReverseSequenceMutation";
import { Population } from "../domain/populations/Population";
import { EliteSelection } from "../domain/selections/EliteSelection";

const gene = new Gene(0);

var selection = new EliteSelection();
var crossover = new OrderedCrossover();
var mutation = new ReverseSequenceMutation();

const fitnessFunction = function (chromosome: IChromosome) {
    let genes = chromosome.getGenes();
    let fitness = 0;
    for (let i = 0; i < genes.length; i++) {
        fitness += parseInt(genes[i].m_value.toString());
    }
    return fitness;
}

var fitness = new FuncFitness(fitnessFunction);
var chromosome = new IntegerChromosome(0, 20);


var population = new Population(5, 10, chromosome);

population.createInitialGeneration();



var ga = new GeneticAlgorithm(population, fitness, selection, crossover, mutation);

ga.evolveOneGeneration();


console.log(ga);



