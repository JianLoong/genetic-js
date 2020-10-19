import { Gene } from "./Gene";
import { ChromosomeBase } from "./ChromosomeBase";
import { IBinaryChromosome } from "./IBinaryChromosome";


abstract class BinaryChromosomeBase
    extends ChromosomeBase
    implements IBinaryChromosome {
    constructor(length: number) {
        super(length);
    }
    flipGene(index: number): void {
        let value = this.getGene(index).m_value;
        this.replaceGene(index, new Gene(value === 0? 1 : 0));
    }

    generateGene(geneIndex: number): Gene {
        let value = Math.floor(Math.random() * Math.floor(2));
        return new Gene(value);
    }

    toString() {
        let str = this.getGenes().toString();
        return str;
    }
}

export { BinaryChromosomeBase };
