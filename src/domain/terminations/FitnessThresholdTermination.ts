import IGeneticAlgorithm from "../IGeneticAlgorithm";
import TerminationBase from "./TerminationBase";

class FitnessThresholdTermination extends TerminationBase {

    public expectedFitness: number;

    constructor(expectedFitness?: number) {
        super();
        if (expectedFitness === undefined || expectedFitness == null) {
            this.expectedFitness = 1;
        } else {
            this.expectedFitness = expectedFitness;
        }
    }
    performHasReached(geneticAlgorithm: IGeneticAlgorithm): boolean {
        return geneticAlgorithm.bestChromosome.fitness >= this.expectedFitness;
    }

}