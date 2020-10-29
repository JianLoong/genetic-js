import BinaryChromosomeBase from "../../../domain/chromosome/BinaryChromosomeBase";
import Gene from "../../../domain/chromosome/Gene";
import IChromosome from "../../../domain/chromosome/IChromosome";

export default class BinaryChromosomeStub extends BinaryChromosomeBase {

  constructor(length: number) {
    super(length);
  }
  createNew(): IChromosome {
    return new BinaryChromosomeStub(super.length);
  }
  generateGene(geneIndex: number): Gene {
    throw new Error("Method not implemented.");
  }
}
