import BasicRandomization from "./BasicRandomization";
import IRandomization from "./IRandomization";

export default class RandomizationProvider {
  static current: IRandomization = new BasicRandomization();
}
