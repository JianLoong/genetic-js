import IChromosome from "../chromosome/IChromosome";
import IChromosomeOperator from "../chromosome/IChromosomeOperator";

export default interface ICrossover extends IChromosomeOperator {
  childrenNumber: number;
  minChromosomeLength: number;
  parentNumber: number;
  cross(parents: IChromosome[]): IChromosome[];
}
