import { BinaryChromosomeBase } from "../../domain/chromosome/BinaryChromosomeBase";
import { IntegerChromosome } from "../../domain/chromosome/IntegerChromosome";
import { BinaryChromosomeStub } from "./BinaryChromosomeStub.test.";

describe("IntegerChromosome Test", () => {
    test("Check the create binary string function", () => {
        let a = new IntegerChromosome(0, 2);
        expect(a.createBinaryString(2)).toEqual("00000000000000000000000000000010");
    });


    test("Check the create new function", () => {
        let a = new IntegerChromosome(0, 2);
        let b = a.createNew();
        expect(b).toBeInstanceOf(IntegerChromosome);
    })

    test("Check the toString() function", () => {
        let a = new IntegerChromosome(0, 2);
        expect(a.toString()).toEqual("0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1");
    });

    test("Check the flipGene() function", () => {
        let a = new IntegerChromosome(0, 2);
        a.flipGene(0);
        expect(a.toString()).toEqual("0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0");
    });

    test("Check the flipGene() function", () => {
        let a = new IntegerChromosome(0, 2);

        a.flipGene(1);
        expect(a.toString()).toEqual("0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1");
    });

    // https://stackoverflow.com/questions/49027595/jest-test-that-exception-will-be-thrown-isnt-working
    test("Check the flipGene() function of BinaryChromosomeBase", () => {
        let a = new BinaryChromosomeStub(2);

        expect(() => { a.flipGene(0); }).toThrow(Error);

    });
});