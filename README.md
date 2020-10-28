![Logo](./logo/cover.png)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=square)](https://opensource.org/licenses/MIT)
[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=square)](https://github.com/JianLoong/genetic-js/issues)
![Maintenance](https://img.shields.io/maintenance/yes/2020)
![ts](https://badgen.net/badge/Built%20With/TypeScript/blue)
![GitHub repo size](https://img.shields.io/github/repo-size/JianLoong/genetic-js)
![GitHub issues](https://img.shields.io/github/issues/JianLoong/genetic-js)

Genetic JS is a port of [GeneticSharp](https://github.com/giacomelli/GeneticSharp) done in TypeScript.

Genetic JS **attempts** to be a _fast_, _extensible_, _multi-platform_ and _multi-threading_ JavaScript Genetic Algorithm library that simples the development of applications using Genetic Algorithm.

**Credits to the original implementation goes to the author of Genetic Sharp** which serves as the entire basis of this project.

Currently the project is `ongoing` and there will be plans to release a npm module with instructions on how to run it.

# Motivation

The current landscape of Genetic Algorithm libraries are vast, however this library aims to provide a simple way in which various selection and crossover criteria can be introduced. This library also aims to provide implementations of the vastly different _crossover_, _mutation_ and other criteria that exist.

## Roadmap

- [ ] Documentation of usage with example code
- [ ] Full port of
- [ ] Full port of GeneticJS
- [ ] Node.js support
- [ ] Browser support
- [ ] Require.js support
- [ ] Universal Module Definition
- [ ] Multi-threading

# Multi-threading

Multi-threading on the browser is achieved by using Web Workers.

# Asynchronous

In order to achieve better performance, certain ask are performed asynchronously. (Not to be confused with multi-threading). This is achieved via Promise API.

# Design Decisions and Considerations

- Usage of `namespaces` are abandoned in favour of modules. Refer
  [here](https://michelenasti.com/2019/01/23/is-typescript-namespace-feature-deprecated.html)
- Usage of `extensions methods` are still be considered. Refer [here](https://www.c-sharpcorner.com/article/learn-about-extension-methods-in-typescript/) and [here](https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/classes-and-structs/extension-methods)
- `Jest` is used as the testing framework.
- `Promise` in combination with `web workers` API will be used to "multi-thread".
- `Singleton` pattern is determined to be not needed. Refer [here](https://medium.com/@dmnsgn/singleton-pattern-in-es6-d2d021d150ae)
- Testing randomness with `Jest` can be found [here](https://softwareengineering.stackexchange.com/questions/147134/how-should-i-test-randomness)

# Usage

## Importing the library

- The library will be bundled into a single JavaScript file and can be used.

## You will first need to create your own chromosome to represent the problem.

```typescript
class MyProblemChromosome extends ChromosomeBase {
  constructor() {
    super(10);
    this.createGenes();
  }
  public generateGene(geneIndex: number): Gene {
    // Fill in how to generate the gene
  }
  createNew(): IChromosome {
    return new MyProblemChromosome();
  }
}
```

## You will need to create your own fitness evaluation.

This is an example of a simple evaluation function that just sums up all the mValue in the chromosomes. You can use arrow functions if you want to. Most importantly is that the fitness function **must be a function that returns a number**.

```typescript
const fitnessFunction = (chromosome: IChromosome): number => {
  let genes = chromosome.getGenes();
  let fitness = 0;
  for (let i = 0; i < genes.length; i++) {
    fitness += parseInt(genes[i].mValue.toString());
  }
  return fitness;
};
```

### Running your GA

```typescript
var selection = new EliteSelection();
var crossover = new OrderedCrossover();
var mutation = new ReverseSequenceMutation();
var fitness = new MyProblemFitness();
var chromosome = new MyProblemChromosome();
var population = new Population(50, 70, chromosome);

var ga = new GeneticAlgorithm(
  population,
  fitness,
  selection,
  crossover,
  mutation
);
```

# Samples

Provided samples are as follows

- NQueenProblem.
