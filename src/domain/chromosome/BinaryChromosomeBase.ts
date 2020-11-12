import { IBinaryChromosome } from "./IBinaryChromosome";
import ChromosomeBase from "./ChromosomeBase";
import Gene from "./Gene";

export default abstract class BinaryChromosomeBase extends ChromosomeBase
  implements IBinaryChromosome {
  constructor(length: number) {
    super(length);
  }

  flipGene(index: number): void {
    const value = this.getGene(index);
    if (value.mValue === undefined) throw new Error("BinaryChromosomeBase - Cannot Flip a gene which is undefined");
    this.replaceGene(index, new Gene(value.mValue === 0 ? 1 : 0));
  }

  toString() {
    const str = this.getGenes().toString();
    return str;
  }
}
