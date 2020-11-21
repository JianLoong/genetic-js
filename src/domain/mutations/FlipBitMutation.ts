// import { BinaryChromosomeBase } from "../..";
import { IBinaryChromosome } from "../chromosome/IBinaryChromosome";
import IChromosome from "../chromosome/IChromosome";
import RandomizationProvider from "../randomization/RandomizationProvider";
import MutationBase from "./MutationBase";

export default class FlipBitMutation extends MutationBase {
    constructor(indexes?: number[]) {
        super();
        if (indexes === undefined)
            this.indexes = [];
        else
            this.indexes = indexes;
    }

    private indexes: number[];

    performMutate(chromosome: IChromosome, probability: number): void {
        const bc = chromosome as IBinaryChromosome;

        if (this.indexes.length === 0)
            this.indexes = RandomizationProvider.current.getUniqueInts(chromosome.length, 0, chromosome.length);

        if (RandomizationProvider.current.getDouble() <= probability) {
            this.indexes.forEach(element => {
                if (element >= chromosome.length)
                    throw new Error("FlipBit mutation has invalid index");
                if (element < 0)
                    throw new Error("FlipBit mutation has invalid index");
                bc.flipGene(element);
            });
        }

    }

}