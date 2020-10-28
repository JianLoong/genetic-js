import BinaryChromosomeBase from "./BinaryChromosomeBase";
import Gene from "./Gene";
import IChromosome from "./IChromosome";
export default class FloatingPointChromosome extends BinaryChromosomeBase {

  constructor(mValue: number) {
    super(32);
    this.mValue = mValue;
    const result = this.convertFloat32ToBin(mValue);
    this.binArrayStr = result.split("");

    this.createGenes();
  }

  private binArrayStr: string[];
  private mValue: number;

  createNew(): IChromosome {
    return new FloatingPointChromosome(this.mValue);
  }

  generateGene(geneIndex: number): Gene {
    return new Gene(this.binArrayStr[geneIndex]);
  }

  private convertFloat32ToBin = (float32) => {
    const HexToBin = hex => (parseInt(hex, 16).toString(2)).padStart(32, '0');
    const getHex = i => ('00' + i.toString(16)).slice(-2);
    const view = new DataView(new ArrayBuffer(4))
    view.setFloat32(0, float32);
    return HexToBin(Array.apply(null, { length: 4 }).map((_, i) => getHex(view.getUint8(i))).join(''));
  }
}

export { FloatingPointChromosome };
