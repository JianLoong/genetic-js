import { Gene } from "./Gene";
import { ChromosomeBase } from "./ChromosomeBase";
import { IBinaryChromosome } from "./IBinaryChromosome";
import { RandomizationProvider } from "../randomizations/RandomizationProvider";

abstract class BinaryChromosomeBase
    extends ChromosomeBase
    implements IBinaryChromosome {
    constructor(length: number) {
        super(length);
    }
    flipGene(index: number): void {
        let value = this.getGene(index);

        if (value == undefined)
            throw new Error("");

        this.replaceGene(index, new Gene(value.m_value === 0 ? 1 : 0));
    }

    generateGene(geneIndex: number): Gene {
        let random = new RandomizationProvider();
        let value = random.current.getInt(0, 2);
        return new Gene(value);
    }

    toString() {
        let str = this.getGenes().toString();
        return str;
    }
}

export { BinaryChromosomeBase };
