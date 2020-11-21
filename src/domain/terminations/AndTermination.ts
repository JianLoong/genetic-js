import IGeneticAlgorithm from "../IGeneticAlgorithm";
import ITermination from "./ITermination";
import LogicalOperatorTerminationBase from "./LogicalOperatorTerminationBase";

export default class AndTermination extends LogicalOperatorTerminationBase {
    constructor(terminations: ITermination[]) {
        super(terminations.length, terminations);
    }

    performHasReached(geneticAlgorithm: IGeneticAlgorithm): boolean {
        for (const termination of this.terminations) {
            const current = (termination.hasReached(geneticAlgorithm));
            if (current === false)
                return false;
        }
        return true;

    }
}