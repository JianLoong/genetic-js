import IChromosome from "../chromosome/IChromosome";
import FuncFitness from "../fitnesses/FuncFitness";
import Generation from "../populations/Generation";
import RandomizationProvider from "../randomization/RandomizationProvider";
import SelectionBase from "./SelectionBase";

export default class TournamentSelection extends SelectionBase {

  constructor(size: number, allowWinnerCompeteNextTournament?: boolean, randomIndexes?: number[]) {
    super(2);
    this.size = size;
    if (allowWinnerCompeteNextTournament === undefined)
      this.allowWinnerCompeteNextTournament = true;
    else
      this.allowWinnerCompeteNextTournament = allowWinnerCompeteNextTournament;
    this.randomIndexes = randomIndexes || [];
  }
  private allowWinnerCompeteNextTournament: boolean;
  private randomIndexes: number[];
  private size: number;

  performSelectChromosome(num: number, generation: Generation): IChromosome[] {
    if (this.size > generation.chromosomes.length) {
      throw new Error("The tournament size is greater than the available chromosome.");
    }

    let candidates: IChromosome[] = generation.chromosomes;
    const selected: IChromosome[] = [];

    while (selected.length < num) {

      if (this.randomIndexes.length === 0)
        this.randomIndexes = RandomizationProvider.current.getUniqueInts(this.size, 0, candidates.length);
      const tournamentParticipants: IChromosome[] = [];

      for (const index of this.randomIndexes) {
        tournamentParticipants.push(candidates[index]);
      }

      const winner = FuncFitness.sort(tournamentParticipants)[0];

      selected.push(winner);

      if (!this.allowWinnerCompeteNextTournament) {
        candidates = candidates.filter((c) => c !== winner);
      }
    }

    return selected.slice(0, num);
  }
}
