import IChromosome from "../chromosome/IChromosome";
import IChromosomeOperator from "../chromosome/IChromosomeOperator";

export default interface IMutation extends IChromosomeOperator {
  mutate(chromosome: IChromosome, probability: number): void;
}
