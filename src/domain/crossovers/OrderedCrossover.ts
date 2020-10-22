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


        let middleSectionIndexes = new RandomizationProvider().current.getUniqueInts(2, 0, parentOne.length);
        middleSectionIndexes = middleSectionIndexes.sort((a, b) => a - b);
        let middleSectionBeginIndex = middleSectionIndexes[0];
        let middleSectionEndIndex = middleSectionIndexes[1];

        let firstChild = this.createChild(parentOne, parentTwo, middleSectionBeginIndex, middleSectionEndIndex);
        let secondChild = this.createChild(parentTwo, parentOne, middleSectionBeginIndex, middleSectionEndIndex);


        return [firstChild, secondChild];
    }

    private createChild(firstParent: IChromosome, secondParent: IChromosome, middleSectionBeginIndex: number, middleSectionEndIndex: number): IChromosome {
        let middleSectionGenes = firstParent.getGenes().slice(middleSectionBeginIndex, middleSectionEndIndex);
        let secondParentGenes = secondParent.getGenes();



        let firstChild = firstParent.createNew();

        // Mark parent 2
        let cloneSecondParent = secondParent.createNew();
        let cloneSecondParentGenes = cloneSecondParent.getGenes();
        cloneSecondParentGenes = cloneSecondParentGenes.filter((e) => {
            return !middleSectionGenes.includes(e);
        })

        for (let i = secondParent.length; i > 0; i--) {
            if (!(i > middleSectionEndIndex && i < middleSectionBeginIndex)) {
                firstChild.replaceGene(i, cloneSecondParentGenes.pop())
            }
        }


        return firstChild;
    }

}

export { OrderedCrossover };