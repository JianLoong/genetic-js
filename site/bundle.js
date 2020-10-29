window.geneticjs =
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/domain/DefaultOperationStrategy.ts":
/*!************************************************!*\
  !*** ./src/domain/DefaultOperationStrategy.ts ***!
  \************************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ DefaultOperationStrategy
/* harmony export */ });
/* harmony import */ var _randomization_RandomizationProvider__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./randomization/RandomizationProvider */ "./src/domain/randomization/RandomizationProvider.ts");

class DefaultOperationStrategy {
    cross(population, crossover, crossoverProbability, parents) {
        const minSize = population.minSize;
        let offspring = [];
        for (let i = 0; i < minSize; i += crossover.parentNumber) {
            const selectedParents = parents.slice(2).splice(0, crossover.parentNumber);
            if (selectedParents.length === crossover.parentNumber &&
                _randomization_RandomizationProvider__WEBPACK_IMPORTED_MODULE_0__.default.current.getDouble() <= crossoverProbability) {
                const cross = crossover.cross(selectedParents);
                offspring = offspring.concat(cross);
            }
        }
        return offspring;
    }
    mutate(mutation, mutationProbability, chromosomes) {
        for (const chromosome of chromosomes) {
            mutation.mutate(chromosome, mutationProbability);
        }
    }
}


/***/ }),

/***/ "./src/domain/GeneticAlgorithm.ts":
/*!****************************************!*\
  !*** ./src/domain/GeneticAlgorithm.ts ***!
  \****************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ GeneticAlgorithm
/* harmony export */ });
/* harmony import */ var _DefaultOperationStrategy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DefaultOperationStrategy */ "./src/domain/DefaultOperationStrategy.ts");
/* harmony import */ var _populations_Population__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./populations/Population */ "./src/domain/populations/Population.ts");
/* harmony import */ var _terminations_GenerationNumberTermination__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./terminations/GenerationNumberTermination */ "./src/domain/terminations/GenerationNumberTermination.ts");



var GeneticAlgorithmState;
(function (GeneticAlgorithmState) {
    GeneticAlgorithmState[GeneticAlgorithmState["NotStarted"] = 0] = "NotStarted";
    GeneticAlgorithmState[GeneticAlgorithmState["Started"] = 1] = "Started";
    GeneticAlgorithmState[GeneticAlgorithmState["Stopped"] = 2] = "Stopped";
    GeneticAlgorithmState[GeneticAlgorithmState["Resumed"] = 3] = "Resumed";
    GeneticAlgorithmState[GeneticAlgorithmState["TerminationReached"] = 4] = "TerminationReached";
})(GeneticAlgorithmState || (GeneticAlgorithmState = {}));
class GeneticAlgorithm {
    constructor(population, fitness, selection, crossOver, mutation, reinsertion) {
        this.defaultCrossOverProbability = 0.75;
        this.defaultMutationProbability = 0.3;
        this.start = (generations) => {
            const bestChromosomeArray = [];
            if (this.termination.hasReached(this) === false) {
                for (let j = 0; j < generations; j++) {
                    this.evolveOneGeneration();
                    bestChromosomeArray.push(this.bestChromosome);
                }
            }
            return bestChromosomeArray;
        };
        this.fitnessMap = (chromosome) => {
            const hm = new Map();
            if (hm.get(chromosome) === undefined) {
                const fitness = this.fitness.evaluate(chromosome);
                hm.set(chromosome, fitness);
                return fitness;
            }
            return hm.get(chromosome);
        };
        this.promiseArr = (totalIsland) => {
            const promArr = [];
            for (let i = 0; i < totalIsland; i++) {
                const evolveOneGenerationAsync = new Promise((resolve, reject) => {
                    return resolve(this.evolveOneGeneration());
                });
                promArr.push(evolveOneGenerationAsync);
            }
            Promise.all(promArr).then((values) => {
            });
        };
        this.selection = selection;
        this.population = population;
        this.fitness = fitness;
        this.crossOver = crossOver;
        this.mutation = mutation;
        this.termination = new _terminations_GenerationNumberTermination__WEBPACK_IMPORTED_MODULE_2__.default(100);
        this.operatorStrategy = new _DefaultOperationStrategy__WEBPACK_IMPORTED_MODULE_0__.default();
        this.reinsertion = reinsertion;
    }
    clone() {
        return new GeneticAlgorithm(new _populations_Population__WEBPACK_IMPORTED_MODULE_1__.default(this.population.minSize, this.population.maxSize, this.population.bestChromosome), this.fitness, this.selection, this.crossOver, this.mutation, this.reinsertion);
    }
    evolveOneGeneration() {
        this.evaluateFitness();
        const parents = this.selectParents();
        const offspring = this.cross(parents);
        this.mutate(offspring);
        const newGenerationChromosome = this.reinsert(offspring, parents);
        this.population.createNewGeneration(newGenerationChromosome);
        return this.endCurrentGeneration();
    }
    cross(parents) {
        return this.operatorStrategy.cross(this.population, this.crossOver, this.defaultCrossOverProbability, parents);
    }
    endCurrentGeneration() {
        this.evaluateFitness();
        this.population.endCurrentGeneration();
        this.bestChromosome = this.population.bestChromosome;
        return true;
    }
    evaluateFitness() {
        const chromosomes = this.population.currentGeneration.chromosomes;
        for (const chromosome of chromosomes) {
            const element = chromosome;
            const fitness = this.fitnessMap(element);
            element.fitness = fitness;
        }
    }
    mutate(chromosomes) {
        this.operatorStrategy.mutate(this.mutation, this.defaultMutationProbability, chromosomes);
    }
    reinsert(offspring, parents) {
        return this.reinsertion.selectChromosome(this.population, offspring, parents);
    }
    selectParents() {
        return this.selection.selectChromosomes(this.population.minSize, this.population.currentGeneration);
    }
}


/***/ }),

/***/ "./src/domain/chromosome/BinaryChromosomeBase.ts":
/*!*******************************************************!*\
  !*** ./src/domain/chromosome/BinaryChromosomeBase.ts ***!
  \*******************************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ BinaryChromosomeBase
/* harmony export */ });
/* harmony import */ var _ChromosomeBase__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ChromosomeBase */ "./src/domain/chromosome/ChromosomeBase.ts");
/* harmony import */ var _Gene__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Gene */ "./src/domain/chromosome/Gene.ts");


class BinaryChromosomeBase extends _ChromosomeBase__WEBPACK_IMPORTED_MODULE_0__.default {
    constructor(length) {
        super(length);
    }
    flipGene(index) {
        const value = this.getGene(index);
        if (value === undefined)
            throw new Error("BinaryChromosomeBase - Cannot Flip a gene which is undefined");
        this.replaceGene(index, new _Gene__WEBPACK_IMPORTED_MODULE_1__.default(value.mValue === 0 ? 1 : 0));
    }
    toString() {
        const str = this.getGenes().toString();
        return str;
    }
}


/***/ }),

/***/ "./src/domain/chromosome/ChromosomeBase.ts":
/*!*************************************************!*\
  !*** ./src/domain/chromosome/ChromosomeBase.ts ***!
  \*************************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ ChromosomeBase
/* harmony export */ });
class ChromosomeBase {
    constructor(length) {
        this.validateLength(length);
        this.length = length;
        this.genes = [];
    }
    getGene(index) {
        return this.genes[index];
    }
    getGenes() {
        return this.genes;
    }
    replaceGene(index, gene) {
        if (index < 0 || index > this.length) {
            throw Error("ChromosomeBase - Index cannot be less than 0 and more than the length. " +
                index);
        }
        this.genes[index] = gene;
        this.fitness = null;
    }
    replaceGenes(startIndex, genes) {
        if (startIndex < 0)
            throw new Error("Start Index cannot be less than 0");
        const genesToBeReplacedLength = genes.length;
        const availableSpaceLength = this.length - startIndex;
        if (availableSpaceLength < genesToBeReplacedLength)
            throw new Error("ChromosomeBase - Not enough space to replace genes.");
        for (let i = startIndex; i < genes.length; i++) {
            this.replaceGene(i, genes[i]);
        }
    }
    resize(newLength) {
        this.validateLength(newLength);
    }
    createGenes() {
        for (let i = 0; i < this.length; i++) {
            this.replaceGene(i, this.generateGene(i));
        }
    }
    validateLength(length) {
        if (length < 2) {
            throw Error("Error - The minimum length for a chromosome is 2 genes");
        }
    }
}


/***/ }),

/***/ "./src/domain/chromosome/ChromosomeExtension.ts":
/*!******************************************************!*\
  !*** ./src/domain/chromosome/ChromosomeExtension.ts ***!
  \******************************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ ChromosomeExtension
/* harmony export */ });
class ChromosomeExtension {
    static anyHasRepeatedGene(chromosomes) {
        for (const chromosome of chromosomes) {
            const c = chromosome;
            const genes = [];
            c.getGenes().forEach((s) => genes.push(s.mValue));
            const notRepeatedGenesLength = [...new Set(genes)].length;
            if (notRepeatedGenesLength < c.length)
                return true;
        }
        return false;
    }
    static validateGenes(chromosome, chromosomes) {
        if (chromosome !== undefined) {
            if (chromosome.getGenes() === undefined)
                return false;
        }
        if (chromosomes !== undefined) {
            for (const ch of chromosomes) {
                if (ch.getGenes() === undefined)
                    return false;
            }
        }
        return true;
    }
}


/***/ }),

/***/ "./src/domain/chromosome/DecimalChromosome.ts":
/*!****************************************************!*\
  !*** ./src/domain/chromosome/DecimalChromosome.ts ***!
  \****************************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ DecimalChromosome
/* harmony export */ });
/* harmony import */ var _randomization_RandomizationProvider__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../randomization/RandomizationProvider */ "./src/domain/randomization/RandomizationProvider.ts");
/* harmony import */ var _ChromosomeBase__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ChromosomeBase */ "./src/domain/chromosome/ChromosomeBase.ts");
/* harmony import */ var _Gene__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Gene */ "./src/domain/chromosome/Gene.ts");



class DecimalChromosome extends _ChromosomeBase__WEBPACK_IMPORTED_MODULE_1__.default {
    constructor(length, minValue, maxValue, unique, randomValues) {
        super(length);
        this.minValue = minValue;
        this.maxValue = maxValue;
        unique === undefined ? (this.unique = false) : (this.unique = true);
        if (randomValues === undefined) {
            if (unique === true)
                this.randomValues = _randomization_RandomizationProvider__WEBPACK_IMPORTED_MODULE_0__.default.current.getUniqueInts(length, minValue, maxValue);
            else
                this.randomValues = _randomization_RandomizationProvider__WEBPACK_IMPORTED_MODULE_0__.default.current.getInts(length, minValue, maxValue);
        }
        else {
            this.randomValues = randomValues;
        }
        this.createGenes();
    }
    createNew() {
        return new DecimalChromosome(this.length, this.minValue, this.maxValue);
    }
    generateGene(geneIndex) {
        return new _Gene__WEBPACK_IMPORTED_MODULE_2__.default(this.randomValues[geneIndex]);
    }
}


/***/ }),

/***/ "./src/domain/chromosome/FloatingPointChromosome.ts":
/*!**********************************************************!*\
  !*** ./src/domain/chromosome/FloatingPointChromosome.ts ***!
  \**********************************************************/
/*! namespace exports */
/*! export FloatingPointChromosome [provided] [no usage info] [missing usage info prevents renaming] */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ FloatingPointChromosome,
/* harmony export */   "FloatingPointChromosome": () => /* binding */ FloatingPointChromosome
/* harmony export */ });
/* harmony import */ var _BinaryChromosomeBase__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BinaryChromosomeBase */ "./src/domain/chromosome/BinaryChromosomeBase.ts");
/* harmony import */ var _Gene__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Gene */ "./src/domain/chromosome/Gene.ts");


class FloatingPointChromosome extends _BinaryChromosomeBase__WEBPACK_IMPORTED_MODULE_0__.default {
    constructor(mValue) {
        super(32);
        this.convertFloat32ToBin = (float32) => {
            const HexToBin = hex => (parseInt(hex, 16).toString(2)).padStart(32, '0');
            const getHex = i => ('00' + i.toString(16)).slice(-2);
            const view = new DataView(new ArrayBuffer(4));
            view.setFloat32(0, float32);
            return HexToBin(Array.apply(null, { length: 4 }).map((_, i) => getHex(view.getUint8(i))).join(''));
        };
        this.mValue = mValue;
        const result = this.convertFloat32ToBin(mValue);
        this.binArrayStr = result.split("");
        this.createGenes();
    }
    createNew() {
        return new FloatingPointChromosome(this.mValue);
    }
    generateGene(geneIndex) {
        return new _Gene__WEBPACK_IMPORTED_MODULE_1__.default(Number(this.binArrayStr[geneIndex]));
    }
}



/***/ }),

/***/ "./src/domain/chromosome/Gene.ts":
/*!***************************************!*\
  !*** ./src/domain/chromosome/Gene.ts ***!
  \***************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ Gene
/* harmony export */ });
class Gene {
    constructor(value) {
        this.mValue = value;
    }
    equals(other) {
        if (other == null) {
            return false;
        }
        return other.mValue === this.mValue;
    }
    equalsOperator(first, second) {
        return first.equals(second);
    }
    notEqualsOperator(first, second) {
        return !first.equals(second);
    }
    toString() {
        return (this.mValue != null ? this.mValue : "").toString();
    }
}


/***/ }),

/***/ "./src/domain/chromosome/Index.ts":
/*!****************************************!*\
  !*** ./src/domain/chromosome/Index.ts ***!
  \****************************************/
/*! namespace exports */
/*! export BinaryChromosomeBase [provided] [no usage info] [missing usage info prevents renaming] -> ./src/domain/chromosome/BinaryChromosomeBase.ts .default */
/*! export ChromosomeBase [provided] [no usage info] [missing usage info prevents renaming] -> ./src/domain/chromosome/ChromosomeBase.ts .default */
/*! export ChromosomeExtension [provided] [no usage info] [missing usage info prevents renaming] -> ./src/domain/chromosome/ChromosomeExtension.ts .default */
/*! export DecimalChromosome [provided] [no usage info] [missing usage info prevents renaming] -> ./src/domain/chromosome/DecimalChromosome.ts .default */
/*! export FloatingPointChromosome [provided] [no usage info] [missing usage info prevents renaming] -> ./src/domain/chromosome/FloatingPointChromosome.ts .default */
/*! export Gene [provided] [no usage info] [missing usage info prevents renaming] -> ./src/domain/chromosome/Gene.ts .default */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_exports__, __webpack_require__.d, __webpack_require__.r, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BinaryChromosomeBase": () => /* reexport safe */ _BinaryChromosomeBase__WEBPACK_IMPORTED_MODULE_0__.default,
/* harmony export */   "ChromosomeBase": () => /* reexport safe */ _ChromosomeBase__WEBPACK_IMPORTED_MODULE_3__.default,
/* harmony export */   "ChromosomeExtension": () => /* reexport safe */ _ChromosomeExtension__WEBPACK_IMPORTED_MODULE_4__.default,
/* harmony export */   "DecimalChromosome": () => /* reexport safe */ _DecimalChromosome__WEBPACK_IMPORTED_MODULE_1__.default,
/* harmony export */   "FloatingPointChromosome": () => /* reexport safe */ _FloatingPointChromosome__WEBPACK_IMPORTED_MODULE_2__.default,
/* harmony export */   "Gene": () => /* reexport safe */ _Gene__WEBPACK_IMPORTED_MODULE_5__.default
/* harmony export */ });
/* harmony import */ var _BinaryChromosomeBase__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BinaryChromosomeBase */ "./src/domain/chromosome/BinaryChromosomeBase.ts");
/* harmony import */ var _ChromosomeBase__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ChromosomeBase */ "./src/domain/chromosome/ChromosomeBase.ts");
/* harmony import */ var _ChromosomeExtension__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ChromosomeExtension */ "./src/domain/chromosome/ChromosomeExtension.ts");
/* harmony import */ var _DecimalChromosome__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DecimalChromosome */ "./src/domain/chromosome/DecimalChromosome.ts");
/* harmony import */ var _FloatingPointChromosome__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./FloatingPointChromosome */ "./src/domain/chromosome/FloatingPointChromosome.ts");
/* harmony import */ var _Gene__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Gene */ "./src/domain/chromosome/Gene.ts");









/***/ }),

/***/ "./src/domain/crossovers/AlternatingPointCrossover.ts":
/*!************************************************************!*\
  !*** ./src/domain/crossovers/AlternatingPointCrossover.ts ***!
  \************************************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ AlternatingPointCrossover
/* harmony export */ });
/* harmony import */ var _chromosome_ChromosomeExtension__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../chromosome/ChromosomeExtension */ "./src/domain/chromosome/ChromosomeExtension.ts");
/* harmony import */ var _chromosome_DecimalChromosome__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../chromosome/DecimalChromosome */ "./src/domain/chromosome/DecimalChromosome.ts");
/* harmony import */ var _chromosome_Gene__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../chromosome/Gene */ "./src/domain/chromosome/Gene.ts");
/* harmony import */ var _CrossoverBase__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CrossoverBase */ "./src/domain/crossovers/CrossoverBase.ts");




class AlternatingPointCrossover extends _CrossoverBase__WEBPACK_IMPORTED_MODULE_1__.default {
    constructor() {
        super(2, 2);
    }
    performCross(parents) {
        const p1 = parents[0];
        const p2 = parents[1];
        if (_chromosome_ChromosomeExtension__WEBPACK_IMPORTED_MODULE_2__.default.anyHasRepeatedGene(parents)) {
            throw new Error("Alternating cross over has repeated");
        }
        const child1 = this.createChild(p1, p2);
        const child2 = this.createChild(p2, p1);
        return [child1, child2];
    }
    createChild(firstParent, secondParent) {
        const child = [];
        const c = new _chromosome_DecimalChromosome__WEBPACK_IMPORTED_MODULE_0__.default(firstParent.length);
        const p1 = [...firstParent.getGenes()];
        const p2 = [...secondParent.getGenes()];
        const p1Genes = [];
        const p2Genes = [];
        p1.forEach((element) => p1Genes.push(element.mValue));
        p2.forEach((element) => p2Genes.push(element.mValue));
        const length = p1.length;
        while (child.length < length) {
            !child.includes(p1Genes[0])
                ? child.push(p1Genes.shift())
                : p1Genes.shift();
            !child.includes(p2Genes[0])
                ? child.push(p2Genes.shift())
                : p2Genes.shift();
        }
        for (let i = 0; i < firstParent.length; i++)
            c.replaceGene(i, new _chromosome_Gene__WEBPACK_IMPORTED_MODULE_3__.default(child[i]));
        return c;
    }
}


/***/ }),

/***/ "./src/domain/crossovers/CrossOverUtil.ts":
/*!************************************************!*\
  !*** ./src/domain/crossovers/CrossOverUtil.ts ***!
  \************************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ CrossOverUtil
/* harmony export */ });
/* harmony import */ var _randomization_RandomizationProvider__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../randomization/RandomizationProvider */ "./src/domain/randomization/RandomizationProvider.ts");

class CrossOverUtil {
}
CrossOverUtil.orderedCrossover = (parentOne, parentTwo, pos1, pos2) => {
    const parentOneClone = [...parentOne];
    let parentTwoClone = [...parentTwo];
    const length = parentOne.length;
    const random = _randomization_RandomizationProvider__WEBPACK_IMPORTED_MODULE_0__.default.current.getUniqueInts(2, 0, length)
        .sort((a, b) => a - b);
    if (pos1 === undefined)
        pos1 = random[0];
    if (pos2 === undefined)
        pos2 = random[1];
    const child = [];
    const markedOut = [];
    for (let i = pos1; i < pos2; i++) {
        markedOut.push(parentOneClone[i]);
        child[i] = parentOneClone[i];
    }
    parentTwoClone = parentTwoClone.filter((val) => !markedOut.includes(val));
    for (let i = 0; i < pos1; i++)
        child[i] = parentTwoClone.shift();
    for (let i = pos2; i < length; i++)
        child[i] = parentTwoClone.shift();
    return child;
};
CrossOverUtil.pmxCrossOver = {};


/***/ }),

/***/ "./src/domain/crossovers/CrossoverBase.ts":
/*!************************************************!*\
  !*** ./src/domain/crossovers/CrossoverBase.ts ***!
  \************************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ CrossoverBase
/* harmony export */ });
class CrossoverBase {
    constructor(parentsNumber, childrenNumber, minChromosomeLength) {
        this.parentNumber = parentsNumber;
        this.childrenNumber = childrenNumber;
        this.minChromosomeLength = minChromosomeLength;
    }
    cross(parents) {
        if (parents == null)
            throw new Error("Error - CrossOverbase: Number of parents cannot be null.");
        const firstParent = parents[0];
        if (firstParent.length < this.minChromosomeLength) {
            throw new Error("Error: A chromosome should have at least 0 genes");
        }
        return this.performCross(parents);
    }
}


/***/ }),

/***/ "./src/domain/crossovers/OnePointCrossover.ts":
/*!****************************************************!*\
  !*** ./src/domain/crossovers/OnePointCrossover.ts ***!
  \****************************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ OnePointCrossOver
/* harmony export */ });
/* harmony import */ var _randomization_RandomizationProvider__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../randomization/RandomizationProvider */ "./src/domain/randomization/RandomizationProvider.ts");
/* harmony import */ var _CrossoverBase__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CrossoverBase */ "./src/domain/crossovers/CrossoverBase.ts");


class OnePointCrossOver extends _CrossoverBase__WEBPACK_IMPORTED_MODULE_1__.default {
    constructor(swapPointIndex) {
        super(2, 2);
        if (swapPointIndex !== undefined)
            this.swapPointIndex = swapPointIndex;
    }
    performCross(parents) {
        const firstParent = parents[0];
        const secondParent = parents[1];
        const swapPointsLength = firstParent.getGenes().length - 1;
        if (this.swapPointIndex === undefined)
            this.swapPointIndex = _randomization_RandomizationProvider__WEBPACK_IMPORTED_MODULE_0__.default.current.getInt(0, firstParent.getGenes().length - 1);
        if (this.swapPointIndex >= swapPointsLength) {
            throw new Error("SwapPointIndex - The swap point index.");
        }
        return this.createChildren(firstParent, secondParent);
    }
    createChild(leftParent, rightParent) {
        const cutGeneCount = this.swapPointIndex + 1;
        const child = leftParent.createNew();
        const left = leftParent.getGenes().slice(0, cutGeneCount);
        const right = rightParent.getGenes().slice(cutGeneCount, rightParent.getGenes().length - 1);
        const combined = left.concat(right);
        child.replaceGenes(0, combined);
        return child;
    }
    createChildren(firstParent, secondParent) {
        const firstChild = this.createChild(firstParent, secondParent);
        const secondChild = this.createChild(secondParent, firstParent);
        return [firstChild, secondChild];
    }
}


/***/ }),

/***/ "./src/domain/crossovers/OrderedCrossover.ts":
/*!***************************************************!*\
  !*** ./src/domain/crossovers/OrderedCrossover.ts ***!
  \***************************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ OrderedCrossover
/* harmony export */ });
/* harmony import */ var _chromosome_ChromosomeExtension__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../chromosome/ChromosomeExtension */ "./src/domain/chromosome/ChromosomeExtension.ts");
/* harmony import */ var _randomization_RandomizationProvider__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../randomization/RandomizationProvider */ "./src/domain/randomization/RandomizationProvider.ts");
/* harmony import */ var _CrossoverBase__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./CrossoverBase */ "./src/domain/crossovers/CrossoverBase.ts");
/* harmony import */ var _CrossOverUtil__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CrossOverUtil */ "./src/domain/crossovers/CrossOverUtil.ts");




class OrderedCrossover extends _CrossoverBase__WEBPACK_IMPORTED_MODULE_2__.default {
    constructor() {
        super(2, 2);
        this.isOrdered = true;
    }
    performCross(parents) {
        const parentOne = parents[0];
        const parentTwo = parents[1];
        if (!_chromosome_ChromosomeExtension__WEBPACK_IMPORTED_MODULE_3__.default.validateGenes(parentOne)) {
            throw new Error("Ordered Crossover - Cannot be used! Parent has duplicate genes.");
        }
        if (_chromosome_ChromosomeExtension__WEBPACK_IMPORTED_MODULE_3__.default.anyHasRepeatedGene([parentOne, parentTwo])) {
            throw new Error("Ordered Crossover - Parents have repeated genes");
        }
        let middleSectionIndexes = _randomization_RandomizationProvider__WEBPACK_IMPORTED_MODULE_0__.default.current.getUniqueInts(2, 0, parentOne.length);
        middleSectionIndexes = middleSectionIndexes.sort((a, b) => a - b);
        const middleSectionBeginIndex = middleSectionIndexes[0];
        const middleSectionEndIndex = middleSectionIndexes[1];
        const firstChild = this.createChild(parentOne, parentTwo, middleSectionBeginIndex, middleSectionEndIndex);
        const secondChild = this.createChild(parentTwo, parentOne, middleSectionBeginIndex, middleSectionEndIndex);
        return [firstChild, secondChild];
    }
    createChild(firstParent, secondParent, middleSectionBeginIndex, middleSectionEndIndex) {
        const firstParentGenes = firstParent.getGenes();
        const secondParentGenes = secondParent.getGenes();
        const childGenes = _CrossOverUtil__WEBPACK_IMPORTED_MODULE_1__.default.orderedCrossover(firstParentGenes, secondParentGenes, middleSectionBeginIndex, middleSectionEndIndex);
        const child = firstParent.createNew();
        let index = 0;
        for (const gene of childGenes) {
            child.replaceGene(index, gene);
            index++;
        }
        return child;
    }
}


/***/ }),

/***/ "./src/domain/crossovers/UniformCrossover.ts":
/*!***************************************************!*\
  !*** ./src/domain/crossovers/UniformCrossover.ts ***!
  \***************************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ UniformCrossover
/* harmony export */ });
/* harmony import */ var _CrossoverBase__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CrossoverBase */ "./src/domain/crossovers/CrossoverBase.ts");

class UniformCrossover extends _CrossoverBase__WEBPACK_IMPORTED_MODULE_0__.default {
    constructor(mixProbability) {
        super(2, 2);
        this.mixProbability = mixProbability;
    }
    performCross(parents) {
        const firstParent = parents[0];
        const secondParent = parents[1];
        const firstChild = firstParent.createNew();
        const secondChild = secondParent.createNew();
        const children = [];
        for (let i = 0; i < firstParent.length; i++) {
            if (Math.random() < this.mixProbability) {
                firstChild.replaceGene(i, firstChild.getGene(i));
                secondChild.replaceGene(i, secondParent.getGene(i));
            }
            else {
                firstChild.replaceGene(i, secondParent.getGene(i));
                secondChild.replaceGene(i, firstParent.getGene(i));
            }
        }
        children.push(firstChild);
        children.push(secondChild);
        return children;
    }
}


/***/ }),

/***/ "./src/domain/index.ts":
/*!*****************************!*\
  !*** ./src/domain/index.ts ***!
  \*****************************/
/*! namespace exports */
/*! export AlternatingPointCrossover [provided] [maybe used in bundle (runtime-defined)] [usage prevents renaming] -> ./src/domain/crossovers/AlternatingPointCrossover.ts .default */
/*! export BinaryChromosomeBase [provided] [maybe used in bundle (runtime-defined)] [usage prevents renaming] -> ./src/domain/chromosome/BinaryChromosomeBase.ts .default */
/*! export ChromosomeBase [provided] [maybe used in bundle (runtime-defined)] [usage prevents renaming] -> ./src/domain/chromosome/ChromosomeBase.ts .default */
/*! export ChromosomeExtension [provided] [maybe used in bundle (runtime-defined)] [usage prevents renaming] -> ./src/domain/chromosome/ChromosomeExtension.ts .default */
/*! export DecimalChromosome [provided] [maybe used in bundle (runtime-defined)] [usage prevents renaming] -> ./src/domain/chromosome/DecimalChromosome.ts .default */
/*! export FloatingPointChromosome [provided] [maybe used in bundle (runtime-defined)] [usage prevents renaming] -> ./src/domain/chromosome/FloatingPointChromosome.ts .default */
/*! export Gene [provided] [maybe used in bundle (runtime-defined)] [usage prevents renaming] -> ./src/domain/chromosome/Gene.ts .default */
/*! export GeneticAlgorithm [provided] [maybe used in bundle (runtime-defined)] [usage prevents renaming] -> ./src/domain/GeneticAlgorithm.ts .default */
/*! export MutationBase [provided] [maybe used in bundle (runtime-defined)] [usage prevents renaming] -> ./src/domain/mutations/MutationBase.ts .default */
/*! export OnePointCrossOver [provided] [maybe used in bundle (runtime-defined)] [usage prevents renaming] -> ./src/domain/crossovers/OnePointCrossover.ts .default */
/*! export OrderedCrossover [provided] [maybe used in bundle (runtime-defined)] [usage prevents renaming] -> ./src/domain/crossovers/OrderedCrossover.ts .default */
/*! export PartialShuffleMutation [provided] [maybe used in bundle (runtime-defined)] [usage prevents renaming] -> ./src/domain/mutations/PartialShuffleMutation.ts .default */
/*! export ReverseSequenceMutation [provided] [maybe used in bundle (runtime-defined)] [usage prevents renaming] -> ./src/domain/mutations/ReverseSequenceMutation.ts .default */
/*! export SequenceMutationBase [provided] [maybe used in bundle (runtime-defined)] [usage prevents renaming] -> ./src/domain/mutations/SequenceMutationBase.ts .default */
/*! export UniformCrossover [provided] [maybe used in bundle (runtime-defined)] [usage prevents renaming] -> ./src/domain/crossovers/UniformCrossover.ts .default */
/*! export UniformMutation [provided] [maybe used in bundle (runtime-defined)] [usage prevents renaming] -> ./src/domain/mutations/UniformMutation.ts .default */
/*! other exports [not provided] [maybe used in bundle (runtime-defined)] */
/*! runtime requirements: __webpack_require__, __webpack_exports__, __webpack_require__.d, __webpack_require__.r, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GeneticAlgorithm": () => /* reexport safe */ _GeneticAlgorithm__WEBPACK_IMPORTED_MODULE_0__.default,
/* harmony export */   "BinaryChromosomeBase": () => /* reexport safe */ _chromosome_Index__WEBPACK_IMPORTED_MODULE_1__.BinaryChromosomeBase,
/* harmony export */   "ChromosomeBase": () => /* reexport safe */ _chromosome_Index__WEBPACK_IMPORTED_MODULE_1__.ChromosomeBase,
/* harmony export */   "ChromosomeExtension": () => /* reexport safe */ _chromosome_Index__WEBPACK_IMPORTED_MODULE_1__.ChromosomeExtension,
/* harmony export */   "DecimalChromosome": () => /* reexport safe */ _chromosome_Index__WEBPACK_IMPORTED_MODULE_1__.DecimalChromosome,
/* harmony export */   "FloatingPointChromosome": () => /* reexport safe */ _chromosome_Index__WEBPACK_IMPORTED_MODULE_1__.FloatingPointChromosome,
/* harmony export */   "Gene": () => /* reexport safe */ _chromosome_Gene__WEBPACK_IMPORTED_MODULE_10__.default,
/* harmony export */   "AlternatingPointCrossover": () => /* reexport safe */ _crossovers_AlternatingPointCrossover__WEBPACK_IMPORTED_MODULE_4__.default,
/* harmony export */   "OnePointCrossOver": () => /* reexport safe */ _crossovers_OnePointCrossover__WEBPACK_IMPORTED_MODULE_5__.default,
/* harmony export */   "OrderedCrossover": () => /* reexport safe */ _crossovers_OrderedCrossover__WEBPACK_IMPORTED_MODULE_2__.default,
/* harmony export */   "UniformCrossover": () => /* reexport safe */ _crossovers_UniformCrossover__WEBPACK_IMPORTED_MODULE_3__.default,
/* harmony export */   "MutationBase": () => /* reexport safe */ _mutations_MutationBase__WEBPACK_IMPORTED_MODULE_11__.default,
/* harmony export */   "PartialShuffleMutation": () => /* reexport safe */ _mutations_PartialShuffleMutation__WEBPACK_IMPORTED_MODULE_6__.default,
/* harmony export */   "ReverseSequenceMutation": () => /* reexport safe */ _mutations_ReverseSequenceMutation__WEBPACK_IMPORTED_MODULE_7__.default,
/* harmony export */   "SequenceMutationBase": () => /* reexport safe */ _mutations_SequenceMutationBase__WEBPACK_IMPORTED_MODULE_8__.default,
/* harmony export */   "UniformMutation": () => /* reexport safe */ _mutations_UniformMutation__WEBPACK_IMPORTED_MODULE_9__.default
/* harmony export */ });
/* harmony import */ var _GeneticAlgorithm__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./GeneticAlgorithm */ "./src/domain/GeneticAlgorithm.ts");
/* harmony import */ var _chromosome_Gene__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./chromosome/Gene */ "./src/domain/chromosome/Gene.ts");
/* harmony import */ var _chromosome_Index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./chromosome/Index */ "./src/domain/chromosome/Index.ts");
/* harmony import */ var _crossovers_OrderedCrossover__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./crossovers/OrderedCrossover */ "./src/domain/crossovers/OrderedCrossover.ts");
/* harmony import */ var _crossovers_UniformCrossover__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./crossovers/UniformCrossover */ "./src/domain/crossovers/UniformCrossover.ts");
/* harmony import */ var _crossovers_AlternatingPointCrossover__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./crossovers/AlternatingPointCrossover */ "./src/domain/crossovers/AlternatingPointCrossover.ts");
/* harmony import */ var _crossovers_OnePointCrossover__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./crossovers/OnePointCrossover */ "./src/domain/crossovers/OnePointCrossover.ts");
/* harmony import */ var _mutations_MutationBase__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./mutations/MutationBase */ "./src/domain/mutations/MutationBase.ts");
/* harmony import */ var _mutations_PartialShuffleMutation__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./mutations/PartialShuffleMutation */ "./src/domain/mutations/PartialShuffleMutation.ts");
/* harmony import */ var _mutations_ReverseSequenceMutation__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./mutations/ReverseSequenceMutation */ "./src/domain/mutations/ReverseSequenceMutation.ts");
/* harmony import */ var _mutations_SequenceMutationBase__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./mutations/SequenceMutationBase */ "./src/domain/mutations/SequenceMutationBase.ts");
/* harmony import */ var _mutations_UniformMutation__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./mutations/UniformMutation */ "./src/domain/mutations/UniformMutation.ts");


















/***/ }),

/***/ "./src/domain/mutations/MutationBase.ts":
/*!**********************************************!*\
  !*** ./src/domain/mutations/MutationBase.ts ***!
  \**********************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ MutationBase
/* harmony export */ });
class MutationBase {
    mutate(chromosome, probability) {
        this.performMutate(chromosome, probability);
    }
}


/***/ }),

/***/ "./src/domain/mutations/PartialShuffleMutation.ts":
/*!********************************************************!*\
  !*** ./src/domain/mutations/PartialShuffleMutation.ts ***!
  \********************************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ PartialShuffleMutation
/* harmony export */ });
/* harmony import */ var _SequenceMutationBase__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SequenceMutationBase */ "./src/domain/mutations/SequenceMutationBase.ts");

class PartialShuffleMutation extends _SequenceMutationBase__WEBPACK_IMPORTED_MODULE_0__.default {
    mutateOnSequence(sequence) {
        const mutated = sequence.sort(() => 0.5 - Math.random());
        return mutated;
    }
}


/***/ }),

/***/ "./src/domain/mutations/ReverseSequenceMutation.ts":
/*!*********************************************************!*\
  !*** ./src/domain/mutations/ReverseSequenceMutation.ts ***!
  \*********************************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ ReverseSequenceMutation
/* harmony export */ });
/* harmony import */ var _SequenceMutationBase__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SequenceMutationBase */ "./src/domain/mutations/SequenceMutationBase.ts");

class ReverseSequenceMutation extends _SequenceMutationBase__WEBPACK_IMPORTED_MODULE_0__.default {
    mutateOnSequence(sequence) {
        return sequence.reverse();
    }
}


/***/ }),

/***/ "./src/domain/mutations/SequenceMutationBase.ts":
/*!******************************************************!*\
  !*** ./src/domain/mutations/SequenceMutationBase.ts ***!
  \******************************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ SequenceMutationBase
/* harmony export */ });
/* harmony import */ var _randomization_RandomizationProvider__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../randomization/RandomizationProvider */ "./src/domain/randomization/RandomizationProvider.ts");
/* harmony import */ var _MutationBase__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MutationBase */ "./src/domain/mutations/MutationBase.ts");


class SequenceMutationBase extends _MutationBase__WEBPACK_IMPORTED_MODULE_1__.default {
    performMutate(chromosome, probability) {
        this.validateLength(chromosome);
        const r = _randomization_RandomizationProvider__WEBPACK_IMPORTED_MODULE_0__.default.current;
        if (r.getDouble() <= probability) {
            const indexes = r
                .getUniqueInts(2, 0, chromosome.length)
                .sort((a, b) => a - b);
            const firstIndex = indexes[0];
            const secondIndex = indexes[1];
            const sequenceLength = secondIndex - firstIndex + 1;
            const sequence = chromosome.getGenes().slice(firstIndex, secondIndex);
            const mutatedSequence = this.mutateOnSequence(sequence);
            chromosome.replaceGenes(firstIndex, mutatedSequence);
        }
    }
    validateLength(chromosome) {
        if (chromosome.length < 3) {
            throw new Error("SequenceMutationBase - A chromosome should have at least 3 genes");
        }
    }
}


/***/ }),

/***/ "./src/domain/mutations/UniformMutation.ts":
/*!*************************************************!*\
  !*** ./src/domain/mutations/UniformMutation.ts ***!
  \*************************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ UniformMutation
/* harmony export */ });
/* harmony import */ var _MutationBase__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MutationBase */ "./src/domain/mutations/MutationBase.ts");

class UniformMutation extends _MutationBase__WEBPACK_IMPORTED_MODULE_0__.default {
    performMutate(chromosome, probability) {
        throw new Error("Method not implemented.");
    }
}


/***/ }),

/***/ "./src/domain/populations/Generation.ts":
/*!**********************************************!*\
  !*** ./src/domain/populations/Generation.ts ***!
  \**********************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ Generation
/* harmony export */ });
class Generation {
    constructor(num, chromosomes) {
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
    end(chromosomesNumber) {
        this.chromosomes = this.chromosomes
            .filter((chromosome) => this.validateChromosome(chromosome) === true)
            .sort((a, b) => b.fitness - a.fitness);
        this.chromosomes = this.chromosomes.slice(0, chromosomesNumber);
        this.bestChromosomes = this.chromosomes[0];
    }
    getChromosome() {
        return this.chromosomes;
    }
    toString() {
        return this.bestChromosomes.getGenes().toString();
    }
    validateChromosome(chromosome) {
        if (chromosome.fitness == null)
            throw new Error("No fitness");
        return true;
    }
}


/***/ }),

/***/ "./src/domain/populations/Population.ts":
/*!**********************************************!*\
  !*** ./src/domain/populations/Population.ts ***!
  \**********************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ Population
/* harmony export */ });
/* harmony import */ var _Generation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Generation */ "./src/domain/populations/Generation.ts");

class Population {
    constructor(minSize, maxSize, adamChromosome) {
        this.toString = () => {
            let str = "";
            for (const generation of this.generations) {
                str += this.generations.toString();
            }
            return str;
        };
        if (minSize < 2)
            throw new Error();
        if (maxSize < minSize)
            throw new Error();
        this.creationDate = new Date();
        this.minSize = minSize;
        this.maxSize = maxSize;
        this.generations = [];
        this.adamChromosome = adamChromosome;
        this.bestChromosome = adamChromosome;
        this.createInitialGeneration();
    }
    createInitialGeneration() {
        this.generations = [];
        this.generationNumber = 0;
        const chromosomes = [];
        for (let i = 0; i < this.minSize; i++) {
            const c = this.adamChromosome.createNew();
            if (c == null) {
                throw new Error("");
            }
            chromosomes.push(c);
        }
        this.createNewGeneration(chromosomes);
    }
    createNewGeneration(chromosomes) {
        this.currentGeneration = new _Generation__WEBPACK_IMPORTED_MODULE_0__.default(++this.generationNumber, chromosomes);
        this.generations.push(this.currentGeneration);
    }
    endCurrentGeneration() {
        this.currentGeneration.end(this.maxSize);
        if (this.bestChromosome.fitness <
            this.currentGeneration.chromosomes[0].fitness ||
            this.bestChromosome === undefined) {
            this.bestChromosome = this.currentGeneration.chromosomes[0];
        }
    }
}


/***/ }),

/***/ "./src/domain/randomization/BasicRandomization.ts":
/*!********************************************************!*\
  !*** ./src/domain/randomization/BasicRandomization.ts ***!
  \********************************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ BasicRandomization
/* harmony export */ });
/* harmony import */ var _RandomizationBase__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./RandomizationBase */ "./src/domain/randomization/RandomizationBase.ts");

class BasicRandomization extends _RandomizationBase__WEBPACK_IMPORTED_MODULE_0__.default {
    getDouble(min, max) {
        if (min === undefined || max === undefined)
            return Math.random();
        return Math.random() * (max - min) + min;
    }
    getFloat(min, max) {
        return Math.random() * (max - min) + min;
    }
    getInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min);
    }
    getUniqueInts(length, min, max) {
        const stub = [];
        for (let i = min; i < max; i++) {
            stub.push(i);
        }
        return stub
            .sort(() => {
            return 0.5 - Math.random();
        })
            .slice(0, length);
    }
}


/***/ }),

/***/ "./src/domain/randomization/RandomizationBase.ts":
/*!*******************************************************!*\
  !*** ./src/domain/randomization/RandomizationBase.ts ***!
  \*******************************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ RandomizationBase
/* harmony export */ });
class RandomizationBase {
    getInts(length, min, max) {
        const result = [];
        for (let index = 0; index < length; index++) {
            result.push(this.getInt(min, max));
        }
        return result;
    }
}


/***/ }),

/***/ "./src/domain/randomization/RandomizationProvider.ts":
/*!***********************************************************!*\
  !*** ./src/domain/randomization/RandomizationProvider.ts ***!
  \***********************************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ RandomizationProvider
/* harmony export */ });
/* harmony import */ var _BasicRandomization__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BasicRandomization */ "./src/domain/randomization/BasicRandomization.ts");

class RandomizationProvider {
}
RandomizationProvider.current = new _BasicRandomization__WEBPACK_IMPORTED_MODULE_0__.default();


/***/ }),

/***/ "./src/domain/terminations/GenerationNumberTermination.ts":
/*!****************************************************************!*\
  !*** ./src/domain/terminations/GenerationNumberTermination.ts ***!
  \****************************************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ GenerationNumberTermination
/* harmony export */ });
/* harmony import */ var _TerminationBase__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TerminationBase */ "./src/domain/terminations/TerminationBase.ts");

class GenerationNumberTermination extends _TerminationBase__WEBPACK_IMPORTED_MODULE_0__.default {
    constructor(expectedGenerationNumber) {
        super();
        if (expectedGenerationNumber === undefined ||
            expectedGenerationNumber === null)
            this.expectedGenerationNumber = 100;
        else
            this.expectedGenerationNumber = expectedGenerationNumber;
    }
    performHasReached(geneticAlgorithm) {
        return geneticAlgorithm.generationsNumber >= this.expectedGenerationNumber;
    }
}


/***/ }),

/***/ "./src/domain/terminations/TerminationBase.ts":
/*!****************************************************!*\
  !*** ./src/domain/terminations/TerminationBase.ts ***!
  \****************************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ TerminationBase
/* harmony export */ });
class TerminationBase {
    hasReached(geneticAlgorithm) {
        return this.mHasReached;
    }
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// module exports must be returned from runtime so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__("./src/domain/index.ts");
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9nZW5ldGljanMvLi9zcmMvZG9tYWluL0RlZmF1bHRPcGVyYXRpb25TdHJhdGVneS50cyIsIndlYnBhY2s6Ly9nZW5ldGljanMvLi9zcmMvZG9tYWluL0dlbmV0aWNBbGdvcml0aG0udHMiLCJ3ZWJwYWNrOi8vZ2VuZXRpY2pzLy4vc3JjL2RvbWFpbi9jaHJvbW9zb21lL0JpbmFyeUNocm9tb3NvbWVCYXNlLnRzIiwid2VicGFjazovL2dlbmV0aWNqcy8uL3NyYy9kb21haW4vY2hyb21vc29tZS9DaHJvbW9zb21lQmFzZS50cyIsIndlYnBhY2s6Ly9nZW5ldGljanMvLi9zcmMvZG9tYWluL2Nocm9tb3NvbWUvQ2hyb21vc29tZUV4dGVuc2lvbi50cyIsIndlYnBhY2s6Ly9nZW5ldGljanMvLi9zcmMvZG9tYWluL2Nocm9tb3NvbWUvRGVjaW1hbENocm9tb3NvbWUudHMiLCJ3ZWJwYWNrOi8vZ2VuZXRpY2pzLy4vc3JjL2RvbWFpbi9jaHJvbW9zb21lL0Zsb2F0aW5nUG9pbnRDaHJvbW9zb21lLnRzIiwid2VicGFjazovL2dlbmV0aWNqcy8uL3NyYy9kb21haW4vY2hyb21vc29tZS9HZW5lLnRzIiwid2VicGFjazovL2dlbmV0aWNqcy8uL3NyYy9kb21haW4vY2hyb21vc29tZS9JbmRleC50cyIsIndlYnBhY2s6Ly9nZW5ldGljanMvLi9zcmMvZG9tYWluL2Nyb3Nzb3ZlcnMvQWx0ZXJuYXRpbmdQb2ludENyb3Nzb3Zlci50cyIsIndlYnBhY2s6Ly9nZW5ldGljanMvLi9zcmMvZG9tYWluL2Nyb3Nzb3ZlcnMvQ3Jvc3NPdmVyVXRpbC50cyIsIndlYnBhY2s6Ly9nZW5ldGljanMvLi9zcmMvZG9tYWluL2Nyb3Nzb3ZlcnMvQ3Jvc3NvdmVyQmFzZS50cyIsIndlYnBhY2s6Ly9nZW5ldGljanMvLi9zcmMvZG9tYWluL2Nyb3Nzb3ZlcnMvT25lUG9pbnRDcm9zc292ZXIudHMiLCJ3ZWJwYWNrOi8vZ2VuZXRpY2pzLy4vc3JjL2RvbWFpbi9jcm9zc292ZXJzL09yZGVyZWRDcm9zc292ZXIudHMiLCJ3ZWJwYWNrOi8vZ2VuZXRpY2pzLy4vc3JjL2RvbWFpbi9jcm9zc292ZXJzL1VuaWZvcm1Dcm9zc292ZXIudHMiLCJ3ZWJwYWNrOi8vZ2VuZXRpY2pzLy4vc3JjL2RvbWFpbi9pbmRleC50cyIsIndlYnBhY2s6Ly9nZW5ldGljanMvLi9zcmMvZG9tYWluL211dGF0aW9ucy9NdXRhdGlvbkJhc2UudHMiLCJ3ZWJwYWNrOi8vZ2VuZXRpY2pzLy4vc3JjL2RvbWFpbi9tdXRhdGlvbnMvUGFydGlhbFNodWZmbGVNdXRhdGlvbi50cyIsIndlYnBhY2s6Ly9nZW5ldGljanMvLi9zcmMvZG9tYWluL211dGF0aW9ucy9SZXZlcnNlU2VxdWVuY2VNdXRhdGlvbi50cyIsIndlYnBhY2s6Ly9nZW5ldGljanMvLi9zcmMvZG9tYWluL211dGF0aW9ucy9TZXF1ZW5jZU11dGF0aW9uQmFzZS50cyIsIndlYnBhY2s6Ly9nZW5ldGljanMvLi9zcmMvZG9tYWluL211dGF0aW9ucy9Vbmlmb3JtTXV0YXRpb24udHMiLCJ3ZWJwYWNrOi8vZ2VuZXRpY2pzLy4vc3JjL2RvbWFpbi9wb3B1bGF0aW9ucy9HZW5lcmF0aW9uLnRzIiwid2VicGFjazovL2dlbmV0aWNqcy8uL3NyYy9kb21haW4vcG9wdWxhdGlvbnMvUG9wdWxhdGlvbi50cyIsIndlYnBhY2s6Ly9nZW5ldGljanMvLi9zcmMvZG9tYWluL3JhbmRvbWl6YXRpb24vQmFzaWNSYW5kb21pemF0aW9uLnRzIiwid2VicGFjazovL2dlbmV0aWNqcy8uL3NyYy9kb21haW4vcmFuZG9taXphdGlvbi9SYW5kb21pemF0aW9uQmFzZS50cyIsIndlYnBhY2s6Ly9nZW5ldGljanMvLi9zcmMvZG9tYWluL3JhbmRvbWl6YXRpb24vUmFuZG9taXphdGlvblByb3ZpZGVyLnRzIiwid2VicGFjazovL2dlbmV0aWNqcy8uL3NyYy9kb21haW4vdGVybWluYXRpb25zL0dlbmVyYXRpb25OdW1iZXJUZXJtaW5hdGlvbi50cyIsIndlYnBhY2s6Ly9nZW5ldGljanMvLi9zcmMvZG9tYWluL3Rlcm1pbmF0aW9ucy9UZXJtaW5hdGlvbkJhc2UudHMiLCJ3ZWJwYWNrOi8vZ2VuZXRpY2pzL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2dlbmV0aWNqcy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vZ2VuZXRpY2pzL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vZ2VuZXRpY2pzL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vZ2VuZXRpY2pzL3dlYnBhY2svc3RhcnR1cCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUswRTtBQUUzRCxNQUFNLHdCQUF3QjtJQUMzQyxLQUFLLENBQ0gsVUFBdUIsRUFDdkIsU0FBcUIsRUFDckIsb0JBQTRCLEVBQzVCLE9BQXNCO1FBRXRCLE1BQU0sT0FBTyxHQUFXLFVBQVUsQ0FBQyxPQUFPLENBQUM7UUFDM0MsSUFBSSxTQUFTLEdBQWtCLEVBQUUsQ0FBQztRQUNsQyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsT0FBTyxFQUFFLENBQUMsSUFBSSxTQUFTLENBQUMsWUFBWSxFQUFFO1lBQ3hELE1BQU0sZUFBZSxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxTQUFTLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDM0UsSUFBSSxlQUFlLENBQUMsTUFBTSxLQUFLLFNBQVMsQ0FBQyxZQUFZO2dCQUNuRCwyRkFBdUMsRUFBRSxJQUFJLG9CQUFvQixFQUFFO2dCQUVuRSxNQUFNLEtBQUssR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxDQUFDO2dCQUUvQyxTQUFTLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQzth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QztRQW1CSix3QkFBbUIsR0FBRyxDQUFDLE9BQU8sRUFBRSxFQUFFO1lBQ3hDLE1BQU0sUUFBUSxHQUFHLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDMUUsTUFBTSxNQUFNLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdEQsTUFBTSxJQUFJLEdBQUcsSUFBSSxRQUFRLENBQUMsSUFBSSxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDN0MsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLEVBQUUsT0FBTyxDQUFDLENBQUM7WUFDNUIsT0FBTyxRQUFRLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDckcsQ0FBQztRQXhCQyxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUNyQixNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDaEQsSUFBSSxDQUFDLFdBQVcsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBRXBDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNyQixDQUFDO0lBS0QsU0FBUztRQUNQLE9BQU8sSUFBSSx1QkFBdUIsQ0FBQyxJQUFJLENBQUMs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QixTQUFRLHFEQUFlO0lBR3RFLFlBQVksd0JBQWlDO1FBQzNDLEtBQUssRUFBRSxDQUFDO1FBQ1IsSUFDRSx3QkFBd0IsS0FBSyxTQUFTO1lBQ3RDLHdCQUF3QixLQUFLLElBQUk7WUFFakMsSUFBSSxDQUFDLHdCQUF3QixHQUFHLEdBQUcsQ0FBQzs7WUFFcEMsSUFBSSxDQUFDLHdCQUF3QixHQUFHLHdCQUF3QixDQUFDO0lBQzdELENBQUM7SUFFRCxpQkFBaUIsQ0FBQyxnQkFBbUM7UUFDbkQsT0FBTyxnQkFBZ0IsQ0FBQyxpQkFBaUIsSUFBSSxJQUFJLENBQUMsd0JBQXdCLENBQUM7SUFDN0UsQ0FBQztDQUNGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDakJjLE1BQWUsZUFBZTtJQUczQyxVQUFVLENBQUMsZ0JBQW1DO1FBQzVDLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQztJQUMxQixDQUFDO0NBR0Y7Ozs7Ozs7VUNYRDtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0NyQkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx3Q0FBd0MseUNBQXlDO1dBQ2pGO1dBQ0E7V0FDQSxFOzs7OztXQ1BBLHNGOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHNEQUFzRCxrQkFBa0I7V0FDeEU7V0FDQSwrQ0FBK0MsY0FBYztXQUM3RCxFOzs7O1VDTkE7VUFDQTtVQUNBO1VBQ0EiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IElDaHJvbW9zb21lIGZyb20gXCIuL2Nocm9tb3NvbWUvSUNocm9tb3NvbWVcIjtcbmltcG9ydCBJQ3Jvc3NvdmVyIGZyb20gXCIuL2Nyb3Nzb3ZlcnMvSUNyb3Nzb3ZlclwiO1xuaW1wb3J0IElPcGVyYXRpb25TdHJhdGVneSBmcm9tIFwiLi9JT3BlcmF0aW9uU3RyYXRlZ3lcIjtcbmltcG9ydCBJTXV0YXRpb24gZnJvbSBcIi4vbXV0YXRpb25zL0lNdXRhdGlvblwiO1xuaW1wb3J0IElQb3B1bGF0aW9uIGZyb20gXCIuL3BvcHVsYXRpb25zL0lQb3B1bGF0aW9uXCI7XG5pbXBvcnQgUmFuZG9taXphdGlvblByb3ZpZGVyIGZyb20gXCIuL3JhbmRvbWl6YXRpb24vUmFuZG9taXphdGlvblByb3ZpZGVyXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERlZmF1bHRPcGVyYXRpb25TdHJhdGVneSBpbXBsZW1lbnRzIElPcGVyYXRpb25TdHJhdGVneSB7XG4gIGNyb3NzKFxuICAgIHBvcHVsYXRpb246IElQb3B1bGF0aW9uLFxuICAgIGNyb3Nzb3ZlcjogSUNyb3Nzb3ZlcixcbiAgICBjcm9zc292ZXJQcm9iYWJpbGl0eTogbnVtYmVyLFxuICAgIHBhcmVudHM6IElDaHJvbW9zb21lW11cbiAgKTogSUNocm9tb3NvbWVbXSB7XG4gICAgY29uc3QgbWluU2l6ZTogbnVtYmVyID0gcG9wdWxhdGlvbi5taW5TaXplO1xuICAgIGxldCBvZmZzcHJpbmc6IElDaHJvbW9zb21lW10gPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG1pblNpemU7IGkgKz0gY3Jvc3NvdmVyLnBhcmVudE51bWJlcikge1xuICAgICAgY29uc3Qgc2VsZWN0ZWRQYXJlbnRzID0gcGFyZW50cy5zbGljZSgyKS5zcGxpY2UoMCwgY3Jvc3NvdmVyLnBhcmVudE51bWJlcik7XG4gICAgICBpZiAoc2VsZWN0ZWRQYXJlbnRzLmxlbmd0aCA9PT0gY3Jvc3NvdmVyLnBhcmVudE51bWJlciAmJlxuICAgICAgICBSYW5kb21pemF0aW9uUHJvdmlkZXIuY3VycmVudC5nZXREb3VibGUoKSA8PSBjcm9zc292ZXJQcm9iYWJpbGl0eSkge1xuXG4gICAgICAgIGNvbnN0IGNyb3NzID0gY3Jvc3NvdmVyLmNyb3NzKHNlbGVjdGVkUGFyZW50cyk7XG5cbiAgICAgICAgb2Zmc3ByaW5nID0gb2Zmc3ByaW5nLmNvbmNhdChjcm9zcyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG9mZnNwcmluZztcbiAgfVxuICBtdXRhdGUoXG4gICAgbXV0YXRpb246IElNdXRhdGlvbixcbiAgICBtdXRhdGlvblByb2JhYmlsaXR5OiBudW1iZXIsXG4gICAgY2hyb21vc29tZXM6IElDaHJvbW9zb21lW11cbiAgKTogdm9pZCB7XG4gICAgZm9yIChjb25zdCBjaHJvbW9zb21lIG9mIGNocm9tb3NvbWVzKSB7XG4gICAgICBtdXRhdGlvbi5tdXRhdGUoY2hyb21vc29tZSwgbXV0YXRpb25Qcm9iYWJpbGl0eSk7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgSUNocm9tb3NvbWUgZnJvbSBcIi4vY2hyb21vc29tZS9JQ2hyb21vc29tZVwiO1xuaW1wb3J0IElDcm9zc292ZXIgZnJvbSBcIi4vY3Jvc3NvdmVycy9JQ3Jvc3NvdmVyXCI7XG5pbXBvcnQgRGVmYXVsdE9wZXJhdGlvblN0cmF0ZWd5IGZyb20gXCIuL0RlZmF1bHRPcGVyYXRpb25TdHJhdGVneVwiO1xuaW1wb3J0IElGaXRuZXNzIGZyb20gXCIuL2ZpdG5lc3Nlcy9JRml0bmVzc1wiO1xuaW1wb3J0IElHZW5ldGljQWxnb3JpdGhtIGZyb20gXCIuL0lHZW5ldGljQWxnb3JpdGhtXCI7XG5pbXBvcnQgSU9wZXJhdGlvblN0cmF0ZWd5IGZyb20gXCIuL0lPcGVyYXRpb25TdHJhdGVneVwiO1xuaW1wb3J0IElNdXRhdGlvbiBmcm9tIFwiLi9tdXRhdGlvbnMvSU11dGF0aW9uXCI7XG5pbXBvcnQgSVBvcHVsYXRpb24gZnJvbSBcIi4vcG9wdWxhdGlvbnMvSVBvcHVsYXRpb25cIjtcbmltcG9ydCBQb3B1bGF0aW9uIGZyb20gXCIuL3BvcHVsYXRpb25zL1BvcHVsYXRpb25cIjtcbmltcG9ydCB7IElSZWluc2VydGlvbiB9IGZyb20gXCIuL3JlaW5zZXJ0aW9uL0lSZWluc2VydGlvblwiO1xuaW1wb3J0IElTZWxlY3Rpb24gZnJvbSBcIi4vc2VsZWN0aW9ucy9JU2VsZWN0aW9uXCI7XG5pbXBvcnQgR2VuZXJhdGlvbk51bWJlclRlcm1pbmF0aW9uIGZyb20gXCIuL3Rlcm1pbmF0aW9ucy9HZW5lcmF0aW9uTnVtYmVyVGVybWluYXRpb25cIjtcbmltcG9ydCBJVGVybWluYXRpb24gZnJvbSBcIi4vdGVybWluYXRpb25zL0lUZXJtaW5hdGlvblwiO1xuXG5lbnVtIEdlbmV0aWNBbGdvcml0aG1TdGF0ZSB7XG4gIE5vdFN0YXJ0ZWQsXG4gIFN0YXJ0ZWQsXG4gIFN0b3BwZWQsXG4gIFJlc3VtZWQsXG4gIFRlcm1pbmF0aW9uUmVhY2hlZCxcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2VuZXRpY0FsZ29yaXRobSBpbXBsZW1lbnRzIElHZW5ldGljQWxnb3JpdGhtIHtcbiAgYmVzdENocm9tb3NvbWU6IElDaHJvbW9zb21lO1xuICBjcm9zc092ZXI6IElDcm9zc292ZXI7XG5cbiAgZGVmYXVsdENyb3NzT3ZlclByb2JhYmlsaXR5OiBudW1iZXIgPSAwLjc1O1xuICBkZWZhdWx0TXV0YXRpb25Qcm9iYWJpbGl0eTogbnVtYmVyID0gMC4zO1xuICBmaXRuZXNzOiBJRml0bmVzcztcbiAgZ2VuZXJhdGlvbnNOdW1iZXI6IG51bWJlcjtcbiAgbXV0YXRpb246IElNdXRhdGlvbjtcbiAgb3BlcmF0b3JTdHJhdGVneTogSU9wZXJhdGlvblN0cmF0ZWd5O1xuICBwb3B1bGF0aW9uOiBJUG9wdWxhdGlvbjtcbiAgcmVpbnNlcnRpb246IElSZWluc2VydGlvbjtcbiAgc2VsZWN0aW9uOiBJU2VsZWN0aW9uO1xuICB0ZXJtaW5hdGlvbjogSVRlcm1pbmF0aW9uO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHBvcHVsYXRpb246IElQb3B1bGF0aW9uLFxuICAgIGZpdG5lc3M6IElGaXRuZXNzLFxuICAgIHNlbGVjdGlvbjogSVNlbGVjdGlvbixcbiAgICBjcm9zc092ZXI6IElDcm9zc292ZXIsXG4gICAgbXV0YXRpb246IElNdXRhdGlvbixcbiAgICByZWluc2VydGlvbjogSVJlaW5zZXJ0aW9uXG4gICkge1xuICAgIHRoaXMuc2VsZWN0aW9uID0gc2VsZWN0aW9uO1xuICAgIHRoaXMucG9wdWxhdGlvbiA9IHBvcHVsYXRpb247XG4gICAgdGhpcy5maXRuZXNzID0gZml0bmVzcztcbiAgICB0aGlzLmNyb3NzT3ZlciA9IGNyb3NzT3ZlcjtcbiAgICB0aGlzLm11dGF0aW9uID0gbXV0YXRpb247XG4gICAgdGhpcy50ZXJtaW5hdGlvbiA9IG5ldyBHZW5lcmF0aW9uTnVtYmVyVGVybWluYXRpb24oMTAwKTtcbiAgICB0aGlzLm9wZXJhdG9yU3RyYXRlZ3kgPSBuZXcgRGVmYXVsdE9wZXJhdGlvblN0cmF0ZWd5KCk7XG4gICAgdGhpcy5yZWluc2VydGlvbiA9IHJlaW5zZXJ0aW9uO1xuICB9XG5cbiAgY2xvbmUoKSB7XG4gICAgcmV0dXJuIG5ldyBHZW5ldGljQWxnb3JpdGhtKFxuICAgICAgbmV3IFBvcHVsYXRpb24oXG4gICAgICAgIHRoaXMucG9wdWxhdGlvbi5taW5TaXplLFxuICAgICAgICB0aGlzLnBvcHVsYXRpb24ubWF4U2l6ZSxcbiAgICAgICAgdGhpcy5wb3B1bGF0aW9uLmJlc3RDaHJvbW9zb21lXG4gICAgICApLFxuICAgICAgdGhpcy5maXRuZXNzLFxuICAgICAgdGhpcy5zZWxlY3Rpb24sXG4gICAgICB0aGlzLmNyb3NzT3ZlcixcbiAgICAgIHRoaXMubXV0YXRpb24sXG4gICAgICB0aGlzLnJlaW5zZXJ0aW9uXG4gICAgKTtcbiAgfVxuXG4gIHB1YmxpYyBldm9sdmVPbmVHZW5lcmF0aW9uKCk6IGJvb2xlYW4ge1xuICAgIHRoaXMuZXZhbHVhdGVGaXRuZXNzKCk7XG4gICAgY29uc3QgcGFyZW50cyA9IHRoaXMuc2VsZWN0UGFyZW50cygpO1xuICAgIGNvbnN0IG9mZnNwcmluZyA9IHRoaXMuY3Jvc3MocGFyZW50cyk7XG4gICAgdGhpcy5tdXRhdGUob2Zmc3ByaW5nKTtcbiAgICBjb25zdCBuZXdHZW5lcmF0aW9uQ2hyb21vc29tZSA9IHRoaXMucmVpbnNlcnQob2Zmc3ByaW5nLCBwYXJlbnRzKTtcbiAgICB0aGlzLnBvcHVsYXRpb24uY3JlYXRlTmV3R2VuZXJhdGlvbihuZXdHZW5lcmF0aW9uQ2hyb21vc29tZSk7XG5cbiAgICByZXR1cm4gdGhpcy5lbmRDdXJyZW50R2VuZXJhdGlvbigpO1xuICB9XG5cbiAgcHVibGljIHN0YXJ0ID0gKGdlbmVyYXRpb25zOiBudW1iZXIpOiBJQ2hyb21vc29tZVtdID0+IHtcbiAgICBjb25zdCBiZXN0Q2hyb21vc29tZUFycmF5ID0gW107XG4gICAgaWYgKHRoaXMudGVybWluYXRpb24uaGFzUmVhY2hlZCh0aGlzKSA9PT0gZmFsc2UpIHtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgZ2VuZXJhdGlvbnM7IGorKykge1xuICAgICAgICB0aGlzLmV2b2x2ZU9uZUdlbmVyYXRpb24oKTtcbiAgICAgICAgYmVzdENocm9tb3NvbWVBcnJheS5wdXNoKHRoaXMuYmVzdENocm9tb3NvbWUpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gYmVzdENocm9tb3NvbWVBcnJheTtcbiAgfTtcblxuICBwcml2YXRlIGNyb3NzKHBhcmVudHM6IElDaHJvbW9zb21lW10pOiBJQ2hyb21vc29tZVtdIHtcbiAgICByZXR1cm4gdGhpcy5vcGVyYXRvclN0cmF0ZWd5LmNyb3NzKFxuICAgICAgdGhpcy5wb3B1bGF0aW9uLFxuICAgICAgdGhpcy5jcm9zc092ZXIsXG4gICAgICB0aGlzLmRlZmF1bHRDcm9zc092ZXJQcm9iYWJpbGl0eSxcbiAgICAgIHBhcmVudHNcbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBlbmRDdXJyZW50R2VuZXJhdGlvbigpOiBib29sZWFuIHtcbiAgICB0aGlzLmV2YWx1YXRlRml0bmVzcygpO1xuICAgIHRoaXMucG9wdWxhdGlvbi5lbmRDdXJyZW50R2VuZXJhdGlvbigpO1xuICAgIHRoaXMuYmVzdENocm9tb3NvbWUgPSB0aGlzLnBvcHVsYXRpb24uYmVzdENocm9tb3NvbWU7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBwcml2YXRlIGV2YWx1YXRlRml0bmVzcygpOiB2b2lkIHtcbiAgICAvLyBUaGUgZXZhbHVhdGUgZml0bmVzcyBuZWVkcyB0byBiZSBkb25lIHVzaW5nIGFzeW5jXG4gICAgY29uc3QgY2hyb21vc29tZXMgPSB0aGlzLnBvcHVsYXRpb24uY3VycmVudEdlbmVyYXRpb24uY2hyb21vc29tZXM7XG4gICAgZm9yIChjb25zdCBjaHJvbW9zb21lIG9mIGNocm9tb3NvbWVzKSB7XG4gICAgICBjb25zdCBlbGVtZW50ID0gY2hyb21vc29tZTtcbiAgICAgIC8vIGNvbnN0IGZpdG5lc3MgPSB0aGlzLmZpdG5lc3MuZXZhbHVhdGUoZWxlbWVudCk7XG4gICAgICBjb25zdCBmaXRuZXNzID0gdGhpcy5maXRuZXNzTWFwKGVsZW1lbnQpO1xuICAgICAgZWxlbWVudC5maXRuZXNzID0gZml0bmVzcztcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGZpdG5lc3NNYXAgPSAoY2hyb21vc29tZTogSUNocm9tb3NvbWUpOiBudW1iZXIgPT4ge1xuICAgIGNvbnN0IGhtOiBNYXA8SUNocm9tb3NvbWUsIG51bWJlcj4gPSBuZXcgTWFwKCk7XG4gICAgaWYgKGhtLmdldChjaHJvbW9zb21lKSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAvLyBjb25zdCBmaXRuZXNzID0gZml0bmVzc0Z1bmN0aW9uKGNocm9tb3NvbWUpO1xuICAgICAgY29uc3QgZml0bmVzcyA9IHRoaXMuZml0bmVzcy5ldmFsdWF0ZShjaHJvbW9zb21lKTtcbiAgICAgIGhtLnNldChjaHJvbW9zb21lLCBmaXRuZXNzKTtcbiAgICAgIHJldHVybiBmaXRuZXNzO1xuICAgIH1cbiAgICByZXR1cm4gaG0uZ2V0KGNocm9tb3NvbWUpO1xuICB9O1xuXG4gIHByaXZhdGUgbXV0YXRlKGNocm9tb3NvbWVzOiBJQ2hyb21vc29tZVtdKTogdm9pZCB7XG4gICAgdGhpcy5vcGVyYXRvclN0cmF0ZWd5Lm11dGF0ZShcbiAgICAgIHRoaXMubXV0YXRpb24sXG4gICAgICB0aGlzLmRlZmF1bHRNdXRhdGlvblByb2JhYmlsaXR5LFxuICAgICAgY2hyb21vc29tZXNcbiAgICApO1xuICB9XG5cbiAgLy8gaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvNDAzMjg5MzIvamF2YXNjcmlwdC1lczYtcHJvbWlzZS1mb3ItbG9vcFxuICAvLyBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8zMTQyNjc0MC9ob3ctdG8tcmV0dXJuLW1hbnktcHJvbWlzZXMtYW5kLXdhaXQtZm9yLXRoZW0tYWxsLWJlZm9yZS1kb2luZy1vdGhlci1zdHVmZlxuICBwcml2YXRlIHByb21pc2VBcnIgPSAodG90YWxJc2xhbmQ6IG51bWJlcik6IHZvaWQgPT4ge1xuICAgIGNvbnN0IHByb21BcnIgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRvdGFsSXNsYW5kOyBpKyspIHtcbiAgICAgIGNvbnN0IGV2b2x2ZU9uZUdlbmVyYXRpb25Bc3luYyA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgcmV0dXJuIHJlc29sdmUodGhpcy5ldm9sdmVPbmVHZW5lcmF0aW9uKCkpO1xuICAgICAgfSk7XG4gICAgICBwcm9tQXJyLnB1c2goZXZvbHZlT25lR2VuZXJhdGlvbkFzeW5jKTtcbiAgICB9XG5cbiAgICBQcm9taXNlLmFsbChwcm9tQXJyKS50aGVuKCh2YWx1ZXMpID0+IHtcbiAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMuYmVzdENocm9tb3NvbWUudG9TdHJpbmcoKSk7XG4gICAgfSk7XG4gIH07XG5cbiAgcHJpdmF0ZSByZWluc2VydChvZmZzcHJpbmc6IElDaHJvbW9zb21lW10sIHBhcmVudHM6IElDaHJvbW9zb21lW10pIHtcbiAgICByZXR1cm4gdGhpcy5yZWluc2VydGlvbi5zZWxlY3RDaHJvbW9zb21lKHRoaXMucG9wdWxhdGlvbiwgb2Zmc3ByaW5nLCBwYXJlbnRzKTtcbiAgfVxuXG4gIHByaXZhdGUgc2VsZWN0UGFyZW50cygpOiBJQ2hyb21vc29tZVtdIHtcbiAgICByZXR1cm4gdGhpcy5zZWxlY3Rpb24uc2VsZWN0Q2hyb21vc29tZXMoXG4gICAgICB0aGlzLnBvcHVsYXRpb24ubWluU2l6ZSxcbiAgICAgIHRoaXMucG9wdWxhdGlvbi5jdXJyZW50R2VuZXJhdGlvblxuICAgICk7XG4gIH1cbn1cbiIsImltcG9ydCB7IElCaW5hcnlDaHJvbW9zb21lIH0gZnJvbSBcIi4vSUJpbmFyeUNocm9tb3NvbWVcIjtcbmltcG9ydCBDaHJvbW9zb21lQmFzZSBmcm9tIFwiLi9DaHJvbW9zb21lQmFzZVwiO1xuaW1wb3J0IEdlbmUgZnJvbSBcIi4vR2VuZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBhYnN0cmFjdCBjbGFzcyBCaW5hcnlDaHJvbW9zb21lQmFzZSBleHRlbmRzIENocm9tb3NvbWVCYXNlXG4gIGltcGxlbWVudHMgSUJpbmFyeUNocm9tb3NvbWUge1xuICBjb25zdHJ1Y3RvcihsZW5ndGg6IG51bWJlcikge1xuICAgIHN1cGVyKGxlbmd0aCk7XG4gIH1cblxuICBmbGlwR2VuZShpbmRleDogbnVtYmVyKTogdm9pZCB7XG4gICAgY29uc3QgdmFsdWUgPSB0aGlzLmdldEdlbmUoaW5kZXgpO1xuICAgIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkKSB0aHJvdyBuZXcgRXJyb3IoXCJCaW5hcnlDaHJvbW9zb21lQmFzZSAtIENhbm5vdCBGbGlwIGEgZ2VuZSB3aGljaCBpcyB1bmRlZmluZWRcIik7XG4gICAgdGhpcy5yZXBsYWNlR2VuZShpbmRleCwgbmV3IEdlbmUodmFsdWUubVZhbHVlID09PSAwID8gMSA6IDApKTtcbiAgfVxuXG4gIHRvU3RyaW5nKCkge1xuICAgIGNvbnN0IHN0ciA9IHRoaXMuZ2V0R2VuZXMoKS50b1N0cmluZygpO1xuICAgIHJldHVybiBzdHI7XG4gIH1cbn1cbiIsImltcG9ydCBHZW5lIGZyb20gXCIuL0dlbmVcIjtcbmltcG9ydCBJQ2hyb21vc29tZSBmcm9tIFwiLi9JQ2hyb21vc29tZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBhYnN0cmFjdCBjbGFzcyBDaHJvbW9zb21lQmFzZSBpbXBsZW1lbnRzIElDaHJvbW9zb21lIHtcblxuICBwcm90ZWN0ZWQgY29uc3RydWN0b3IobGVuZ3RoOiBudW1iZXIpIHtcbiAgICB0aGlzLnZhbGlkYXRlTGVuZ3RoKGxlbmd0aCk7XG4gICAgdGhpcy5sZW5ndGggPSBsZW5ndGg7XG4gICAgdGhpcy5nZW5lcyA9IFtdO1xuICB9XG4gIHB1YmxpYyBmaXRuZXNzPzogbnVtYmVyO1xuICBwdWJsaWMgZ2VuZXM6IEdlbmVbXTtcbiAgcHVibGljIGxlbmd0aDogbnVtYmVyO1xuXG4gIC8vIGNsb25lKCk6IElDaHJvbW9zb21lIHtcbiAgLy8gICB0aHJvdyBuZXcgRXJyb3IoXCJNZXRob2Qgbm90IGltcGxlbWVudGVkLlwiKTtcbiAgLy8gfVxuXG4gIGFic3RyYWN0IGNyZWF0ZU5ldygpOiBJQ2hyb21vc29tZTtcbiAgYWJzdHJhY3QgZ2VuZXJhdGVHZW5lKGdlbmVJbmRleDogbnVtYmVyKTogR2VuZTtcbiAgZ2V0R2VuZShpbmRleDogbnVtYmVyKTogR2VuZSB7XG4gICAgcmV0dXJuIHRoaXMuZ2VuZXNbaW5kZXhdO1xuICB9XG5cbiAgZ2V0R2VuZXMoKTogR2VuZVtdIHtcbiAgICByZXR1cm4gdGhpcy5nZW5lcztcbiAgfVxuXG4gIHJlcGxhY2VHZW5lKGluZGV4OiBudW1iZXIsIGdlbmU6IEdlbmUpOiB2b2lkIHtcbiAgICBpZiAoaW5kZXggPCAwIHx8IGluZGV4ID4gdGhpcy5sZW5ndGgpIHtcbiAgICAgIHRocm93IEVycm9yKFxuICAgICAgICBcIkNocm9tb3NvbWVCYXNlIC0gSW5kZXggY2Fubm90IGJlIGxlc3MgdGhhbiAwIGFuZCBtb3JlIHRoYW4gdGhlIGxlbmd0aC4gXCIgK1xuICAgICAgICBpbmRleFxuICAgICAgKTtcbiAgICB9XG5cbiAgICB0aGlzLmdlbmVzW2luZGV4XSA9IGdlbmU7XG4gICAgdGhpcy5maXRuZXNzID0gbnVsbDtcbiAgfVxuXG4gIHJlcGxhY2VHZW5lcyhzdGFydEluZGV4OiBudW1iZXIsIGdlbmVzOiBHZW5lW10pOiB2b2lkIHtcblxuICAgIGlmIChzdGFydEluZGV4IDwgMClcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIlN0YXJ0IEluZGV4IGNhbm5vdCBiZSBsZXNzIHRoYW4gMFwiKTtcblxuICAgIGNvbnN0IGdlbmVzVG9CZVJlcGxhY2VkTGVuZ3RoID0gZ2VuZXMubGVuZ3RoO1xuXG4gICAgY29uc3QgYXZhaWxhYmxlU3BhY2VMZW5ndGggPSB0aGlzLmxlbmd0aCAtIHN0YXJ0SW5kZXg7XG5cbiAgICBpZiAoYXZhaWxhYmxlU3BhY2VMZW5ndGggPCBnZW5lc1RvQmVSZXBsYWNlZExlbmd0aClcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkNocm9tb3NvbWVCYXNlIC0gTm90IGVub3VnaCBzcGFjZSB0byByZXBsYWNlIGdlbmVzLlwiKTtcblxuICAgIGZvciAobGV0IGkgPSBzdGFydEluZGV4OyBpIDwgZ2VuZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHRoaXMucmVwbGFjZUdlbmUoaSwgZ2VuZXNbaV0pO1xuICAgIH1cbiAgfVxuICByZXNpemUobmV3TGVuZ3RoOiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLnZhbGlkYXRlTGVuZ3RoKG5ld0xlbmd0aCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgY3JlYXRlR2VuZXMoKTogdm9pZCB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB0aGlzLnJlcGxhY2VHZW5lKGksIHRoaXMuZ2VuZXJhdGVHZW5lKGkpKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHZhbGlkYXRlTGVuZ3RoKGxlbmd0aDogbnVtYmVyKSB7XG4gICAgaWYgKGxlbmd0aCA8IDIpIHtcbiAgICAgIHRocm93IEVycm9yKFwiRXJyb3IgLSBUaGUgbWluaW11bSBsZW5ndGggZm9yIGEgY2hyb21vc29tZSBpcyAyIGdlbmVzXCIpO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IElDaHJvbW9zb21lIGZyb20gXCIuL0lDaHJvbW9zb21lXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENocm9tb3NvbWVFeHRlbnNpb24ge1xuICBzdGF0aWMgYW55SGFzUmVwZWF0ZWRHZW5lKGNocm9tb3NvbWVzOiBJQ2hyb21vc29tZVtdKTogYm9vbGVhbiB7XG4gICAgZm9yIChjb25zdCBjaHJvbW9zb21lIG9mIGNocm9tb3NvbWVzKSB7XG4gICAgICBjb25zdCBjID0gY2hyb21vc29tZTtcbiAgICAgIC8vIGh0dHBzOi8vY29kZWJ1cnN0LmlvL2phdmFzY3JpcHQtYXJyYXktZGlzdGluY3QtNWVkYzkzNTAxZGM0XG4gICAgICBjb25zdCBnZW5lcyA9IFtdO1xuICAgICAgYy5nZXRHZW5lcygpLmZvckVhY2goKHMpID0+IGdlbmVzLnB1c2gocy5tVmFsdWUpKTtcblxuICAgICAgY29uc3Qgbm90UmVwZWF0ZWRHZW5lc0xlbmd0aCA9IFsuLi5uZXcgU2V0KGdlbmVzKV0ubGVuZ3RoO1xuICAgICAgaWYgKG5vdFJlcGVhdGVkR2VuZXNMZW5ndGggPCBjLmxlbmd0aCkgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHN0YXRpYyB2YWxpZGF0ZUdlbmVzKFxuICAgIGNocm9tb3NvbWU/OiBJQ2hyb21vc29tZSxcbiAgICBjaHJvbW9zb21lcz86IElDaHJvbW9zb21lW11cbiAgKTogYm9vbGVhbiB7XG5cbiAgICBpZiAoY2hyb21vc29tZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBpZiAoY2hyb21vc29tZS5nZXRHZW5lcygpID09PSB1bmRlZmluZWQpXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBpZiAoY2hyb21vc29tZXMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgZm9yIChjb25zdCBjaCBvZiBjaHJvbW9zb21lcykge1xuICAgICAgICBpZiAoY2guZ2V0R2VuZXMoKSA9PT0gdW5kZWZpbmVkKVxuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxufVxuIiwiaW1wb3J0IFJhbmRvbWl6YXRpb25Qcm92aWRlciBmcm9tIFwiLi4vcmFuZG9taXphdGlvbi9SYW5kb21pemF0aW9uUHJvdmlkZXJcIjtcbmltcG9ydCBDaHJvbW9zb21lQmFzZSBmcm9tIFwiLi9DaHJvbW9zb21lQmFzZVwiO1xuaW1wb3J0IEdlbmUgZnJvbSBcIi4vR2VuZVwiO1xuaW1wb3J0IElDaHJvbW9zb21lIGZyb20gXCIuL0lDaHJvbW9zb21lXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERlY2ltYWxDaHJvbW9zb21lIGV4dGVuZHMgQ2hyb21vc29tZUJhc2Uge1xuICBjb25zdHJ1Y3RvcihcbiAgICBsZW5ndGg6IG51bWJlcixcbiAgICBtaW5WYWx1ZT86IG51bWJlcixcbiAgICBtYXhWYWx1ZT86IG51bWJlcixcbiAgICB1bmlxdWU/OiBib29sZWFuLFxuICAgIHJhbmRvbVZhbHVlcz86IG51bWJlcltdXG4gICkge1xuICAgIHN1cGVyKGxlbmd0aCk7XG4gICAgdGhpcy5taW5WYWx1ZSA9IG1pblZhbHVlO1xuICAgIHRoaXMubWF4VmFsdWUgPSBtYXhWYWx1ZTtcbiAgICB1bmlxdWUgPT09IHVuZGVmaW5lZCA/ICh0aGlzLnVuaXF1ZSA9IGZhbHNlKSA6ICh0aGlzLnVuaXF1ZSA9IHRydWUpO1xuXG4gICAgaWYgKHJhbmRvbVZhbHVlcyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBpZiAodW5pcXVlID09PSB0cnVlKVxuICAgICAgICB0aGlzLnJhbmRvbVZhbHVlcyA9IFJhbmRvbWl6YXRpb25Qcm92aWRlci5jdXJyZW50LmdldFVuaXF1ZUludHMobGVuZ3RoLCBtaW5WYWx1ZSwgbWF4VmFsdWUpO1xuICAgICAgZWxzZVxuICAgICAgICB0aGlzLnJhbmRvbVZhbHVlcyA9IFJhbmRvbWl6YXRpb25Qcm92aWRlci5jdXJyZW50LmdldEludHMobGVuZ3RoLCBtaW5WYWx1ZSwgbWF4VmFsdWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnJhbmRvbVZhbHVlcyA9IHJhbmRvbVZhbHVlcztcbiAgICB9XG5cbiAgICB0aGlzLmNyZWF0ZUdlbmVzKCk7XG4gIH1cbiAgcHJpdmF0ZSBtYXhWYWx1ZTogbnVtYmVyO1xuICBwcml2YXRlIG1pblZhbHVlOiBudW1iZXI7XG4gIHByaXZhdGUgcmFuZG9tVmFsdWVzOiBudW1iZXJbXTtcbiAgcHJpdmF0ZSB1bmlxdWU6IGJvb2xlYW47XG5cbiAgLy8gY2xvbmUgPSAoKSA9PiB7XG4gIC8vICAgY29uc3QgY2xvbmUgPSBuZXcgRGVjaW1hbENocm9tb3NvbWUoXG4gIC8vICAgICB0aGlzLmxlbmd0aCxcbiAgLy8gICAgIHRoaXMubWluVmFsdWUsXG4gIC8vICAgICB0aGlzLm1heFZhbHVlLFxuICAvLyAgICAgdGhpcy51bmlxdWUsXG4gIC8vICAgICB0aGlzLnJhbmRvbVZhbHVlc1xuICAvLyAgICk7XG4gIC8vICAgcmV0dXJuIGNsb25lO1xuICAvLyB9O1xuXG4gIGNyZWF0ZU5ldygpOiBJQ2hyb21vc29tZSB7XG4gICAgcmV0dXJuIG5ldyBEZWNpbWFsQ2hyb21vc29tZSh0aGlzLmxlbmd0aCwgdGhpcy5taW5WYWx1ZSwgdGhpcy5tYXhWYWx1ZSk7XG4gIH1cbiAgZ2VuZXJhdGVHZW5lKGdlbmVJbmRleDogbnVtYmVyKTogR2VuZSB7XG4gICAgcmV0dXJuIG5ldyBHZW5lKHRoaXMucmFuZG9tVmFsdWVzW2dlbmVJbmRleF0pO1xuICB9XG59XG4iLCJpbXBvcnQgQmluYXJ5Q2hyb21vc29tZUJhc2UgZnJvbSBcIi4vQmluYXJ5Q2hyb21vc29tZUJhc2VcIjtcbmltcG9ydCBHZW5lIGZyb20gXCIuL0dlbmVcIjtcbmltcG9ydCBJQ2hyb21vc29tZSBmcm9tIFwiLi9JQ2hyb21vc29tZVwiO1xuXG4vKipcbiAqIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzM3MDg4MTk0L2lzLXRoZXJlLWFueS13YXktdG8tc2VlLWEtbnVtYmVyLWluLWl0cy02NC1iaXQtZmxvYXQtaWVlZTc1NC1yZXByZXNlbnRhdGlvblxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGbG9hdGluZ1BvaW50Q2hyb21vc29tZSBleHRlbmRzIEJpbmFyeUNocm9tb3NvbWVCYXNlIHtcblxuICBjb25zdHJ1Y3RvcihtVmFsdWU6IG51bWJlcikge1xuICAgIHN1cGVyKDMyKTtcbiAgICB0aGlzLm1WYWx1ZSA9IG1WYWx1ZTtcbiAgICBjb25zdCByZXN1bHQgPSB0aGlzLmNvbnZlcnRGbG9hdDMyVG9CaW4obVZhbHVlKTtcbiAgICB0aGlzLmJpbkFycmF5U3RyID0gcmVzdWx0LnNwbGl0KFwiXCIpO1xuXG4gICAgdGhpcy5jcmVhdGVHZW5lcygpO1xuICB9XG5cbiAgcHJpdmF0ZSBiaW5BcnJheVN0cjogc3RyaW5nW107XG4gIHByaXZhdGUgbVZhbHVlOiBudW1iZXI7XG5cbiAgY3JlYXRlTmV3KCk6IElDaHJvbW9zb21lIHtcbiAgICByZXR1cm4gbmV3IEZsb2F0aW5nUG9pbnRDaHJvbW9zb21lKHRoaXMubVZhbHVlKTtcbiAgfVxuXG4gIGdlbmVyYXRlR2VuZShnZW5lSW5kZXg6IG51bWJlcik6IEdlbmUge1xuICAgIHJldHVybiBuZXcgR2VuZShOdW1iZXIodGhpcy5iaW5BcnJheVN0cltnZW5lSW5kZXhdKSk7XG4gIH1cblxuICBwcml2YXRlIGNvbnZlcnRGbG9hdDMyVG9CaW4gPSAoZmxvYXQzMikgPT4ge1xuICAgIGNvbnN0IEhleFRvQmluID0gaGV4ID0+IChwYXJzZUludChoZXgsIDE2KS50b1N0cmluZygyKSkucGFkU3RhcnQoMzIsICcwJyk7XG4gICAgY29uc3QgZ2V0SGV4ID0gaSA9PiAoJzAwJyArIGkudG9TdHJpbmcoMTYpKS5zbGljZSgtMik7XG4gICAgY29uc3QgdmlldyA9IG5ldyBEYXRhVmlldyhuZXcgQXJyYXlCdWZmZXIoNCkpXG4gICAgdmlldy5zZXRGbG9hdDMyKDAsIGZsb2F0MzIpO1xuICAgIHJldHVybiBIZXhUb0JpbihBcnJheS5hcHBseShudWxsLCB7IGxlbmd0aDogNCB9KS5tYXAoKF8sIGkpID0+IGdldEhleCh2aWV3LmdldFVpbnQ4KGkpKSkuam9pbignJykpO1xuICB9XG59XG5cbmV4cG9ydCB7IEZsb2F0aW5nUG9pbnRDaHJvbW9zb21lIH07XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBHZW5lIHtcbiAgbVZhbHVlOiBhbnk7XG4gIGNvbnN0cnVjdG9yKHZhbHVlOiBhbnkpIHtcbiAgICB0aGlzLm1WYWx1ZSA9IHZhbHVlO1xuICB9XG5cbiAgZXF1YWxzKG90aGVyOiBHZW5lKTogYm9vbGVhbiB7XG4gICAgaWYgKG90aGVyID09IG51bGwpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIG90aGVyLm1WYWx1ZSA9PT0gdGhpcy5tVmFsdWU7XG4gIH1cbiAgZXF1YWxzT3BlcmF0b3IoZmlyc3Q6IEdlbmUsIHNlY29uZDogR2VuZSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBmaXJzdC5lcXVhbHMoc2Vjb25kKTtcbiAgfVxuXG4gIG5vdEVxdWFsc09wZXJhdG9yKGZpcnN0OiBHZW5lLCBzZWNvbmQ6IEdlbmUpOiBib29sZWFuIHtcbiAgICByZXR1cm4gIWZpcnN0LmVxdWFscyhzZWNvbmQpO1xuICB9XG5cbiAgdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuICh0aGlzLm1WYWx1ZSAhPSBudWxsID8gdGhpcy5tVmFsdWUgOiBcIlwiKS50b1N0cmluZygpO1xuICB9XG59XG4iLCJpbXBvcnQgQmluYXJ5Q2hyb21vc29tZUJhc2UgZnJvbSBcIi4vQmluYXJ5Q2hyb21vc29tZUJhc2VcIlxuaW1wb3J0IENocm9tb3NvbWVCYXNlIGZyb20gXCIuL0Nocm9tb3NvbWVCYXNlXCJcbmltcG9ydCBDaHJvbW9zb21lRXh0ZW5zaW9uIGZyb20gXCIuL0Nocm9tb3NvbWVFeHRlbnNpb25cIlxuaW1wb3J0IERlY2ltYWxDaHJvbW9zb21lIGZyb20gXCIuL0RlY2ltYWxDaHJvbW9zb21lXCJcbmltcG9ydCBGbG9hdGluZ1BvaW50Q2hyb21vc29tZSBmcm9tIFwiLi9GbG9hdGluZ1BvaW50Q2hyb21vc29tZVwiXG5pbXBvcnQgR2VuZSBmcm9tIFwiLi9HZW5lXCJcblxuZXhwb3J0IHsgQmluYXJ5Q2hyb21vc29tZUJhc2UsIENocm9tb3NvbWVCYXNlLCBDaHJvbW9zb21lRXh0ZW5zaW9uLCBEZWNpbWFsQ2hyb21vc29tZSwgRmxvYXRpbmdQb2ludENocm9tb3NvbWUsIEdlbmUgfSIsImltcG9ydCB7IFNTTF9PUF9QS0NTMV9DSEVDS18xIH0gZnJvbSBcImNvbnN0YW50c1wiO1xuaW1wb3J0IENocm9tb3NvbWVFeHRlbnNpb24gZnJvbSBcIi4uL2Nocm9tb3NvbWUvQ2hyb21vc29tZUV4dGVuc2lvblwiO1xuaW1wb3J0IERlY2ltYWxDaHJvbW9zb21lIGZyb20gXCIuLi9jaHJvbW9zb21lL0RlY2ltYWxDaHJvbW9zb21lXCI7XG5pbXBvcnQgR2VuZSBmcm9tIFwiLi4vY2hyb21vc29tZS9HZW5lXCI7XG5pbXBvcnQgSUNocm9tb3NvbWUgZnJvbSBcIi4uL2Nocm9tb3NvbWUvSUNocm9tb3NvbWVcIjtcbmltcG9ydCBDcm9zc292ZXJCYXNlIGZyb20gXCIuL0Nyb3Nzb3ZlckJhc2VcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQWx0ZXJuYXRpbmdQb2ludENyb3Nzb3ZlciBleHRlbmRzIENyb3Nzb3ZlckJhc2Uge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigyLCAyKTtcbiAgfVxuICBwZXJmb3JtQ3Jvc3MocGFyZW50czogSUNocm9tb3NvbWVbXSk6IElDaHJvbW9zb21lW10ge1xuXG4gICAgY29uc3QgcDEgPSBwYXJlbnRzWzBdO1xuICAgIGNvbnN0IHAyID0gcGFyZW50c1sxXTtcblxuICAgIGlmIChDaHJvbW9zb21lRXh0ZW5zaW9uLmFueUhhc1JlcGVhdGVkR2VuZShwYXJlbnRzKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQWx0ZXJuYXRpbmcgY3Jvc3Mgb3ZlciBoYXMgcmVwZWF0ZWRcIik7XG4gICAgfVxuXG5cbiAgICBjb25zdCBjaGlsZDEgPSB0aGlzLmNyZWF0ZUNoaWxkKHAxLCBwMik7XG4gICAgY29uc3QgY2hpbGQyID0gdGhpcy5jcmVhdGVDaGlsZChwMiwgcDEpO1xuXG4gICAgcmV0dXJuIFtjaGlsZDEsIGNoaWxkMl07XG4gIH1cblxuICBwcml2YXRlIGNyZWF0ZUNoaWxkKFxuICAgIGZpcnN0UGFyZW50OiBJQ2hyb21vc29tZSxcbiAgICBzZWNvbmRQYXJlbnQ6IElDaHJvbW9zb21lXG4gICk6IElDaHJvbW9zb21lIHtcbiAgICBjb25zdCBjaGlsZCA9IFtdO1xuICAgIGNvbnN0IGMgPSBuZXcgRGVjaW1hbENocm9tb3NvbWUoZmlyc3RQYXJlbnQubGVuZ3RoKTtcbiAgICBjb25zdCBwMSA9IFsuLi5maXJzdFBhcmVudC5nZXRHZW5lcygpXTtcbiAgICBjb25zdCBwMiA9IFsuLi5zZWNvbmRQYXJlbnQuZ2V0R2VuZXMoKV07XG4gICAgY29uc3QgcDFHZW5lcyA9IFtdO1xuICAgIGNvbnN0IHAyR2VuZXMgPSBbXTtcbiAgICBwMS5mb3JFYWNoKChlbGVtZW50KSA9PiBwMUdlbmVzLnB1c2goZWxlbWVudC5tVmFsdWUpKTtcbiAgICBwMi5mb3JFYWNoKChlbGVtZW50KSA9PiBwMkdlbmVzLnB1c2goZWxlbWVudC5tVmFsdWUpKTtcblxuICAgIGNvbnN0IGxlbmd0aCA9IHAxLmxlbmd0aDtcbiAgICB3aGlsZSAoY2hpbGQubGVuZ3RoIDwgbGVuZ3RoKSB7XG4gICAgICAhY2hpbGQuaW5jbHVkZXMocDFHZW5lc1swXSlcbiAgICAgICAgPyBjaGlsZC5wdXNoKHAxR2VuZXMuc2hpZnQoKSlcbiAgICAgICAgOiBwMUdlbmVzLnNoaWZ0KCk7XG4gICAgICAhY2hpbGQuaW5jbHVkZXMocDJHZW5lc1swXSlcbiAgICAgICAgPyBjaGlsZC5wdXNoKHAyR2VuZXMuc2hpZnQoKSlcbiAgICAgICAgOiBwMkdlbmVzLnNoaWZ0KCk7XG4gICAgfVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZmlyc3RQYXJlbnQubGVuZ3RoOyBpKyspXG4gICAgICBjLnJlcGxhY2VHZW5lKGksIG5ldyBHZW5lKGNoaWxkW2ldKSk7XG5cbiAgICByZXR1cm4gYztcbiAgfVxufVxuIiwiaW1wb3J0IFJhbmRvbWl6YXRpb25Qcm92aWRlciBmcm9tIFwiLi4vcmFuZG9taXphdGlvbi9SYW5kb21pemF0aW9uUHJvdmlkZXJcIjtcblxuLy8gaHR0cHM6Ly93d3cucmVzZWFyY2hnYXRlLm5ldC9maWd1cmUvQW4tZXhhbXBsZS1vZi1vcmRlci1jcm9zc292ZXJfZmlnNF8yODI5OTg5NTFcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENyb3NzT3ZlclV0aWwge1xuICBzdGF0aWMgb3JkZXJlZENyb3Nzb3ZlciA9IChcbiAgICBwYXJlbnRPbmU6IGFueVtdLFxuICAgIHBhcmVudFR3bzogYW55W10sXG4gICAgcG9zMT8sXG4gICAgcG9zMj9cbiAgKTogYW55W10gPT4ge1xuICAgIGNvbnN0IHBhcmVudE9uZUNsb25lID0gWy4uLnBhcmVudE9uZV07XG4gICAgbGV0IHBhcmVudFR3b0Nsb25lID0gWy4uLnBhcmVudFR3b107XG4gICAgY29uc3QgbGVuZ3RoID0gcGFyZW50T25lLmxlbmd0aDtcbiAgICBjb25zdCByYW5kb20gPSBSYW5kb21pemF0aW9uUHJvdmlkZXIuY3VycmVudFxuICAgICAgLmdldFVuaXF1ZUludHMoMiwgMCwgbGVuZ3RoKVxuICAgICAgLnNvcnQoKGEsIGIpID0+IGEgLSBiKTtcblxuICAgIGlmIChwb3MxID09PSB1bmRlZmluZWQpIHBvczEgPSByYW5kb21bMF07XG4gICAgaWYgKHBvczIgPT09IHVuZGVmaW5lZCkgcG9zMiA9IHJhbmRvbVsxXTtcblxuICAgIGNvbnN0IGNoaWxkID0gW107XG4gICAgY29uc3QgbWFya2VkT3V0ID0gW107XG4gICAgZm9yIChsZXQgaSA9IHBvczE7IGkgPCBwb3MyOyBpKyspIHtcbiAgICAgIG1hcmtlZE91dC5wdXNoKHBhcmVudE9uZUNsb25lW2ldKTtcbiAgICAgIGNoaWxkW2ldID0gcGFyZW50T25lQ2xvbmVbaV07XG4gICAgfVxuXG4gICAgcGFyZW50VHdvQ2xvbmUgPSBwYXJlbnRUd29DbG9uZS5maWx0ZXIoKHZhbCkgPT4gIW1hcmtlZE91dC5pbmNsdWRlcyh2YWwpKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBvczE7IGkrKykgY2hpbGRbaV0gPSBwYXJlbnRUd29DbG9uZS5zaGlmdCgpO1xuICAgIGZvciAobGV0IGkgPSBwb3MyOyBpIDwgbGVuZ3RoOyBpKyspIGNoaWxkW2ldID0gcGFyZW50VHdvQ2xvbmUuc2hpZnQoKTtcblxuICAgIHJldHVybiBjaGlsZDtcbiAgfTtcblxuICBzdGF0aWMgcG14Q3Jvc3NPdmVyID0ge1xuXG4gIH1cbn1cbiIsImltcG9ydCBJQ2hyb21vc29tZSBmcm9tIFwiLi4vY2hyb21vc29tZS9JQ2hyb21vc29tZVwiO1xuaW1wb3J0IElDcm9zc292ZXIgZnJvbSBcIi4vSUNyb3Nzb3ZlclwiO1xuXG5leHBvcnQgZGVmYXVsdCBhYnN0cmFjdCBjbGFzcyBDcm9zc292ZXJCYXNlIGltcGxlbWVudHMgSUNyb3Nzb3ZlciB7XG4gIHB1YmxpYyBjaGlsZHJlbk51bWJlcjogbnVtYmVyO1xuXG4gIGlzT3JkZXJlZDogYm9vbGVhbjtcbiAgcHVibGljIG1pbkNocm9tb3NvbWVMZW5ndGg6IG51bWJlcjtcbiAgcHVibGljIHBhcmVudE51bWJlcjogbnVtYmVyO1xuICBjb25zdHJ1Y3RvcihcbiAgICBwYXJlbnRzTnVtYmVyOiBudW1iZXIsXG4gICAgY2hpbGRyZW5OdW1iZXI6IG51bWJlcixcbiAgICBtaW5DaHJvbW9zb21lTGVuZ3RoPzogbnVtYmVyXG4gICkge1xuICAgIHRoaXMucGFyZW50TnVtYmVyID0gcGFyZW50c051bWJlcjtcbiAgICB0aGlzLmNoaWxkcmVuTnVtYmVyID0gY2hpbGRyZW5OdW1iZXI7XG4gICAgdGhpcy5taW5DaHJvbW9zb21lTGVuZ3RoID0gbWluQ2hyb21vc29tZUxlbmd0aDtcbiAgfVxuXG4gIGNyb3NzKHBhcmVudHM6IElDaHJvbW9zb21lW10pOiBJQ2hyb21vc29tZVtdIHtcbiAgICBpZiAocGFyZW50cyA9PSBudWxsKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiRXJyb3IgLSBDcm9zc092ZXJiYXNlOiBOdW1iZXIgb2YgcGFyZW50cyBjYW5ub3QgYmUgbnVsbC5cIik7XG4gICAgY29uc3QgZmlyc3RQYXJlbnQgPSBwYXJlbnRzWzBdO1xuXG4gICAgaWYgKGZpcnN0UGFyZW50Lmxlbmd0aCA8IHRoaXMubWluQ2hyb21vc29tZUxlbmd0aCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiRXJyb3I6IEEgY2hyb21vc29tZSBzaG91bGQgaGF2ZSBhdCBsZWFzdCAwIGdlbmVzXCIpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5wZXJmb3JtQ3Jvc3MocGFyZW50cyk7XG4gIH1cblxuICBhYnN0cmFjdCBwZXJmb3JtQ3Jvc3MocGFyZW50czogSUNocm9tb3NvbWVbXSk6IElDaHJvbW9zb21lW107XG59XG4iLCJpbXBvcnQgSUNocm9tb3NvbWUgZnJvbSBcIi4uL2Nocm9tb3NvbWUvSUNocm9tb3NvbWVcIjtcbmltcG9ydCBSYW5kb21pemF0aW9uUHJvdmlkZXIgZnJvbSBcIi4uL3JhbmRvbWl6YXRpb24vUmFuZG9taXphdGlvblByb3ZpZGVyXCI7XG5pbXBvcnQgQ3Jvc3NvdmVyQmFzZSBmcm9tIFwiLi9Dcm9zc292ZXJCYXNlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE9uZVBvaW50Q3Jvc3NPdmVyIGV4dGVuZHMgQ3Jvc3NvdmVyQmFzZSB7XG5cbiAgICBjb25zdHJ1Y3Rvcihzd2FwUG9pbnRJbmRleD86IG51bWJlcikge1xuICAgICAgICBzdXBlcigyLCAyKTtcblxuICAgICAgICBpZiAoc3dhcFBvaW50SW5kZXggIT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIHRoaXMuc3dhcFBvaW50SW5kZXggPSBzd2FwUG9pbnRJbmRleDtcbiAgICB9XG5cbiAgICBwcml2YXRlIHN3YXBQb2ludEluZGV4OiBudW1iZXI7XG5cbiAgICBwZXJmb3JtQ3Jvc3MocGFyZW50czogSUNocm9tb3NvbWVbXSk6IElDaHJvbW9zb21lW10ge1xuICAgICAgICBjb25zdCBmaXJzdFBhcmVudCA9IHBhcmVudHNbMF07XG4gICAgICAgIGNvbnN0IHNlY29uZFBhcmVudCA9IHBhcmVudHNbMV07XG5cbiAgICAgICAgY29uc3Qgc3dhcFBvaW50c0xlbmd0aCA9IGZpcnN0UGFyZW50LmdldEdlbmVzKCkubGVuZ3RoIC0gMTtcblxuICAgICAgICBpZiAodGhpcy5zd2FwUG9pbnRJbmRleCA9PT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgdGhpcy5zd2FwUG9pbnRJbmRleCA9IFJhbmRvbWl6YXRpb25Qcm92aWRlci5jdXJyZW50LmdldEludCgwLCBmaXJzdFBhcmVudC5nZXRHZW5lcygpLmxlbmd0aCAtIDEpO1xuXG4gICAgICAgIGlmICh0aGlzLnN3YXBQb2ludEluZGV4ID49IHN3YXBQb2ludHNMZW5ndGgpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlN3YXBQb2ludEluZGV4IC0gVGhlIHN3YXAgcG9pbnQgaW5kZXguXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlQ2hpbGRyZW4oZmlyc3RQYXJlbnQsIHNlY29uZFBhcmVudCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjcmVhdGVDaGlsZChsZWZ0UGFyZW50OiBJQ2hyb21vc29tZSwgcmlnaHRQYXJlbnQ6IElDaHJvbW9zb21lKSB7XG4gICAgICAgIGNvbnN0IGN1dEdlbmVDb3VudCA9IHRoaXMuc3dhcFBvaW50SW5kZXggKyAxO1xuICAgICAgICBjb25zdCBjaGlsZCA9IGxlZnRQYXJlbnQuY3JlYXRlTmV3KCk7XG4gICAgICAgIGNvbnN0IGxlZnQgPSBsZWZ0UGFyZW50LmdldEdlbmVzKCkuc2xpY2UoMCwgY3V0R2VuZUNvdW50KTtcbiAgICAgICAgY29uc3QgcmlnaHQgPSByaWdodFBhcmVudC5nZXRHZW5lcygpLnNsaWNlKGN1dEdlbmVDb3VudCwgcmlnaHRQYXJlbnQuZ2V0R2VuZXMoKS5sZW5ndGggLSAxKTtcbiAgICAgICAgY29uc3QgY29tYmluZWQgPSBsZWZ0LmNvbmNhdChyaWdodCk7XG4gICAgICAgIGNoaWxkLnJlcGxhY2VHZW5lcygwLCBjb21iaW5lZCk7XG5cbiAgICAgICAgcmV0dXJuIGNoaWxkO1xuICAgIH1cblxuICAgIHByaXZhdGUgY3JlYXRlQ2hpbGRyZW4oZmlyc3RQYXJlbnQ6IElDaHJvbW9zb21lLCBzZWNvbmRQYXJlbnQ6IElDaHJvbW9zb21lKTogSUNocm9tb3NvbWVbXSB7XG4gICAgICAgIGNvbnN0IGZpcnN0Q2hpbGQgPSB0aGlzLmNyZWF0ZUNoaWxkKGZpcnN0UGFyZW50LCBzZWNvbmRQYXJlbnQpO1xuICAgICAgICBjb25zdCBzZWNvbmRDaGlsZCA9IHRoaXMuY3JlYXRlQ2hpbGQoc2Vjb25kUGFyZW50LCBmaXJzdFBhcmVudCk7XG4gICAgICAgIHJldHVybiBbZmlyc3RDaGlsZCwgc2Vjb25kQ2hpbGRdO1xuICAgIH1cbn0iLCJpbXBvcnQgQ2hyb21vc29tZUV4dGVuc2lvbiBmcm9tIFwiLi4vY2hyb21vc29tZS9DaHJvbW9zb21lRXh0ZW5zaW9uXCI7XG5pbXBvcnQgSUNocm9tb3NvbWUgZnJvbSBcIi4uL2Nocm9tb3NvbWUvSUNocm9tb3NvbWVcIjtcbmltcG9ydCBSYW5kb21pemF0aW9uUHJvdmlkZXIgZnJvbSBcIi4uL3JhbmRvbWl6YXRpb24vUmFuZG9taXphdGlvblByb3ZpZGVyXCI7XG5pbXBvcnQgQ3Jvc3NvdmVyQmFzZSBmcm9tIFwiLi9Dcm9zc292ZXJCYXNlXCI7XG5pbXBvcnQgQ3Jvc3NPdmVyVXRpbCBmcm9tIFwiLi9Dcm9zc092ZXJVdGlsXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE9yZGVyZWRDcm9zc292ZXIgZXh0ZW5kcyBDcm9zc292ZXJCYXNlIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoMiwgMik7XG4gICAgdGhpcy5pc09yZGVyZWQgPSB0cnVlO1xuICB9XG4gIHBlcmZvcm1Dcm9zcyhwYXJlbnRzOiBJQ2hyb21vc29tZVtdKTogSUNocm9tb3NvbWVbXSB7XG4gICAgY29uc3QgcGFyZW50T25lID0gcGFyZW50c1swXTtcbiAgICBjb25zdCBwYXJlbnRUd28gPSBwYXJlbnRzWzFdO1xuXG4gICAgaWYgKCFDaHJvbW9zb21lRXh0ZW5zaW9uLnZhbGlkYXRlR2VuZXMocGFyZW50T25lKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiT3JkZXJlZCBDcm9zc292ZXIgLSBDYW5ub3QgYmUgdXNlZCEgUGFyZW50IGhhcyBkdXBsaWNhdGUgZ2VuZXMuXCIpO1xuICAgIH1cblxuICAgIGlmIChDaHJvbW9zb21lRXh0ZW5zaW9uLmFueUhhc1JlcGVhdGVkR2VuZShbcGFyZW50T25lLCBwYXJlbnRUd29dKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiT3JkZXJlZCBDcm9zc292ZXIgLSBQYXJlbnRzIGhhdmUgcmVwZWF0ZWQgZ2VuZXNcIik7XG4gICAgfVxuXG4gICAgbGV0IG1pZGRsZVNlY3Rpb25JbmRleGVzID0gUmFuZG9taXphdGlvblByb3ZpZGVyLmN1cnJlbnQuZ2V0VW5pcXVlSW50cyhcbiAgICAgIDIsXG4gICAgICAwLFxuICAgICAgcGFyZW50T25lLmxlbmd0aFxuICAgICk7XG4gICAgbWlkZGxlU2VjdGlvbkluZGV4ZXMgPSBtaWRkbGVTZWN0aW9uSW5kZXhlcy5zb3J0KChhLCBiKSA9PiBhIC0gYik7XG4gICAgY29uc3QgbWlkZGxlU2VjdGlvbkJlZ2luSW5kZXggPSBtaWRkbGVTZWN0aW9uSW5kZXhlc1swXTtcbiAgICBjb25zdCBtaWRkbGVTZWN0aW9uRW5kSW5kZXggPSBtaWRkbGVTZWN0aW9uSW5kZXhlc1sxXTtcblxuICAgIGNvbnN0IGZpcnN0Q2hpbGQgPSB0aGlzLmNyZWF0ZUNoaWxkKFxuICAgICAgcGFyZW50T25lLFxuICAgICAgcGFyZW50VHdvLFxuICAgICAgbWlkZGxlU2VjdGlvbkJlZ2luSW5kZXgsXG4gICAgICBtaWRkbGVTZWN0aW9uRW5kSW5kZXhcbiAgICApO1xuICAgIGNvbnN0IHNlY29uZENoaWxkID0gdGhpcy5jcmVhdGVDaGlsZChcbiAgICAgIHBhcmVudFR3byxcbiAgICAgIHBhcmVudE9uZSxcbiAgICAgIG1pZGRsZVNlY3Rpb25CZWdpbkluZGV4LFxuICAgICAgbWlkZGxlU2VjdGlvbkVuZEluZGV4XG4gICAgKTtcblxuICAgIHJldHVybiBbZmlyc3RDaGlsZCwgc2Vjb25kQ2hpbGRdO1xuICB9XG5cbiAgcHJpdmF0ZSBjcmVhdGVDaGlsZChcbiAgICBmaXJzdFBhcmVudDogSUNocm9tb3NvbWUsXG4gICAgc2Vjb25kUGFyZW50OiBJQ2hyb21vc29tZSxcbiAgICBtaWRkbGVTZWN0aW9uQmVnaW5JbmRleDogbnVtYmVyLFxuICAgIG1pZGRsZVNlY3Rpb25FbmRJbmRleDogbnVtYmVyXG4gICk6IElDaHJvbW9zb21lIHtcbiAgICBjb25zdCBmaXJzdFBhcmVudEdlbmVzID0gZmlyc3RQYXJlbnQuZ2V0R2VuZXMoKTtcbiAgICBjb25zdCBzZWNvbmRQYXJlbnRHZW5lcyA9IHNlY29uZFBhcmVudC5nZXRHZW5lcygpO1xuXG4gICAgY29uc3QgY2hpbGRHZW5lcyA9IENyb3NzT3ZlclV0aWwub3JkZXJlZENyb3Nzb3ZlcihcbiAgICAgIGZpcnN0UGFyZW50R2VuZXMsXG4gICAgICBzZWNvbmRQYXJlbnRHZW5lcyxcbiAgICAgIG1pZGRsZVNlY3Rpb25CZWdpbkluZGV4LFxuICAgICAgbWlkZGxlU2VjdGlvbkVuZEluZGV4XG4gICAgKTtcblxuICAgIGNvbnN0IGNoaWxkID0gZmlyc3RQYXJlbnQuY3JlYXRlTmV3KCk7XG5cbiAgICAvLyBjaGlsZC5yZXBsYWNlR2VuZXMoMCwgY2hpbGRHZW5lcyk7XG4gICAgbGV0IGluZGV4ID0gMDtcbiAgICBmb3IgKGNvbnN0IGdlbmUgb2YgY2hpbGRHZW5lcykge1xuICAgICAgY2hpbGQucmVwbGFjZUdlbmUoaW5kZXgsIGdlbmUpO1xuICAgICAgaW5kZXgrKztcbiAgICB9XG4gICAgcmV0dXJuIGNoaWxkO1xuICB9XG59XG4iLCJpbXBvcnQgSUNocm9tb3NvbWUgZnJvbSBcIi4uL2Nocm9tb3NvbWUvSUNocm9tb3NvbWVcIjtcbmltcG9ydCBDcm9zc292ZXJCYXNlIGZyb20gXCIuL0Nyb3Nzb3ZlckJhc2VcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVW5pZm9ybUNyb3Nzb3ZlciBleHRlbmRzIENyb3Nzb3ZlckJhc2Uge1xuICBjb25zdHJ1Y3RvcihtaXhQcm9iYWJpbGl0eTogbnVtYmVyKSB7XG4gICAgc3VwZXIoMiwgMik7XG4gICAgdGhpcy5taXhQcm9iYWJpbGl0eSA9IG1peFByb2JhYmlsaXR5O1xuICB9XG4gIHByaXZhdGUgbWl4UHJvYmFiaWxpdHk6IG51bWJlcjtcblxuICBwZXJmb3JtQ3Jvc3MocGFyZW50czogSUNocm9tb3NvbWVbXSk6IElDaHJvbW9zb21lW10ge1xuICAgIGNvbnN0IGZpcnN0UGFyZW50ID0gcGFyZW50c1swXTtcbiAgICBjb25zdCBzZWNvbmRQYXJlbnQgPSBwYXJlbnRzWzFdO1xuXG4gICAgY29uc3QgZmlyc3RDaGlsZCA9IGZpcnN0UGFyZW50LmNyZWF0ZU5ldygpO1xuICAgIGNvbnN0IHNlY29uZENoaWxkID0gc2Vjb25kUGFyZW50LmNyZWF0ZU5ldygpO1xuXG4gICAgY29uc3QgY2hpbGRyZW46IElDaHJvbW9zb21lW10gPSBbXTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZmlyc3RQYXJlbnQubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChNYXRoLnJhbmRvbSgpIDwgdGhpcy5taXhQcm9iYWJpbGl0eSkge1xuICAgICAgICBmaXJzdENoaWxkLnJlcGxhY2VHZW5lKGksIGZpcnN0Q2hpbGQuZ2V0R2VuZShpKSk7XG4gICAgICAgIHNlY29uZENoaWxkLnJlcGxhY2VHZW5lKGksIHNlY29uZFBhcmVudC5nZXRHZW5lKGkpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGZpcnN0Q2hpbGQucmVwbGFjZUdlbmUoaSwgc2Vjb25kUGFyZW50LmdldEdlbmUoaSkpO1xuICAgICAgICBzZWNvbmRDaGlsZC5yZXBsYWNlR2VuZShpLCBmaXJzdFBhcmVudC5nZXRHZW5lKGkpKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjaGlsZHJlbi5wdXNoKGZpcnN0Q2hpbGQpO1xuICAgIGNoaWxkcmVuLnB1c2goc2Vjb25kQ2hpbGQpO1xuXG4gICAgcmV0dXJuIGNoaWxkcmVuO1xuICB9XG59XG4iLCJpbXBvcnQgR2VuZXRpY0FsZ29yaXRobSBmcm9tIFwiLi9HZW5ldGljQWxnb3JpdGhtXCI7XG5pbXBvcnQgR2VuZSBmcm9tIFwiLi9jaHJvbW9zb21lL0dlbmVcIjtcbmltcG9ydCB7IEJpbmFyeUNocm9tb3NvbWVCYXNlLCBDaHJvbW9zb21lQmFzZSwgQ2hyb21vc29tZUV4dGVuc2lvbiwgRGVjaW1hbENocm9tb3NvbWUsIEZsb2F0aW5nUG9pbnRDaHJvbW9zb21lIH0gZnJvbSBcIi4vY2hyb21vc29tZS9JbmRleFwiO1xuaW1wb3J0IE9yZGVyZWRDcm9zc292ZXIgZnJvbSBcIi4vY3Jvc3NvdmVycy9PcmRlcmVkQ3Jvc3NvdmVyXCI7XG5pbXBvcnQgVW5pZm9ybUNyb3Nzb3ZlciBmcm9tIFwiLi9jcm9zc292ZXJzL1VuaWZvcm1Dcm9zc292ZXJcIjtcbmltcG9ydCBBbHRlcm5hdGluZ1BvaW50Q3Jvc3NvdmVyIGZyb20gXCIuL2Nyb3Nzb3ZlcnMvQWx0ZXJuYXRpbmdQb2ludENyb3Nzb3ZlclwiO1xuaW1wb3J0IE9uZVBvaW50Q3Jvc3NPdmVyIGZyb20gXCIuL2Nyb3Nzb3ZlcnMvT25lUG9pbnRDcm9zc292ZXJcIjtcbmltcG9ydCBJTXV0YXRpb24gZnJvbSBcIi4vbXV0YXRpb25zL0lNdXRhdGlvblwiO1xuaW1wb3J0IE11dGF0aW9uQmFzZSBmcm9tIFwiLi9tdXRhdGlvbnMvTXV0YXRpb25CYXNlXCI7XG5pbXBvcnQgUGFydGlhbFNodWZmbGVNdXRhdGlvbiBmcm9tIFwiLi9tdXRhdGlvbnMvUGFydGlhbFNodWZmbGVNdXRhdGlvblwiO1xuaW1wb3J0IFJldmVyc2VTZXF1ZW5jZU11dGF0aW9uIGZyb20gXCIuL211dGF0aW9ucy9SZXZlcnNlU2VxdWVuY2VNdXRhdGlvblwiO1xuaW1wb3J0IFNlcXVlbmNlTXV0YXRpb25CYXNlIGZyb20gXCIuL211dGF0aW9ucy9TZXF1ZW5jZU11dGF0aW9uQmFzZVwiO1xuaW1wb3J0IFVuaWZvcm1NdXRhdGlvbiBmcm9tIFwiLi9tdXRhdGlvbnMvVW5pZm9ybU11dGF0aW9uXCI7XG5cbi8vIEV4cG9ydCBHZW5ldGljIEFsZ29yaXRobSBjbGFzc1xuZXhwb3J0IHsgR2VuZXRpY0FsZ29yaXRobSB9XG5cbi8vIEV4cG9ydCBDaHJvbW9zb21lc1xuZXhwb3J0IHsgQmluYXJ5Q2hyb21vc29tZUJhc2UsIENocm9tb3NvbWVCYXNlLCBDaHJvbW9zb21lRXh0ZW5zaW9uLCBEZWNpbWFsQ2hyb21vc29tZSwgRmxvYXRpbmdQb2ludENocm9tb3NvbWUsIEdlbmUgfVxuXG5leHBvcnQgeyBBbHRlcm5hdGluZ1BvaW50Q3Jvc3NvdmVyLCBPbmVQb2ludENyb3NzT3ZlciwgT3JkZXJlZENyb3Nzb3ZlciwgVW5pZm9ybUNyb3Nzb3ZlciB9XG5cbmV4cG9ydCB7XG4gICAgSU11dGF0aW9uLCBNdXRhdGlvbkJhc2UsIFBhcnRpYWxTaHVmZmxlTXV0YXRpb24sIFJldmVyc2VTZXF1ZW5jZU11dGF0aW9uLFxuICAgIFNlcXVlbmNlTXV0YXRpb25CYXNlLCBVbmlmb3JtTXV0YXRpb25cbn1cblxuIiwiaW1wb3J0IElDaHJvbW9zb21lIGZyb20gXCIuLi9jaHJvbW9zb21lL0lDaHJvbW9zb21lXCI7XG5pbXBvcnQgSU11dGF0aW9uIGZyb20gXCIuL0lNdXRhdGlvblwiO1xuXG5leHBvcnQgZGVmYXVsdCBhYnN0cmFjdCBjbGFzcyBNdXRhdGlvbkJhc2UgaW1wbGVtZW50cyBJTXV0YXRpb24ge1xuXG4gIGlzT3JkZXJlZDogYm9vbGVhbjtcbiAgbXV0YXRlKGNocm9tb3NvbWU6IElDaHJvbW9zb21lLCBwcm9iYWJpbGl0eTogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5wZXJmb3JtTXV0YXRlKGNocm9tb3NvbWUsIHByb2JhYmlsaXR5KTtcbiAgfVxuXG4gIGFic3RyYWN0IHBlcmZvcm1NdXRhdGUoY2hyb21vc29tZTogSUNocm9tb3NvbWUsIHByb2JhYmlsaXR5OiBudW1iZXIpOiB2b2lkO1xufVxuIiwiaW1wb3J0IEdlbmUgZnJvbSBcIi4uL2Nocm9tb3NvbWUvR2VuZVwiO1xuaW1wb3J0IFNlcXVlbmNlTXV0YXRpb25CYXNlIGZyb20gXCIuL1NlcXVlbmNlTXV0YXRpb25CYXNlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBhcnRpYWxTaHVmZmxlTXV0YXRpb24gZXh0ZW5kcyBTZXF1ZW5jZU11dGF0aW9uQmFzZSB7XG4gIG11dGF0ZU9uU2VxdWVuY2Uoc2VxdWVuY2U6IEdlbmVbXSk6IEdlbmVbXSB7XG4gICAgY29uc3QgbXV0YXRlZCA9IHNlcXVlbmNlLnNvcnQoKCkgPT4gMC41IC0gTWF0aC5yYW5kb20oKSk7XG4gICAgcmV0dXJuIG11dGF0ZWQ7XG4gIH1cbn1cbiIsImltcG9ydCBHZW5lIGZyb20gXCIuLi9jaHJvbW9zb21lL0dlbmVcIjtcbmltcG9ydCBTZXF1ZW5jZU11dGF0aW9uQmFzZSBmcm9tIFwiLi9TZXF1ZW5jZU11dGF0aW9uQmFzZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZXZlcnNlU2VxdWVuY2VNdXRhdGlvbiBleHRlbmRzIFNlcXVlbmNlTXV0YXRpb25CYXNlIHtcbiAgbXV0YXRlT25TZXF1ZW5jZShzZXF1ZW5jZTogR2VuZVtdKTogR2VuZVtdIHtcbiAgICByZXR1cm4gc2VxdWVuY2UucmV2ZXJzZSgpO1xuICB9XG59XG4iLCJpbXBvcnQgR2VuZSBmcm9tIFwiLi4vY2hyb21vc29tZS9HZW5lXCI7XG5pbXBvcnQgSUNocm9tb3NvbWUgZnJvbSBcIi4uL2Nocm9tb3NvbWUvSUNocm9tb3NvbWVcIjtcbmltcG9ydCBSYW5kb21pemF0aW9uUHJvdmlkZXIgZnJvbSBcIi4uL3JhbmRvbWl6YXRpb24vUmFuZG9taXphdGlvblByb3ZpZGVyXCI7XG5pbXBvcnQgTXV0YXRpb25CYXNlIGZyb20gXCIuL011dGF0aW9uQmFzZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBhYnN0cmFjdCBjbGFzcyBTZXF1ZW5jZU11dGF0aW9uQmFzZSBleHRlbmRzIE11dGF0aW9uQmFzZSB7XG5cbiAgYWJzdHJhY3QgbXV0YXRlT25TZXF1ZW5jZShzZXF1ZW5jZTogR2VuZVtdKTogR2VuZVtdO1xuXG4gIHBlcmZvcm1NdXRhdGUoY2hyb21vc29tZTogSUNocm9tb3NvbWUsIHByb2JhYmlsaXR5OiBudW1iZXIpIHtcbiAgICB0aGlzLnZhbGlkYXRlTGVuZ3RoKGNocm9tb3NvbWUpO1xuXG4gICAgY29uc3QgciA9IFJhbmRvbWl6YXRpb25Qcm92aWRlci5jdXJyZW50O1xuXG4gICAgaWYgKHIuZ2V0RG91YmxlKCkgPD0gcHJvYmFiaWxpdHkpIHtcbiAgICAgIGNvbnN0IGluZGV4ZXMgPSByXG4gICAgICAgIC5nZXRVbmlxdWVJbnRzKDIsIDAsIGNocm9tb3NvbWUubGVuZ3RoKVxuICAgICAgICAuc29ydCgoYSwgYikgPT4gYSAtIGIpO1xuICAgICAgY29uc3QgZmlyc3RJbmRleCA9IGluZGV4ZXNbMF07XG4gICAgICBjb25zdCBzZWNvbmRJbmRleCA9IGluZGV4ZXNbMV07XG4gICAgICBjb25zdCBzZXF1ZW5jZUxlbmd0aCA9IHNlY29uZEluZGV4IC0gZmlyc3RJbmRleCArIDE7XG4gICAgICBjb25zdCBzZXF1ZW5jZSA9IGNocm9tb3NvbWUuZ2V0R2VuZXMoKS5zbGljZShmaXJzdEluZGV4LCBzZWNvbmRJbmRleCk7XG4gICAgICBjb25zdCBtdXRhdGVkU2VxdWVuY2UgPSB0aGlzLm11dGF0ZU9uU2VxdWVuY2Uoc2VxdWVuY2UpO1xuXG4gICAgICBjaHJvbW9zb21lLnJlcGxhY2VHZW5lcyhmaXJzdEluZGV4LCBtdXRhdGVkU2VxdWVuY2UpO1xuICAgIH1cbiAgfVxuICBwcm90ZWN0ZWQgdmFsaWRhdGVMZW5ndGgoY2hyb21vc29tZTogSUNocm9tb3NvbWUpIHtcbiAgICBpZiAoY2hyb21vc29tZS5sZW5ndGggPCAzKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgIFwiU2VxdWVuY2VNdXRhdGlvbkJhc2UgLSBBIGNocm9tb3NvbWUgc2hvdWxkIGhhdmUgYXQgbGVhc3QgMyBnZW5lc1wiXG4gICAgICApO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IElDaHJvbW9zb21lIGZyb20gXCIuLi9jaHJvbW9zb21lL0lDaHJvbW9zb21lXCI7XG5pbXBvcnQgTXV0YXRpb25CYXNlIGZyb20gXCIuL011dGF0aW9uQmFzZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVbmlmb3JtTXV0YXRpb24gZXh0ZW5kcyBNdXRhdGlvbkJhc2Uge1xuICAgIHBlcmZvcm1NdXRhdGUoY2hyb21vc29tZTogSUNocm9tb3NvbWUsIHByb2JhYmlsaXR5OiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTWV0aG9kIG5vdCBpbXBsZW1lbnRlZC5cIik7XG4gICAgfVxuXG59IiwiaW1wb3J0IElDaHJvbW9zb21lIGZyb20gXCIuLi9jaHJvbW9zb21lL0lDaHJvbW9zb21lXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdlbmVyYXRpb24ge1xuICBjaHJvbW9zb21lczogSUNocm9tb3NvbWVbXTtcblxuICBjb25zdHJ1Y3RvcihudW06IG51bWJlciwgY2hyb21vc29tZXM6IElDaHJvbW9zb21lW10pIHtcbiAgICBpZiAobnVtIDwgMSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiR2VuZXJhdGlvbiBudW1iZXIgXCIgKyBudW0gKyBcImlzIGludmFsaWQuXCIpO1xuICAgIH1cblxuICAgIGlmIChjaHJvbW9zb21lcy5sZW5ndGggPCAyKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJBIGdlbmVyYXRpb24gc2hvdWxkIGhhdmUgYXQgbGVhc3QgMiBjaHJvbW9zb21lXCIpO1xuICAgIH1cbiAgICB0aGlzLm51bSA9IG51bTtcbiAgICB0aGlzLmNyZWF0aW9uRGF0ZSA9IG5ldyBEYXRlKCk7XG4gICAgdGhpcy5jaHJvbW9zb21lcyA9IGNocm9tb3NvbWVzO1xuICB9XG4gIHByaXZhdGUgYmVzdENocm9tb3NvbWVzOiBJQ2hyb21vc29tZTtcbiAgcHJpdmF0ZSBjcmVhdGlvbkRhdGU6IERhdGU7XG4gIHByaXZhdGUgbnVtOiBudW1iZXI7XG5cbiAgZW5kKGNocm9tb3NvbWVzTnVtYmVyOiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLmNocm9tb3NvbWVzID0gdGhpcy5jaHJvbW9zb21lc1xuICAgICAgLmZpbHRlcigoY2hyb21vc29tZSkgPT4gdGhpcy52YWxpZGF0ZUNocm9tb3NvbWUoY2hyb21vc29tZSkgPT09IHRydWUpXG4gICAgICAuc29ydCgoYSwgYikgPT4gYi5maXRuZXNzIC0gYS5maXRuZXNzKTtcblxuICAgIHRoaXMuY2hyb21vc29tZXMgPSB0aGlzLmNocm9tb3NvbWVzLnNsaWNlKDAsIGNocm9tb3NvbWVzTnVtYmVyKTtcblxuICAgIHRoaXMuYmVzdENocm9tb3NvbWVzID0gdGhpcy5jaHJvbW9zb21lc1swXTtcbiAgfVxuXG4gIGdldENocm9tb3NvbWUoKTogSUNocm9tb3NvbWVbXSB7XG4gICAgcmV0dXJuIHRoaXMuY2hyb21vc29tZXM7XG4gIH1cblxuICB0b1N0cmluZygpIHtcbiAgICAvLyByZXR1cm4gXCJcIjtcbiAgICByZXR1cm4gdGhpcy5iZXN0Q2hyb21vc29tZXMuZ2V0R2VuZXMoKS50b1N0cmluZygpO1xuICB9XG5cbiAgdmFsaWRhdGVDaHJvbW9zb21lKGNocm9tb3NvbWU6IElDaHJvbW9zb21lKTogYm9vbGVhbiB7XG4gICAgaWYgKGNocm9tb3NvbWUuZml0bmVzcyA9PSBudWxsKSB0aHJvdyBuZXcgRXJyb3IoXCJObyBmaXRuZXNzXCIpO1xuICAgIHJldHVybiB0cnVlO1xuICB9XG59XG4iLCJpbXBvcnQgSUNocm9tb3NvbWUgZnJvbSBcIi4uL2Nocm9tb3NvbWUvSUNocm9tb3NvbWVcIjtcbmltcG9ydCBHZW5lcmF0aW9uIGZyb20gXCIuL0dlbmVyYXRpb25cIjtcbmltcG9ydCBJUG9wdWxhdGlvbiBmcm9tIFwiLi9JUG9wdWxhdGlvblwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQb3B1bGF0aW9uIGltcGxlbWVudHMgSVBvcHVsYXRpb24ge1xuICBwdWJsaWMgYWRhbUNocm9tb3NvbWU6IElDaHJvbW9zb21lO1xuICBiZXN0Q2hyb21vc29tZTogSUNocm9tb3NvbWU7XG4gIGNyZWF0aW9uRGF0ZTogRGF0ZTtcbiAgY3VycmVudEdlbmVyYXRpb246IEdlbmVyYXRpb247XG4gIGdlbmVyYXRpb25OdW1iZXI6IG51bWJlcjtcbiAgZ2VuZXJhdGlvbnM6IEdlbmVyYXRpb25bXTtcbiAgbWF4U2l6ZTogbnVtYmVyO1xuICBtaW5TaXplOiBudW1iZXI7XG5cbiAgY29uc3RydWN0b3IobWluU2l6ZTogbnVtYmVyLCBtYXhTaXplOiBudW1iZXIsIGFkYW1DaHJvbW9zb21lOiBJQ2hyb21vc29tZSkge1xuICAgIGlmIChtaW5TaXplIDwgMikgdGhyb3cgbmV3IEVycm9yKCk7XG4gICAgaWYgKG1heFNpemUgPCBtaW5TaXplKSB0aHJvdyBuZXcgRXJyb3IoKTtcblxuICAgIHRoaXMuY3JlYXRpb25EYXRlID0gbmV3IERhdGUoKTtcbiAgICB0aGlzLm1pblNpemUgPSBtaW5TaXplO1xuICAgIHRoaXMubWF4U2l6ZSA9IG1heFNpemU7XG4gICAgdGhpcy5nZW5lcmF0aW9ucyA9IFtdO1xuICAgIHRoaXMuYWRhbUNocm9tb3NvbWUgPSBhZGFtQ2hyb21vc29tZTtcbiAgICB0aGlzLmJlc3RDaHJvbW9zb21lID0gYWRhbUNocm9tb3NvbWU7XG5cbiAgICB0aGlzLmNyZWF0ZUluaXRpYWxHZW5lcmF0aW9uKCk7XG4gIH1cblxuICBjcmVhdGVJbml0aWFsR2VuZXJhdGlvbigpOiB2b2lkIHtcbiAgICB0aGlzLmdlbmVyYXRpb25zID0gW107XG4gICAgdGhpcy5nZW5lcmF0aW9uTnVtYmVyID0gMDtcbiAgICBjb25zdCBjaHJvbW9zb21lcyA9IFtdO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLm1pblNpemU7IGkrKykge1xuICAgICAgY29uc3QgYyA9IHRoaXMuYWRhbUNocm9tb3NvbWUuY3JlYXRlTmV3KCk7XG5cbiAgICAgIGlmIChjID09IG51bGwpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiXCIpO1xuICAgICAgfVxuXG4gICAgICBjaHJvbW9zb21lcy5wdXNoKGMpO1xuICAgIH1cblxuICAgIHRoaXMuY3JlYXRlTmV3R2VuZXJhdGlvbihjaHJvbW9zb21lcyk7XG4gIH1cblxuICBjcmVhdGVOZXdHZW5lcmF0aW9uKGNocm9tb3NvbWVzPzogSUNocm9tb3NvbWVbXSk6IHZvaWQge1xuICAgIHRoaXMuY3VycmVudEdlbmVyYXRpb24gPSBuZXcgR2VuZXJhdGlvbihcbiAgICAgICsrdGhpcy5nZW5lcmF0aW9uTnVtYmVyLFxuICAgICAgY2hyb21vc29tZXNcbiAgICApO1xuICAgIHRoaXMuZ2VuZXJhdGlvbnMucHVzaCh0aGlzLmN1cnJlbnRHZW5lcmF0aW9uKTtcbiAgfVxuICBlbmRDdXJyZW50R2VuZXJhdGlvbigpOiB2b2lkIHtcbiAgICB0aGlzLmN1cnJlbnRHZW5lcmF0aW9uLmVuZCh0aGlzLm1heFNpemUpO1xuICAgIGlmIChcbiAgICAgIHRoaXMuYmVzdENocm9tb3NvbWUuZml0bmVzcyA8XG4gICAgICB0aGlzLmN1cnJlbnRHZW5lcmF0aW9uLmNocm9tb3NvbWVzWzBdLmZpdG5lc3MgfHxcbiAgICAgIHRoaXMuYmVzdENocm9tb3NvbWUgPT09IHVuZGVmaW5lZFxuICAgICkge1xuICAgICAgdGhpcy5iZXN0Q2hyb21vc29tZSA9IHRoaXMuY3VycmVudEdlbmVyYXRpb24uY2hyb21vc29tZXNbMF07XG4gICAgfVxuICB9XG5cbiAgdG9TdHJpbmcgPSAoKSA9PiB7XG4gICAgbGV0IHN0ciA9IFwiXCI7XG4gICAgZm9yIChjb25zdCBnZW5lcmF0aW9uIG9mIHRoaXMuZ2VuZXJhdGlvbnMpIHtcbiAgICAgIHN0ciArPSB0aGlzLmdlbmVyYXRpb25zLnRvU3RyaW5nKCk7XG4gICAgfVxuICAgIHJldHVybiBzdHI7XG4gIH07XG59XG4iLCJpbXBvcnQgUmFuZG9taXphdGlvbkJhc2UgZnJvbSBcIi4vUmFuZG9taXphdGlvbkJhc2VcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQmFzaWNSYW5kb21pemF0aW9uIGV4dGVuZHMgUmFuZG9taXphdGlvbkJhc2Uge1xuICBnZXREb3VibGUobWluPzogbnVtYmVyLCBtYXg/OiBudW1iZXIpOiBudW1iZXIge1xuICAgIGlmIChtaW4gPT09IHVuZGVmaW5lZCB8fCBtYXggPT09IHVuZGVmaW5lZCkgcmV0dXJuIE1hdGgucmFuZG9tKCk7XG4gICAgcmV0dXJuIE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluKSArIG1pbjtcbiAgfVxuXG4gIGdldEZsb2F0KG1pbj86IG51bWJlciwgbWF4PzogbnVtYmVyKTogbnVtYmVyIHtcbiAgICByZXR1cm4gTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4pICsgbWluO1xuICB9XG4gIGdldEludChtaW46IG51bWJlciwgbWF4OiBudW1iZXIpOiBudW1iZXIge1xuICAgIG1pbiA9IE1hdGguY2VpbChtaW4pO1xuICAgIG1heCA9IE1hdGguZmxvb3IobWF4KTtcbiAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbikgKyBtaW4pOyAvLyBUaGUgbWF4aW11bSBpcyBleGNsdXNpdmUgYW5kIHRoZSBtaW5pbXVtIGlzIGluY2x1c2l2ZVxuICB9XG4gIGdldFVuaXF1ZUludHMobGVuZ3RoOiBudW1iZXIsIG1pbjogbnVtYmVyLCBtYXg6IG51bWJlcik6IG51bWJlcltdIHtcbiAgICBjb25zdCBzdHViID0gW107XG4gICAgZm9yIChsZXQgaSA9IG1pbjsgaSA8IG1heDsgaSsrKSB7XG4gICAgICBzdHViLnB1c2goaSk7XG4gICAgfVxuICAgIHJldHVybiBzdHViXG4gICAgICAuc29ydCgoKSA9PiB7XG4gICAgICAgIHJldHVybiAwLjUgLSBNYXRoLnJhbmRvbSgpO1xuICAgICAgfSlcbiAgICAgIC5zbGljZSgwLCBsZW5ndGgpO1xuICB9XG59XG4iLCJpbXBvcnQgSVJhbmRvbWl6YXRpb24gZnJvbSBcIi4vSVJhbmRvbWl6YXRpb25cIjtcblxuZXhwb3J0IGRlZmF1bHQgYWJzdHJhY3QgY2xhc3MgUmFuZG9taXphdGlvbkJhc2UgaW1wbGVtZW50cyBJUmFuZG9taXphdGlvbiB7XG4gIGFic3RyYWN0IGdldERvdWJsZShtaW4/OiBudW1iZXIsIG1heD86IG51bWJlcik6IG51bWJlcjtcbiAgYWJzdHJhY3QgZ2V0RmxvYXQobWluPzogbnVtYmVyLCBtYXg/OiBudW1iZXIpOiBudW1iZXI7XG4gIGFic3RyYWN0IGdldEludChtaW46IG51bWJlciwgbWF4OiBudW1iZXIpOiBudW1iZXI7XG5cbiAgZ2V0SW50cyhsZW5ndGg6IG51bWJlciwgbWluOiBudW1iZXIsIG1heDogbnVtYmVyKTogbnVtYmVyW10ge1xuICAgIGNvbnN0IHJlc3VsdCA9IFtdO1xuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBsZW5ndGg7IGluZGV4KyspIHtcbiAgICAgIHJlc3VsdC5wdXNoKHRoaXMuZ2V0SW50KG1pbiwgbWF4KSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIGFic3RyYWN0IGdldFVuaXF1ZUludHMobGVuZ3RoOiBudW1iZXIsIG1pbjogbnVtYmVyLCBtYXg6IG51bWJlcik6IG51bWJlcltdO1xufVxuIiwiaW1wb3J0IEJhc2ljUmFuZG9taXphdGlvbiBmcm9tIFwiLi9CYXNpY1JhbmRvbWl6YXRpb25cIjtcbmltcG9ydCBJUmFuZG9taXphdGlvbiBmcm9tIFwiLi9JUmFuZG9taXphdGlvblwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSYW5kb21pemF0aW9uUHJvdmlkZXIge1xuICBzdGF0aWMgY3VycmVudDogSVJhbmRvbWl6YXRpb24gPSBuZXcgQmFzaWNSYW5kb21pemF0aW9uKCk7XG59XG4iLCJpbXBvcnQgSUdlbmV0aWNBbGdvcml0aG0gZnJvbSBcIi4uL0lHZW5ldGljQWxnb3JpdGhtXCI7XG5pbXBvcnQgVGVybWluYXRpb25CYXNlIGZyb20gXCIuL1Rlcm1pbmF0aW9uQmFzZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHZW5lcmF0aW9uTnVtYmVyVGVybWluYXRpb24gZXh0ZW5kcyBUZXJtaW5hdGlvbkJhc2Uge1xuICBwdWJsaWMgZXhwZWN0ZWRHZW5lcmF0aW9uTnVtYmVyOiBudW1iZXI7XG5cbiAgY29uc3RydWN0b3IoZXhwZWN0ZWRHZW5lcmF0aW9uTnVtYmVyPzogbnVtYmVyKSB7XG4gICAgc3VwZXIoKTtcbiAgICBpZiAoXG4gICAgICBleHBlY3RlZEdlbmVyYXRpb25OdW1iZXIgPT09IHVuZGVmaW5lZCB8fFxuICAgICAgZXhwZWN0ZWRHZW5lcmF0aW9uTnVtYmVyID09PSBudWxsXG4gICAgKVxuICAgICAgdGhpcy5leHBlY3RlZEdlbmVyYXRpb25OdW1iZXIgPSAxMDA7XG4gICAgZWxzZVxuICAgICAgdGhpcy5leHBlY3RlZEdlbmVyYXRpb25OdW1iZXIgPSBleHBlY3RlZEdlbmVyYXRpb25OdW1iZXI7XG4gIH1cblxuICBwZXJmb3JtSGFzUmVhY2hlZChnZW5ldGljQWxnb3JpdGhtOiBJR2VuZXRpY0FsZ29yaXRobSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBnZW5ldGljQWxnb3JpdGhtLmdlbmVyYXRpb25zTnVtYmVyID49IHRoaXMuZXhwZWN0ZWRHZW5lcmF0aW9uTnVtYmVyO1xuICB9XG59XG4iLCJpbXBvcnQgSUdlbmV0aWNBbGdvcml0aG0gZnJvbSBcIi4uL0lHZW5ldGljQWxnb3JpdGhtXCI7XG5pbXBvcnQgSVRlcm1pbmF0aW9uIGZyb20gXCIuL0lUZXJtaW5hdGlvblwiO1xuXG5leHBvcnQgZGVmYXVsdCBhYnN0cmFjdCBjbGFzcyBUZXJtaW5hdGlvbkJhc2UgaW1wbGVtZW50cyBJVGVybWluYXRpb24ge1xuICBwcml2YXRlIG1IYXNSZWFjaGVkOiBib29sZWFuO1xuXG4gIGhhc1JlYWNoZWQoZ2VuZXRpY0FsZ29yaXRobTogSUdlbmV0aWNBbGdvcml0aG0pOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5tSGFzUmVhY2hlZDtcbiAgfVxuXG4gIGFic3RyYWN0IHBlcmZvcm1IYXNSZWFjaGVkKGdlbmV0aWNBbGdvcml0aG06IElHZW5ldGljQWxnb3JpdGhtKTogYm9vbGVhbjtcbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdGlmKF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0pIHtcblx0XHRyZXR1cm4gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvLyBtb2R1bGUgZXhwb3J0cyBtdXN0IGJlIHJldHVybmVkIGZyb20gcnVudGltZSBzbyBlbnRyeSBpbmxpbmluZyBpcyBkaXNhYmxlZFxuLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG5yZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL2RvbWFpbi9pbmRleC50c1wiKTtcbiJdLCJzb3VyY2VSb290IjoiIn0=