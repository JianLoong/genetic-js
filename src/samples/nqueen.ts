import DecimalChromosome from "../domain/chromosome/DecimalChromosome";
import IChromosome from "../domain/chromosome/IChromosome";
import UniformCrossover from "../domain/crossovers/UniformCrossover";
import FuncFitness from "../domain/fitnesses/FuncFitness";
import GeneticAlgorithm from "../domain/GeneticAlgorithm";
import PartialShuffleMutation from "../domain/mutations/PartialShuffleMutation";
import Population from "../domain/populations/Population";
import { FitnessBasedReinsertion } from "../domain/reinsertion/FitnessBasedReinsertion";
import RouletteWheelSelection from "../domain/selections/RouletteWheelSelection";
import TimeEvolvingTermination from "../domain/terminations/TimeEvolvingTermination";

const displayBoard = (chromosome: IChromosome): string => {
  let str = "";
  const genes = chromosome.getGenes();
  for (let i = 0; i < chromosome.length; i++) {
    for (let j = 0; j < chromosome.length; j++) {
      if (genes[j].mValue === i) str += " X ";
      else str += " - ";
    }
    str += "\n\r";
  }
  return str;
};

const noOfQueen = 12;

const good = (no) => {
  let sum = 0;
  for (let i = no - 1; i > 0; i--) sum += i;
  return sum;
};

const fitnessForQueen = good(noOfQueen);

console.log(fitnessForQueen);


const fitnessFunction = (chromosome: IChromosome) => {
  const genes = chromosome.getGenes();
  let dx = 0;
  let dy = 0;
  let clashes = 0;
  let rowClashes = 0;
  const geneArray = [];

  for (let i = 0; i < genes.length; i++) {
    const value = Number(genes[i].mValue);
    geneArray.push(value);
  }

  const uniqueItems = [...new Set(geneArray)];

  rowClashes = Math.abs(chromosome.length - uniqueItems.length);
  clashes += rowClashes;

  for (let i = 0; i < genes.length; i++) {
    for (let j = i; j < genes.length; j++) {
      const a = Number(genes[i].mValue);
      const b = Number(genes[j].mValue);
      if (i !== j) {
        dx = Math.abs(i - j);
        dy = Math.abs(a - b);
        if (dx === dy) {
          clashes += 1;
        }
      }
    }
  }
  return fitnessForQueen - clashes;
};

const fitness = new FuncFitness(fitnessFunction);

const chromosome = new DecimalChromosome(noOfQueen, 0, noOfQueen);

// Running the GA
const selection = new RouletteWheelSelection();
const crossover = new UniformCrossover(0.5);
const mutation = new PartialShuffleMutation();
const population = new Population(100, 1000, chromosome);
const termination = new TimeEvolvingTermination(10);

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
  console.log(displayBoard(best));
  console.log(fitnessFunction(best));
}

start();
