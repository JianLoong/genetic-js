
import { IChromosome } from "./chromosome/IChromosome";
import { ICrossover } from "./crossovers/ICrossover";
import { IFitness } from "./fitnesses/IFitness";
import { IGeneticAlgorithm } from "./IGeneticAlgorithm";
import { IMutation } from "./mutations/IMutation";
import { IPopulation } from "./populations/IPopulation";
import { ISelection } from "./selections/ISelection";

class GeneticAlgorithm implements IGeneticAlgorithm {

    generationsNumber: number;
    bestChromosome: IChromosome[];
    selection: ISelection;
    population: IPopulation;

    constructor(population: IPopulation,
        fitness: IFitness,
        selection: ISelection,
        crossOver: ICrossover,
        mutation: IMutation) {
        this.selection = selection;
        this.population = population;

    }

    private selectParents() : IChromosome[]{
        return this.selection.selectChromosomes(this.population.minSize, this.population.currentGeneration);
    }

    private cross(parents: IChromosome[]): IChromosome[]{
        return null;
    }

    private evolveOneGeneration(): boolean {
        let parents = this.selectParents();
        let offspring = this.cross(parents);
        return null;
    }

    toString(): string {
        return "Genetic Algorithm";
    }

}

export { GeneticAlgorithm }