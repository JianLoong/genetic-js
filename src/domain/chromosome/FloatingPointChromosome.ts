
import Float32Encoding from "../../commons/Float32Encoding";
import RandomizationProvider from "../randomization/RandomizationProvider";
import BinaryChromosomeBase from "./BinaryChromosomeBase";
import Gene from "./Gene";
import IChromosome from "./IChromosome";

export default class FloatingPointChromosome extends BinaryChromosomeBase {
    public originalValue: number[];
    constructor(minValue: number[], maxValue: number[]) {


        super(32 * minValue.length);
        this.minValue = minValue;
        this.maxValue = maxValue;
        this.originalValue = this.flatten(minValue, maxValue);

        this.createGenes();

    }

    private maxValue: number[];
    private minValue: number[];

    createNew(): IChromosome {
        return new FloatingPointChromosome(this.minValue, this.maxValue);
    }

    flatten = (minValue: number[], maxValue: number[]): number[] => {

        let str = "";
        for (let i = 0; i < minValue.length; i++) {
            const min = minValue[i];
            const max = maxValue[i];
            const r = RandomizationProvider.current.getInt(min, max);
            str += Float32Encoding.convertFloat32ToBin(r);
        }

        let result = [];
        result = str.split("");
        return result;
    }

    generateGene(geneIndex: number): Gene {
        const gene = this.originalValue[geneIndex];
        return new Gene(gene);
    }



}