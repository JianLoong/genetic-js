import IntegerChromosome from "../../../domain/chromosome/IntegerChromosome";
import Population from "../../../domain/populations/Population";

describe("Population Test", () => {
  test("Check the population constructor", () => {
    const c = new IntegerChromosome(0, 5);
    const p = new Population(20, 50, c);

    expect(p.adamChromosome).toBeInstanceOf(IntegerChromosome);
  });

  test("Check the population constructor", () => {
    const c = new IntegerChromosome(0, 5);
    const p = () => new Population(-1, 50, c);

    expect(p).toThrowError();
  });
});
