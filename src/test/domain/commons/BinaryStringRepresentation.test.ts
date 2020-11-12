import BinaryStringRepresentation from "../../../commons/BinaryStringRepresentation"

describe("BinaryStringRepresentation Test", () => {

    it("should be converted to its IEEE754 Binary Rep", () => {
        const a = BinaryStringRepresentation.convertNumberToBinary(-1.5);
        expect(a).toBe("1011111111111000000000000000000000000000000000000000000000000000");
    });

    it("should be converted to its IEEE754 Binary Rep", () => {
        const a = BinaryStringRepresentation.convertNumberToBinary(1.5);
        expect(a).toBe("0011111111111000000000000000000000000000000000000000000000000000");
    });

    it("should be converted to its IEEE754 Binary Rep", () => {
        const a = BinaryStringRepresentation.convertNumberToBinary(15);
        expect(a).toBe("0100000000101110000000000000000000000000000000000000000000000000");
    });

    it("should be converted to its IEEE754 Binary Rep", () => {
        const a = BinaryStringRepresentation.convertNumberToBinary(0);
        expect(a).toBe("0000000000000000000000000000000000000000000000000000000000000000");
    });

    it("should be converted to its IEEE754 Binary Rep", () => {
        const a = BinaryStringRepresentation.convertNumberToBinary(-0);
        expect(a).toBe("1000000000000000000000000000000000000000000000000000000000000000");
    });

    it("should be converted to its IEEE754 Binary Rep", () => {
        const a = BinaryStringRepresentation.convertNumberToBinary(-0.3);
        expect(a).toBe("1011111111010011001100110011001100110011001100110011001100110011");
    });

    it("should convert binary to number", () => {
        const a = BinaryStringRepresentation
            .convertBinaryToNumber("1011111111010011001100110011001100110011001100110011001100110011");

        expect(a).toBe(-0.3);
    });


    it("should throw an error because the binary string length is not 64", () => {
        const a = () => BinaryStringRepresentation
            .convertBinaryToNumber("010000000010111000000000000000000000000000000000000000000000000");

        expect(a).toThrowError();
    });

    it("should convert binary to number", () => {
        const a = BinaryStringRepresentation
            .convertBinaryToNumber("0100000000101110000000000000000000000000000000000000000000000000");

        expect(a).toBe(15);
    });

});
