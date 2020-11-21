import IFitness from "../../../domain/fitnesses/IFitness"
import FuncFitness from "../../../domain/fitnesses/FuncFitness"
import IChromosome from "../../../domain/chromosome/IChromosome";
import BinaryChromosomeBase from "../../../domain/chromosome/BinaryChromosomeBase";
import Gene from "../../../domain/chromosome/Gene";

const fitnessFunction = (chromosome: IChromosome): number => {
    return 0;
}

class BinaryChromosomeBaseTest extends BinaryChromosomeBase {
    constructor(length: number) {
        super(length);
        this.createGenes();
    }
    createNew(): IChromosome {
        throw new Error("Method not implemented.");
    }
    generateGene(geneIndex: number): Gene {
        const genes = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        return new Gene(genes[geneIndex]);
    }

}

describe("FunctionFitness Test", () => {


    it("should be an instance of FuncFitness ", () => {
        const fitness: IFitness = new FuncFitness(fitnessFunction);

        const chromosome = new BinaryChromosomeBaseTest(10);

        expect(fitness).toBeInstanceOf(FuncFitness);

        fitness.evaluate(chromosome);
    });

    it("should be sorted in ascending order ", () => {
        const fitness: IFitness = new FuncFitness(fitnessFunction);

        const c1 = new BinaryChromosomeBaseTest(10);
        c1.fitness = 10;
        const c2 = new BinaryChromosomeBaseTest(10);
        c2.fitness = 20;
        const c3 = new BinaryChromosomeBaseTest(10);
        c3.fitness = 20;


        fitness.evaluate(c1);
        fitness.evaluate(c2);
        fitness.evaluate(c3);

        const chromosomes = [c1, c3, c2];

        const sorted = FuncFitness.sort(chromosomes, false);

        expect(sorted).toStrictEqual([c1, c2, c3]);
    });

    it("should be sorted in descending order ", () => {
        const fitness: IFitness = new FuncFitness(fitnessFunction);

        const c1 = new BinaryChromosomeBaseTest(10);
        c1.fitness = 10;
        const c2 = new BinaryChromosomeBaseTest(10);
        c2.fitness = 20;
        const c3 = new BinaryChromosomeBaseTest(10);
        c3.fitness = 20;


        fitness.evaluate(c1);
        fitness.evaluate(c2);
        fitness.evaluate(c3);

        const chromosomes = [c1, c3, c2];

        const sorted = FuncFitness.sort(chromosomes);

        expect(sorted).toStrictEqual([c3, c2, c1]);
    });

    it("should throw an error if there is no fitness ", () => {
        const fitness: IFitness = new FuncFitness(fitnessFunction);

        const c1 = new BinaryChromosomeBaseTest(10);
        c1.fitness = 10;
        const c2 = new BinaryChromosomeBaseTest(10);
        c2.fitness = 20;
        const c3 = new BinaryChromosomeBaseTest(10);
        // c3.fitness = 20;

        fitness.evaluate(c1);
        fitness.evaluate(c2);
        fitness.evaluate(c3);

        const chromosomes = [c1, c3, c2];

        const sorted = () => FuncFitness.sort(chromosomes);
        const sortedAsc = () => FuncFitness.sort(chromosomes, false);

        expect(sorted).toThrowError();
        expect(sortedAsc).toThrowError();
    });

    it("should not be equal to the original", () => {
        const fitness: IFitness = new FuncFitness(fitnessFunction);

        const c1 = new BinaryChromosomeBaseTest(10);
        c1.fitness = 10;
        const c2 = new BinaryChromosomeBaseTest(10);
        c2.fitness = 20;
        const c3 = new BinaryChromosomeBaseTest(10);
        c3.fitness = 20;

        fitness.evaluate(c1);
        fitness.evaluate(c2);
        fitness.evaluate(c3);

        const chromosomes = [c1, c3, c2];

        const sorted = FuncFitness.sort(chromosomes);

        expect(chromosomes).not.toEqual(sorted);

    });
});
