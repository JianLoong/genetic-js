import RandomizationProvider from "../../../domain/randomization/RandomizationProvider";

describe("Basic Randomization Test", () => {

    const min = 0;
    const max = 20;

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

    it("should be true", () => {
        const random = RandomizationProvider.current.getFloat();
        expect(true).toEqual(!isNaN(random));
    });

    // it("should be an number", () => {
    //     for (let i = 0; i < 10; i++) {
    //         const random = RandomizationProvider.current.getUniqueInts(2, min, max);
    //         console.log(random);
    //     }
    // });


});
