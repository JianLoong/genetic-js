import { FuncFitness } from "../..";
import Generation from "../populations/Generation";
import SelectionBase from "./SelectionBase";

export default class EliteSelection extends SelectionBase {

  constructor(isMaximized: boolean = true) {
    super(2);
  }
  performSelectChromosome(num: number, generation: Generation) {
    if (generation === undefined)
      throw new Error("EliteSelection - No generation for Elite Selection");

    // const ordered = generation
    //   .getChromosome()
    //   .sort((a, b) => b.fitness - a.fitness);
    const chromosomes = generation.getChromosome();

    const ordered = FuncFitness.sort(chromosomes);
    return ordered.slice(0, num);
  }
}
