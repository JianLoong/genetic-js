import { IChromosome } from "../chromosome/IChromosome";
import { CrossoverBase } from "./CrossoverBase";

class OrderedCrossover extends CrossoverBase {
    constructor() {
        super(2, 2);
        this.isOrdered = true;
    }
    performCross(parents: IChromosome[]): IChromosome[] {
        let firstParent = parents[0];
        let secondParent = parents[1];

        return [firstParent, secondParent];
    }

}

export { OrderedCrossover };