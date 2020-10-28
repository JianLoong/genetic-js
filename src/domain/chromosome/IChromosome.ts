import Gene from "./Gene";

export default interface IChromosome {
  fitness?: number;
  length: number;
  // clone(): IChromosome;
  createNew(): IChromosome;
  generateGene(geneIndex: number): Gene;
  getGene(index: number): Gene;
  getGenes(): Gene[];
  replaceGene(index: number, gene: Gene): void;
  replaceGenes(startIndex: number, genes: Gene[]): void;
  resize(newLength: number): void;
}
