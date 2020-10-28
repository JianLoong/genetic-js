// import IChromosome from "../domain/chromosome/IChromosome";
// import NQueenChromosome from "../domain/chromosome/NQueenChromosome";
// import OrderedCrossover from "../domain/crossovers/OrderedCrossover";
// import FuncFitness from "../domain/fitnesses/FuncFitness";
// import GeneticAlgorithm from "../domain/GeneticAlgorithm";
// import PartialShuffleMutation from "../domain/mutations/PartialShuffleMutation";
// import Population from "../domain/populations/Population";
// import EliteSelection from "../domain/selections/EliteSelection";

// const displayBoard = (chromosome: IChromosome): string => {
//   let str = "";
//   const genes = chromosome.getGenes();
//   for (let i = 0; i < chromosome.length; i++) {
//     for (let j = 0; j < chromosome.length; j++) {
//       if (genes[j].mValue == i) str += " X ";
//       else str += " - ";
//     }
//     str += "\n\r";
//   }
//   return str;
// };

// const noOfQueen = 8;

// const good = (no) => {
//   let sum = 0;
//   for (let i = no - 1; i > 0; i--) sum += i;
//   return sum;
// };

// const fitnessForQueen = good(noOfQueen);

// // console.log(fitnessForQueen);

// // Create a HashMap lookup for fitnesss
// const fitnessMap = (chromosome: IChromosome): number => {
//   const hm: Map<IChromosome, number> = new Map();
//   if (hm.get(chromosome) == undefined) {
//     const fitness = fitnessFunction(chromosome);
//     hm.set(chromosome, fitness);
//     return fitness;
//   }

//   return hm.get(chromosome);
// };

// const fitnessFunction = (chromosome: IChromosome) => {
//   const genes = chromosome.getGenes();
//   let dx = 0;
//   let dy = 0;
//   let clashes = 0;
//   let rowClashes = 0;
//   const geneArray = [];

//   for (let i = 0; i < genes.length; i++) {
//     const value = Number(genes[i].mValue);
//     geneArray.push(value);
//   }

//   const uniqueItems = [...new Set(geneArray)];

//   rowClashes = Math.abs(chromosome.length - uniqueItems.length);
//   clashes += rowClashes;

//   for (let i = 0; i < genes.length; i++) {
//     for (let j = i; j < genes.length; j++) {
//       const a = Number(genes[i].mValue);
//       const b = Number(genes[j].mValue);
//       if (i != j) {
//         dx = Math.abs(i - j);
//         dy = Math.abs(a - b);
//         if (dx == dy) {
//           clashes += 1;
//         }
//       }
//     }
//   }
//   return fitnessForQueen - clashes;
// };

// const fitness = new FuncFitness(fitnessMap);

// const chromosome = new NQueenChromosome(noOfQueen);

// // Running the GA
// const selection = new EliteSelection();
// const crossover = new OrderedCrossover();
// const mutation = new PartialShuffleMutation();
// const population = new Population(100, 1000, chromosome);

// const ga = new GeneticAlgorithm(
//   population,
//   fitness,
//   selection,
//   crossover,
//   mutation
// );

// // ga.start(100, 3, displayBoard);
// // console.log(stringOut);

// // console.log("Generations: " + ga.population.generations.length);
// // console.log(displayBoard(ga.bestChromosome));
// // console.log(fitnessFunction(ga.bestChromosome));
// onmessage = function (e) {
//   const generation = e.data[0];

//   const t0 = performance.now();
//   const arr = ga.start(generation);

//   const t1 = performance.now();
//   console.log(`${t1 - t0} milliseconds.`);

//   console.log(
//     arr[arr.length - 1].getGenes().toString() +
//     " " +
//     fitnessMap(arr[arr.length - 1])
//   );

//   console.log(displayBoard(arr[arr.length - 1]));

//   self.close();
// };
