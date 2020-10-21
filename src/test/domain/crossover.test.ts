import { Gene } from "../../domain/chromosome/Gene";
import { IntegerChromosome } from "../../domain/chromosome/IntegerChromosome";
import { OrderedCrossover } from "../../domain/crossovers/OrderedCrossover";

describe("CrossOver Test", () => {
    test("Check the gene constructor", () => {
        let a = new OrderedCrossover();
        let c1 = new IntegerChromosome(0, 1);
        let c2 = new IntegerChromosome(0, 1);
        let parents = [c1, c2];

        expect(a.cross(parents)).toEqual(parents);
    });
});