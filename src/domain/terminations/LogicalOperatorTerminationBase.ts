import IGeneticAlgorithm from "../IGeneticAlgorithm";
import ITermination from "./ITermination";

export default abstract class LogicalOperatorTerminationBase implements ITermination {

    protected constructor(minOperands: number, terminations: ITermination[]) {
        this.minOperands = minOperands;
        this.terminations = terminations;
    }

    private minOperands: number;
    protected terminations: ITermination[];

    hasReached(geneticAlgorithm: IGeneticAlgorithm): boolean {
        if (this.terminations.length < this.minOperands) {
            throw new Error("There should be at least one termination.");
        }
        return this.performHasReached(geneticAlgorithm);
    }
    abstract performHasReached(geneticAlgorithm: IGeneticAlgorithm): boolean;
}