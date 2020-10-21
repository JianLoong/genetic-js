# Porting Status from C# to TypeScript

| Directory             | Complete? |
| --------------------- | --------- |
| Benchmarks            | No        |
| Domain.UnitTests      | No        |
| Domain.Chromosome     | Yes       |
| Domain.Crossover      | No        |
| Domain.Fitnesses      | No        |
| Domain.Mutations      | No        |
| Domain.Populations    | No        |
| Domain.Properties     | No        |
| Domain.Randomizations | No        |
| Domain.Reinsertions   | No        |
| Domain.Selections     | No        |
| Domain.Terminations   | No        |
| Domain GA             | No        |
| Extensions.UniTest    | No        |
| Extensions            | No        |
| Samples               | No        |

| Chromosomes/            | Complete? |
| ----------------------- | --------- |
| BinaryChromosomeBase    | Yes       |
| ChromosomeBase          | Yes       |
| ChromosomeExtensions    | No        |
| Chromosomes dot cd      | Ignored   |
| FloatingPointChromosome | No        |
| Gene                    | Yes       |
| IBinaryChromosome       | Yes       |
| IChromosome             | Yes       |
| IChromosomeOperator     | Yes       |
| IntegerChromosome       | Yes       |

| Crossover                 | Complete? |
| ------------------------- | --------- |
| AlternatingPointCrossover | No        |

# Test Coverage

This will be automated in due time.

| File                             | % Stmts   | % Branch   | % Funcs   | % Lines   | Uncovered Line #s   |
| -------------------------------- | --------- | ---------- | --------- | --------- | ------------------- |
| All files                        | 76.98     | 56.25      | 70.45     | 77.69     |
| domain/chromosome                | 88.41     | 68.75      | 84.62     | 87.5      |
| BinaryChromosomeBase.ts          | 75        | 25         | 75        | 75        | 17-22               |
| ChromosomeBase.ts                | 72.22     | 66.67      | 66.67     | 70.59     | 17,26-29,39,43      |
| Gene.ts                          | 100       | 100        | 100       | 100       |
| IntegerChromosome.ts             | 100       | 100        | 100       | 100       |
| domain/crossovers                | 88.24     | 50         | 100       | 88.24     |
| CrossoverBase.ts                 | 80        | 50         | 100       | 80        | 19,24               |
| OrderedCrossover.ts              | 100       | 100        | 100       | 100       |
| domain/populations               | 57.14     | 41.67      | 33.33     | 60        |
| Generation.ts                    | 33.33     | 33.33      | 14.29     | 33.33     | 10,15,19,28-45      |
| Population.ts                    | 70.97     | 50         | 60        | 77.78     | 47,57,63-67         |
| test/domain                      | 75        | 100        | 50        | 75        |
| BinaryChromosomeStub.test..ts    | 75        | 100        | 50        | 75        | 6                   |
| -------------------------------- | --------- | ---------- | --------- | --------- | ------------------- |
