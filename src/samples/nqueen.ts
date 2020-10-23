import { ChromosomeBase } from "../domain/chromosome/ChromosomeBase";
import { Gene } from "../domain/chromosome/Gene";
import { IChromosome } from "../domain/chromosome/IChromosome";
import { IntegerChromosome } from "../domain/chromosome/IntegerChromosome";
import { NQueenChromosome } from "../domain/chromosome/NQueenChromosome";
import { OrderedCrossover } from "../domain/crossovers/OrderedCrossover";
import { UniformCrossover } from "../domain/crossovers/UniformCrossover";
import { FuncFitness } from "../domain/fitnesses/FuncFitness";
import { GeneticAlgorithm } from "../domain/GeneticAlgorithm";
import { PartialShuffleMutation } from "../domain/mutations/PartialShuffleMutation";
import { ReverseSequenceMutation } from "../domain/mutations/ReverseSequenceMutation";
import { Population } from "../domain/populations/Population";
import { EliteSelection } from "../domain/selections/EliteSelection";
import { GenerationNumberTermination } from "../domain/terminations/GenerationNumberTermination";



const noOfQueen = 10;
const good = (no) => {
    let sum = 0;
    for (let i = no - 1; i > 0; i--)
        sum += i;
    return sum;
}

const fitnessForQueen = good(noOfQueen);

console.log(fitnessForQueen);

// Create a hashtable lookup for fitnesss
const fitnessMap = (chromosome: IChromosome): number => {
    let hm: Map<IChromosome, number> = new Map();
    if (hm.get(chromosome) == undefined) {
        let fitness = fitnessFunction(chromosome);
        hm.set(chromosome, fitness);
        return fitness;
    }

    return hm.get(chromosome);
}

const fitnessFunction = (chromosome: IChromosome) => {
    let genes = chromosome.getGenes();
    let dx = 0;
    let dy = 0;
    let clashes = 0;
    let rowClashes = 0;
    let geneArray = [];

    // Create a gene array
    for (let i = 0; i < genes.length; i++) {
        let value = Number(genes[i].m_value);
        geneArray.push(value);
    }

    var uniqueItems = [...new Set(geneArray)];

    rowClashes = Math.abs(chromosome.length - uniqueItems.length);
    clashes += rowClashes;

    for (let i = 0; i < genes.length; i++) {
        for (let j = i; j < genes.length; j++) {
            let a = Number(genes[i].m_value);
            let b = Number(genes[j].m_value);
            if (i != j) {
                dx = Math.abs(i - j);
                dy = Math.abs(a - b)
                if (dx == dy) {
                    clashes += 1;
                }
            }


        }
    }
    return fitnessForQueen - clashes
}


var fitness = new FuncFitness(fitnessMap);

var chromosome = new NQueenChromosome(noOfQueen)

// Running the GA
var selection = new EliteSelection();
var crossover = new OrderedCrossover();
var mutation = new PartialShuffleMutation();
var population = new Population(100, 1000, chromosome);

var ga = new GeneticAlgorithm(population, fitness, selection, crossover, mutation);
console.log(ga.bestChromosome);


ga.evolveOneGeneration();

let stringOut = "";

for (let i = 0; i < 500; i++) {
    stringOut += ga.bestChromosome.toString() + "\n";
    //console.log(ga.bestChromosome.toString());
    ga.evolveOneGeneration();

}

console.log(stringOut);

