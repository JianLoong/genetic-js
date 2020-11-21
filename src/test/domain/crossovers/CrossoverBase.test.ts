import DecimalChromosome from "../../../domain/chromosome/DecimalChromosome";
import Gene from "../../../domain/chromosome/Gene";
import OnePointCrossover from "../../../domain/crossovers/OnePointCrossover"

describe("CrossoverBase Test", () => {

    it("should throw an error because of the swap point index bounds", () => {
        const a = new OnePointCrossover(100);
        const p1 = [2, 2, 3, 4, 5, 6, 7, 2];
        const p2 = [3, 7, 5, 1, 6, 8, 2, 4];

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


});
