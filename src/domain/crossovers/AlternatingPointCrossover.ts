import ChromosomeExtension from "../chromosome/ChromosomeExtension";
import DecimalChromosome from "../chromosome/DecimalChromosome";
import Gene from "../chromosome/Gene";
import IChromosome from "../chromosome/IChromosome";
import CrossoverBase from "./CrossoverBase";

// https://www.researchgate.net/figure/Alternating-position-crossover-AP_fig5_226665831
export default class AlternatingPointCrossover extends CrossoverBase {
  constructor() {
    super(2, 2);
  }
  performCross(parents: IChromosome[]): IChromosome[] {

    const p1 = parents[0];
    const p2 = parents[1];

    if (ChromosomeExtension.anyHasRepeatedGene(parents)) {
      throw new Error("Alternating cross over has repeated genes");
    }


    const child1 = this.createChild(p1, p2);
    const child2 = this.createChild(p2, p1);

    return [child1, child2];
  }

  private createChild(
    firstParent: IChromosome,
    secondParent: IChromosome
  ): IChromosome {
    const child: Gene[] = [];
    const c = new DecimalChromosome(firstParent.length);
    const p1: Gene[] = [...firstParent.getGenes()];
    const p2: Gene[] = [...secondParent.getGenes()];
    const p1Genes: Gene[] = [];
    const p2Genes: Gene[] = [];
    p1.forEach((element) => p1Genes.push(element.mValue));
    p2.forEach((element) => p2Genes.push(element.mValue));

    const length = p1.length;
    while (child.length < length) {
      if (!child.includes(p1Genes[0])) {
        const gene = p1Genes[0];
        child.push(gene);
        p1Genes.shift();
      } else {
        p1Genes.shift();
      }

      if (!child.includes(p2Genes[0])) {
        const gene = p2Genes[0];
        child.push(gene);
        p2Genes.shift();
      } else {
        p2Genes.shift();
      }
    }
    for (let i = 0; i < firstParent.length; i++)
      c.replaceGene(i, new Gene(child[i]));
    return c;
  }
}
