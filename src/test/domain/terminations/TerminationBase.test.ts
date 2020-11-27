import FloatingPointChromosome from "../../../domain/chromosome/FloatingPointChromosome";
import IChromosome from "../../../domain/chromosome/IChromosome";
import UniformCrossover from "../../../domain/crossovers/UniformCrossover";
import FuncFitness from "../../../domain/fitnesses/FuncFitness";
import GeneticAlgorithm from "../../../domain/GeneticAlgorithm";
import IGeneticAlgorithm from "../../../domain/IGeneticAlgorithm";
import FlipBitMutation from "../../../domain/mutations/FlipBitMutation";
import Population from "../../../domain/populations/Population";
import ElitistReinsertion from "../../../domain/reinsertion/ElitistReinsertion";
import RouletteWheelSelection from "../../../domain/selections/RouletteWheelSelection";
import ITermination from "../../../domain/terminations/ITermination";
import TerminationBase from "../../../domain/terminations/TerminationBase";

class TerminationBaseStub extends TerminationBase {
    performHasReached(geneticAlgorithm: IGeneticAlgorithm): boolean {
        return true;
    }

}

describe("TerminationBase Test", () => {

    const fitnessFunction = (chromosome: IChromosome): number => {
        const c = chromosome as FloatingPointChromosome;
        const values = c.expand();

        const x1 = values[0];
        return x1;
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


