import IGeneticAlgorithm from "../IGeneticAlgorithm";
import TerminationBase from "./TerminationBase";

export default class FitnessThresholdTermination extends TerminationBase {

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