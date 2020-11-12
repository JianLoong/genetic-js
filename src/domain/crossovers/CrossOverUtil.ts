import RandomizationProvider from "../randomization/RandomizationProvider";

// https://www.researchgate.net/figure/An-example-of-order-crossover_fig4_282998951
export default class CrossOverUtil {
  static orderedCrossover = (
    parentOne: any[],
    parentTwo: any[],
    pos1?: number,
    pos2?: number
  ): any[] => {
    const parentOneClone = [...parentOne];
    let parentTwoClone = [...parentTwo];
    const length = parentOne.length;
    const random = RandomizationProvider.current
      .getUniqueInts(2, 0, length)
      .sort((a, b) => a - b);

    if (pos1 === undefined) pos1 = random[0];
    if (pos2 === undefined) pos2 = random[1];

    const child: any[] = [];
    const markedOut: any[] = [];
    for (let i = pos1; i < pos2; i++) {
      markedOut.push(parentOneClone[i]);
      child[i] = parentOneClone[i];
    }

    parentTwoClone = parentTwoClone.filter((val) => !markedOut.includes(val));
    for (let i = 0; i < pos1; i++) child[i] = parentTwoClone.shift();
    for (let i = pos2; i < length; i++) child[i] = parentTwoClone.shift();

    return child;
  };

  static pmxCrossOver = {

  }
}
