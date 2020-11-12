import Float32Encoding from "../../../commons/Float32Encoding"

describe("Float32Encoding Test", () => {

    // Normal conditions.
    const zero = 0;
    const zeroInBinary = "00000000000000000000000000000000";
    const negativeZero = -0;
    const negativeZeroInNBinary = "10000000000000000000000000000000";

    const PI = 3.142;
    const piInBinary = "01000000010010010001011010000111";

    const negativePI = -3.142;
    const negativePIInBinary = "11000000010010010001011010000111";

    // Boundary Value Conditions (should throw error)
    // Length + 1 (33)
    const boundaryValueTestLengthPlusOne = "100000000000000000000000000000001";
    // Length -1 (31)
    const boundaryValueTestLengthMinusOne = "1000000000000000000000000000001";

    const emptyString = "";


    it("should return zero in binary", () => {
        const results = Float32Encoding.convertFloat32ToBin(zero);
        expect(results).toBe(zeroInBinary);
    });

    it("should return negative zero in binary", () => {
        const a = Float32Encoding.convertFloat32ToBin(negativeZero);
        expect(a).toBe(negativeZeroInNBinary);
    });

    it("should encode PI into its binary", () => {
        const a = Float32Encoding.convertFloat32ToBin(PI);
        expect(a).toBe(piInBinary);
    });

    it("should convert PI in binary into its decimal", () => {
        const a = Float32Encoding.convertBinToFloat32(piInBinary);
        expect(a).toBeCloseTo(PI);
    });

    it("should encode PI into its binary", () => {
        const a = Float32Encoding.convertFloat32ToBin(negativePI);
        expect(a).toBe(negativePIInBinary);
    });

    it("should encode PI into its binary", () => {
        const a = Float32Encoding.convertBinToFloat32(negativePIInBinary);
        expect(a).toBeCloseTo(negativePI);
    });

    it("should be throw an error", () => {
        const a = () => Float32Encoding.convertBinToFloat32(emptyString);
        expect(a).toThrowError();
    });

    it("should be throw an error", () => {
        const a = () => Float32Encoding.convertBinToFloat32(boundaryValueTestLengthPlusOne);
        expect(a).toThrowError();
    });

    it("should be throw an error", () => {
        const a = () => Float32Encoding.convertBinToFloat32(boundaryValueTestLengthMinusOne);
        expect(a).toThrowError();
    });
});
