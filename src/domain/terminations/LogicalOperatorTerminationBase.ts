import IGeneticAlgorithm from "../IGeneticAlgorithm";
import ITermination from "./ITermination";

export default abstract class LogicalOperatorTerminationBase implements ITermination {

    protected constructor(minOperands?: number, terminations?: ITermination[]) {

        if (minOperands === undefined)
            this.minOperands = 2;

        this.terminations = [];

        if (terminations !== undefined) {
            terminations.concat(terminations);
        }
    }

    terminations: ITermination[];
    private minOperands: number;

    hasReached(geneticAlgorithm: IGeneticAlgorithm): boolean {
        if (this.terminations.length < this.minOperands) {
            throw new Error("There should be at least one termination.");
        }

        return this.performHasReached(geneticAlgorithm);
    }

    abstract performHasReached(geneticAlgorithm: IGeneticAlgorithm): boolean;

}