import { IChromosome } from "./IChromosome";

class ChromosomeExtension {
  static anyHasRepeatedGene(chromosomes: IChromosome[]): boolean {
    for (let i = 0; i < chromosomes.length; i++) {
      let c = chromosomes[i];
      // https://codeburst.io/javascript-array-distinct-5edc93501dc4
      let notRepeatedGenesLength = [...new Set(c.getGenes())].length;
      if (notRepeatedGenesLength < c.length) return true;
    }

    return false;
  }

  static validateGenes(
    chromosome?: IChromosome,
    chromosomes?: IChromosome[]
  ): void {}
}

export { ChromosomeExtension };
