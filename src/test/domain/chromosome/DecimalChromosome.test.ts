import DecimalChromosome from "../../../domain/chromosome/DecimalChromosome";

describe("Decimal Chromosome Test", () => {
  test("Check the constructor", () => {
    expect(new DecimalChromosome(8, 0, 0)).toBeInstanceOf(DecimalChromosome);
  });

  it("should throw and error", () => {
    const dc = () => new DecimalChromosome(8, -1, 0);
    expect(dc).toThrowError();
  });

  it("should throw and error", () => {
    const dc = () => new DecimalChromosome(8, 0, -1);
    expect(dc).toThrowError();
  });

  it("should create a new decimal chromosome", () => {
    const dc = new DecimalChromosome(8, 0, 0);
    expect(dc.createNew()).toBeInstanceOf(DecimalChromosome);
  });

  it("should create a new decimal chromosome", () => {
    const dc = new DecimalChromosome(8, 0, 0, false);
    expect(dc.createNew()).toBeInstanceOf(DecimalChromosome);
  });


  it("There should be no duplicated genes", () => {
    const dc = new DecimalChromosome(8, 0, 0, true);
    const genes = dc.getGenes();
    const s = new Set([...genes]);
    expect(s.size).toBe(genes.length);
  });

});
