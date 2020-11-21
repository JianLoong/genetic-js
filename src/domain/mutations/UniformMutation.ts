import IChromosome from "../chromosome/IChromosome";
import RandomizationProvider from "../randomization/RandomizationProvider";
import MutationBase from "./MutationBase";

export default class UniformMutation extends MutationBase {

    constructor(mutableGenesIndexes?: number[]) {
        super();
        if (mutableGenesIndexes === undefined) {
            this.mutableGenesIndexes = [];
        }
        else
            this.mutableGenesIndexes = mutableGenesIndexes;
    }
    private mutableGenesIndexes: number[];
    performMutate(chromosome: IChromosome, probability: number): void {
        let indexes: number[] = [];
        if (this.mutableGenesIndexes.length === 0) {
            const noOfGenes = RandomizationProvider.current.getInt(0, chromosome.length);
            indexes = RandomizationProvider.current.getUniqueInts(noOfGenes, 0, chromosome.length);
        } else
            indexes = this.mutableGenesIndexes;
        const genes = [...chromosome.getGenes()];
        for (let i = 0; i < indexes.length; i++) {
            if (RandomizationProvider.current.getDouble() <= probability) {
                const random = RandomizationProvider.current.getInt(0, chromosome.length);
                genes[i] = chromosome.getGene(random);
            }
        }
        chromosome.replaceGenes(0, genes);
    }

}