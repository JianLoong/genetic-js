import { IChromosome } from "../chromosome/IChromosome";
import { RandomizationProvider } from "../randomizations/RandomizationProvider";
import { SequenceMutationBase } from "./SequenceMutationBase";

class ReverseSequenceMutation extends SequenceMutationBase {
    performMutate(chromosome: IChromosome, probability: number) {

        let random = new RandomizationProvider().current.getDouble();
        if (random <= probability) {
            let mutatedSequence = chromosome.getGenes().reverse();
            chromosome.replaceGenes(0, mutatedSequence);
            console.log("Mutated");
        }

    }
    mutateOnSequence(): void {
        throw new Error("Method not implemented.");
    }

}

export { ReverseSequenceMutation }