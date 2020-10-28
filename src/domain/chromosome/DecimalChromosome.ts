import RandomizationProvider from "../randomization/RandomizationProvider";
import ChromosomeBase from "./ChromosomeBase";
import Gene from "./Gene";
import IChromosome from "./IChromosome";

export default class DecimalChromosome extends ChromosomeBase {
  constructor(
    length: number,
    minValue?: number,
    maxValue?: number,
    unique?: boolean,
    randomValues?: number[]
  ) {
    super(length);
    this.minValue = minValue;
    this.maxValue = maxValue;
    unique === undefined ? (this.unique = false) : (this.unique = true);

    if (randomValues === undefined) {
      if (unique === true)
        this.randomValues = RandomizationProvider.current.getUniqueInts(length, minValue, maxValue);
      else
        this.randomValues = RandomizationProvider.current.getInts(length, minValue, maxValue);
    } else {
      this.randomValues = randomValues;
    }

    this.createGenes();
  }
  private maxValue: number;
  private minValue: number;
  private randomValues: number[];
  private unique: boolean;

  // clone = () => {
  //   const clone = new DecimalChromosome(
  //     this.length,
  //     this.minValue,
  //     this.maxValue,
  //     this.unique,
  //     this.randomValues
  //   );
  //   return clone;
  // };

  createNew(): IChromosome {
    return new DecimalChromosome(this.length, this.minValue, this.maxValue);
  }
  generateGene(geneIndex: number): Gene {
    return new Gene(this.randomValues[geneIndex]);
  }
}
