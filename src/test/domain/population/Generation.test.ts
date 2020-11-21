import { FuncFitness, Generation } from "../../..";
import IChromosome from "../../../domain/chromosome/IChromosome";
import IntegerChromosome from "../../../domain/chromosome/IntegerChromosome";
import Population from "../../../domain/populations/Population";


const fitnessFunction = (chromosome: IChromosome): number => {
    return 0;
}

describe("Generation Test", () => {

    it("should throw an error because there is no fitness", () => {
        const c = new IntegerChromosome(0, 5);
        const p = new Population(20, 50, c);

        p.createInitialGeneration();

        const g = new Generation(0, p.generations[0].chromosomes);


        const ended = () => g.end(50);

        expect(ended).toThrowError();

    });

    it("should throw an error because there is no fitness", () => {
        const c = new IntegerChromosome(0, 5);
        const p = new Population(20, 50, c);

        p.createInitialGeneration();

        const g = new Generation(0, p.generations[0].chromosomes);


        const results = () => g.validateChromosome(c);

        expect(results).toThrowError();

    });

    it("should be working normally", () => {
        const c = new IntegerChromosome(0, 5);
        const p = new Population(20, 50, c);

        p.createInitialGeneration();

        const chromosomes = p.generations[0].chromosomes;

        const f = new FuncFitness(fitnessFunction);

        chromosomes.forEach(element => {
            const fitnesses = f.evaluate(element);
            element.fitness = fitnesses;
        });

        const g = new Generation(0, chromosomes);

        g.end(50);

        expect(g).toBeTruthy();

    });

    it("should be working normally", () => {
        const c = new IntegerChromosome(0, 5);
        const p = new Population(20, 50, c);

        p.createInitialGeneration();

        const chromosomes = p.generations[0].chromosomes;

        const f = new FuncFitness(fitnessFunction);

        chromosomes.forEach(element => {
            const fitnesses = f.evaluate(element);
            element.fitness = fitnesses;
        });

        const g = new Generation(0, chromosomes, false);

        g.end(50);

        expect(g).toBeTruthy();

    });

    it("should be working normally", () => {
        const c = new IntegerChromosome(0, 5);
        const p = new Population(20, 50, c);

        p.createInitialGeneration();

        const chromosomes = p.generations[0].chromosomes;

        const f = new FuncFitness(fitnessFunction);

        chromosomes.forEach(element => {
            const fitnesses = f.evaluate(element);
            element.fitness = fitnesses;
        });

        const g = new Generation(0, chromosomes, false);

        const results = g.getChromosome();

        expect(chromosomes).toBe(results);

    });
});
