import FloatingPointChromosome from "../../../domain/chromosome/FloatingPointChromosome"

describe("FloatingPoint Chromosome Test", () => {
    test("Check the constructor", () => {
        const fpc = new FloatingPointChromosome([0, 2], [10, 10]);

        const result = fpc.getGenes().toString().replace(/,/g, "");


        expect(result).toHaveLength(64);

    });

});
