import IChromosome from "../../../domain/chromosome/IChromosome";
import IntegerChromosome from "../../../domain/chromosome/IntegerChromosome";
import Generation from "../../../domain/populations/Generation";
import Population from "../../../domain/populations/Population";
import EliteSelection from "../../../domain/selections/EliteSelection";
import ISelection from "../../../domain/selections/ISelection";

describe("Selection Test", () => {
    it("should throw an error", () => {
        const s: ISelection = new EliteSelection();
        const g: Generation = new Generation(0, []);
        g.chromosomes = [];

        const result = () => s.selectChromosomes(2, g);

        expect(result).toThrowError();
    });

    it("should throw an error because generation is undefined", () => {
        const s: ISelection = new EliteSelection();

        const result = () => s.selectChromosomes(2);

        expect(result).toThrowError();
    });

    it("should throw an error the chromosomes must have fitness", () => {

        const s: ISelection = new EliteSelection();
        const c = new IntegerChromosome(0, 5);
        const p = new Population(20, 50, c);

        p.createInitialGeneration();


        const result = () => s.selectChromosomes(2, p.currentGeneration);

        expect(result).toThrowError("Chromosomes cannot be sorted because their fitness has not been evaluated.");
    });

    it("should return the elite chromosome", () => {

        const s: ISelection = new EliteSelection();
        const c1 = new IntegerChromosome(0, 5);
        const c2 = new IntegerChromosome(0, 5);
        const c3 = new IntegerChromosome(0, 5);


        const chromosomes: IChromosome[] = [];
        chromosomes.push(c1);
        chromosomes.push(c2);
        chromosomes.push(c3);

        c1.fitness = 0;
        c2.fitness = 10;
        c3.fitness = 15;

        // p.createInitialGeneration();
        const g = new Generation(0, chromosomes);

        const result = s.selectChromosomes(2, g);

        expect(result).toStrictEqual([c3, c2]);

    });

    it("should return the elite chromosome", () => {

        const s: ISelection = new EliteSelection(false);
        const c1 = new IntegerChromosome(0, 5);
        const c2 = new IntegerChromosome(0, 5);
        const c3 = new IntegerChromosome(0, 5);


        const chromosomes: IChromosome[] = [];
        chromosomes.push(c1);
        chromosomes.push(c2);
        chromosomes.push(c3);

        c1.fitness = 0;
        c2.fitness = 10;
        c3.fitness = 15;

        // p.createInitialGeneration();
        const g = new Generation(0, chromosomes);

        const result = s.selectChromosomes(2, g);

        expect(result).toStrictEqual([c1, c2]);

    });

    it("should throw an error because the min number of chromosomes", () => {

        const s: ISelection = new EliteSelection();
        const c1 = new IntegerChromosome(0, 5);
        const c2 = new IntegerChromosome(0, 5);


        const chromosomes: IChromosome[] = [];
        chromosomes.push(c1);
        chromosomes.push(c2);

        c1.fitness = 0;
        c2.fitness = 10;

        const g = new Generation(0, chromosomes);

        const result = () => s.selectChromosomes(-10, g);

        expect(result).toThrowError("The min number of chromosomes exceed the number");

    });
});


