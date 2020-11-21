import DecimalChromosome from "../../../domain/chromosome/DecimalChromosome";
import Gene from "../../../domain/chromosome/Gene";
import IChromosome from "../../../domain/chromosome/IChromosome";
import OnePointCrossover from "../../../domain/crossovers/OnePointCrossover"

describe("OnePointCrossover Test", () => {

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

    it("should work normally.", () => {
        const a = new OnePointCrossover(5);
        const p1 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        const p2 = [5, 8, 9, 4, 2, 3, 5, 7, 5, 8];
        const c1 = [0, 1, 2, 3, 4, 3, 5, 7, 5, 8];
        const c2 = [5, 8, 9, 4, 2, 5, 6, 7, 8, 9];

        const d1 = new DecimalChromosome(10);
        const d2 = new DecimalChromosome(10);
        const d3 = new DecimalChromosome(10);
        const d4 = new DecimalChromosome(10);

        const maxLength = p1.length;

        for (let i = 0; i < maxLength; i++) {
            d1.replaceGene(i, new Gene(p1[i]));
            d2.replaceGene(i, new Gene(p2[i]));
            d3.replaceGene(i, new Gene(c1[i]));
            d4.replaceGene(i, new Gene(c2[i]));

        }

        const parents = [d1, d2];
        const result: IChromosome[] = a.cross(parents);

        expect(result[0]).toEqual(d3);
        expect(result[1]).toEqual(d4);

    });

    it("should obtain a random swap point if none was given.", () => {
        const a = new OnePointCrossover();
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
        const children = a.cross(parents);
        expect(children[0]).toBeInstanceOf(DecimalChromosome);
        expect(children[1]).toBeInstanceOf(DecimalChromosome);
    });


});
