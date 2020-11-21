import { FuncFitness } from "../../..";
import IChromosome from "../../../domain/chromosome/IChromosome";
import IntegerChromosome from "../../../domain/chromosome/IntegerChromosome";
import Population from "../../../domain/populations/Population";

const fitnessFunction = (chromosome: IChromosome): number => {
  return 0;
}


describe("Population Test", () => {
  test("Check the population constructor", () => {
    const c = new IntegerChromosome(0, 5);
    const p = new Population(20, 50, c);

    expect(p.adamChromosome).toBeInstanceOf(IntegerChromosome);
  });

  test("if the max size bigger than min size", () => {
    const c = new IntegerChromosome(0, 5);
    const p = () => new Population(50, 20, c);

    expect(p).toThrowError();
  });

  test("Check the population constructor", () => {
    const c = new IntegerChromosome(0, 5);
    const p = () => new Population(-1, 50, c);

    expect(p).toThrowError();
  });

  it("should throw an error as the fitness has not been evaluated", () => {
    const c = new IntegerChromosome(0, 5);
    const p = new Population(20, 50, c);

    p.createInitialGeneration();

    const result = () => p.endCurrentGeneration();

    expect(result).toThrowError();
  });

  it("should be working", () => {
    const c = new IntegerChromosome(0, 5);
    const p = new Population(20, 50, c);

    p.createInitialGeneration();

    const chromosomes = p.currentGeneration.chromosomes;

    const f = new FuncFitness(fitnessFunction);

    p.bestChromosome.fitness = f.evaluate(p.bestChromosome);

    chromosomes.forEach(element => {
      const fitnesses = f.evaluate(element);
      element.fitness = fitnesses;
    });

    const result = () => p.endCurrentGeneration();

    // expect(result).toThrowError();
    expect(result).toBeTruthy();
  });

  it("should be throw an error as the best chromosome has no fitness", () => {
    const c = new IntegerChromosome(0, 5);
    const p = new Population(20, 50, c);

    const chromosomes = p.currentGeneration.chromosomes;

    const f = new FuncFitness(fitnessFunction);

    chromosomes.forEach(element => {
      const fitnesses = f.evaluate(element);
      element.fitness = fitnesses;
    });

    const result = () => p.endCurrentGeneration();

    expect(result).toThrowError();
  });

  it("should be throw an error if fitness of the current generation 0 has not been evaluated", () => {
    const c = new IntegerChromosome(0, 5);
    const p = new Population(20, 50, c);

    // const chromosomes = p.currentGeneration.chromosomes;

    const f = new FuncFitness(fitnessFunction);

    p.bestChromosome.fitness = f.evaluate(p.bestChromosome);

    // chromosomes.forEach(element => {
    //   const fitnesses = f.evaluate(element);
    //   element.fitness = fitnesses;
    // });

    const result = () => p.endCurrentGeneration();

    expect(result).toThrowError();
  });

  it("should assign a new best chromosome if there is a better fitness", () => {
    const c = new IntegerChromosome(0, 5);
    const p = new Population(20, 50, c);

    const chromosomes = p.currentGeneration.chromosomes;

    const f = new FuncFitness(fitnessFunction);

    p.bestChromosome.fitness = f.evaluate(p.bestChromosome);

    chromosomes.forEach(element => {
      const fitnesses = f.evaluate(element);
      element.fitness = fitnesses;
    });

    chromosomes[0].fitness = 10;
    p.endCurrentGeneration();

    // expect(result).toThrowError();
    // expect(result).toBeTruthy();
    expect(p.bestChromosome).toBe(chromosomes[0]);
  });

  it("should assign a new best chromosome if there is a better fitness", () => {
    const c = new IntegerChromosome(0, 5);
    const p = new Population(20, 50, c);

    const chromosomes = p.currentGeneration.chromosomes;

    const f = new FuncFitness(fitnessFunction);

    p.bestChromosome.fitness = f.evaluate(p.bestChromosome);

    chromosomes.forEach(element => {
      const fitnesses = f.evaluate(element);
      element.fitness = fitnesses;
    });

    chromosomes[0].fitness = -10;
    p.endCurrentGeneration();

    // expect(result).toThrowError();
    // expect(result).toBeTruthy();
    expect(p.bestChromosome).toBe(p.adamChromosome);
  });

  it("should assign a new best chromosome if there is a better fitness", () => {
    const c = new IntegerChromosome(0, 5);
    const p = new Population(20, 50, c);

    const chromosomes = p.currentGeneration.chromosomes;

    const f = new FuncFitness(fitnessFunction);

    p.bestChromosome.fitness = f.evaluate(p.bestChromosome);
    p.isMaximized = false;

    chromosomes.forEach(element => {
      const fitnesses = f.evaluate(element);
      element.fitness = fitnesses;
    });

    chromosomes[0].fitness = 10;
    p.currentGeneration.maximized(false);
    p.endCurrentGeneration();

    expect(p.bestChromosome).toBe(p.adamChromosome);
  });

  it("should assign a new best chromosome if there is a better fitness", () => {
    const c = new IntegerChromosome(0, 5);
    const p = new Population(20, 50, c);

    const chromosomes = p.currentGeneration.chromosomes;

    const f = new FuncFitness(fitnessFunction);

    p.bestChromosome.fitness = 0;
    p.isMaximized = false;

    chromosomes.forEach(element => {
      const fitnesses = f.evaluate(element);
      element.fitness = fitnesses;
    });

    p.currentGeneration.maximized(false);
    p.currentGeneration.chromosomes[0].fitness = -10;
    p.endCurrentGeneration();

    expect(p.bestChromosome).toBe(chromosomes[0]);
  });

});
