import { Gene } from "./Gene";

interface IChromosome {
    fitness?: number;
    length: number;
    generateGene(geneIndex: number): Gene;
    replaceGene(index: number, gene: Gene): void;
    replaceGenes(startIndex: number, genes: Gene[]): void;
    resize(newLength: number): void;
    getGene(index: number): Gene;
    getGenes(): Gene[];
    createNew(): IChromosome;
    clone(): IChromosome;
}



export { IChromosome };