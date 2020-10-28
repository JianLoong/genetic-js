import IChromosome from "../chromosome/IChromosome";
import CrossoverBase from "./CrossoverBase";

export default class UniformCrossover extends CrossoverBase {
  constructor(mixProbability: number) {
    super(2, 2);
    this.mixProbability = mixProbability;
  }
  private mixProbability: number;

  performCross(parents: IChromosome[]): IChromosome[] {
    const firstParent = parents[0];
    const secondParent = parents[1];

    const firstChild = firstParent.createNew();
    const secondChild = secondParent.createNew();

    const children: IChromosome[] = [];

    for (let i = 0; i < firstParent.length; i++) {
      if (Math.random() < this.mixProbability) {
        firstChild.replaceGene(i, firstChild.getGene(i));
        secondChild.replaceGene(i, secondParent.getGene(i));
      } else {
        firstChild.replaceGene(i, secondParent.getGene(i));
        secondChild.replaceGene(i, firstParent.getGene(i));
      }
    }

    children.push(firstChild);
    children.push(secondChild);

    return children;
  }
}
