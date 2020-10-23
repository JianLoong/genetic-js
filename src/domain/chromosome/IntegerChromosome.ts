import { BinaryChromosomeBase } from "./BinaryChromosomeBase";
import { IChromosome } from "./IChromosome";
import { Gene } from "./Gene";
import { RandomizationProvider } from "../randomizations/RandomizationProvider";

class IntegerChromosome extends BinaryChromosomeBase {
  m_minValue: number;
  m_maxValue: number;
  m_originalValue = [];

  createNew(): IChromosome {
    return new IntegerChromosome(this.m_minValue, this.m_maxValue);
  }

  constructor(minValue: number, maxValue: number) {
    super(32);
    this.m_minValue = minValue;
    this.m_maxValue = maxValue;
    let randomValue = RandomizationProvider.current.getInt(minValue, maxValue);

    this.m_originalValue = this.createBinaryString(randomValue)
      .split("")
      .map(Number);
    this.createGenes();
  }

  // Will be replaced
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padStart
  createBinaryString(nMask: number): string {
    let binary = nMask.toString(2);

    return binary.padStart(32, "0");
  }

  // createBinaryString(nMask: number): string {
  //     // nMask must be between -2147483648 and 2147483647
  //     for (var nFlag = 0, nShifted = nMask, sMask = ""; nFlag < 32;
  //         nFlag++, sMask += String(nShifted >>> 31), nShifted <<= 1);
  //     return sMask;
  // }

  generateGene(geneIndex: number): Gene {
    let value = this.m_originalValue[geneIndex];
    return new Gene(value);
  }

  getGenes(): Gene[] {
    return super.getGenes();
  }

  toString(): string {
    let str = "";
    for (let i = 0; i < this.getGenes().length; i++) {
      str += this.getGene(i).m_value + " ";
    }

    let fitness = "Fitness:  " + this.fitness;
    //return str + fitness;
    return super.toString();
  }

  flipGene = (index: number) => {
    let realIndex = Math.abs(31 - index);
    let value = this.getGene(realIndex).m_value;

    this.replaceGene(realIndex, new Gene(value == 0 ? 1 : 0));
  };
}

export { IntegerChromosome };
