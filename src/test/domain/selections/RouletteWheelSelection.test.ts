import IChromosome from "../../../domain/chromosome/IChromosome";
import IntegerChromosome from "../../../domain/chromosome/IntegerChromosome";
import Generation from "../../../domain/populations/Generation";
import ISelection from "../../../domain/selections/ISelection";
import RouletteWheelSelection from "../../../domain/selections/RouletteWheelSelection";

describe("RouletteWheelSelection Test", () => {
    it("should throw an error", () => {
        const s: ISelection = new RouletteWheelSelection();
        const g: Generation = new Generation(0, []);
        g.chromosomes = [];

        const result = () => s.selectChromosomes(2, g);

        expect(result).toThrowError();
    });

    it("should throw an error", () => {
        const s: ISelection = new RouletteWheelSelection();
        const g: Generation = new Generation(0, []);
        g.chromosomes = [];

        const result = () => s.selectChromosomes(2);

        expect(result).toThrowError();
    });

    it("should return the chromosome", () => {

        const s: ISelection = new RouletteWheelSelection();
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

        expect(result).toBeTruthy();

    });

    it("should return the chromosome", () => {

        const s: ISelection = new RouletteWheelSelection(false);
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

        expect(result).toBeTruthy();

    });

    it("should throw an error", () => {

        const s: ISelection = new RouletteWheelSelection();
        const c1 = new IntegerChromosome(0, 5);
        const c2 = new IntegerChromosome(0, 5);
        const c3 = new IntegerChromosome(0, 5);


        const chromosomes: IChromosome[] = [];
        chromosomes.push(c1);
        chromosomes.push(c2);
        chromosomes.push(c3);

        c1.fitness = 0;
        c2.fitness = undefined;
        c3.fitness = 15;

        // p.createInitialGeneration();
        const g = new Generation(0, chromosomes);

        const result = () => s.selectChromosomes(2, g);

        expect(result).toThrowError();

    });
});