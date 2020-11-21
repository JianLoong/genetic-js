import FuncFitness from "../fitnesses/FuncFitness";
import Generation from "../populations/Generation";
import SelectionBase from "./SelectionBase";

export default class RankSelection extends SelectionBase {

    constructor(isMaximized?: boolean) {
        super(2);
        if (isMaximized === undefined)
            this.isMaximized = true;
        else
            this.isMaximized = isMaximized;
    }

    private isMaximized: boolean;
    performSelectChromosome(num: number, generation: Generation) {
        if (generation === undefined)
            throw new Error("EliteSelection - No generation for Elite Selection");
        if (generation.chromosomes.length === 0)
            throw new Error("There are no chromosomes in this generation.");

        // const ordered = generation
        //     .getChromosome()
        //     .sort((a, b) => b.fitness - a.fitness);
        const ordered = FuncFitness.sort(generation.getChromosome(), this.isMaximized);
        return ordered.slice(0, num);
    }
}
