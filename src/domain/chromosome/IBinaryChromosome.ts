import IChromosome from "./IChromosome";

export interface IBinaryChromosome extends IChromosome {
  flipGene(index: number): void;
}

