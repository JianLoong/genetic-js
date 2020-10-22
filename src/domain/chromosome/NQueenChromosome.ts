import { BinaryChromosomeBase } from "./BinaryChromosomeBase";
import { IChromosome } from "./IChromosome";
import { Gene } from "./Gene";
import { RandomizationProvider } from "../randomizations/RandomizationProvider";
import { ChromosomeBase } from "./ChromosomeBase";

class NQueenChromosome extends ChromosomeBase {

    private r = new RandomizationProvider().current.getUniqueInts(5, 0, 5);


    constructor() {
        super(5);
        this.createGenes();
    }

    generateGene(geneIndex: number): Gene {

        return new Gene(this.r[geneIndex]);

    }
    createNew(): IChromosome {
        for (let i = 0; i < this.r.length; i++) {
            super.replaceGene(i, new Gene(this.r[i]));
        }
        return new NQueenChromosome();
    }

    toString() {
        let str = "";
        for (let i = 0; i < this.getGenes().length; i++) {
            str += this.getGene(i).m_value + " ";
        }

        let fitness = " Fitness:  " + this.fitness;

        str += fitness;

        return str;
    }


}
export { NQueenChromosome }