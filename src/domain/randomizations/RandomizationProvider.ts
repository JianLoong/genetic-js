import { BasicRandomization } from "./BasicRandomization";
import { IRandomization } from "./IRandomization";

class RandomizationProvider {
    public current: IRandomization;
    constructor() {
        this.current = new BasicRandomization();
    }
}

export { RandomizationProvider }