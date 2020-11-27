
import IChromosome from "../../../domain/chromosome/IChromosome";
import IntegerChromosome from "../../../domain/chromosome/IntegerChromosome";
import Generation from "../../../domain/populations/Generation";
import ISelection from "../../../domain/selections/ISelection";
import TournamentSelection from "../../../domain/selections/TournamentSelection";

describe("TournamentSelection Test", () => {
    it("should throw an error", () => {
        const s: ISelection = new TournamentSelection(2, true);
        const g: Generation = new Generation(0, []);
        g.chromosomes = [];

        const result = () => s.selectChromosomes(2, g);

        expect(result).toThrowError();
    });

    it("should throw an error because the chromosomes have no fitness", () => {

        const s: ISelection = new TournamentSelection(3, true);
        const c1 = new IntegerChromosome(0, 5);
        const c2 = new IntegerChromosome(0, 5);
        const c3 = new IntegerChromosome(0, 5);
        const c4 = new IntegerChromosome(0, 5);
        const c5 = new IntegerChromosome(0, 5);


        const chromosomes: IChromosome[] = [];
        chromosomes.push(c1);
        chromosomes.push(c2);
        chromosomes.push(c3);
        chromosomes.push(c4);
        chromosomes.push(c5);

        const g = new Generation(0, chromosomes);

        const result = () => s.selectChromosomes(2, g);

        expect(result).toThrowError();

    });

    it("should return the chromosome", () => {

        const s: ISelection = new TournamentSelection(3, true);
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

        const g = new Generation(0, chromosomes);

        const result = s.selectChromosomes(2, g);

        expect(result).toBeTruthy();

    });

    it("should return the chromosome", () => {

        const s: ISelection = new TournamentSelection(3, false);

        const chromosomes: IChromosome[] = [];
        const c1 = new IntegerChromosome(0, 5);
        const c2 = new IntegerChromosome(0, 5);
        const c3 = new IntegerChromosome(0, 5);
        const c4 = new IntegerChromosome(0, 5);
        const c5 = new IntegerChromosome(0, 5);

        chromosomes.push(c1);
        chromosomes.push(c2);
        chromosomes.push(c3);
        chromosomes.push(c4);
        chromosomes.push(c5);

        c1.fitness = 0;
        c2.fitness = 10;
        c3.fitness = 15;
        c4.fitness = 20;
        c5.fitness = 25;

        const g = new Generation(0, chromosomes);

        const result = s.selectChromosomes(2, g);

        expect(result).toBeDefined();

    });

    it("should return the chromosome", () => {

        const s: ISelection = new TournamentSelection(3, false);
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

        const g = new Generation(0, chromosomes);

        const result = s.selectChromosomes(2, g);

        expect(result).toBeTruthy();

    });

    it("should return the chromosome", () => {

        const s: ISelection = new TournamentSelection(3);
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

        const g = new Generation(0, chromosomes);

        const result = s.selectChromosomes(2, g);

        expect(result).toBeTruthy();

    });
});


