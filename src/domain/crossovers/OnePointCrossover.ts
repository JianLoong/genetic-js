import IChromosome from "../chromosome/IChromosome";
import RandomizationProvider from "../randomization/RandomizationProvider";
import CrossoverBase from "./CrossoverBase";

export default class OnePointCrossover extends CrossoverBase {

    constructor(swapPointIndex?: number) {
        super(2, 2);

        if (swapPointIndex !== undefined)
            this.swapPointIndex = swapPointIndex;
    }

    private swapPointIndex: number;

    performCross(parents: IChromosome[]): IChromosome[] {
        const firstParent = parents[0];
        const secondParent = parents[1];

        const swapPointsLength = firstParent.getGenes().length - 1;

        if (this.swapPointIndex === undefined)
            this.swapPointIndex = RandomizationProvider.current.getInt(0, firstParent.getGenes().length - 1);

        if (this.swapPointIndex >= swapPointsLength) {
            throw new Error("SwapPointIndex - The swap point index.");
        }

        return this.createChildren(firstParent, secondParent);
    }

    private createChild(leftParent: IChromosome, rightParent: IChromosome) {
        const cutGeneCount = this.swapPointIndex + 1;
        const child = leftParent.createNew();
        const left = leftParent.getGenes().slice(0, cutGeneCount);
        const right = rightParent.getGenes().slice(cutGeneCount, rightParent.getGenes().length - 1);
        const combined = left.concat(right);
        child.replaceGenes(0, combined);

        return child;
    }

    private createChildren(firstParent: IChromosome, secondParent: IChromosome): IChromosome[] {
        const firstChild = this.createChild(firstParent, secondParent);
        const secondChild = this.createChild(secondParent, firstParent);
        return [firstChild, secondChild];
    }
}