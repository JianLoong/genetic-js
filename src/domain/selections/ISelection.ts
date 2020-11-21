import IChromosome from "../chromosome/IChromosome";
import Generation from "../populations/Generation";

export default interface ISelection {
  selectChromosomes(num: number, generation?: Generation): IChromosome[];
}
