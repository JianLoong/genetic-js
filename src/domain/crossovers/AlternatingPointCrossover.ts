import { SSL_OP_PKCS1_CHECK_1 } from "constants";
import ChromosomeExtension from "../chromosome/ChromosomeExtension";
import DecimalChromosome from "../chromosome/DecimalChromosome";
import Gene from "../chromosome/Gene";
import IChromosome from "../chromosome/IChromosome";
import CrossoverBase from "./CrossoverBase";

export default class AlternatingPointCrossover extends CrossoverBase {
  constructor() {
    super(2, 2);
  }
  performCross(parents: IChromosome[]): IChromosome[] {

    const p1 = parents[0];
    const p2 = parents[1];

    if (ChromosomeExtension.anyHasRepeatedGene(parents)) {
      throw new Error("Alternating cross over has repeated");
    }


    const child1 = this.createChild(p1, p2);
    const child2 = this.createChild(p2, p1);

    return [child1, child2];
  }

  private createChild(
    firstParent: IChromosome,
    secondParent: IChromosome
  ): IChromosome {
    const child = [];
    const c = new DecimalChromosome(firstParent.length);
    const p1 = [...firstParent.getGenes()];
    const p2 = [...secondParent.getGenes()];
    const p1Genes = [];
    const p2Genes = [];
    p1.forEach((element) => p1Genes.push(element.mValue));
    p2.forEach((element) => p2Genes.push(element.mValue));

    const length = p1.length;
    while (child.length < length) {
      !child.includes(p1Genes[0])
        ? child.push(p1Genes.shift())
        : p1Genes.shift();
      !child.includes(p2Genes[0])
        ? child.push(p2Genes.shift())
        : p2Genes.shift();
    }
    for (let i = 0; i < firstParent.length; i++)
      c.replaceGene(i, new Gene(child[i]));

    return c;
  }
}
