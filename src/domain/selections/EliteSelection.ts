import { Generation } from "../populations/Generation";
import { SelectionBase } from "./SelectionBase";

class EliteSelection extends SelectionBase {
    performSelectChromosome(num: number, generation: Generation) {
        let ordered = generation.getChromosome().sort((a, b) => a.fitness - b.fitness);
        return ordered.slice(0, num);
    }

    constructor() {
        super(2);
    }

}

export { EliteSelection };