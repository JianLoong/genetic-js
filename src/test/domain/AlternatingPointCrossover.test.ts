import { mockRandom } from "jest-mock-random";
import { resetMockRandom } from "jest-mock-random";
import Gene from "../../domain/chromosome/Gene";
import NQueenChromosome from "../../domain/chromosome/NQueenChromosome";
import OrderedCrossover from "../../domain/crossovers/OrderedCrossover";
import AlternatingPointCrossover from "../../domain/crossovers/AlternatingPointCrossover";
import ChromosomeBase from "../../domain/chromosome/ChromosomeBase";
import DecimalChromosome from "../../domain/chromosome/DecimalChromosome"

describe("CrossOver Test", () => {

    it("should throw an error", () => {
        const a = new AlternatingPointCrossover();
        const p1 = [2, 2, 3, 4, 5, 6, 7, 2];
        const p2 = [3, 7, 5, 1, 6, 8, 2, 4];
        const o = [1, 3, 2, 7, 5, 4, 6, 8];
        const o2 = [3, 1, 7, 2, 5, 4, 6, 8]

        const d1 = new DecimalChromosome(8);
        const d2 = new DecimalChromosome(8);

        const maxLength = p1.length;


        for (let i = 0; i < maxLength; i++) {
            d1.replaceGene(i, new Gene(p1[i]));
            d2.replaceGene(i, new Gene(p2[i]));
        }

        const parents = [d1, d2];

        const t = () => a.cross(parents);

        expect(t).toThrowError();

    });

    it("should return offspring of alternating point crossover", () => {
        const a = new AlternatingPointCrossover();
        const p1 = [1, 2, 3, 4, 5, 6, 7, 8];
        const p2 = [3, 7, 5, 1, 6, 8, 2, 4];
        const o = [1, 3, 2, 7, 5, 4, 6, 8];
        const o2 = [3, 1, 7, 2, 5, 4, 6, 8]

        const d1 = new DecimalChromosome(8);
        const d2 = new DecimalChromosome(8);
        const c1 = new DecimalChromosome(8);
        const c2 = new DecimalChromosome(8);

        const maxLength = p1.length;


        for (let i = 0; i < maxLength; i++) {
            d1.replaceGene(i, new Gene(p1[i]));
            d2.replaceGene(i, new Gene(p2[i]));
            c1.replaceGene(i, new Gene(o[i]));
            c2.replaceGene(i, new Gene(o2[i]));
        }

        const parents = [d1, d2];

        expect(a.cross(parents)[0]).toEqual(c1);
        expect(a.cross(parents)[1]).toEqual(c2);
    });
});
