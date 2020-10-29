import IGeneticAlgorithm from "../IGeneticAlgorithm";
import TerminationBase from "./TerminationBase";

class FitnessStagnationTermination extends TerminationBase {
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

    performHasReached(geneticAlgorithm: IGeneticAlgorithm): boolean {
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