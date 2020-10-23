
import { IChromosome } from "./chromosome/IChromosome";
import { ICrossover } from "./crossovers/ICrossover";
import { IFitness } from "./fitnesses/IFitness";
import { IGeneticAlgorithm } from "./IGeneticAlgorithm";
import { IOperationStrategy } from "./IOperationStrategy";
import { IMutation } from "./mutations/IMutation";
import { IPopulation } from "./populations/IPopulation";
import { DefaultOperationStrategy } from "./DefaultOperationStrategy";
import { ISelection } from "./selections/ISelection";
import { ITermination } from "./terminations/ITermination";
import { GenerationNumberTermination } from "./terminations/GenerationNumberTermination";

enum GeneticAlgorithmState {
    NotStarted,
    Started,
    Stopped,
    Resumed,
    TerminationReached
}

class GeneticAlgorithm implements IGeneticAlgorithm {

    generationsNumber: number;
    bestChromosome: IChromosome;
    selection: ISelection;
    population: IPopulation;
    fitness: IFitness;
    operatorStrategy: IOperationStrategy;
    crossOver: ICrossover;
    mutation: IMutation;
    termination: ITermination;

    defaultCrossOverProbability: number = 0.75;
    defaultMutationProbability: number = 0.3;

    constructor(
        population: IPopulation,
        fitness: IFitness,
        selection: ISelection,
        crossOver: ICrossover,
        mutation: IMutation) {

        this.selection = selection;
        this.population = population;
        this.fitness = fitness;
        this.crossOver = crossOver;
        this.mutation = mutation;
        this.termination = new GenerationNumberTermination(100);
        this.operatorStrategy = new DefaultOperationStrategy();
    }

    private selectParents(): IChromosome[] {
        return this.selection.selectChromosomes(this.population.minSize, this.population.currentGeneration);
    }

    private cross(parents: IChromosome[]): IChromosome[] {
        return this.operatorStrategy.cross(this.population, this.crossOver, this.defaultCrossOverProbability, parents);
    }

    public evolveOneGeneration(): boolean {
        this.evaluateFitness();
        let parents = this.selectParents();
        let offspring = this.cross(parents);
        this.mutate(offspring);
        this.population.createNewGeneration(offspring);
        return this.endCurrentGeneration();
    }

    public evaluateFitness(): void {
        // The evaluate fitness needs to be done using async
        let array = this.population.currentGeneration.chromosomes;
        for (let index = 0; index < array.length; index++) {
            const element = array[index];
            let fitness = this.fitness.evaluate(element);
            element.fitness = fitness;
        }

        // this.population.currentGeneration.chromosomes =
        //     this.population.currentGeneration.chromosomes
        //         .sort((c1, c2) => c2.fitness - c1.fitness);
    }

    toString(): string {
        return "Genetic Algorithm";
    }

    private mutate(chromosomes: IChromosome[]): void {
        this.operatorStrategy.mutate(this.mutation, this.defaultMutationProbability, chromosomes);
    }

    private endCurrentGeneration(): boolean {
        this.evaluateFitness();
        this.population.endCurrentGeneration();
        this.bestChromosome = this.population.bestChromosome;
        return true;
    }

    public start(): void {

    }
}

export { GeneticAlgorithm }