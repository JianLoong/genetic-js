import RandomizationProvider from "../randomization/RandomizationProvider";
import ChromosomeBase from "./ChromosomeBase";
import Gene from "./Gene";
import IChromosome from "./IChromosome";

export default class NQueenChromosome extends ChromosomeBase {

  constructor(noOfQueen) {
    super(noOfQueen);
    this.noOfQueen = noOfQueen;
    this.r = RandomizationProvider.current.getUniqueInts(
      noOfQueen,
      0,
      noOfQueen
    );
    this.createGenes();
  }
  private noOfQueen: number;
  private r: number[]; // = new RandomizationProvider().current.getUniqueInts(4, 0, 4);

  // clone() {
  //   const c = new NQueenChromosome(this.noOfQueen);
  //   c.replaceGenes(0, this.genes);
  //   c.r = this.r;
  //   return c;
  // }
  createNew(): IChromosome {
    // for (let i = 0; i < this.r.length; i++) {
    //  super.replaceGene(i, new Gene(this.r[i]));
    // }
    return new NQueenChromosome(this.noOfQueen);
  }

  generateGene(geneIndex: number): Gene {
    return new Gene(this.r[geneIndex]);
  }

  toString() {
    let str = "";
    for (let i = 0; i < this.getGenes().length; i++) {
      str += this.getGene(i).mValue + " ";
    }
    const fitness = " Fitness:  " + this.fitness;
    str += fitness;
    return str;
  }
}
