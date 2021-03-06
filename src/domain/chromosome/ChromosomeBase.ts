import Gene from "./Gene";
import IChromosome from "./IChromosome";

export default abstract class ChromosomeBase implements IChromosome {

  protected constructor(length: number) {
    this.validateLength(length);
    this.length = length;
    this.genes = [];
  }
  public fitness?: number;
  public genes: Gene[];
  public length: number;

  abstract createNew(): IChromosome;
  abstract generateGene(geneIndex: number): Gene;
  getGene(index: number): Gene {
    return this.genes[index];
  }

  getGenes(): Gene[] {
    return this.genes;
  }

  replaceGene(index: number, gene: Gene): void {
    if (index < 0 || index > this.length) {
      throw Error(
        "ChromosomeBase - Index cannot be less than 0 and more than the length. " +
        index
      );
    }

    this.genes[index] = gene;
    this.fitness = undefined;
  }

  replaceGenes(startIndex: number, genes: Gene[]): void {

    if (startIndex < 0)
      throw new Error("Start Index cannot be less than 0");

    const genesToBeReplacedLength = genes.length;

    const availableSpaceLength = this.length - startIndex;

    if (availableSpaceLength < genesToBeReplacedLength)
      throw new Error("ChromosomeBase - Not enough space to replace genes.");

    for (let i = startIndex, j = 0; i < this.length && j < genes.length; i++, j++) {
      this.genes[i] = genes[j];
    }

  }

  resize(newLength: number): void {
    this.validateLength(newLength);
    this.length = newLength;
  }

  toString(): string {
    return this.genes.toString();
  }

  protected createGenes(): void {
    for (let i = 0; i < this.length; i++) {
      this.replaceGene(i, this.generateGene(i));
    }
  }

  private validateLength(length: number) {
    if (length < 2) {
      throw Error("Error - The minimum length for a chromosome is 2 genes");
    }
  }
}
