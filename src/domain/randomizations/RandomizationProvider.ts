import { BasicRandomization } from "./BasicRandomization";
import { IRandomization } from "./IRandomization";

class RandomizationProvider {
    public current: IRandomization = new BasicRandomization();
    constructor() {
        this.current = new BasicRandomization();
    }
}

export { RandomizationProvider }