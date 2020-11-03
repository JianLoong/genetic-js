import { isInteger } from "core-js/fn/number";
import RandomizationProvider from "../../../domain/randomization/RandomizationProvider";

describe("Basic Randomization Test", () => {

    const min = 0;
    const max = 10;

    it("should be an number", () => {
        const random = RandomizationProvider.current.getInt(min, max);
        expect(true).toEqual(!isNaN(random));
    });

    it("should be an integer", () => {
        const random = RandomizationProvider.current.getInt(min, max);
        expect(true).toEqual(Number.isInteger(random));
    });

    it("should be an integer", () => {
        const random = RandomizationProvider.current.getInt(-1, -1);
        expect(true).toEqual(Number.isInteger(random));
    });

    it("should be an true", () => {
        const random = RandomizationProvider.current.getDouble(min, max);
        expect(true).toEqual(!isNaN(random));
    });

    it("should be true", () => {
        const random = RandomizationProvider.current.getDouble();
        expect(true).toEqual(!isNaN(random));
    });

});
