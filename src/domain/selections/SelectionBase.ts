import IChromosome from "../chromosome/IChromosome";
import Generation from "../populations/Generation";
import ISelection from "./ISelection";

export default abstract class SelectionBase implements ISelection {
  m_minNumberChromosome: number;

  constructor(minNumberChromosome: number) {
    this.m_minNumberChromosome = minNumberChromosome;
  }

  abstract performSelectChromosome(num: number, generation: Generation);
  selectChromosomes(num: number, generation: Generation): IChromosome[] {
    return this.performSelectChromosome(num, generation);
  }
}
