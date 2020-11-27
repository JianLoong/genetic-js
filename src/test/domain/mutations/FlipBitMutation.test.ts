import BinaryChromosomeBase from "../../../domain/chromosome/BinaryChromosomeBase";
import DecimalChromosome from "../../../domain/chromosome/DecimalChromosome";
import Gene from "../../../domain/chromosome/Gene";
import IChromosome from "../../../domain/chromosome/IChromosome";
import FlipBitMutation from "../../../domain/mutations/FlipBitMutation"
import IMutation from "../../../domain/mutations/IMutation";

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

describe("FlipBit Mutation Test", () => {

    it("should flip the bit of a binary chromosome", () => {

        const d1: IChromosome = new BinaryChromosomeBaseTest(10);

        const fbm: IMutation = new FlipBitMutation();

        fbm.mutate(d1, 1);

        expect(d1).toBeTruthy();

    });

    it("should flip the bit of a binary chromosome", () => {

        const d1 = new BinaryChromosomeBaseTest(10);

        const fbm: IMutation = new FlipBitMutation([0]);

        fbm.mutate(d1, 1);

        expect(d1.getGenes()[0].mValue).toEqual(1);

    });

    it("should throw an error if invalid index", () => {

        const d1 = new BinaryChromosomeBaseTest(10);

        const fbm: IMutation = new FlipBitMutation([10]);

        const result = () => fbm.mutate(d1, 1);

        expect(result).toThrowError();

    });

    it("should throw an error if invalid index", () => {

        const d1 = new BinaryChromosomeBaseTest(10);

        const fbm: IMutation = new FlipBitMutation([-1]);

        const result = () => fbm.mutate(d1, 1);

        expect(result).toThrowError();

    });

    it("should flip the bit of a binary chromosome", () => {

        const d1 = new BinaryChromosomeBaseTest(10);

        const fbm: IMutation = new FlipBitMutation();

        fbm.mutate(d1, 0);

        expect(d1).toBeTruthy();

    });

    it("should throw an error", () => {

        const d1 = new DecimalChromosome(2, 0, 10);

        const fbm: IMutation = new FlipBitMutation();

        const result = () => fbm.mutate(d1, 1);

        expect(result).toThrowError();

    });
});
