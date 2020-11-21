import DecimalChromosome from "../../../domain/chromosome/DecimalChromosome";
import Gene from "../../../domain/chromosome/Gene";
import IChromosome from "../../../domain/chromosome/IChromosome";
import OrderedCrossover from "../../../domain/crossovers/OrderedCrossover"

describe("Ordered Crossover Test", () => {

    it("should throw and error because of repeated genes", () => {
        const a = new OrderedCrossover();
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
        const result = () => a.cross(parents);

        expect(result).toThrowError();
    });

    it("should throw and error because of repeated genes", () => {
        const a = new OrderedCrossover();
        const p1 = [3, 7, 5, 1, 6, 8, 2, 4];
        const p2 = [2, 2, 3, 4, 5, 6, 7, 2];

        const d1 = new DecimalChromosome(8);
        const d2 = new DecimalChromosome(8);

        const maxLength = p1.length;

        for (let i = 0; i < maxLength; i++) {
            d1.replaceGene(i, new Gene(p1[i]));
            d2.replaceGene(i, new Gene(p2[i]));
        }

        const parents = [d1, d2];
        const result = () => a.cross(parents);

        expect(result).toThrowError();
    });

    it("should throw an error because of invalid indexes.", () => {
        const a = new OrderedCrossover([1]);
        const p1 = [1, 4, 7, 2, 5, 8, 3, 6, 9, 0];
        const p2 = [0, 4, 8, 2, 6, 5, 9, 3, 7, 1];
        const c1 = [0, 4, 6, 2, 5, 8, 3, 9, 7, 1];
        const c2 = [1, 4, 7, 2, 6, 5, 9, 8, 3, 0];

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
        const result = () => a.cross(parents);

        expect(result).toThrowError();

    });

    it("should throw an error because of invalid indexes.", () => {
        const a = new OrderedCrossover();
        const p1 = [1, 4, 7, 2, 5, 8, 3, 6, 9, 0];
        const p2 = [0, 4, 8, 2, 6, 5, 9, 3, 7, 1];
        const c1 = [0, 4, 6, 2, 5, 8, 3, 9, 7, 1];
        const c2 = [1, 4, 7, 2, 6, 5, 9, 8, 3, 0];

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
        const result = a.cross(parents);

        expect(result[0]).toBeTruthy();
        expect(result[1]).toBeTruthy();

    });

    it("should work normally.", () => {
        const a = new OrderedCrossover([3, 7]);
        const p1 = [1, 4, 7, 2, 5, 8, 3, 6, 9, 0];
        const p2 = [0, 4, 8, 2, 6, 5, 9, 3, 7, 1];
        const c1 = [0, 4, 6, 2, 5, 8, 3, 9, 7, 1];
        const c2 = [1, 4, 7, 2, 6, 5, 9, 8, 3, 0];

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

        expect(result[0]).toStrictEqual(d3);
        expect(result[1]).toStrictEqual(d4);

    });
});
