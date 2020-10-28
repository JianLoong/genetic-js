import RandomizationProvider from "../randomization/RandomizationProvider";
import BinaryChromosomeBase from "./BinaryChromosomeBase";
import Gene from "./Gene";
import IChromosome from "./IChromosome";

export default class IntegerChromosome extends BinaryChromosomeBase {
  maxValue: number;
  minValue: number;
  originalValue = [];

  constructor(minValue: number, maxValue: number) {
    super(32);
    this.minValue = minValue;
    this.maxValue = maxValue;
    const randomValue = RandomizationProvider.current.getInt(minValue, maxValue);

    this.originalValue = this.createBinaryString(randomValue)
      .split("")
      .map(Number);
    this.createGenes();
  }

  // Will be replaced
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padStart
  createBinaryString(nMask: number): string {
    const binary = nMask.toString(2);

    return binary.padStart(32, "0");
  }

  createNew(): IChromosome {
    return new IntegerChromosome(this.minValue, this.maxValue);
  }

  flipGene = (index: number) => {
    const realIndex = Math.abs(31 - index);
    const value = this.getGene(realIndex).mValue;

    this.replaceGene(realIndex, new Gene(value === 0 ? 1 : 0));
  };

  generateGene(geneIndex: number): Gene {
    const value = this.originalValue[geneIndex];
    return new Gene(value);
  }

  toString(): string {
    let str = "";
    for (let i = 0; i < this.getGenes().length; i++) {
      str += this.getGene(i).mValue + " ";
    }

    const fitness = "Fitness:  " + this.fitness;
    // return str + fitness;
    return super.toString();
  }
}
