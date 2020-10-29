import IChromosome from "./chromosome/IChromosome";

export default interface IGeneticAlgorithm {
  bestChromosome: IChromosome;
  generationsNumber: number;
  timeEvolving: Date;
}
