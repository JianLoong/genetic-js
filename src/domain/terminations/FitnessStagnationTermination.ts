import IGeneticAlgorithm from "../IGeneticAlgorithm";
import TerminationBase from "./TerminationBase";

export default class FitnessStagnationTermination extends TerminationBase {

    constructor(expectedStagnationGenerationNumber?: number) {
        super();
        this.mLastFitness = 0;
        this.mStagnantGenerationCount = 0;
        if (expectedStagnationGenerationNumber === undefined)
            this.expectedStagnationGenerationNumber = 100;
        else
            this.expectedStagnationGenerationNumber = expectedStagnationGenerationNumber;
    }

    private expectedStagnationGenerationNumber: number;
    private mLastFitness: number;
    private mStagnantGenerationCount: number;

    /**
     * When the generation fitness has become stagnant, it will return true
     * @param geneticAlgorithm the genetic algorithm
     * @returns true if the generation has become stagnant.
     */
    performHasReached(geneticAlgorithm: IGeneticAlgorithm): boolean {
        const bestFitness = geneticAlgorithm.bestChromosome.fitness;

        if (bestFitness === undefined)
            throw new Error("the best fitness has not been evaluated.");

        if (this.mLastFitness === bestFitness) {
            this.mStagnantGenerationCount++;
        } else {
            this.mStagnantGenerationCount = 1;
        }


        this.mLastFitness = bestFitness;

        return this.mStagnantGenerationCount >= this.expectedStagnationGenerationNumber;
    }

}