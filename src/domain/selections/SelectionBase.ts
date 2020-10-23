import { IChromosome } from "../chromosome/IChromosome";
import { Generation } from "../populations/Generation";
import { ISelection } from "./ISelection";

abstract class SelectionBase implements ISelection {
  selectChromosomes(num: number, generation: Generation): IChromosome[] {
    return this.performSelectChromosome(num, generation);
  }

  abstract performSelectChromosome(num: number, generation: Generation);
  m_minNumberChromosome: number;

  constructor(minNumberChromosome: number) {
    this.m_minNumberChromosome = minNumberChromosome;
  }
}

export { SelectionBase };
