import IChromosome from "../chromosome/IChromosome";
import Generation from "../populations/Generation";
import RandomizationProvider from "../randomization/RandomizationProvider";
import SelectionBase from "./SelectionBase";


export default class RouletteWheelSelection extends SelectionBase {

  constructor() {
    super(2);
  }

  performSelectChromosome(num: number, generation: Generation) {
    if (generation === undefined)
      throw new Error("EliteSelection - No generation for Elite Selection");

    const parents = [];
    for (let i = 0; i < num; i++) {
      const selected = this.pick(generation);
      parents.push(selected);
    }
    return parents;
  }
  pick = (generation: Generation): IChromosome => {
    let sum = 0;

    for (const chromosome of generation.chromosomes) {
      sum += chromosome.fitness;
    }

    const random = RandomizationProvider.current.getInt(0, sum);
    const sorted = generation.chromosomes.sort((a, b) => b.fitness - a.fitness);
    let partialSum = 0;
    for (const chromosome of sorted) {
      partialSum += chromosome.fitness;
      if (partialSum > random) return chromosome;
    }

    return sorted[0];
  };
}
