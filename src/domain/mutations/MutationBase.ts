import IChromosome from "../chromosome/IChromosome";
import IMutation from "./IMutation";

export default abstract class MutationBase implements IMutation {
  isOrdered: boolean = false;

  mutate(chromosome: IChromosome, probability: number): void {
    this.performMutate(chromosome, probability);
  }

  abstract performMutate(chromosome: IChromosome, probability: number): void;
}
