import IChromosome from "./chromosome/IChromosome";
import ICrossover from "./crossovers/ICrossover";
import DefaultOperationStrategy from "./DefaultOperationStrategy";
import IFitness from "./fitnesses/IFitness";
import IGeneticAlgorithm from "./IGeneticAlgorithm";
import IOperationStrategy from "./IOperationStrategy";
import IMutation from "./mutations/IMutation";
import IPopulation from "./populations/IPopulation";
import Population from "./populations/Population";
import { IReinsertion } from "./reinsertion/IReinsertion";
import ISelection from "./selections/ISelection";
import GenerationNumberTermination from "./terminations/GenerationNumberTermination";
import ITermination from "./terminations/ITermination";

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
  mutation: IMutation;
  operatorStrategy: IOperationStrategy;
  population: IPopulation;
  reinsertion: IReinsertion;
  selection: ISelection;
  termination: ITermination;

  constructor(
    population: IPopulation,
    fitness: IFitness,
    selection: ISelection,
    crossOver: ICrossover,
    mutation: IMutation,
    reinsertion: IReinsertion
  ) {
    this.selection = selection;
    this.population = population;
    this.fitness = fitness;
    this.crossOver = crossOver;
    this.mutation = mutation;
    this.termination = new GenerationNumberTermination(100);
    this.operatorStrategy = new DefaultOperationStrategy();
    this.reinsertion = reinsertion;
  }

  clone() {
    return new GeneticAlgorithm(
      new Population(
        this.population.minSize,
        this.population.maxSize,
        this.population.bestChromosome
      ),
      this.fitness,
      this.selection,
      this.crossOver,
      this.mutation,
      this.reinsertion
    );
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

  public start = (generations: number): IChromosome[] => {
    const bestChromosomeArray = [];
    for (let j = 0; j < generations; j++) {
      this.evolveOneGeneration();
      bestChromosomeArray.push(this.bestChromosome);
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

  private evaluateFitness(): void {
    // The evaluate fitness needs to be done using async
    const chromosomes = this.population.currentGeneration.chromosomes;
    for (const chromosome of chromosomes) {
      const element = chromosome;
      // const fitness = this.fitness.evaluate(element);
      const fitness = this.fitnessMap(element);
      element.fitness = fitness;
    }
  }

  private fitnessMap = (chromosome: IChromosome): number => {
    const hm: Map<IChromosome, number> = new Map();
    if (hm.get(chromosome) === undefined) {
      // const fitness = fitnessFunction(chromosome);
      const fitness = this.fitness.evaluate(chromosome);
      hm.set(chromosome, fitness);
      return fitness;
    }
    return hm.get(chromosome);
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
  private promiseArr = (totalIsland: number): void => {
    const promArr = [];
    for (let i = 0; i < totalIsland; i++) {
      const evolveOneGenerationAsync = new Promise((resolve, reject) => {
        return resolve(this.evolveOneGeneration());
      });
      promArr.push(evolveOneGenerationAsync);
    }

    Promise.all(promArr).then((values) => {
      // console.log(this.bestChromosome.toString());
    });
  };

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
