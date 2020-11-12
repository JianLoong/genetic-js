import ChromosomeExtension from "../chromosome/ChromosomeExtension";
import IChromosome from "../chromosome/IChromosome";
import RandomizationProvider from "../randomization/RandomizationProvider";
import CrossoverBase from "./CrossoverBase";
import CrossOverUtil from "./CrossOverUtil";

export default class OrderedCrossover extends CrossoverBase {
  constructor() {
    super(2, 2);
  }
  performCross(parents: IChromosome[]): IChromosome[] {
    const parentOne = parents[0];
    const parentTwo = parents[1];

    if (ChromosomeExtension.anyHasRepeatedGene([parentOne, parentTwo])) {
      throw new Error("Ordered Crossover - Parents have repeated genes");
    }

    let middleSectionIndexes = RandomizationProvider.current.getUniqueInts(
      2,
      0,
      parentOne.length
    );
    middleSectionIndexes = middleSectionIndexes.sort((a, b) => a - b);
    const middleSectionBeginIndex = middleSectionIndexes[0];
    const middleSectionEndIndex = middleSectionIndexes[1];

    const firstChild = this.createChild(
      parentOne,
      parentTwo,
      middleSectionBeginIndex,
      middleSectionEndIndex
    );
    const secondChild = this.createChild(
      parentTwo,
      parentOne,
      middleSectionBeginIndex,
      middleSectionEndIndex
    );

    return [firstChild, secondChild];
  }

  private createChild(
    firstParent: IChromosome,
    secondParent: IChromosome,
    middleSectionBeginIndex: number,
    middleSectionEndIndex: number
  ): IChromosome {
    const firstParentGenes = firstParent.getGenes();
    const secondParentGenes = secondParent.getGenes();

    const childGenes = CrossOverUtil.orderedCrossover(
      firstParentGenes,
      secondParentGenes,
      middleSectionBeginIndex,
      middleSectionEndIndex
    );

    const child = firstParent.createNew();

    // child.replaceGenes(0, childGenes);
    let index = 0;
    for (const gene of childGenes) {
      child.replaceGene(index, gene);
      index++;
    }
    return child;
  }
}
