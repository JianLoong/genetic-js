import BinaryStringRepresentation from "../../commons/BinaryStringRepresentation";
import RandomizationProvider from "../randomization/RandomizationProvider";
import BinaryChromosomeBase from "./BinaryChromosomeBase";
import Gene from "./Gene";
import IChromosome from "./IChromosome";

export default class FloatingPointChromosome extends BinaryChromosomeBase {
    public maxValue: number[];
    public minValue: number[];
    public originalValue: number[];

    constructor(minValue: number[], maxValue: number[], isIntValue?: boolean) {

        minValue.forEach(element => {
            if (element < 0)
                throw new Error("Min value cannot be below 0")
        });

        maxValue.forEach(element => {
            if (element < 0)
                throw new Error("Max value cannot be below 0")
        });


        let totalBit = 0;

        if (isIntValue === undefined)
            isIntValue = true;

        maxValue.forEach(element => totalBit += element.toString(2).length);

        if (isIntValue === true)
            super(totalBit);
        else
            super(FloatingPointChromosome.BIT_LENGTH * minValue.length);
        this.minValue = minValue;
        this.maxValue = maxValue;
        this.isIntValue = isIntValue;
        this.originalValue = this.flatten(minValue, maxValue);
        this.createGenes();
    }

    private static BIT_LENGTH = 64;
    private isIntValue: boolean;

    createNew(): IChromosome {
        return new FloatingPointChromosome(this.minValue, this.maxValue, this.isIntValue);
    }

    /**
     * The operations are very expensive because they involve a lot of string operations and regex.
     * Could be optimized further.
     */
    expand(): number[] {
        const values: number[] = [];
        // Determine bitLength
        const genes = this.getGenes();

        if (this.isIntValue === true) {
            const bitLength = [];
            for (const element of this.maxValue) {
                bitLength.push(element.toString(2).length);
            }

            for (let i = 0, j = 0; i < genes.length; i = i + bitLength[j], j++) {
                const sliced = genes.slice(i, i + bitLength[j]).toString().replace(/,/g, "");
                values.push(parseInt(sliced, 2));
            }
        } else {
            for (let i = 0; i < genes.length; i = i + FloatingPointChromosome.BIT_LENGTH) {
                const sliced = genes.slice(i, i + FloatingPointChromosome.BIT_LENGTH).toString().replace(/,/g, "");
                // values.push(Float32Encoding.convertBinToFloat32(sliced));
                values.push(BinaryStringRepresentation.convertBinaryToNumber(sliced));
            }
        }
        return values;
    }

    flatten(minValue: number[], maxValue: number[]): number[] {
        let stringRepresentation = "";

        if (this.isIntValue === true) {

            for (let i = 0; i < minValue.length; i++) {
                const min = minValue[i];
                const max = maxValue[i];
                let random: number = 0;
                random = RandomizationProvider.current.getInt(min, max);
                // Convert to binary.
                const bitLength = max.toString(2).length;
                // Zero pad the random value to the maximum length
                const stringRep = random.toString(2).padStart(bitLength, "0");
                stringRepresentation += stringRep;
            }
            // return stringRepresentation.split("").map(Number);
        } else {
            for (let i = 0; i < minValue.length; i++) {
                const min = minValue[i];
                const max = maxValue[i];
                let random: number = 0;
                random = RandomizationProvider.current.getFloat(min, max);
                // stringRepresentation += Float32Encoding.convertFloat32ToBin(random);
                stringRepresentation += BinaryStringRepresentation.convertNumberToBinary(random);
            }

        }
        return stringRepresentation.split("").map(Number);
    }

    generateGene(geneIndex: number): Gene {
        const gene = this.originalValue[geneIndex];
        return new Gene(gene);
    }

    // isSafeInteger(minValue: number[], maxValue: number[]): boolean {
    //     minValue.forEach(element => {
    //         if (!Number.isSafeInteger(element))
    //             return false;
    //     });

    //     maxValue.forEach(element => {
    //         if (!Number.isSafeInteger(element))
    //             return false;
    //     });

    //     return true;
    // }
}