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
        if (parents == null)
            throw new Error("Error - CrossOverbase: Number of parents cannot be null.");

        let firstParent = parents[0];

        if (firstParent.length < this.minChromosomeLength) {
            throw new Error("Error: A chromosome should have at least 0 genes");
        }

        return this.performCross(parents);
    }

    abstract performCross(parents: IChromosome[]): IChromosome[];


}

export { CrossoverBase };