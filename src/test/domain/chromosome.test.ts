import { IntegerChromosome } from "../../domain/chromosome/IntegerChromosome";

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


    // https://stackoverflow.com/questions/41570273/how-to-test-a-function-that-output-is-random-using-jest
    test("Check the getInt function", () => {
        let a = new IntegerChromosome(0, 2);
        const mockMath = Object.create(global.Math);
        mockMath.random = () => 0.5;
        global.Math = mockMath;


        expect(a.getRandomInt(0, 5)).toEqual(2);
    });
});