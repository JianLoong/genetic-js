import { FuncFitness, FloatingPointChromosome, RouletteWheelSelection, UniformCrossover, FlipBitMutation, Population, ElitistReinsertion, ITermination, GeneticAlgorithm } from "../../..";
import IChromosome from "../../../domain/chromosome/IChromosome";
import IGeneticAlgorithm from "../../../domain/IGeneticAlgorithm";
import TerminationBase from "../../../domain/terminations/TerminationBase";

class TerminationBaseStub extends TerminationBase {
    performHasReached(geneticAlgorithm: IGeneticAlgorithm): boolean {
        return true;
    }

}

describe("TerminationBase Test", () => {

    const fitnessFunction = (chromosome: IChromosome): number => {
        // const c = chromosome as FloatingPointChromosome;
        // const values = c.expand();

        // const x1 = values[0];
        // const y1 = values[1];
        // const x2 = values[2];
        // const y2 = values[3];

        // if (x1 < c.minValue[0] || x1 > c.maxValue[0])
        //     return -1;
        // if (y1 < c.minValue[1] || y1 > c.maxValue[1])
        //     return -1;
        // if (x2 < c.minValue[2] || x2 > c.maxValue[2])
        //     return -1;
        // if (y2 < c.minValue[3] || y2 > c.maxValue[3])
        //     return -1;

        // const result = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
        //  return (result);
        return 10;
    }

    const fitness = new FuncFitness(fitnessFunction);

    const chromosome = new FloatingPointChromosome([0], [10], true);

    // Running the GA
    const selection = new RouletteWheelSelection();
    const crossover = new UniformCrossover(0.5);
    const mutation = new FlipBitMutation();
    const population = new Population(50, 100, chromosome);
    const reinsertion = new ElitistReinsertion();


    it("should be working", () => {

        const terminationBase: ITermination = new TerminationBaseStub();

        const ga = new GeneticAlgorithm(
            population,
            fitness,
            selection,
            crossover,
            mutation,
            reinsertion,
            terminationBase
        );

        ga.bestChromosome.fitness = undefined;

        const result = terminationBase.hasReached(ga);

        expect(result).toBe(true);

    });


});


