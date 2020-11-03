// Forked 'toFloat' from https://gist.github.com/laerciobernardo/498f7ba1c269208799498ea8805d8c30
// Forked 'toHex' from stackoverflow answer https://stackoverflow.com/a/47187116/10522253
// Modifyed by: Jozo132 (https://github.com/Jozo132)

export default class Float32Encoding {

    static convertBinToFloat32 = (str: string) => {
        const int = parseInt(str, 2);
        if (int > 0 || int < 0) {
            const sign = (int >>> 31) ? -1 : 1;
            let exp = (int >>> 23 & 0xff) - 127;
            const mantissa = ((int & 0x7fffff) + 0x800000).toString(2);
            let float32 = 0
            for (let i = 0; i < mantissa.length; i += 1) {
                float32 += parseInt(mantissa[i]) ? Math.pow(2, exp) : 0; exp--
            }
            return float32 * sign;
        } else
            return 0;
    };
    static convertFloat32ToBin = (float32) => {
        const HexToBin = hex => (parseInt(hex, 16).toString(2)).padStart(32, '0');
        const getHex = i => ('00' + i.toString(16)).slice(-2);
        const view = new DataView(new ArrayBuffer(4))
        view.setFloat32(0, float32);
        return HexToBin(Array.apply(null, { length: 4 }).map((_, i) => getHex(view.getUint8(i))).join(''));
    }

    static convertFloat32ToHex = (float32: number) => {
        const getHex = i => ('00' + i.toString(16)).slice(-2);
        const view = new DataView(new ArrayBuffer(4))
        view.setFloat32(0, float32);
        return Array.apply(null, { length: 4 }).map((_, i) => getHex(view.getUint8(i))).join('');
    }

    static convertHexToFloat32 = (str) => {
        const int = parseInt(str, 16);
        if (int > 0 || int < 0) {
            const sign = (int >>> 31) ? -1 : 1;
            let exp = (int >>> 23 & 0xff) - 127;
            const mantissa = ((int & 0x7fffff) + 0x800000).toString(2);
            let float32 = 0
            for (let i = 0; i < mantissa.length; i += 1) {
                float32 += parseInt(mantissa[i]) ? Math.pow(2, exp) : 0; exp--
            }
            return float32 * sign;
        } else return 0
    }
}

// Full example

/* DEBUG OUTPUT:
  Input value (-0.3) => hex (be99999a) [4 bytes] => float32 (-0.30000001192092896)
  Input value (-0.3) => binary (10111110100110011001100110011010) [32 bits] => float32 (-0.30000001192092896)
*/