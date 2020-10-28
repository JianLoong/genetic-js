import AlternatingPointCrossover from "../../domain/crossovers/AlternatingPointCrossover";
import CrossOverUtil from "../../domain/crossovers/CrossOverUtil";

describe("CrossOver Test", () => {
  test("Check the alternating point crossover", () => {

    const p1 = [1, 2, 3, 4, 5, 6, 7, 8];
    const p2 = [3, 7, 5, 1, 6, 8, 2, 4];
    const o = [1, 3, 2, 7, 5, 4, 6, 8];

    const child = [];
    const maxLength = p1.length;

    while (child.length < maxLength) {
      !child.includes(p1[0]) ? child.push(p1.shift()) : p1.shift();
      !child.includes(p2[0]) ? child.push(p2.shift()) : p2.shift();
    }

    expect(child).toEqual(o);
  });
  test("Check the ordered crossover", () => {
    const p1 = [5, 3, 4, 8, 1, 2, 7, 6];
    const p2 = [3, 8, 6, 7, 2, 4, 1, 5];
    const o = [6, 3, 4, 8, 1, 2, 7, 5];

    const child = CrossOverUtil.orderedCrossover(p1, p2, 1, 6);

    expect(child).toEqual(o);
  });
});
