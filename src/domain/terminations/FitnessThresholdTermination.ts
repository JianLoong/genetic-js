import IGeneticAlgorithm from "../IGeneticAlgorithm";
import TerminationBase from "./TerminationBase";

export default class FitnessThresholdTermination extends TerminationBase {

    public expectedFitness: number;

    constructor(expectedFitness?: number) {
        super();
        if (expectedFitness === undefined) {
            this.expectedFitness = 0;
        } else {
            this.expectedFitness = expectedFitness;
        }
    }
    performHasReached(geneticAlgorithm: IGeneticAlgorithm): boolean {
        if (geneticAlgorithm.bestChromosome.fitness === undefined)
            throw new Error("Best chromosome does not have a fitness");
        return geneticAlgorithm.bestChromosome.fitness >= this.expectedFitness;
    }

}