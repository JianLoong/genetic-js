import { IBinaryChromosome } from "../chromosome/IBinaryChromosome";
import IChromosome from "../chromosome/IChromosome";
import RandomizationProvider from "../randomization/RandomizationProvider";
import MutationBase from "./MutationBase";

export default class FlipBitMutation extends MutationBase {
    constructor() {
        super();
        this.rnd = RandomizationProvider.current;
    }
    private rnd;

    performMutate(chromosome: IChromosome, probability: number): void {
        const bc = chromosome as IBinaryChromosome;

        if (bc == null)
            throw new Error("Flip bit cant be done");

        if (this.rnd.getDouble() <= probability) {
            const index = this.rnd.getInt(0, chromosome.length);
            bc.flipGene(index);
        }

    }

}