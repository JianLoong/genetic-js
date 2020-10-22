import { BinaryChromosomeBase } from "./BinaryChromosomeBase";
import { IChromosome } from "./IChromosome";

class FloatingPointChromosome extends BinaryChromosomeBase {
    createNew(): IChromosome {
        throw new Error("Method not implemented.");
    }


    m_minValue: number[];
    m_maxValue: number[];
    m_totalBits: number[];
    m_fractionDigits: number[];

    constructor(minValue: number[], maxValue: number[], totalBits: number[], fractionDigits: number[], geneValues: number[]) {
        let sum = totalBits.reduce((sum, x) => sum + x);
        super(sum);
        this.m_minValue = minValue;
        this.m_maxValue = maxValue;
        this.m_totalBits = this.m_totalBits;
        this.m_fractionDigits = fractionDigits;

        if (geneValues == null || geneValues == undefined) {
            let geneValues = [];

            for (let i = 0; i < minValue.length; i++) {
                geneValues = [...geneValues, Math.random()];
            }

        }
        this.createGenes();

    }

}

export { FloatingPointChromosome }