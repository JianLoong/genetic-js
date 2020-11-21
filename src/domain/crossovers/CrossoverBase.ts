import IChromosome from "../chromosome/IChromosome";
import ICrossover from "./ICrossover";

export default abstract class CrossoverBase implements ICrossover {
  public childrenNumber: number;
  isOrdered: boolean;

  public minChromosomeLength: number;
  public parentNumber: number;
  constructor(
    parentsNumber: number,
    childrenNumber: number,
    minChromosomeLength?: number
  ) {
    this.parentNumber = parentsNumber;
    this.childrenNumber = childrenNumber;
    this.minChromosomeLength = minChromosomeLength || 0;
    this.isOrdered = false;

  }

  cross(parents: IChromosome[]): IChromosome[] {
    if (parents.length < 2) {
      throw new Error("Crossover needs at least 2 parents");
    }
    return this.performCross(parents);
  }

  abstract performCross(parents: IChromosome[]): IChromosome[];
}
