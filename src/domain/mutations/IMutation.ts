import { IChromosome } from "../chromosome/IChromosome";
import { IChromosomeOperator } from "../chromosome/IChromosomeOperator";

interface IMutation extends IChromosomeOperator {
  mutate(chromosome: IChromosome, probability: number): void;
}

export { IMutation };
