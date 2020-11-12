import IntegerChromosome from "../../../domain/chromosome/IntegerChromosome"

describe("ChromosomeBase Test", () => {

    it("should should be true", () => {
        const cb = new IntegerChromosome(0, 10);
        expect(cb).toBeInstanceOf(IntegerChromosome);
    });

    it("should should be true", () => {
        const cb = new IntegerChromosome(0, 10);
        cb.flipGene(0);
        expect(cb).toBeTruthy();
        cb.flipGene(0);
        expect(cb).toBeTruthy();
    });


    it("should return the string", () => {
        const cb = new IntegerChromosome(0, 10);
        expect(cb.toString()).toBeTruthy();
    });

});
