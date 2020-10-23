import { BinaryChromosomeBase } from "../../domain/chromosome/BinaryChromosomeBase";
import { IChromosome } from "../../domain/chromosome/IChromosome";

class BinaryChromosomeStub extends BinaryChromosomeBase {
  createNew(): IChromosome {
    return new BinaryChromosomeStub(length);
  }

  constructor(length: number) {
    super(length);
  }
}

export { BinaryChromosomeStub };
