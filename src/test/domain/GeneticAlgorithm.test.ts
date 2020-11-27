import FloatingPointChromosome from "../../domain/chromosome/FloatingPointChromosome";
import IChromosome from "../../domain/chromosome/IChromosome";
import UniformCrossover from "../../domain/crossovers/UniformCrossover";
import FuncFitness from "../../domain/fitnesses/FuncFitness";
import GeneticAlgorithm from "../../domain/GeneticAlgorithm";
import FlipBitMutation from "../../domain/mutations/FlipBitMutation";
import Population from "../../domain/populations/Population";
import ElitistReinsertion from "../../domain/reinsertion/ElitistReinsertion";
import RouletteWheelSelection from "../../domain/selections/RouletteWheelSelection";
import FitnessStagnationTermination from "../../domain/terminations/FitnessStagnationTermination";
import FitnessThresholdTermination from "../../domain/terminations/FitnessThresholdTermination";
import GenerationNumberTermination from "../../domain/terminations/GenerationNumberTermination";
import ITermination from "../../domain/terminations/ITermination";
import TimeEvolvingTermination from "../../domain/terminations/TimeEvolvingTermination";

describe("GeneticAlgorithm Test", () => {

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
    const population = new Population(500, 1000, chromosome);
    let termination = new GenerationNumberTermination(20);
    const reinsertion = new ElitistReinsertion();


    it("should be working", () => {

        const ga = new GeneticAlgorithm(
            population,
            fitness,
            selection,
            crossover,
            mutation,
            reinsertion,
            termination
        );

        const result = () => ga.start();

        expect(result).toBeTruthy();
    });

    it("should be working", () => {

        termination = new GenerationNumberTermination(20);

        const ga = new GeneticAlgorithm(
            population,
            fitness,
            selection,
            crossover,
            mutation,
            reinsertion,
            termination
        );

        const result = ga.start();

        expect(result).toBeTruthy();
    });

    it("should be working", () => {

        termination = new GenerationNumberTermination();

        const ga = new GeneticAlgorithm(
            population,
            fitness,
            selection,
            crossover,
            mutation,
            reinsertion,
            termination
        );

        const result = ga.start();

        expect(result).toBeTruthy();
    });

    it("should be working", () => {

        const stagTermination = new FitnessStagnationTermination(20);

        const ga = new GeneticAlgorithm(
            population,
            fitness,
            selection,
            crossover,
            mutation,
            reinsertion,
            stagTermination
        );

        const result = ga.start();

        expect(result).toBeTruthy();
    });


    it("should be working", () => {

        const stagTermination = new FitnessStagnationTermination();

        const ga = new GeneticAlgorithm(
            population,
            fitness,
            selection,
            crossover,
            mutation,
            reinsertion,
            stagTermination
        );

        const result = ga.start();

        expect(result).toBeTruthy();
    });

    it("should throw an error if best chromosome does not have fitness", () => {

        const stagTermination: ITermination = new FitnessStagnationTermination();

        const ga = new GeneticAlgorithm(
            population,
            fitness,
            selection,
            crossover,
            mutation,
            reinsertion,
            stagTermination
        );


        ga.bestChromosome.fitness = undefined;

        const result = () => stagTermination.hasReached(ga);

        expect(result).toThrowError();
    });

    it("should be working", () => {

        const fitnessThresholdTermination = new FitnessThresholdTermination(0);

        const ga = new GeneticAlgorithm(
            population,
            fitness,
            selection,
            crossover,
            mutation,
            reinsertion,
            fitnessThresholdTermination
        );

        const result = ga.start();

        expect(result).toBeTruthy();
    });

    it("should be working", () => {

        const fitnessThresholdTermination = new FitnessThresholdTermination();

        const ga = new GeneticAlgorithm(
            population,
            fitness,
            selection,
            crossover,
            mutation,
            reinsertion,
            fitnessThresholdTermination
        );
        const result = ga.start();

        expect(result).toBeTruthy();

    });

    it("should be working", () => {

        const fitnessThresholdTermination: ITermination = new FitnessThresholdTermination();

        const ga = new GeneticAlgorithm(
            population,
            fitness,
            selection,
            crossover,
            mutation,
            reinsertion,
            fitnessThresholdTermination
        );

        ga.bestChromosome.fitness = undefined;

        const result = () => fitnessThresholdTermination.hasReached(ga);

        expect(result).toThrowError();

    });

    it("should be working", () => {

        const timeEvolvingTermination = new TimeEvolvingTermination();

        const ga = new GeneticAlgorithm(
            population,
            fitness,
            selection,
            crossover,
            mutation,
            reinsertion,
            timeEvolvingTermination
        );
        const result = ga.start();

        expect(result).toBeTruthy();

    });

    it("should be working", () => {

        const timeEvolvingTermination = new TimeEvolvingTermination(2);

        const ga = new GeneticAlgorithm(
            population,
            fitness,
            selection,
            crossover,
            mutation,
            reinsertion,
            timeEvolvingTermination
        );
        const result = ga.start();

        expect(result).toBeTruthy();

    });

});


