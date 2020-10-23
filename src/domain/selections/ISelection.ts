import { IChromosome } from "../chromosome/IChromosome";

import { Generation } from "../populations/Generation";

interface ISelection {
  selectChromosomes(num: number, generation: Generation): IChromosome[];
}

export { ISelection };
