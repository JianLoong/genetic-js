import DecimalChromosome from "../../../domain/chromosome/DecimalChromosome";
import Gene from "../../../domain/chromosome/Gene";
import IMutation from "../../../domain/mutations/IMutation";
import TwoRandomMutation from "../../../domain/mutations/TwoRandomMutation"



describe("TwoRandom Mutation Test", () => {

    it("should perform the two random mutation", () => {

        const d1 = new DecimalChromosome(20);

        const p1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

        for (let i = 0; i < d1.length; i++) {
            d1.replaceGene(i, new Gene(p1[i]));
        }

        const fbm: IMutation = new TwoRandomMutation();

        fbm.mutate(d1, 1);

        expect(d1).toBeTruthy();

    });

    it("should perform the two random mutation with 0 probability", () => {

        const d1 = new DecimalChromosome(20);
        const d2 = new DecimalChromosome(20);

        const p1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
        const expected = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

        for (let i = 0; i < d1.length; i++) {
            d1.replaceGene(i, new Gene(p1[i]));
            d2.replaceGene(i, new Gene(expected[i]));
        }

        const fbm: IMutation = new TwoRandomMutation();

        fbm.mutate(d1, 0);

        expect(d1).toBeTruthy();
        expect(d1).toBeInstanceOf(DecimalChromosome);
        expect(d1).toStrictEqual(d2);


    });

    it("should perform the two random mutation and give the result", () => {

        const d1 = new DecimalChromosome(20);

        const p1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

        for (let i = 0; i < d1.length; i++) {
            d1.replaceGene(i, new Gene(p1[i]));
        }

        const fbm: IMutation = new TwoRandomMutation([1, 2]);

        fbm.mutate(d1, 1);

        const genes = d1.getGenes();

        expect(genes[1].mValue).toBe(3);
        expect(genes[2].mValue).toBe(2);

    });

    it("should throw an error due to invalid indexes", () => {

        const d1 = new DecimalChromosome(20);

        const p1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

        for (let i = 0; i < d1.length; i++) {
            d1.replaceGene(i, new Gene(p1[i]));
        }

        const fbm: IMutation = new TwoRandomMutation([1, 2, 3]);

        const result = () => fbm.mutate(d1, 1);

        expect(result).toThrowError();

    });


});
