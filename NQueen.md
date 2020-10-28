## N-Queen Problem

```typescript
const fitnessFunction = (chromosome: IChromosome) => {
  let genes = chromosome.getGenes();
  let dx = 0;
  let dy = 0;
  let clashes = 0;
  let rowClashes = 0;
  let geneArray = [];

  // Create a gene array
  for (let i = 0; i < genes.length; i++) {
    let value = Number(genes[i].mValue);
    geneArray.push(value);
  }

  var uniqueItems = [...new Set(geneArray)];

  rowClashes = Math.abs(chromosome.length - uniqueItems.length);
  clashes += rowClashes;

  for (let i = 0; i < genes.length; i++) {
    for (let j = i; j < genes.length; j++) {
      let a = Number(genes[i].mValue);
      let b = Number(genes[j].mValue);
      if (i != j) {
        dx = Math.abs(i - j);
        dy = Math.abs(a - b);
        if (dx == dy) {
          clashes += 1;
        }
      }
    }
  }
  return 6 - clashes;
};
```
