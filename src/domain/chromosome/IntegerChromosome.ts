import { BinaryChromosomeBase } from "./BinaryChromosomeBase";
import { IChromosome } from "./IChromosome";
import { Gene } from "./Gene";

class IntegerChromosome extends BinaryChromosomeBase {

    private m_minValue: number;
    private m_maxValue: number;
    private m_originalValue;

    createNew(): IChromosome {
        throw new Error("Method not implemented.");
    }

    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
    }

    constructor(minValue: number, maxValue: number) {
        super(32);
        this.m_minValue = minValue;
        this.m_maxValue = maxValue;

        let randomValue = this.getRandomInt(minValue, maxValue);
                
        this.m_originalValue = this.createBinaryString(randomValue).split("").map(Number);
        this.createGenes();
    }

    createBinaryString (nMask: number): string {
        // nMask must be between -2147483648 and 2147483647
        for (var nFlag = 0, nShifted = nMask, sMask = ""; nFlag < 32;
             nFlag++, sMask += String(nShifted >>> 31), nShifted <<= 1);
        return sMask;
    }
  
    generateGene(geneIndex: number): Gene {
        let value = this.m_originalValue[geneIndex];
        if (value == undefined)
           return new Gene(0);

        return new Gene(value);
    }

    toString(): string {
        let str = "";
        for(let i = 0; i < this.getGenes().length; i++){
            str += this.getGene(i).m_value + " ";
        }
        return str;
    }
}

export { IntegerChromosome }