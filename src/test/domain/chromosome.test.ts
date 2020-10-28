import IntegerChromosome from "../../domain/chromosome/IntegerChromosome";
import BinaryChromosomeStub from "./BinaryChromosomeStub.";
import { mockRandom } from "jest-mock-random";
import { resetMockRandom } from "jest-mock-random";

describe("IntegerChromosome Test", () => {
  test("Check the create binary string function", () => {
    const a = new IntegerChromosome(0, 2);
    expect(a.createBinaryString(2)).toEqual("00000000000000000000000000000010");
  });

  test("Check the create new function", () => {
    const a = new IntegerChromosome(0, 2);
    const b = a.createNew();
    expect(b).toBeInstanceOf(IntegerChromosome);
  });

  test("Check the toString() function", () => {
    mockRandom(0.5);
    const a = new IntegerChromosome(0, 2);
    expect(a.toString()).toEqual(
      "0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1"
    );
    resetMockRandom();
  });

  test("Check the flipGene() function", () => {
    mockRandom(0.9);
    const a = new IntegerChromosome(0, 2);
    a.flipGene(0);
    expect(a.toString()).toEqual(
      "0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0"
    );
    resetMockRandom();
  });

  test("Check the flipGene() function", () => {
    mockRandom(0.9);
    const a = new IntegerChromosome(0, 2);

    a.flipGene(1);
    expect(a.toString()).toEqual(
      "0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1"
    );
  });

  // https://stackoverflow.com/questions/49027595/jest-test-that-exception-will-be-thrown-isnt-working
  test("Check the flipGene() function of BinaryChromosomeBase", () => {
    const a = new BinaryChromosomeStub(2);

    expect(() => {
      a.flipGene(0);
    }).toThrow(Error);
  });
});
