import IntegerChromosome from "../../domain/chromosome/IntegerChromosome";
import BinaryChromosomeStub from "./BinaryChromosomeStub.";
import { mockRandom } from "jest-mock-random";
import { resetMockRandom } from "jest-mock-random";
import DecimalChromosome from "../../domain/chromosome/DecimalChromosome";

describe("Decimal Chromosome Test", () => {
  test("Check the constructor", () => {

    expect(new DecimalChromosome(8, 0, 0)).toBeInstanceOf(DecimalChromosome);

  });
});
