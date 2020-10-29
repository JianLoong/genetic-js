import IChromosome from "../chromosome/IChromosome";
import Generation from "../populations/Generation";
import ISelection from "./ISelection";

export default abstract class SelectionBase implements ISelection {
  minNumberChromosome: number;

  constructor(minNumberChromosome: number) {
    this.minNumberChromosome = minNumberChromosome;
  }

  abstract performSelectChromosome(num: number, generation: Generation): IChromosome[];
  selectChromosomes(num: number, generation: Generation): IChromosome[] {
    if (num < this.minNumberChromosome) {
      throw new Error("");
    }
    return this.performSelectChromosome(num, generation);
  }
}
