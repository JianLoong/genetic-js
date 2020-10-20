import { IChromosome } from "../chromosome/IChromosome";
import { ICrossover } from "./ICrossover";

abstract class CrossoverBase implements ICrossover {
    public parentNumber: number;
    public childrenNumber: number;
    public minChromosomeLength: number;

    isOrdered: boolean;
    constructor(parentsNumber: number, childrenNumber: number, minChromosomeLength?: number) {
        this.parentNumber = parentsNumber;
        this.childrenNumber = childrenNumber;
        this.minChromosomeLength = minChromosomeLength;
    }


    cross(parents: IChromosome[]): IChromosome[] {
        let firstParent = parents[0];

        return this.performCross(parents);
    }

    abstract performCross(parents: IChromosome[]): IChromosome[];


}

export { CrossoverBase };