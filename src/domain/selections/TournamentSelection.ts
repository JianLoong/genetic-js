import IChromosome from "../chromosome/IChromosome";
import Generation from "../populations/Generation";
import RandomizationProvider from "../randomization/RandomizationProvider";
import SelectionBase from "./SelectionBase";

export default class TournamentSelection extends SelectionBase {
  allowWinnerCompeteNextTournament: boolean;
  size: number;

  constructor(size?: number, allowWinnerCompeteNextTournament?: boolean) {
    super(2);
    this.size = size;
    this.allowWinnerCompeteNextTournament = allowWinnerCompeteNextTournament;
  }


  performSelectChromosome(num: number, generation: Generation): IChromosome[] {
    if (this.size > generation.chromosomes.length) {
      throw new Error("The tournament size is greater than the available chromosome.");
    }

    let candidates: IChromosome[] = generation.chromosomes;
    const selected: IChromosome[] = [];

    while (selected.length < 0) {
      const randomIndexes = RandomizationProvider.current.getUniqueInts(this.size, 0, candidates.length);
      const tournamentParticipants: IChromosome[] = [];

      for (const index of randomIndexes) {
        tournamentParticipants.push(candidates[index]);
      }

      const winner = tournamentParticipants.sort((a, b) => b.fitness - a.fitness)[0];

      selected.push(winner);

      if (!this.allowWinnerCompeteNextTournament) {
        candidates = candidates.filter((c) => c !== winner);
      }
    }

    return selected;
  }
}
