import { BasicRandomization } from "./BasicRandomization";
import { IRandomization } from "./IRandomization";

class RandomizationProvider {
    static current: IRandomization = new BasicRandomization();
}

export { RandomizationProvider }