import BinaryChromosomeBase from "../../../domain/chromosome/BinaryChromosomeBase";
import IChromosome from "../../../domain/chromosome/IChromosome";

export default class BinaryChromosomeStub extends BinaryChromosomeBase {
  createNew(): IChromosome {
    return new BinaryChromosomeStub(super.length);
  }

  constructor(length: number) {
    super(length);
  }
}
