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
    this.minChromosomeLength = minChromosomeLength;
  }

  cross(parents: IChromosome[]): IChromosome[] {
    if (parents == null)
      throw new Error("Error - CrossOverbase: Number of parents cannot be null.");
    const firstParent = parents[0];

    if (firstParent.length < this.minChromosomeLength) {
      throw new Error("Error: A chromosome should have at least 0 genes");
    }
    return this.performCross(parents);
  }

  abstract performCross(parents: IChromosome[]): IChromosome[];
}
