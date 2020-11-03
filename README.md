![Logo](./logo/cover.png)
![GitHub Workflow Status](https://img.shields.io/github/workflow/status/JianLoong/genetic-js/Node%20CI)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=square)](https://opensource.org/licenses/MIT)
[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=square)](https://github.com/JianLoong/genetic-js/issues)
![Maintenance](https://img.shields.io/maintenance/yes/2020)
![ts](https://badgen.net/badge/Built%20With/TypeScript/blue)
![GitHub repo size](https://img.shields.io/github/repo-size/JianLoong/genetic-js)
![GitHub issues](https://img.shields.io/github/issues/JianLoong/genetic-js)

Genetic JS is a port of [GeneticSharp](https://github.com/giacomelli/GeneticSharp) done in TypeScript.

Genetic JS **attempts** to be a _fast_, _extensible_, _multi-platform_ and _multi-threading_ JavaScript Genetic Algorithm library that simples the development of applications using Genetic Algorithm.

**Credits to the original implementation goes to the author of Genetic Sharp** which serves as the entire basis of this project.

# Important

Currently the project is `ongoing` and there will be plans to release a npm module with instructions on how to run it.

The current landscape of Genetic Algorithm libraries are vast, however this library aims to provide a simple way in which various selection and crossover criteria can be introduced. This library also aims to provide implementations of the vastly different _crossover_, _mutation_ and other criteria that exist.

# Installing

The easiest way to start using the library is by importing the **module**.

```html
<script type="module" src="./geneticjs.umd.min.mjs"></script>
```

After that you can use the module by

The global namespace for geneticjs is `geneticjs`

```javascript
const gjs = geneticjs;

const ga = new gjs.GeneticAlgorithm();
```

# Configuration

Before you start, you will need to define your own Chromosome. There are several chromosomes predefined for common problems.

1. Defining your chromosome.

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

2. Provide a fitness function. By default the fitness will be maximized.

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

If you would prefer the fitness to be minimized, you can choose tho calculate the fitness
via (1 / 1 - fitness).

3. Running your GA

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

ga.start();
```

# Examples

1. Function maximization
2. NQueen Problem

# Road Map

- [ ] Documentation of usage with example code
- [ ] Full port of GeneticJS
- [ ] Node.js support
- [ ] Browser support
- [ ] Require.js support
- [ ] Universal Module Definition
- [ ] Multi-threading
