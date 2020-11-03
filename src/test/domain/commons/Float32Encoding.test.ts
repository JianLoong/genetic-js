import Float32Encoding from "../../../commons/Float32Encoding"

describe("Float32Encoding Test", () => {
    it("should be close to a number", () => {
        const a = Float32Encoding.convertBinToFloat32("10111110100110011001100110011010");
        expect(a).toBeCloseTo(-0.3);
    });


    it("should be close to a number", () => {
        const a = Float32Encoding.convertFloat32ToBin("-0.3");
        expect(a).toBe("10111110100110011001100110011010");
    });

    it("should be close to a number", () => {
        const a = Float32Encoding.convertFloat32ToHex(-0.3);
        expect(a).toBe("be99999a");
    });

    it("should be close to a number", () => {
        const a = Float32Encoding.convertHexToFloat32("be99999a");
        expect(a).toBeCloseTo(-0.3);
    });

    it("should be close to a number", () => {
        const a = Float32Encoding.convertHexToFloat32("");
        expect(a).toBeCloseTo(0);
    });

    it("should be close to a number", () => {
        const a = Float32Encoding.convertBinToFloat32("0");
        expect(a).toBeCloseTo(0);
    });

});
