import IGeneticAlgorithm from "../IGeneticAlgorithm";
import LogicalOperatorTerminationBase from "./LogicalOperatorTerminationBase";

export default class OrTermination extends LogicalOperatorTerminationBase {
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