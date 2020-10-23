import { Gene } from "./Gene";
import { IChromosome } from "./IChromosome";

abstract class ChromosomeBase implements IChromosome {
    public length: number;
    public fitness?: number;
    public genes: Gene[];

    protected constructor(length: number) {
        this.validateLength(length);
        this.length = length;
        this.genes = [];
    }


    abstract createNew(): IChromosome;

    replaceGene(index: number, gene: Gene): void {
        if (index < 0 || index > this.length) {
            throw Error("ChromosomeBase - Index cannot be less than 0 and more than the length. " + index);
        }

        this.genes[index] = gene;
        this.fitness = null;
    }
    abstract generateGene(geneIndex: number): Gene;

    // TODO - Start index does nothing
    replaceGenes(startIndex: number, genes: Gene[]): void {
        var genesToBeReplacedLength = genes.length;

        var availableSpaceLength = this.length - startIndex;

        for (let i = startIndex; i < genes.length; i++) {
            this.replaceGene(i, genes.pop());
        }

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
