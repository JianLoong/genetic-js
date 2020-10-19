import { IChromosome } from "./IChromosome";

interface IBinaryChromosome extends IChromosome {
    flipGene(index: number): void;
}

export { IBinaryChromosome };