import IChromosome from "../chromosome/IChromosome";
import FuncFitness from "../fitnesses/FuncFitness";
import Generation from "../populations/Generation";
import RandomizationProvider from "../randomization/RandomizationProvider";
import SelectionBase from "./SelectionBase";


export default class RouletteWheelSelection extends SelectionBase {

  constructor(isMaximized?: boolean) {
    super(2);
    if (isMaximized === undefined)
      this.isMaximized = true;
    else
      this.isMaximized = isMaximized;
  }

  private isMaximized: boolean;

  performSelectChromosome(num: number, generation?: Generation): IChromosome[] {
    if (generation === undefined)
      throw new Error("no generation");
    if (generation.chromosomes.length === 0)
      throw new Error("No chromosomes");

    const parents = [];
    for (let i = 0; i < num; i++) {
      const selected = this.pick(generation);
      parents.push(selected);
    }
    return parents;
  }
  pick = (generation: Generation): IChromosome => {
    let sum = 0;
    let picked: IChromosome;

    for (const chromosome of generation.chromosomes) {
      if (chromosome.fitness === undefined)
        throw new Error("Chromosome fitness needs to be evaluated first.");
      sum += chromosome.fitness;
    }

    picked = generation.chromosomes[0];

    const random = RandomizationProvider.current.getInt(0, sum);
    const sorted = FuncFitness.sort(generation.chromosomes, this.isMaximized);
    let partialSum = 0;
    for (const chromosome of sorted) {
      partialSum += chromosome.fitness || 0;
      if (partialSum > random) {
        picked = chromosome;
        break;
      }
    }

    return picked;
  };
}
