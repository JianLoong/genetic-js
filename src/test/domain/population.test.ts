import { Gene } from "../../domain/chromosome/Gene";
import { IntegerChromosome } from "../../domain/chromosome/IntegerChromosome";
import { Population } from "../../domain/populations/Population";

describe("Population Test", () => {
    test("Check the population constructor", () => {
        let c = new IntegerChromosome(0, 5);
        let p = new Population(20, 50, c);

        expect(p.adamChromosome).toBeInstanceOf(IntegerChromosome);

    });

});