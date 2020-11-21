import IGeneticAlgorithm from "../IGeneticAlgorithm";
import ITermination from "./ITermination";
import LogicalOperatorTerminationBase from "./LogicalOperatorTerminationBase";

export default class OrTermination extends LogicalOperatorTerminationBase {
    constructor(terminations: ITermination[]) {
        super(terminations.length, terminations);
    }

    performHasReached(geneticAlgorithm: IGeneticAlgorithm): boolean {
        let status: boolean = false;
        for (const termination of this.terminations) {
            status = termination.hasReached(geneticAlgorithm);
            if (status === true)
                return true;
        }
        return false;
    }

}