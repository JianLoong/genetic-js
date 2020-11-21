import IChromosome from "../chromosome/IChromosome";
import RandomizationProvider from "../randomization/RandomizationProvider";
import MutationBase from "./MutationBase";

export default class TwoRandomMutation extends MutationBase {

    constructor(indexes?: number[]) {
        super();
        if (indexes === undefined) {
            this.indexes = [];
        }
        else
            this.indexes = indexes;
    }

    private indexes: number[];

    performMutate(chromosome: IChromosome, probability: number): void {

        if (this.indexes.length === 0) {
            this.indexes = RandomizationProvider.current.getUniqueInts(2, 0, chromosome.length);
        }

        if (this.indexes.length !== 2) {
            throw new Error("Only 2 indexes are needed for two random mutation");
        }

        const sorted = this.indexes.sort((a, b) => a - b);
        const genes = chromosome.getGenes();

        if (RandomizationProvider.current.getDouble() <= probability) {
            let firstGene = genes[sorted[0]];
            let secondGene = genes[sorted[1]];
            [firstGene, secondGene] = [secondGene, firstGene];
            chromosome.replaceGene(sorted[0], firstGene);
            chromosome.replaceGene(sorted[1], secondGene);
        }
    }

}