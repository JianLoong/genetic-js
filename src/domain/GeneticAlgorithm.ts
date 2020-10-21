
import { IChromosome } from "./chromosome/IChromosome";
import { ICrossover } from "./crossovers/ICrossover";
import { IFitness } from "./fitnesses/IFitness";
import { IGeneticAlgorithm } from "./IGeneticAlgorithm";
import { IOperationStrategy } from "./IOperationStrategy";
import { IMutation } from "./mutations/IMutation";
import { IPopulation } from "./populations/IPopulation";
import { DefaultOperationStrategy } from "./selections/DefaultOperationStrategy";
import { ISelection } from "./selections/ISelection";

class GeneticAlgorithm implements IGeneticAlgorithm {

    generationsNumber: number;
    bestChromosome: IChromosome[];
    selection: ISelection;
    population: IPopulation;
    fitness: IFitness;
    operatorStrategy: IOperationStrategy;
    crossOver: ICrossover;

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

        this.operatorStrategy = new DefaultOperationStrategy();

    }

    private selectParents(): IChromosome[] {
        return this.selection.selectChromosomes(this.population.minSize, this.population.currentGeneration);
    }

    private cross(parents: IChromosome[]): IChromosome[] {
        return this.operatorStrategy.cross(this.population, this.crossOver, 0.1, parents);
    }

    public evolveOneGeneration(): boolean {
        let parents = this.selectParents();
        let offspring = this.cross(parents);
        this.mutate(offspring);

        this.population.createNewGeneration(offspring);

        return this.endCurrentGeneration();
    }

    public evaluateFitness(): void {
        for (let i = 0; i < this.population.currentGeneration.chromosomes.length; i++) {
            this.population.currentGeneration.chromosomes[i].fitness = this.fitness.evaluate(this.population.currentGeneration.chromosomes[i]);
        }
    }

    toString(): string {
        return "Genetic Algorithm";
    }

    private mutate(chromosome: IChromosome[]) {
        return chromosome;
    }

    private endCurrentGeneration(): boolean {
        this.evaluateFitness();
        return true;
    }

}

export { GeneticAlgorithm }