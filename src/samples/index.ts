import { IChromosome } from "../domain/chromosome/IChromosome";
import { IntegerChromosome } from "../domain/chromosome/IntegerChromosome";
import { OrderedCrossover } from "../domain/crossovers/OrderedCrossover";
import { FuncFitness } from "../domain/fitnesses/FuncFitness";
import { GeneticAlgorithm } from "../domain/GeneticAlgorithm";
import { PartialShuffleMutation } from "../domain/mutations/PartialShuffleMutation";
import { Population } from "../domain/populations/Population";
import { EliteSelection } from "../domain/selections/EliteSelection";

const fitnessFunction = function (chromosome: IChromosome): number {
  let genes = chromosome.getGenes();
  let fitness = 0;
  for (let i = 0; i < genes.length; i++) {
    fitness += parseInt(genes[i].m_value.toString());
  }
  return fitness;
};

var fitness = new FuncFitness(fitnessFunction);

// Create your own chromosome
var chromosome = new IntegerChromosome(0, Number.MAX_SAFE_INTEGER);

// Running the GA
var selection = new EliteSelection();
var crossover = new OrderedCrossover();
var mutation = new PartialShuffleMutation();
var population = new Population(200, 1000, chromosome);

var ga = new GeneticAlgorithm(
  population,
  fitness,
  selection,
  crossover,
  mutation
);
console.log(ga.bestChromosome);

for (let i = 0; i < 1000; i++) {
  ga.evolveOneGeneration();
  console.log(ga.bestChromosome.toString());
}
