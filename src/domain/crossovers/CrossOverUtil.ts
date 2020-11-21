import Gene from "../chromosome/Gene";

// https://www.researchgate.net/figure/An-example-of-order-crossover_fig4_282998951
export default class CrossOverUtil {
  static orderedCrossover = (p1: Gene[], p2: Gene[], pos1: number, pos2: number): Gene[] => {

    const child: Gene[] = [];
    const parentOne = [...p1];
    let parentTwo = [...p2];

    const markedOut: Gene[] = [];
    for (let i = pos1; i < pos2; i++) {
      markedOut.push(parentOne[i]);
      child[i] = parentOne[i];
    }

    parentTwo = parentTwo.filter(element => {
      for (const marked of markedOut) {
        if (marked.equals(element))
          return false;
      }
      return true;
    });

    for (let i = 0; i < pos1; i++) {
      child[i] = parentTwo[0];
      parentTwo.shift();
    }
    for (let i = pos2; i < parentOne.length; i++) {
      child[i] = parentTwo[0];
      parentTwo.shift();
    }

    return child;
  };
}
