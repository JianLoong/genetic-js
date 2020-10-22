
import { IChromosome } from "./chromosome/IChromosome";
import { ICrossover } from "./crossovers/ICrossover";
import { IFitness } from "./fitnesses/IFitness";
import { IGeneticAlgorithm } from "./IGeneticAlgorithm";
import { IOperationStrategy } from "./IOperationStrategy";
import { IMutation } from "./mutations/IMutation";
import { IPopulation } from "./populations/IPopulation";
import { DefaultOperationStrategy } from "./DefaultOperationStrategy";
import { ISelection } from "./selections/ISelection";

class GeneticAlgorithm implements IGeneticAlgorithm {

    generationsNumber: number;
    bestChromosome: IChromosome[];
    selection: ISelection;
    population: IPopulation;
    fitness: IFitness;
    operatorStrategy: IOperationStrategy;
    crossOver: ICrossover;
    mutation: IMutation;

    defaultCrossOverProbability: number = 0.75;
    defaultMutationProbability: number = 0.1;

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

        this.operatorStrategy = new DefaultOperationStrategy();

        this.bestChromosome = [];

    }

    private selectParents(): IChromosome[] {
        return this.selection.selectChromosomes(this.population.minSize, this.population.currentGeneration);
    }

    private cross(parents: IChromosome[]): IChromosome[] {
        return this.operatorStrategy.cross(this.population, this.crossOver, this.defaultCrossOverProbability, parents);
    }

    public termination(): void {

    }

    public evolveOneGeneration(): boolean {
        let parents = this.selectParents();
        let offspring = this.cross(parents);

        this.mutate(offspring);
        this.population.createNewGeneration(offspring);

        return this.endCurrentGeneration();
    }

    public evaluateFitness(): void {
        let array = this.population.currentGeneration.chromosomes;
        for (let index = 0; index < array.length; index++) {
            const element = array[index];
            let fitness = this.fitness.evaluate(element);
            element.fitness = fitness;
        }

        this.bestChromosome.push(this.population.currentGeneration.chromosomes[0]);
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
        return true;
    }

}

export { GeneticAlgorithm }