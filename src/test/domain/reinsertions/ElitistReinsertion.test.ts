import { ElitistReinsertion, IPopulation } from "../../..";
import IChromosome from "../../../domain/chromosome/IChromosome";
import IntegerChromosome from "../../../domain/chromosome/IntegerChromosome";
import Population from "../../../domain/populations/Population";
import IReinsertion from "../../../domain/reinsertion/IReinsertion";

describe("ElitistReinsertion Test", () => {
    it("should throw an error", () => {
        const insertion: IReinsertion = new ElitistReinsertion();
        const c: IChromosome = new IntegerChromosome(0, 5);
        const p: IPopulation = new Population(20, 50, c);

        const result = () => insertion.selectChromosome(p, [], []);
        expect(result).toThrowError("There are no offsprings.");
    });

    it("should throw an error", () => {
        const insertion: IReinsertion = new ElitistReinsertion();
        insertion.canExpand = false;
        const c: IChromosome = new IntegerChromosome(0, 5);
        const p: IPopulation = new Population(20, 50, c);

        const result = () => insertion.selectChromosome(p, [], []);
        expect(result).toThrowError("There are no offsprings.");
    });

    it("should throw an error", () => {
        const insertion: IReinsertion = new ElitistReinsertion();
        insertion.canExpand = false;
        const c: IChromosome = new IntegerChromosome(0, 5);
        const p: IPopulation = new Population(20, 50, c);

        const result = () => insertion.selectChromosome(p, [c], [c]);

        expect(result).toThrowError();

    });

    it("should work normally.", () => {
        const insertion: IReinsertion = new ElitistReinsertion();

        const chromosomes: IChromosome[] = [];
        const c1 = new IntegerChromosome(0, 5);
        const c2 = new IntegerChromosome(0, 5);
        const c3 = new IntegerChromosome(0, 5);
        chromosomes.push(c1);
        chromosomes.push(c2);
        chromosomes.push(c3);

        c1.fitness = 0;
        c2.fitness = 10;
        c3.fitness = 15;


        const c: IChromosome = new IntegerChromosome(0, 5);
        const p: IPopulation = new Population(20, 50, c);

        const result = () => insertion.selectChromosome(p, chromosomes, chromosomes);

        expect(result()).toBeTruthy();

    });

    it("should work normally.", () => {
        const insertion: IReinsertion = new ElitistReinsertion();

        const chromosomes: IChromosome[] = [];
        const c1 = new IntegerChromosome(0, 5);
        const c2 = new IntegerChromosome(0, 5);
        const c3 = new IntegerChromosome(0, 5);
        chromosomes.push(c1);
        chromosomes.push(c2);
        chromosomes.push(c3);

        c1.fitness = 0;
        c2.fitness = 10;
        c3.fitness = 15;


        const c: IChromosome = new IntegerChromosome(0, 5);
        const p: IPopulation = new Population(2, 50, c);

        const result = () => insertion.selectChromosome(p, chromosomes, chromosomes);

        expect(result()).toBeTruthy();

    });

    it("should work normally.", () => {
        const insertion: IReinsertion = new ElitistReinsertion(false);

        const chromosomes: IChromosome[] = [];
        const c1 = new IntegerChromosome(0, 5);
        const c2 = new IntegerChromosome(0, 5);
        const c3 = new IntegerChromosome(0, 5);
        chromosomes.push(c1);
        chromosomes.push(c2);
        chromosomes.push(c3);

        c1.fitness = 0;
        c2.fitness = 10;
        c3.fitness = 15;


        const c: IChromosome = new IntegerChromosome(0, 5);
        const p: IPopulation = new Population(20, 50, c);

        const result = () => insertion.selectChromosome(p, chromosomes, chromosomes);

        expect(result()).toBeTruthy();

    });
});
