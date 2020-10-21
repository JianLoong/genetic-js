import { IChromosome } from "../chromosome/IChromosome";
import { IChromosomeOperator } from "../chromosome/IChromosomeOperator";

interface ICrossover extends IChromosomeOperator {
    parentNumber: number;
    childrenNumber: number;
    minChromosomeLength: number;
    cross(parents: IChromosome[]): IChromosome[];
}

export { ICrossover };