import { Gene } from "../domain/chromosome/Gene";
import { IChromosome } from "../domain/chromosome/IChromosome";
import { IntegerChromosome } from "../domain/chromosome/IntegerChromosome";
import { NQueenChromosome } from "../domain/chromosome/NQueenChromosome";
import { OrderedCrossover } from "../domain/crossovers/OrderedCrossover";
import { UniformCrossover } from "../domain/crossovers/UniformCrossover";
import { FuncFitness } from "../domain/fitnesses/FuncFitness";
import { GeneticAlgorithm } from "../domain/GeneticAlgorithm";
import { ReverseSequenceMutation } from "../domain/mutations/ReverseSequenceMutation";
import { Population } from "../domain/populations/Population";
import { EliteSelection } from "../domain/selections/EliteSelection";


// const fitnessFunction = function (chromosome: IChromosome) {
//     let genes = chromosome.getGenes();
//     let fitness = 0;
//     for (let i = 0; i < genes.length; i++) {
//         fitness += parseInt(genes[i].m_value.toString());
//     }
//     return fitness;
// }
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
    return 10 - clashes
}


var fitness = new FuncFitness(fitnessFunction);

// Create your own chromosome
//var chromosome = new IntegerChromosome(0, 500);
var chromosome = new NQueenChromosome();

// Running the GA
var selection = new EliteSelection();
var crossover = new OrderedCrossover();
var mutation = new ReverseSequenceMutation();
var population = new Population(200, 500, chromosome);


var ga = new GeneticAlgorithm(population, fitness, selection, crossover, mutation);
console.log(ga.bestChromosome);

for (let i = 0; i < 100; i++) {
    ga.evolveOneGeneration();
    console.log(ga.bestChromosome[ga.bestChromosome.length - 1].toString());
}

