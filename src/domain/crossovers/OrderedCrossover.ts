
import ChromosomeExtension from "../chromosome/ChromosomeExtension";
import IChromosome from "../chromosome/IChromosome";
import RandomizationProvider from "../randomization/RandomizationProvider";
import CrossoverBase from "./CrossoverBase";
import CrossOverUtil from "./CrossOverUtil";

export default class OrderedCrossover extends CrossoverBase {
  constructor(indexes?: number[]) {
    super(2, 2);
    if (indexes !== undefined)
      this.indexes = indexes;
  }

  private indexes?: number[];

  performCross(parents: IChromosome[]): IChromosome[] {
    const parentOne = parents[0];
    const parentTwo = parents[1];

    if (ChromosomeExtension.anyHasRepeatedGene([parentOne, parentTwo])) {
      throw new Error("Ordered crossover can only be used if parents do not have repeated genes.");
    }

    if (this.indexes === undefined)
      this.indexes = RandomizationProvider.current.getUniqueInts(2, 0, parentOne.length);

    if (this.indexes.length !== 2)
      throw new Error("Only 2 indexes are needed for the ordered crossover.");

    const middleSectionIndexes = this.indexes.sort((a, b) => a - b);
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

    child.replaceGenes(0, childGenes);

    return child;
  }
}
