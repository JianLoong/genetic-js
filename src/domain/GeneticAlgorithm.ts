import IChromosome from "./chromosome/IChromosome";
import ICrossover from "./crossovers/ICrossover";
import DefaultOperationStrategy from "./DefaultOperationStrategy";
import IFitness from "./fitnesses/IFitness";
import IGeneticAlgorithm from "./IGeneticAlgorithm";
import IOperationStrategy from "./IOperationStrategy";
import IMutation from "./mutations/IMutation";
import IPopulation from "./populations/IPopulation";
import IReinsertion from "./reinsertion/IReinsertion";
import ISelection from "./selections/ISelection";
import ITermination from "./terminations/ITermination";
import { Subject } from "rxjs"


enum GeneticAlgorithmState {
  NotStarted,
  Started,
  Stopped,
  Resumed,
  TerminationReached,
}

export default class GeneticAlgorithm implements IGeneticAlgorithm {
  bestChromosome: IChromosome;
  crossOver: ICrossover;
  defaultCrossOverProbability: number = 0.75;
  defaultMutationProbability: number = 0.3;
  fitness: IFitness;
  generationsNumber: number;

  geneticAlgorithmState: GeneticAlgorithmState;
  isFitnessMaximized: boolean = true;
  mutation: IMutation;
  operatorStrategy: IOperationStrategy;
  population: IPopulation;
  reinsertion: IReinsertion;
  selection: ISelection;
  termination: ITermination;
  public timeEvolving: Date;

  constructor(
    population: IPopulation,
    fitness: IFitness,
    selection: ISelection,
    crossOver: ICrossover,
    mutation: IMutation,
    reinsertion: IReinsertion,
    termination: ITermination
  ) {
    this.selection = selection;
    this.population = population;
    this.fitness = fitness;
    this.crossOver = crossOver;
    this.mutation = mutation;
    this.termination = termination;
    this.operatorStrategy = new DefaultOperationStrategy();
    this.reinsertion = reinsertion;
    this.generationsNumber = 0;
    this.geneticAlgorithmState = GeneticAlgorithmState.NotStarted;
    this.timeEvolving = new Date();
    this.bestChromosome = this.population.bestChromosome;
  }

  public evolveOneGeneration(): boolean {
    this.evaluateFitness();
    const parents = this.selectParents();
    const offspring = this.cross(parents);
    this.mutate(offspring);
    const newGenerationChromosome = this.reinsert(offspring, parents);
    this.population.createNewGeneration(newGenerationChromosome);
    return this.endCurrentGeneration();
  }

  /**
   *
   * @param subject An RXJS subject which can be used to observed the best chromosome returned.
   */
  public start = (subject?: Subject<IChromosome>): IChromosome[] => {

    const bestChromosomeArray = [];
    this.timeEvolving = new Date();
    this.geneticAlgorithmState = GeneticAlgorithmState.Started;
    this.bestChromosome.fitness = this.fitness.evaluate(this.bestChromosome);
    while (this.termination.hasReached(this) === false) {
      this.evolveOneGeneration();

      bestChromosomeArray.push(this.bestChromosome);
      this.generationsNumber++;
      const best = this.bestChromosome;
      if (subject !== undefined) subject.next(best);
    }
    return bestChromosomeArray;
  };

  private cross(parents: IChromosome[]): IChromosome[] {
    return this.operatorStrategy.cross(
      this.population,
      this.crossOver,
      this.defaultCrossOverProbability,
      parents
    );
  }

  private endCurrentGeneration(): boolean {
    this.evaluateFitness();
    this.population.endCurrentGeneration();
    this.bestChromosome = this.population.bestChromosome;
    return true;
  }

  /**
   * The evaluate fitness function by default uses a map to lookup for a fitness
   * that already been calculated.
   */
  private evaluateFitness(): void {
    // The evaluate fitness needs to be done using async or parallel.
    const chromosomes = this.population.currentGeneration.chromosomes;
    const hm: Map<IChromosome, number> = new Map();

    for (const chromosome of chromosomes) {
      const element = chromosome;
      // const fitness = this.fitness.evaluate(element);

      const fitness = this.fitnessMap(element, hm);
      element.fitness = fitness;
    }
  }

  private fitnessMap = (chromosome: IChromosome, hm: Map<IChromosome, number>): number => {
    const fitness = hm.get(chromosome);
    if (fitness === undefined) {
      const result = this.fitness.evaluate(chromosome);
      hm.set(chromosome, result);
      return result;
    } else {
      return fitness;
    }
  };

  private mutate(chromosomes: IChromosome[]): void {
    this.operatorStrategy.mutate(
      this.mutation,
      this.defaultMutationProbability,
      chromosomes
    );
  }

  // https://stackoverflow.com/questions/40328932/javascript-es6-promise-for-loop
  // https://stackoverflow.com/questions/31426740/how-to-return-many-promises-and-wait-for-them-all-before-doing-other-stuff
  // private promiseArr = (totalIsland: number): void => {
  //   const promArr = [];
  //   for (let i = 0; i < totalIsland; i++) {
  //     const evolveOneGenerationAsync = new Promise((resolve, reject) => {
  //       return resolve(this.evolveOneGeneration());
  //     });
  //     promArr.push(evolveOneGenerationAsync);
  //   }

  //   Promise.all(promArr).then((values) => {
  //     // console.log(this.bestChromosome.toString());
  //   });
  // };

  private reinsert(offspring: IChromosome[], parents: IChromosome[]) {
    return this.reinsertion.selectChromosome(this.population, offspring, parents);
  }

  private selectParents(): IChromosome[] {
    return this.selection.selectChromosomes(
      this.population.minSize,
      this.population.currentGeneration
    );
  }

}
