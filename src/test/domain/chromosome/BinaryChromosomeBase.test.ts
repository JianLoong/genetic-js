import IChromosome from "../../../domain/chromosome/IChromosome";
import BinaryChromosomeBase from "../../../domain/chromosome/BinaryChromosomeBase";
import Gene from "../../../domain/chromosome/Gene";

class BinaryChromosomeBaseTest extends BinaryChromosomeBase {
    constructor(length: number) {
        super(length);
        this.createGenes();
    }
    createNew(): IChromosome {
        throw new Error("Method not implemented.");
    }
    generateGene(geneIndex: number): Gene {
        const genes = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        return new Gene(genes[geneIndex]);
    }

}

describe("BinaryChromosomeBase Test", () => {

    it("should should be true", () => {
        const cb = new BinaryChromosomeBaseTest(10);
        expect(cb).toBeInstanceOf(BinaryChromosomeBaseTest);
    });

    it("should flip the gene", () => {
        const cb = new BinaryChromosomeBaseTest(10);
        cb.flipGene(0);
        const result = cb.getGene(0);
        expect(result.mValue).toBe(1);

        cb.flipGene(0);
        expect(cb.getGene(0).mValue).toBe(0);
    });

    it("should throw an error", () => {
        const cb = new BinaryChromosomeBaseTest(10);
        cb.getGene(0).mValue = undefined;
        const result = () => cb.flipGene(0);
        expect(result).toThrowError();
    });

    it("should return the string", () => {
        const cb = new BinaryChromosomeBaseTest(10);
        const result = cb.toString();

        expect(result).toBe("0,0,0,0,0,0,0,0,0,0");
    });

});
