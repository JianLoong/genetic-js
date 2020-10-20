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

console.log(gene);

var selection = new EliteSelection();
var crossover = new OrderedCrossover();
var mutation = new ReverseSequenceMutation();

const fitnessFunction = function (chromosome: IChromosome) {
    return 0;
}

var fitness = new FuncFitness(fitnessFunction);
var chromosome = new IntegerChromosome(0, 2);
var population = new Population(50, 70, chromosome);

var ga = new GeneticAlgorithm(population, fitness, selection, crossover, mutation);



console.log(ga.toString());