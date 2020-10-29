class BinaryStringRepresentation {

    static toRepresentation(value: number[], totalBits: number[], throwsException?: boolean): string {
        let result = "";
        // value.forEach(v => result += v.toString(2).padStart(totalBits, "0"));

        for (let i = 0; i < value.length; i++) {
            result += value[i].toString(2).padStart(totalBits[i], "0");
        }

        return result;

        // if (throwsException && totalBits > 0 && result.length > totalBits)
        //     throw new Error("Cannot be represented");
        // return result;
    }

    static toInt64One(representation: string): number {
        return parseInt(representation, 10);
    }

    static toInt64(representation: string, totalBits: number[]): number[] {
        let sum = 0;
        totalBits.forEach(a => sum += a);

        if (representation.length !== sum)
            throw new Error("There is an issue with the sum");
        const int64s: number[] = [];
        let startIndex = 0;

        for (let i = 0; i < totalBits.length; i++) {
            const currentTotalBits = totalBits[i];
            int64s[i] = this.toInt64One(representation.substring(startIndex, currentTotalBits));
            startIndex += currentTotalBits;
        }

        return int64s;
    }
}
