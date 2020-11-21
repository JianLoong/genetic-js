import { AndTermination, GenerationNumberTermination, OrTermination, TimeEvolvingTermination } from "../../..";
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
import LogicalOperatorTerminationBase from "../../../domain/terminations/LogicalOperatorTerminationBase";

class LogicalOperatorTerminationBaseStub extends LogicalOperatorTerminationBase {
    constructor(minOperands: number, terminations: ITermination[]) {
        super(minOperands, terminations);
    }

    performHasReached(geneticAlgorithm: IGeneticAlgorithm): boolean {
        return true;
    }

}

describe("LogicalOperator Test", () => {

    const fitnessFunction = (chromosome: IChromosome): number => {
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


        const terminations: ITermination[] = [];
        terminations.push(new TimeEvolvingTermination(2));
        terminations.push(new GenerationNumberTermination(20));
        const terminationBase: ITermination = new LogicalOperatorTerminationBaseStub(terminations.length, terminations);

        const ga = new GeneticAlgorithm(
            population,
            fitness,
            selection,
            crossover,
            mutation,
            reinsertion,
            terminationBase
        );


        const result = terminationBase.hasReached(ga);

        expect(result).toBeTruthy();

    });

    it("should be working", () => {


        const terminations: ITermination[] = [];
        terminations.push(new TimeEvolvingTermination(2));
        terminations.push(new GenerationNumberTermination(20));
        const terminationBase: ITermination = new AndTermination(terminations);

        const ga = new GeneticAlgorithm(
            population,
            fitness,
            selection,
            crossover,
            mutation,
            reinsertion,
            terminationBase
        );


        const result = terminationBase.hasReached(ga);

        expect(result).toBeDefined();

        ga.start();

        expect(result).toBeDefined();


    });

    it("should be working", () => {


        const terminations: ITermination[] = [];
        terminations.push(new TimeEvolvingTermination(2));
        terminations.push(new GenerationNumberTermination(20));
        const terminationBase: ITermination = new OrTermination(terminations);

        const ga = new GeneticAlgorithm(
            population,
            fitness,
            selection,
            crossover,
            mutation,
            reinsertion,
            terminationBase
        );


        const result = terminationBase.hasReached(ga);

        expect(result).toBeDefined();

        ga.start();

        expect(result).toBeDefined();

    });

    it("should be throw an error if there is only one termination", () => {


        const terminations: ITermination[] = [];
        terminations.push(new TimeEvolvingTermination(2));
        const terminationBase: ITermination = new LogicalOperatorTerminationBaseStub(2, terminations);

        const ga = new GeneticAlgorithm(
            population,
            fitness,
            selection,
            crossover,
            mutation,
            reinsertion,
            terminationBase
        );


        const result = () => terminationBase.hasReached(ga);

        expect(result).toThrowError();

    });


});


