import ChromosomeBase from "../../../domain/chromosome/ChromosomeBase";
import Gene from "../../../domain/chromosome/Gene";
import IChromosome from "../../../domain/chromosome/IChromosome";

class ChromosomeBaseTest extends ChromosomeBase {
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

describe("ChromosomeBase Test", () => {

    it("should should be true", () => {
        const cb = new ChromosomeBaseTest(10);
        expect(cb.getGene(0)).toBeTruthy();
    });

    it("should should be true", () => {
        const cb = new ChromosomeBaseTest(10);

        const replace = () => cb.replaceGene(-1, new Gene(0));
        expect(replace).toThrowError();
    });

    it("should should be true", () => {
        const cb = new ChromosomeBaseTest(10);

        const replace = () => cb.replaceGenes(-1, []);
        expect(replace).toThrowError();
    });

    it("should should be true", () => {
        const cb = new ChromosomeBaseTest(10);

        const genes: Gene[] = [];
        const gene: Gene = new Gene(0);
        for (let i = 0; i < 10; i++)
            genes.push(gene);

        const replace = () => cb.replaceGenes(5, genes);
        expect(replace).toThrowError();
    });

    it("should should be true", () => {
        const cb = new ChromosomeBaseTest(10);

        const genes: Gene[] = [];
        const gene: Gene = new Gene(1);
        for (let i = 0; i < 5; i++)
            genes.push(gene);

        cb.replaceGenes(2, genes);
        expect(cb.getGenes()).toBeTruthy();
    });

    it("should throw an error", () => {
        const cb = () => new ChromosomeBaseTest(-1);

        expect(cb).toThrowError();
    });

    it("should be resized", () => {
        const cb = new ChromosomeBaseTest(10);

        cb.resize(12);

        expect(cb.length).toBe(12);
    });

    it("should return the string", () => {
        const cb = new ChromosomeBaseTest(10);

        const result = cb.toString();

        const expected = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0].toString();

        expect(result).toBe(expected);
    });


    it("should replace genes", () => {
        const cb = new ChromosomeBaseTest(10);

        cb.replaceGenes(0, []);

        const genes = cb.getGenes();

        expect(genes).toHaveLength(10);
    });

    it("should replace genes", () => {
        const cb = new ChromosomeBaseTest(10);

        const replacement: Gene[] = [];
        replacement.push(new Gene(1));
        replacement.push(new Gene(2));
        replacement.push(new Gene(3));

        cb.replaceGenes(5, replacement);

        const genes = cb.getGenes();
        expect(genes).toHaveLength(10);
    });




});
