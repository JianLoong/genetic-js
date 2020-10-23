import { IChromosome } from "../chromosome/IChromosome";
import { CrossoverBase } from "./CrossoverBase";
class UniformCrossover extends CrossoverBase {
  private mixProbability: number;
  constructor(mixProbability: number) {
    super(2, 2);
    this.mixProbability = mixProbability;
  }

  performCross(parents: IChromosome[]): IChromosome[] {
    let firstParent = parents[0];
    let secondParent = parents[1];

    let firstChild = firstParent.createNew();
    let secondChild = secondParent.createNew();

    let children: IChromosome[] = [];

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

export { UniformCrossover };
