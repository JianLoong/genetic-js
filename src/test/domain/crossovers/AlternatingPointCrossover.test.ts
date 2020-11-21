import DecimalChromosome from "../../../domain/chromosome/DecimalChromosome";
import Gene from "../../../domain/chromosome/Gene";
import AlternatingPointCrossover from "../../../domain/crossovers/AlternatingPointCrossover"

describe("AlternatingPointCrossover Test", () => {

    it("should throw an error because there are repeated genes", () => {
        const a = new AlternatingPointCrossover();
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

    it("should throw an error because there are no parents", () => {
        const a = new AlternatingPointCrossover();
        const t = () => a.cross([]);
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

    it("The length of the offspring returned should be equal to the parent.", () => {
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
