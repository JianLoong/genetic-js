import Generation from "../populations/Generation";
import SelectionBase from "./SelectionBase";

export default class TournamentSelection extends SelectionBase {
  performSelectChromosome(num: number, generation: Generation) {
    throw new Error("Method not implemented.");
  }
}
