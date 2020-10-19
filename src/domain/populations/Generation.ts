import { IChromosome } from "../chromosome/IChromosome";


class Generation {

    private num: number;
    private creationDate: Date;
    private chromosomes: IChromosome[];
    private bestChromosomes: IChromosome;

    getChromosome() : IChromosome[]{
        return this.chromosomes;
    }

    constructor(num: number, chromosomes: IChromosome[]) {
        if (num < 1) {
            throw new Error("Generation number " + num + "is invalid.");
        }

        if (chromosomes.length < 2) {
            throw new Error("A generation should have at least 2 chromosome");
        }
        this.num = num;
        this.creationDate = new Date();
        this.chromosomes = chromosomes;   
    }

    end(chromosomesNumber: number): void{
        this.chromosomes = this.chromosomes
            .filter(chromosome => this.validateChromosome(chromosome) == true)
            .sort((a,b) => a.fitness - b.fitness);

        this.chromosomes = this.chromosomes.slice(0, chromosomesNumber);

        this.bestChromosomes = this.chromosomes[0];
    }

    validateChromosome(chromosome: IChromosome): boolean {
        if (chromosome.fitness == null)
            throw new Error("No fitness");
        return true;
    }

    toString(){
        return this.bestChromosomes.getGenes().toString();
    }
}


export {Generation}