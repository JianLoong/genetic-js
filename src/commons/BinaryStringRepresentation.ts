export default class BinaryStringRepresentation {

    // Converts number into a 64-bit binary using its IEEE764 Representation
    // Based on https://stackoverflow.com/questions/3096646/how-to-convert-a-floating-point-number-to-its-binary-representation-ieee-754-i
    static convertNumberToBinary(num: number): string {
        let str: string = "";
        const c = new Uint8Array(new Float64Array([num]).buffer, 0, 8);
        for (const element of c.reverse())
            str += element.toString(2).padStart(8, '0');
        return str;
    }

    // Converts a binary IEEE764 to its number representation
    static convertBinaryToNumber(str: string): number {
        // Convert back to Uint8Array.
        if (str.length !== 64)
            throw new Error("Binary cannot be converted because the length is not 64.")
        const arr: number[] = [];
        for (let i = 0; i < str.length; i += 8) {
            const inner = str.slice(i, i + 8);
            arr.push(parseInt(inner, 2));
        }
        const c = new Uint8Array(arr);
        const num = new DataView(c.buffer, 0, 8).getFloat64(0);
        return num;
    }
}
