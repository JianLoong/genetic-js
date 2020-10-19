import { IChromosome } from "../chromosome/IChromosome";
import { ICrossover } from "./ICrossover";

abstract class CrossoverBase implements ICrossover{
    parentNumber: number;
    childrenNumber: number;
    minChromosomeLength: number;
        
    isOrdered: boolean;
    constructor(parentsNumber: number, childrenNumber: number, minChromosomeLength? : number ){
        this.parentNumber = parentsNumber;
        this.childrenNumber = childrenNumber;
        this.minChromosomeLength = minChromosomeLength;
    }


    cross(parents: IChromosome[]): IChromosome[] {
       return this.performCross(parents);
    }

    abstract performCross(parents: IChromosome[]): IChromosome[];
    
    
}

export {CrossoverBase};