import { RandomizationProvider } from "../../domain/randomizations/RandomizationProvider";
import { mockRandom } from 'jest-mock-random';
import { mockRandomForEach } from 'jest-mock-random';
import { resetMockRandom } from 'jest-mock-random';

describe("Randomziation Test", () => {
    test("Randomization Base - Check the getInts function", () => {
        mockRandom([0.1, 0.5]);

        let random = RandomizationProvider.current.getInts(2, 0, 5);

        expect(random).toEqual([0, 2]);

        resetMockRandom();

    });

    test("Check the getUniqueInts function", () => {
        mockRandom(0.5);
        let random = RandomizationProvider.current.getUniqueInts(2, 0, 5);

        expect(random).toEqual([0, 1]);

        resetMockRandom();

    });


    test("Check the getInt function", () => {
        mockRandom(0.5);
        let random = RandomizationProvider.current.getInt(0, 5);
        expect(random).toEqual(2);
        resetMockRandom();
    });

    test("Check the getDouble function", () => {
        mockRandom(0.1);
        let random = RandomizationProvider.current.getDouble(0, 5);
        expect(random).toEqual(0.5);
        resetMockRandom();
    });

    test("Check the getFloat function", () => {
        mockRandom(0.1);
        let random = RandomizationProvider.current.getFloat(0, 5);
        expect(random).toEqual(0.5);
        resetMockRandom();
    });
});