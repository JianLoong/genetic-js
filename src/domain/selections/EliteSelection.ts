import { Generation } from "../populations/Generation";
import { SelectionBase } from "./SelectionBase";

class EliteSelection extends SelectionBase {
    performSelectChromosome(num: number, generation: Generation) {
        if (generation == undefined)
            throw new Error("Selection - No generation for Elite Selection");

        let ordered = generation.getChromosome().sort((a, b) => b.fitness - a.fitness);
        return ordered.slice(0, num);
    }

    constructor() {
        super(2);
    }

}

export { EliteSelection };