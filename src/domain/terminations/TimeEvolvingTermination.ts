import IGeneticAlgorithm from "../IGeneticAlgorithm";
import TerminationBase from "./TerminationBase";

export default class TimeEvolvingTermination extends TerminationBase {

    constructor(maxTime?: number) {
        super();
        if (maxTime === undefined)
            this.maxTime = 10;
        else
            this.maxTime = maxTime;
    }
    private maxTime: number;

    performHasReached(geneticAlgorithm: IGeneticAlgorithm): boolean {
        const currentTime = new Date();
        const duration = geneticAlgorithm.timeEvolving.getTime() - currentTime.getTime();

        const durationInSeconds = duration / 1000;

        if (durationInSeconds > this.maxTime)
            return true;
        return false;
    }

}