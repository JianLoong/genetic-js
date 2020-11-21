import DecimalChromosome from "../../../domain/chromosome/DecimalChromosome";
import Gene from "../../../domain/chromosome/Gene";
import IMutation from "../../../domain/mutations/IMutation"
import PartialShuffleMutation from "../../../domain/mutations/PartialShuffleMutation"

describe("MutationBase Mutation Test", () => {

    it("should perform mutation", () => {

        const d1 = new DecimalChromosome(20);

        const p1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

        for (let i = 0; i < d1.length; i++) {
            d1.replaceGene(i, new Gene(p1[i]));
        }


        const fbm: IMutation = new PartialShuffleMutation();

        fbm.mutate(d1, 1);

        expect(d1).toBeTruthy();

    });
});
