import DecimalChromosome from "../../../domain/chromosome/DecimalChromosome";
import Gene from "../../../domain/chromosome/Gene";
import UniformCrossover from "../../../domain/crossovers/UniformCrossover"

describe("Uniform Crossover Test", () => {

    it("should return the result of the uniform crossover", () => {
        const a = new UniformCrossover(0.5);
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
        const child = a.cross(parents);

        expect(child).toBeTruthy();
    });

    it("should return the result of the uniform crossover", () => {
        const a = new UniformCrossover();
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
        const child = a.cross(parents);

        expect(child).toBeTruthy();
    });

    it("should throw and error because invalid mix probability", () => {
        const a = new UniformCrossover(-1);
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


});
