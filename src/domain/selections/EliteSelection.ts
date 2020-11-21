import { FuncFitness } from "../..";
import IChromosome from "../chromosome/IChromosome";
import Generation from "../populations/Generation";
import SelectionBase from "./SelectionBase";

export default class EliteSelection extends SelectionBase {

  constructor(isMaximized?: boolean) {
    super(2);
    if (isMaximized === undefined)
      this.isMaximized = true;
    else
      this.isMaximized = isMaximized;
  }

  private isMaximized: boolean;
  performSelectChromosome(num: number, generation?: Generation): IChromosome[] {
    if (generation === undefined)
      throw new Error("EliteSelection - No generation for Elite Selection");
    if (generation.chromosomes.length === 0)
      throw new Error("There are no chromosomes in this generation.");

    const chromosomes = generation.getChromosome();

    const ordered = FuncFitness.sort(chromosomes, this.isMaximized);
    return ordered.slice(0, num);
  }
}
