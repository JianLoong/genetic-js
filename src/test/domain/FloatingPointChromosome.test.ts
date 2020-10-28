import IntegerChromosome from "../../domain/chromosome/IntegerChromosome";
import BinaryChromosomeStub from "./BinaryChromosomeStub.";
import { mockRandom } from "jest-mock-random";
import { resetMockRandom } from "jest-mock-random";
import DecimalChromosome from "../../domain/chromosome/DecimalChromosome";
import FloatingPointChromosome from "../../domain/chromosome/FloatingPointChromosome"

describe("FloatingPoint Chromosome Test", () => {
    test("Check the constructor", () => {
        const fpc = new FloatingPointChromosome(5);

        const result = fpc.getGenes().toString().replace(/,/g, "");

        const expected = "01000000101000000000000000000000";

        expect(result).toBe(expected);

    });

});
