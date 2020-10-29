import FloatingPointChromosome from "../../../domain/chromosome/IEEEFloatingPointChromosome"

describe("IEEEFloatingPoint Chromosome Test", () => {
    test("Check the constructor", () => {
        const fpc = new FloatingPointChromosome(5);

        const result = fpc.getGenes().toString().replace(/,/g, "");

        const expected = "01000000101000000000000000000000";

        expect(result).toBe(expected);

    });

});
