import { IChromosome } from "../chromosome/IChromosome";
import { IFitness } from "./IFitness"

class FuncFitness implements IFitness {

    m_func: Function;

    constructor(f: Function) {
        this.m_func = f;
    }

    evaluate(chromosome: IChromosome): number {
        return this.m_func(chromosome);
    }
}

export { FuncFitness };