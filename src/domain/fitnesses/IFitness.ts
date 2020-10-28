import IChromosome from "../chromosome/IChromosome";

export default interface IFitness {
  evaluate(chromosome: IChromosome): number;
}
