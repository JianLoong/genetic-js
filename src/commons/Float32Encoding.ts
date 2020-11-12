export default class Float32Encoding {

    static NUMBER_OF_BITS: number = 8;

    static convertFloat32ToBin = (num: number): string => {
        let str: string = "";
        const c = new Uint8Array(new Float32Array([num]).buffer, 0, 4);
        for (const element of c.reverse())
            str += element.toString(2).padStart(Float32Encoding.NUMBER_OF_BITS, '0');
        return str;
    }

    static convertBinToFloat32 = (str: string): number => {
        if (str.length !== (Float32Encoding.NUMBER_OF_BITS * 4)) {
            throw new Error("The length of the binary string should be 32.");
        }

        const arr: number[] = [];
        for (let i = 0; i < str.length; i += Float32Encoding.NUMBER_OF_BITS) {
            const inner = str.slice(i, i + Float32Encoding.NUMBER_OF_BITS);
            // Convert the decimal to base 2 and push into the arr
            arr.push(parseInt(inner, 2));
        }

        const c = new Uint8Array(arr);
        const num = new DataView(c.buffer, 0, 4).getFloat32(0);
        return num;
    }
}
