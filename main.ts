import { Gene } from "./src/domain/chromosome/Gene";
import { IntegerChromosome } from "./src/domain/chromosome/IntegerChromosome";


const gene = new Gene(0);

const intChromosome = new IntegerChromosome(0, 21);

console.log(intChromosome);