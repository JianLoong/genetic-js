import Gene from "./Gene";
import IChromosome from "./IChromosome";

export default class ChromosomeExtension {
  static anyHasRepeatedGene(chromosomes: IChromosome[]): boolean {
    for (const chromosome of chromosomes) {
      const c = chromosome;
      // https://codeburst.io/javascript-array-distinct-5edc93501dc4
      const genes: Gene[] = [];
      c.getGenes().forEach((s) => genes.push(s.mValue));

      const notRepeatedGenesLength = [...new Set(genes)].length;
      if (notRepeatedGenesLength < c.length) return true;
    }
    return false;
  }
}
