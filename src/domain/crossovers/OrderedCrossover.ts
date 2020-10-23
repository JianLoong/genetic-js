import { ChromosomeExtension } from "../chromosome/ChromosomeExtension";
import { IChromosome } from "../chromosome/IChromosome";
import { RandomizationProvider } from "../randomizations/RandomizationProvider";
import { CrossoverBase } from "./CrossoverBase";

class OrderedCrossover extends CrossoverBase {
  constructor() {
    super(2, 2);
    this.isOrdered = true;
  }
  performCross(parents: IChromosome[]): IChromosome[] {
    let parentOne = parents[0];
    let parentTwo = parents[1];

    if (ChromosomeExtension.anyHasRepeatedGene(parents)) {
      throw new Error("Crossover Error - ");
    }

    let middleSectionIndexes = RandomizationProvider.current.getUniqueInts(
      2,
      0,
      parentOne.length
    );
    middleSectionIndexes = middleSectionIndexes.sort((a, b) => a - b);
    let middleSectionBeginIndex = middleSectionIndexes[0];
    let middleSectionEndIndex = middleSectionIndexes[1];

    let firstChild = this.createChild(
      parentOne,
      parentTwo,
      middleSectionBeginIndex,
      middleSectionEndIndex
    );
    let secondChild = this.createChild(
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
    let middleSectionGenes = firstParent
      .getGenes()
      .slice(middleSectionBeginIndex, middleSectionEndIndex);
    let secondParentGenes = secondParent.getGenes();

    let firstChild = firstParent.createNew();

    // Mark parent 2
    let cloneSecondParent = secondParent.createNew();
    let cloneSecondParentGenes = cloneSecondParent.getGenes();
    // https://stackoverflow.com/questions/19957348/remove-all-elements-contained-in-another-array
    // cloneSecondParentGenes = cloneSecondParentGenes.filter((e) => {
    //     return !middleSectionGenes.includes(e);
    // })
    cloneSecondParentGenes = cloneSecondParentGenes.filter(
      (el) => !middleSectionGenes.includes(el)
    );

    let genes = [];

    for (let i = 0; i < middleSectionBeginIndex; i++) {
      genes[i] = cloneSecondParentGenes.pop();
    }

    for (let i = middleSectionBeginIndex; i < middleSectionEndIndex; i++) {
      genes[i] = middleSectionGenes.pop();
    }

    for (let i = middleSectionEndIndex; i < secondParentGenes.length; i++) {
      genes[i] = cloneSecondParentGenes.pop();
    }

    for (let i = 0; i < genes.length; i++) {
      firstChild.replaceGene(i, genes[i]);
    }

    return firstChild;
  }
}

export { OrderedCrossover };
