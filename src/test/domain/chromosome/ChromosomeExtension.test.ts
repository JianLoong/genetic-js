import ChromosomeExtension from "../../../domain/chromosome/ChromosomeExtension";
import DecimalChromosome from "../../../domain/chromosome/DecimalChromosome";

describe("ChromosomeExtension Test", () => {

    it("should should be true", () => {

        const p1 = [2, 2, 3, 4, 5, 6, 7, 8];
        const d1 = new DecimalChromosome(8, 0, 7, false, p1);

        const result = ChromosomeExtension.anyHasRepeatedGene([d1]);

        expect(result).toBe(true);

    });

    it("should be false", () => {

        const p1 = [1, 2, 3, 4, 5, 6, 7, 8];
        const d1 = new DecimalChromosome(8, 0, 8, false, p1);

        const result = ChromosomeExtension.anyHasRepeatedGene([d1]);

        expect(result).toBe(false);

    });

    it("should be false", () => {

        const p1 = [1, 2, 3, 4, 5, 6, 7, 8];
        const d1 = new DecimalChromosome(8, 0, 8, false, p1);
        const p2 = [1, 2, 3, 4, 5, 6, 7, 8];
        const d2 = new DecimalChromosome(8, 0, 8, false, p2);


        const result = ChromosomeExtension.anyHasRepeatedGene([d1, d2]);

        expect(result).toEqual(false);

    });

    it("should be true", () => {

        const p1 = [1, 2, 2, 2, 5, 6, 7, 8];
        const d1 = new DecimalChromosome(8, 0, 8, false, p1);
        const p2 = [1, 2, 3, 4, 5, 6, 7, 8];
        const d2 = new DecimalChromosome(8, 0, 8, false, p2);


        const result = ChromosomeExtension.anyHasRepeatedGene([d1, d2]);

        expect(result).toBe(true);

    });
});
