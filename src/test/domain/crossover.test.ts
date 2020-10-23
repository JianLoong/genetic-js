import { Gene } from "../../domain/chromosome/Gene";
import { IntegerChromosome } from "../../domain/chromosome/IntegerChromosome";
import { NQueenChromosome } from "../../domain/chromosome/NQueenChromosome";
import { OrderedCrossover } from "../../domain/crossovers/OrderedCrossover";
import { mockRandom } from 'jest-mock-random';
import { resetMockRandom } from 'jest-mock-random';


describe("CrossOver Test", () => {
    test("Check the ordered crossover", () => {
        let a = new OrderedCrossover();
        let c1 = new NQueenChromosome(10);
        let c2 = new NQueenChromosome(10);
        let offspring = new NQueenChromosome(10);

        let p1 = [8, 4, 7, 3, 6, 2, 5, 1, 9, 0];
        let p2 = [0, 4, 7, 3, 6, 2, 5, 1, 8, 9];
        let o = [8, 2, 9, 8, 7, 6, 5, 4, 3, 0];

        for (let i = 0; i < p1.length; i++) {
            c1.replaceGene(i, new Gene(p1[i]));
            c2.replaceGene(i, new Gene(p2[i]));
            offspring.replaceGene(i, new Gene(o[i]));
        }

        let parents = [c1, c2];
        console.log(c1.getGenes().toString());
        console.log(c2.getGenes().toString());


        mockRandom([0.2, 0.7]);

        let child = a.cross(parents)[0].getGenes();
        console.log(child.toString());

        expect(child.toString()).toEqual(offspring.getGenes().toString());

        //expect(a.cross(parents)[0].getGenes().toString()).toEqual(offspring.getGenes().toString());
        resetMockRandom();
    });
});