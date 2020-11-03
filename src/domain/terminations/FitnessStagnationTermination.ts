import IGeneticAlgorithm from "../IGeneticAlgorithm";
import TerminationBase from "./TerminationBase";

export default class FitnessStagnationTermination extends TerminationBase {
    public expectedStagnationGenerationNumber: number;
    constructor(expectedStagnationGenerationNumber?: number) {
        super();
        if (
            expectedStagnationGenerationNumber === undefined ||
            expectedStagnationGenerationNumber === null
        )
            this.expectedStagnationGenerationNumber = 100;
        else
            this.expectedStagnationGenerationNumber = expectedStagnationGenerationNumber;
    }
    private mLastFitness: number;
    private mStagnantGenerationCount: number;

    /**
     * When the generation fitness has become stagnant, it will return true
     * @param geneticAlgorithm the genetic algorithm
     * @returns true if the generation has become stagnant.
     */
    performHasReached(geneticAlgorithm: IGeneticAlgorithm): boolean {
        if (geneticAlgorithm.bestChromosome === undefined)
            return false;
        const bestFitness = geneticAlgorithm.bestChromosome.fitness;

        if (this.mLastFitness === bestFitness) {
            this.mStagnantGenerationCount++;
        } else {
            this.mStagnantGenerationCount = 1;
        }

        this.mLastFitness = bestFitness;

        return this.mStagnantGenerationCount >= this.expectedStagnationGenerationNumber;
    }

}