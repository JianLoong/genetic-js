import FloatingPointChromosome from "../../../domain/chromosome/FloatingPointChromosome"

describe("FloatingPoint Chromosome Test", () => {
    it("should create genes with length of 8", () => {
        const fpc = new FloatingPointChromosome([0, 2], [10, 10]);

        const result = fpc.getGenes().toString().replace(/,/g, "");


        expect(result).toHaveLength(8);

    });

    it("should create genes with length of 64", () => {
        const fpc = new FloatingPointChromosome([0], [10], false);
        const result = fpc.getGenes();
        expect(result).toHaveLength(64);
    });

    it("should create genes with length of 128", () => {
        const fpc = new FloatingPointChromosome([0, 2], [10, 10], false);
        const result = fpc.getGenes();
        expect(result).toHaveLength(128);
    });

    it("should throw an error because of max value", () => {
        const fpc = () => new FloatingPointChromosome([0, 2], [-1, 10], false);
        expect(fpc).toThrowError();
    });


    it("should throw an error because of min value", () => {
        const fpc = () => new FloatingPointChromosome([-1, 2], [-1, 10], false);
        expect(fpc).toThrowError();
    });


    it("should create a new chromosome", () => {
        const fpc = new FloatingPointChromosome([0], [10]);
        expect(fpc.createNew()).toBeInstanceOf(FloatingPointChromosome);
    });

    it("should be expanded.", () => {
        const fpc = new FloatingPointChromosome([0], [10]);
        const expended = fpc.expand();
        expect(expended).toHaveLength(1);
    });

    it("should be expanded.", () => {
        const fpc = new FloatingPointChromosome([0], [10], false);
        const expended = fpc.expand();
        expect(expended).toHaveLength(1);
    });
});
