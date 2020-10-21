import { Gene } from "./Gene";
import { IChromosome } from "./IChromosome";

abstract class ChromosomeBase implements IChromosome {
    public length: number;
    public fitness?: number;
    private genes: Gene[];

    protected constructor(length: number) {
        this.validateLength(length);
        this.length = length;
        this.genes = [];
    }

    replaceGene(index: number, gene: Gene): void {
        if (index < 0 || index > this.length) {
            throw Error("ChromosomeBase - Index cannot be less than 0 and more than the length. " + index);
        }

        this.genes[index] = gene;
        this.fitness = null;
    }
    abstract generateGene(geneIndex: number): Gene;

    replaceGenes(startIndex: number, genes: Gene[]): void {
        throw new Error("Method not implemented.");
    }
    resize(newLength: number): void {
        this.validateLength(newLength);
    }
    getGene(index: number): Gene {
        return this.genes[index];
    }
    getGenes(): Gene[] {
        return this.genes;
    }
    abstract createNew(): IChromosome;
    clone(): IChromosome {
        throw new Error("Method not implemented.");
    }
    private validateLength(length: number) {
        if (length < 2) {
            throw Error("Error - The minimum length for a chromosome is 2 genes");
        }
    }

    protected createGenes(): void {
        for (let i = 0; i < this.length; i++) {
            this.replaceGene(i, this.generateGene(i))
        }
    }
}

export { ChromosomeBase };
