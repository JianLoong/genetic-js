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


var GeneticAlgorithmState;
(function (GeneticAlgorithmState) {
    GeneticAlgorithmState[GeneticAlgorithmState["NotStarted"] = 0] = "NotStarted";
    GeneticAlgorithmState[GeneticAlgorithmState["Started"] = 1] = "Started";
    GeneticAlgorithmState[GeneticAlgorithmState["Stopped"] = 2] = "Stopped";
    GeneticAlgorithmState[GeneticAlgorithmState["Resumed"] = 3] = "Resumed";
    GeneticAlgorithmState[GeneticAlgorithmState["TerminationReached"] = 4] = "TerminationReached";
})(GeneticAlgorithmState || (GeneticAlgorithmState = {}));
class GeneticAlgorithm {
    constructor(population, fitness, selection, crossOver, mutation, reinsertion, termination) {
        this.defaultCrossOverProbability = 0.75;
        this.defaultMutationProbability = 0.3;
        this.start = () => {
            const bestChromosomeArray = [];
            this.timeEvolving = new Date();
            while (this.termination.hasReached(this) === false) {
                this.evolveOneGeneration();
                bestChromosomeArray.push(this.bestChromosome);
                this.generationsNumber++;
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
        this.termination = termination;
        this.operatorStrategy = new _DefaultOperationStrategy__WEBPACK_IMPORTED_MODULE_0__.default();
        this.reinsertion = reinsertion;
        this.generationsNumber = 0;
    }
    clone() {
        return new GeneticAlgorithm(new _populations_Population__WEBPACK_IMPORTED_MODULE_1__.default(this.population.minSize, this.population.maxSize, this.population.bestChromosome), this.fitness, this.selection, this.crossOver, this.mutation, this.reinsertion, this.termination);
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
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ FloatingPointChromosome
/* harmony export */ });
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! .. */ "./src/domain/index.ts");
/* harmony import */ var _randomization_RandomizationProvider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../randomization/RandomizationProvider */ "./src/domain/randomization/RandomizationProvider.ts");


class FloatingPointChromosome extends ___WEBPACK_IMPORTED_MODULE_0__.BinaryChromosomeBase {
    constructor(minValue, maxValue) {
        super(32 * minValue.length);
        this.expand = (originalValue) => {
            const result = [];
            for (let i = 0; i < this.maxValue.length; i = i + 31) {
                const portion = originalValue.slice(i, i + 1).toString().replace(/,/g, "");
                result.push(parseInt(portion, 10));
            }
            return [];
        };
        this.flatten = (minValue, maxValue) => {
            let str = "";
            for (let i = 0; i < minValue.length; i++) {
                const min = minValue[i];
                const max = maxValue[i];
                const r = _randomization_RandomizationProvider__WEBPACK_IMPORTED_MODULE_1__.default.current.getInt(min, max);
                str += Number(r).toString(2).padStart(32, "0");
            }
            let result = [];
            result = str.split("");
            console.log(result);
            return result;
        };
        this.minValue = minValue;
        this.maxValue = maxValue;
        this.originalValue = this.flatten(minValue, maxValue);
    }
    createNew() {
        return new FloatingPointChromosome(this.minValue, this.maxValue);
    }
    generateGene(geneIndex) {
        return new ___WEBPACK_IMPORTED_MODULE_0__.Gene(this.originalValue[geneIndex]);
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

/***/ "./src/domain/chromosome/IEEEFloatingPointChromosome.ts":
/*!**************************************************************!*\
  !*** ./src/domain/chromosome/IEEEFloatingPointChromosome.ts ***!
  \**************************************************************/
/*! namespace exports */
/*! export IEEEFloatingPointChromosome [provided] [no usage info] [missing usage info prevents renaming] */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ IEEEFloatingPointChromosome,
/* harmony export */   "IEEEFloatingPointChromosome": () => /* binding */ IEEEFloatingPointChromosome
/* harmony export */ });
/* harmony import */ var _BinaryChromosomeBase__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BinaryChromosomeBase */ "./src/domain/chromosome/BinaryChromosomeBase.ts");
/* harmony import */ var _Gene__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Gene */ "./src/domain/chromosome/Gene.ts");


class IEEEFloatingPointChromosome extends _BinaryChromosomeBase__WEBPACK_IMPORTED_MODULE_0__.default {
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
        return new IEEEFloatingPointChromosome(this.mValue);
    }
    generateGene(geneIndex) {
        return new _Gene__WEBPACK_IMPORTED_MODULE_1__.default(Number(this.binArrayStr[geneIndex]));
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
/*! export IEEEFloatingPointChromosome [provided] [no usage info] [missing usage info prevents renaming] -> ./src/domain/chromosome/IEEEFloatingPointChromosome.ts .default */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_exports__, __webpack_require__.d, __webpack_require__.r, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BinaryChromosomeBase": () => /* reexport safe */ _BinaryChromosomeBase__WEBPACK_IMPORTED_MODULE_0__.default,
/* harmony export */   "ChromosomeBase": () => /* reexport safe */ _ChromosomeBase__WEBPACK_IMPORTED_MODULE_4__.default,
/* harmony export */   "ChromosomeExtension": () => /* reexport safe */ _ChromosomeExtension__WEBPACK_IMPORTED_MODULE_5__.default,
/* harmony export */   "DecimalChromosome": () => /* reexport safe */ _DecimalChromosome__WEBPACK_IMPORTED_MODULE_1__.default,
/* harmony export */   "FloatingPointChromosome": () => /* reexport safe */ _FloatingPointChromosome__WEBPACK_IMPORTED_MODULE_3__.default,
/* harmony export */   "IEEEFloatingPointChromosome": () => /* reexport safe */ _IEEEFloatingPointChromosome__WEBPACK_IMPORTED_MODULE_2__.default,
/* harmony export */   "Gene": () => /* reexport safe */ _Gene__WEBPACK_IMPORTED_MODULE_6__.default
/* harmony export */ });
/* harmony import */ var _BinaryChromosomeBase__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BinaryChromosomeBase */ "./src/domain/chromosome/BinaryChromosomeBase.ts");
/* harmony import */ var _ChromosomeBase__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ChromosomeBase */ "./src/domain/chromosome/ChromosomeBase.ts");
/* harmony import */ var _ChromosomeExtension__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ChromosomeExtension */ "./src/domain/chromosome/ChromosomeExtension.ts");
/* harmony import */ var _DecimalChromosome__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DecimalChromosome */ "./src/domain/chromosome/DecimalChromosome.ts");
/* harmony import */ var _IEEEFloatingPointChromosome__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./IEEEFloatingPointChromosome */ "./src/domain/chromosome/IEEEFloatingPointChromosome.ts");
/* harmony import */ var _Gene__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Gene */ "./src/domain/chromosome/Gene.ts");
/* harmony import */ var _FloatingPointChromosome__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./FloatingPointChromosome */ "./src/domain/chromosome/FloatingPointChromosome.ts");










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
/*! export AndTermination [provided] [maybe used in bundle (runtime-defined)] [usage prevents renaming] -> ./src/domain/terminations/AndTermination.ts .default */
/*! export BinaryChromosomeBase [provided] [maybe used in bundle (runtime-defined)] [usage prevents renaming] -> ./src/domain/chromosome/BinaryChromosomeBase.ts .default */
/*! export ChromosomeBase [provided] [maybe used in bundle (runtime-defined)] [usage prevents renaming] -> ./src/domain/chromosome/ChromosomeBase.ts .default */
/*! export ChromosomeExtension [provided] [maybe used in bundle (runtime-defined)] [usage prevents renaming] -> ./src/domain/chromosome/ChromosomeExtension.ts .default */
/*! export DecimalChromosome [provided] [maybe used in bundle (runtime-defined)] [usage prevents renaming] -> ./src/domain/chromosome/DecimalChromosome.ts .default */
/*! export FitnessStagnationTermination [provided] [maybe used in bundle (runtime-defined)] [usage prevents renaming] -> ./src/domain/terminations/FitnessStagnationTermination.ts .default */
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
/* harmony export */   "Gene": () => /* reexport safe */ _chromosome_Gene__WEBPACK_IMPORTED_MODULE_11__.default,
/* harmony export */   "FloatingPointChromosome": () => /* reexport safe */ _chromosome_Index__WEBPACK_IMPORTED_MODULE_1__.FloatingPointChromosome,
/* harmony export */   "AlternatingPointCrossover": () => /* reexport safe */ _crossovers_AlternatingPointCrossover__WEBPACK_IMPORTED_MODULE_4__.default,
/* harmony export */   "OnePointCrossOver": () => /* reexport safe */ _crossovers_OnePointCrossover__WEBPACK_IMPORTED_MODULE_5__.default,
/* harmony export */   "OrderedCrossover": () => /* reexport safe */ _crossovers_OrderedCrossover__WEBPACK_IMPORTED_MODULE_2__.default,
/* harmony export */   "UniformCrossover": () => /* reexport safe */ _crossovers_UniformCrossover__WEBPACK_IMPORTED_MODULE_3__.default,
/* harmony export */   "AndTermination": () => /* reexport safe */ _terminations_Index__WEBPACK_IMPORTED_MODULE_10__.AndTermination,
/* harmony export */   "FitnessStagnationTermination": () => /* reexport safe */ _terminations_Index__WEBPACK_IMPORTED_MODULE_10__.FitnessStagnationTermination,
/* harmony export */   "MutationBase": () => /* reexport safe */ _mutations_MutationBase__WEBPACK_IMPORTED_MODULE_12__.default,
/* harmony export */   "PartialShuffleMutation": () => /* reexport safe */ _mutations_PartialShuffleMutation__WEBPACK_IMPORTED_MODULE_6__.default,
/* harmony export */   "ReverseSequenceMutation": () => /* reexport safe */ _mutations_ReverseSequenceMutation__WEBPACK_IMPORTED_MODULE_7__.default,
/* harmony export */   "SequenceMutationBase": () => /* reexport safe */ _mutations_SequenceMutationBase__WEBPACK_IMPORTED_MODULE_8__.default,
/* harmony export */   "UniformMutation": () => /* reexport safe */ _mutations_UniformMutation__WEBPACK_IMPORTED_MODULE_9__.default
/* harmony export */ });
/* harmony import */ var _GeneticAlgorithm__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./GeneticAlgorithm */ "./src/domain/GeneticAlgorithm.ts");
/* harmony import */ var _chromosome_Gene__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./chromosome/Gene */ "./src/domain/chromosome/Gene.ts");
/* harmony import */ var _chromosome_Index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./chromosome/Index */ "./src/domain/chromosome/Index.ts");
/* harmony import */ var _crossovers_OrderedCrossover__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./crossovers/OrderedCrossover */ "./src/domain/crossovers/OrderedCrossover.ts");
/* harmony import */ var _crossovers_UniformCrossover__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./crossovers/UniformCrossover */ "./src/domain/crossovers/UniformCrossover.ts");
/* harmony import */ var _crossovers_AlternatingPointCrossover__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./crossovers/AlternatingPointCrossover */ "./src/domain/crossovers/AlternatingPointCrossover.ts");
/* harmony import */ var _crossovers_OnePointCrossover__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./crossovers/OnePointCrossover */ "./src/domain/crossovers/OnePointCrossover.ts");
/* harmony import */ var _mutations_MutationBase__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./mutations/MutationBase */ "./src/domain/mutations/MutationBase.ts");
/* harmony import */ var _mutations_PartialShuffleMutation__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./mutations/PartialShuffleMutation */ "./src/domain/mutations/PartialShuffleMutation.ts");
/* harmony import */ var _mutations_ReverseSequenceMutation__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./mutations/ReverseSequenceMutation */ "./src/domain/mutations/ReverseSequenceMutation.ts");
/* harmony import */ var _mutations_SequenceMutationBase__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./mutations/SequenceMutationBase */ "./src/domain/mutations/SequenceMutationBase.ts");
/* harmony import */ var _mutations_UniformMutation__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./mutations/UniformMutation */ "./src/domain/mutations/UniformMutation.ts");
/* harmony import */ var _terminations_Index__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./terminations/Index */ "./src/domain/terminations/Index.ts");




















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

/***/ "./src/domain/terminations/AndTermination.ts":
/*!***************************************************!*\
  !*** ./src/domain/terminations/AndTermination.ts ***!
  \***************************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ AndTermination
/* harmony export */ });
/* harmony import */ var _LogicalOperatorTerminationBase__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./LogicalOperatorTerminationBase */ "./src/domain/terminations/LogicalOperatorTerminationBase.ts");

class AndTermination extends _LogicalOperatorTerminationBase__WEBPACK_IMPORTED_MODULE_0__.default {
    constructor(terminations) {
        super(terminations.length, terminations);
    }
    performHasReached(geneticAlgorithm) {
        let status = false;
        for (const termination of this.terminations) {
            status = termination.hasReached(geneticAlgorithm);
            if (status === false)
                return false;
        }
        return true;
    }
}


/***/ }),

/***/ "./src/domain/terminations/FitnessStagnationTermination.ts":
/*!*****************************************************************!*\
  !*** ./src/domain/terminations/FitnessStagnationTermination.ts ***!
  \*****************************************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ FitnessStagnationTermination
/* harmony export */ });
/* harmony import */ var _TerminationBase__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TerminationBase */ "./src/domain/terminations/TerminationBase.ts");

class FitnessStagnationTermination extends _TerminationBase__WEBPACK_IMPORTED_MODULE_0__.default {
    constructor(expectedStagnationGenerationNumber) {
        super();
        if (expectedStagnationGenerationNumber === undefined ||
            expectedStagnationGenerationNumber === null)
            this.expectedStagnationGenerationNumber = 100;
        else
            this.expectedStagnationGenerationNumber = expectedStagnationGenerationNumber;
    }
    performHasReached(geneticAlgorithm) {
        const bestFitness = geneticAlgorithm.bestChromosome.fitness;
        if (this.mLastFitness === bestFitness) {
            this.mStagnantGenerationCount++;
        }
        else {
            this.mStagnantGenerationCount = 1;
        }
        this.mLastFitness = bestFitness;
        return this.mStagnantGenerationCount >= this.expectedStagnationGenerationNumber;
    }
}


/***/ }),

/***/ "./src/domain/terminations/FitnessThresholdTermination.ts":
/*!****************************************************************!*\
  !*** ./src/domain/terminations/FitnessThresholdTermination.ts ***!
  \****************************************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ FitnessThresholdTermination
/* harmony export */ });
/* harmony import */ var _TerminationBase__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TerminationBase */ "./src/domain/terminations/TerminationBase.ts");

class FitnessThresholdTermination extends _TerminationBase__WEBPACK_IMPORTED_MODULE_0__.default {
    constructor(expectedFitness) {
        super();
        if (expectedFitness === undefined || expectedFitness == null) {
            this.expectedFitness = 1;
        }
        else {
            this.expectedFitness = expectedFitness;
        }
    }
    performHasReached(geneticAlgorithm) {
        return geneticAlgorithm.bestChromosome.fitness >= this.expectedFitness;
    }
}


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

/***/ "./src/domain/terminations/Index.ts":
/*!******************************************!*\
  !*** ./src/domain/terminations/Index.ts ***!
  \******************************************/
/*! namespace exports */
/*! export AndTermination [provided] [no usage info] [missing usage info prevents renaming] -> ./src/domain/terminations/AndTermination.ts .default */
/*! export FitnessStagnationTermination [provided] [no usage info] [missing usage info prevents renaming] -> ./src/domain/terminations/FitnessStagnationTermination.ts .default */
/*! export FitnessThresholdTermination [provided] [no usage info] [missing usage info prevents renaming] -> ./src/domain/terminations/FitnessThresholdTermination.ts .default */
/*! export GenerationNumberTermination [provided] [no usage info] [missing usage info prevents renaming] -> ./src/domain/terminations/GenerationNumberTermination.ts .default */
/*! export LogicalOperatorTerminationBase [provided] [no usage info] [missing usage info prevents renaming] -> ./src/domain/terminations/LogicalOperatorTerminationBase.ts .default */
/*! export OrTermination [provided] [no usage info] [missing usage info prevents renaming] -> ./src/domain/terminations/OrTermination.ts .default */
/*! export TerminationBase [provided] [no usage info] [missing usage info prevents renaming] -> ./src/domain/terminations/TerminationBase.ts .default */
/*! export TimeEvolvingTermination [provided] [no usage info] [missing usage info prevents renaming] -> ./src/domain/terminations/TimeEvolvingTermination.ts .default */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_exports__, __webpack_require__.d, __webpack_require__.r, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AndTermination": () => /* reexport safe */ _AndTermination__WEBPACK_IMPORTED_MODULE_0__.default,
/* harmony export */   "FitnessStagnationTermination": () => /* reexport safe */ _FitnessStagnationTermination__WEBPACK_IMPORTED_MODULE_1__.default,
/* harmony export */   "FitnessThresholdTermination": () => /* reexport safe */ _FitnessThresholdTermination__WEBPACK_IMPORTED_MODULE_2__.default,
/* harmony export */   "GenerationNumberTermination": () => /* reexport safe */ _GenerationNumberTermination__WEBPACK_IMPORTED_MODULE_3__.default,
/* harmony export */   "LogicalOperatorTerminationBase": () => /* reexport safe */ _LogicalOperatorTerminationBase__WEBPACK_IMPORTED_MODULE_6__.default,
/* harmony export */   "OrTermination": () => /* reexport safe */ _OrTermination__WEBPACK_IMPORTED_MODULE_4__.default,
/* harmony export */   "TerminationBase": () => /* reexport safe */ _TerminationBase__WEBPACK_IMPORTED_MODULE_7__.default,
/* harmony export */   "TimeEvolvingTermination": () => /* reexport safe */ _TimeEvolvingTermination__WEBPACK_IMPORTED_MODULE_5__.default
/* harmony export */ });
/* harmony import */ var _AndTermination__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AndTermination */ "./src/domain/terminations/AndTermination.ts");
/* harmony import */ var _FitnessStagnationTermination__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./FitnessStagnationTermination */ "./src/domain/terminations/FitnessStagnationTermination.ts");
/* harmony import */ var _FitnessThresholdTermination__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./FitnessThresholdTermination */ "./src/domain/terminations/FitnessThresholdTermination.ts");
/* harmony import */ var _GenerationNumberTermination__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./GenerationNumberTermination */ "./src/domain/terminations/GenerationNumberTermination.ts");
/* harmony import */ var _LogicalOperatorTerminationBase__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./LogicalOperatorTerminationBase */ "./src/domain/terminations/LogicalOperatorTerminationBase.ts");
/* harmony import */ var _OrTermination__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./OrTermination */ "./src/domain/terminations/OrTermination.ts");
/* harmony import */ var _TerminationBase__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./TerminationBase */ "./src/domain/terminations/TerminationBase.ts");
/* harmony import */ var _TimeEvolvingTermination__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./TimeEvolvingTermination */ "./src/domain/terminations/TimeEvolvingTermination.ts");











/***/ }),

/***/ "./src/domain/terminations/LogicalOperatorTerminationBase.ts":
/*!*******************************************************************!*\
  !*** ./src/domain/terminations/LogicalOperatorTerminationBase.ts ***!
  \*******************************************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ LogicalOperatorTerminationBase
/* harmony export */ });
class LogicalOperatorTerminationBase {
    constructor(minOperands, terminations) {
        if (minOperands === undefined)
            this.minOperands = 2;
        this.terminations = [];
        if (terminations !== undefined) {
            terminations.concat(terminations);
        }
    }
    hasReached(geneticAlgorithm) {
        if (this.terminations.length < this.minOperands) {
            throw new Error("There should be at least one termination.");
        }
        return this.performHasReached(geneticAlgorithm);
    }
}


/***/ }),

/***/ "./src/domain/terminations/OrTermination.ts":
/*!**************************************************!*\
  !*** ./src/domain/terminations/OrTermination.ts ***!
  \**************************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ OrTermination
/* harmony export */ });
/* harmony import */ var _LogicalOperatorTerminationBase__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./LogicalOperatorTerminationBase */ "./src/domain/terminations/LogicalOperatorTerminationBase.ts");

class OrTermination extends _LogicalOperatorTerminationBase__WEBPACK_IMPORTED_MODULE_0__.default {
    performHasReached(geneticAlgorithm) {
        let status = false;
        for (const termination of this.terminations) {
            status = termination.hasReached(geneticAlgorithm);
            if (status === true)
                return true;
        }
        return false;
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
        this.mHasReached = this.performHasReached(geneticAlgorithm);
        return this.mHasReached;
    }
}


/***/ }),

/***/ "./src/domain/terminations/TimeEvolvingTermination.ts":
/*!************************************************************!*\
  !*** ./src/domain/terminations/TimeEvolvingTermination.ts ***!
  \************************************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ TimeEvolvingTermination
/* harmony export */ });
/* harmony import */ var _TerminationBase__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TerminationBase */ "./src/domain/terminations/TerminationBase.ts");

class TimeEvolvingTermination extends _TerminationBase__WEBPACK_IMPORTED_MODULE_0__.default {
    constructor(maxTime) {
        super();
        if (maxTime === undefined)
            this.maxTime = 10;
        else
            this.maxTime = maxTime;
    }
    performHasReached(geneticAlgorithm) {
        const currentTime = new Date();
        const duration = currentTime.getTime() - geneticAlgorithm.timeEvolving.getTime();
        const durationInSeconds = duration / 1000;
        if (durationInSeconds > this.maxTime)
            return true;
        return false;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9nZW5ldGljanMvLi9zcmMvZG9tYWluL0RlZmF1bHRPcGVyYXRpb25TdHJhdGVneS50cyIsIndlYnBhY2s6Ly9nZW5ldGljanMvLi9zcmMvZG9tYWluL0dlbmV0aWNBbGdvcml0aG0udHMiLCJ3ZWJwYWNrOi8vZ2VuZXRpY2pzLy4vc3JjL2RvbWFpbi9jaHJvbW9zb21lL0JpbmFyeUNocm9tb3NvbWVCYXNlLnRzIiwid2VicGFjazovL2dlbmV0aWNqcy8uL3NyYy9kb21haW4vY2hyb21vc29tZS9DaHJvbW9zb21lQmFzZS50cyIsIndlYnBhY2s6Ly9nZW5ldGljanMvLi9zcmMvZG9tYWluL2Nocm9tb3NvbWUvQ2hyb21vc29tZUV4dGVuc2lvbi50cyIsIndlYnBhY2s6Ly9nZW5ldGljanMvLi9zcmMvZG9tYWluL2Nocm9tb3NvbWUvRGVjaW1hbENocm9tb3NvbWUudHMiLCJ3ZWJwYWNrOi8vZ2VuZXRpY2pzLy4vc3JjL2RvbWFpbi9jaHJvbW9zb21lL0Zsb2F0aW5nUG9pbnRDaHJvbW9zb21lLnRzIiwid2VicGFjazovL2dlbmV0aWNqcy8uL3NyYy9kb21haW4vY2hyb21vc29tZS9HZW5lLnRzIiwid2VicGFjazovL2dlbmV0aWNqcy8uL3NyYy9kb21haW4vY2hyb21vc29tZS9JRUVFRmxvYXRpbmdQb2ludENocm9tb3NvbWUudHMiLCJ3ZWJwYWNrOi8vZ2VuZXRpY2pzLy4vc3JjL2RvbWFpbi9jaHJvbW9zb21lL0luZGV4LnRzIiwid2VicGFjazovL2dlbmV0aWNqcy8uL3NyYy9kb21haW4vY3Jvc3NvdmVycy9BbHRlcm5hdGluZ1BvaW50Q3Jvc3NvdmVyLnRzIiwid2VicGFjazovL2dlbmV0aWNqcy8uL3NyYy9kb21haW4vY3Jvc3NvdmVycy9Dcm9zc092ZXJVdGlsLnRzIiwid2VicGFjazovL2dlbmV0aWNqcy8uL3NyYy9kb21haW4vY3Jvc3NvdmVycy9Dcm9zc292ZXJCYXNlLnRzIiwid2VicGFjazovL2dlbmV0aWNqcy8uL3NyYy9kb21haW4vY3Jvc3NvdmVycy9PbmVQb2ludENyb3Nzb3Zlci50cyIsIndlYnBhY2s6Ly9nZW5ldGljanMvLi9zcmMvZG9tYWluL2Nyb3Nzb3ZlcnMvT3JkZXJlZENyb3Nzb3Zlci50cyIsIndlYnBhY2s6Ly9nZW5ldGljanMvLi9zcmMvZG9tYWluL2Nyb3Nzb3ZlcnMvVW5pZm9ybUNyb3Nzb3Zlci50cyIsIndlYnBhY2s6Ly9nZW5ldGljanMvLi9zcmMvZG9tYWluL2luZGV4LnRzIiwid2VicGFjazovL2dlbmV0aWNqcy8uL3NyYy9kb21haW4vbXV0YXRpb25zL011dGF0aW9uQmFzZS50cyIsIndlYnBhY2s6Ly9nZW5ldGljanMvLi9zcmMvZG9tYWluL211dGF0aW9ucy9QYXJ0aWFsU2h1ZmZsZU11dGF0aW9uLnRzIiwid2VicGFjazovL2dlbmV0aWNqcy8uL3NyYy9kb21haW4vbXV0YXRpb25zL1JldmVyc2VTZXF1ZW5jZU11dGF0aW9uLnRzIiwid2VicGFjazovL2dlbmV0aWNqcy8uL3NyYy9kb21haW4vbXV0YXRpb25zL1NlcXVlbmNlTXV0YXRpb25CYXNlLnRzIiwid2VicGFjazovL2dlbmV0aWNqcy8uL3NyYy9kb21haW4vbXV0YXRpb25zL1VuaWZvcm1NdXRhdGlvbi50cyIsIndlYnBhY2s6Ly9nZW5ldGljanMvLi9zcmMvZG9tYWluL3BvcHVsYXRpb25zL0dlbmVyYXRpb24udHMiLCJ3ZWJwYWNrOi8vZ2VuZXRpY2pzLy4vc3JjL2RvbWFpbi9wb3B1bGF0aW9ucy9Qb3B1bGF0aW9uLnRzIiwid2VicGFjazovL2dlbmV0aWNqcy8uL3NyYy9kb21haW4vcmFuZG9taXphdGlvbi9CYXNpY1JhbmRvbWl6YXRpb24udHMiLCJ3ZWJwYWNrOi8vZ2VuZXRpY2pzLy4vc3JjL2RvbWFpbi9yYW5kb21pemF0aW9uL1JhbmRvbWl6YXRpb25CYXNlLnRzIiwid2VicGFjazovL2dlbmV0aWNqcy8uL3NyYy9kb21haW4vcmFuZG9taXphdGlvbi9SYW5kb21pemF0aW9uUHJvdmlkZXIudHMiLCJ3ZWJwYWNrOi8vZ2VuZXRpY2pzLy4vc3JjL2RvbWFpbi90ZXJtaW5hdGlvbnMvQW5kVGVybWluYXRpb24udHMiLCJ3ZWJwYWNrOi8vZ2VuZXRpY2pzLy4vc3JjL2RvbWFpbi90ZXJtaW5hdGlvbnMvRml0bmVzc1N0YWduYXRpb25UZXJtaW5hdGlvbi50cyIsIndlYnBhY2s6Ly9nZW5ldGljanMvLi9zcmMvZG9tYWluL3Rlcm1pbmF0aW9ucy9GaXRuZXNzVGhyZXNob2xkVGVybWluYXRpb24udHMiLCJ3ZWJwYWNrOi8vZ2VuZXRpY2pzLy4vc3JjL2RvbWFpbi90ZXJtaW5hdGlvbnMvR2VuZXJhdGlvbk51bWJlclRlcm1pbmF0aW9uLnRzIiwid2VicGFjazovL2dlbmV0aWNqcy8uL3NyYy9kb21haW4vdGVybWluYXRpb25zL0luZGV4LnRzIiwid2VicGFjazovL2dlbmV0aWNqcy8uL3NyYy9kb21haW4vdGVybWluYXRpb25zL0xvZ2ljYWxPcGVyYXRvclRlcm1pbmF0aW9uQmFzZS50cyIsIndlYnBhY2s6Ly9nZW5ldGljanMvLi9zcmMvZG9tYWluL3Rlcm1pbmF0aW9ucy9PclRlcm1pbmF0aW9uLnRzIiwid2VicGFjazovL2dlbmV0aWNqcy8uL3NyYy9kb21haW4vdGVybWluYXRpb25zL1Rlcm1pbmF0aW9uQmFzZS50cyIsIndlYnBhY2s6Ly9nZW5ldGljanMvLi9zcmMvZG9tYWluL3Rlcm1pbmF0aW9ucy9UaW1lRXZvbHZpbmdUZXJtaW5hdGlvbi50cyIsIndlYnBhY2s6Ly9nZW5ldGljanMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vZ2VuZXRpY2pzL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9nZW5ldGljanMvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9nZW5ldGljanMvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9nZW5ldGljanMvd2VicGFjay9zdGFydHVw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YztXQUM3RCxFOzs7O1VDTkE7VUFDQTtVQUNBO1VBQ0EiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IElDaHJvbW9zb21lIGZyb20gXCIuL2Nocm9tb3NvbWUvSUNocm9tb3NvbWVcIjtcbmltcG9ydCBJQ3Jvc3NvdmVyIGZyb20gXCIuL2Nyb3Nzb3ZlcnMvSUNyb3Nzb3ZlclwiO1xuaW1wb3J0IElPcGVyYXRpb25TdHJhdGVneSBmcm9tIFwiLi9JT3BlcmF0aW9uU3RyYXRlZ3lcIjtcbmltcG9ydCBJTXV0YXRpb24gZnJvbSBcIi4vbXV0YXRpb25zL0lNdXRhdGlvblwiO1xuaW1wb3J0IElQb3B1bGF0aW9uIGZyb20gXCIuL3BvcHVsYXRpb25zL0lQb3B1bGF0aW9uXCI7XG5pbXBvcnQgUmFuZG9taXphdGlvblByb3ZpZGVyIGZyb20gXCIuL3JhbmRvbWl6YXRpb24vUmFuZG9taXphdGlvblByb3ZpZGVyXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERlZmF1bHRPcGVyYXRpb25TdHJhdGVneSBpbXBsZW1lbnRzIElPcGVyYXRpb25TdHJhdGVneSB7XG4gIGNyb3NzKFxuICAgIHBvcHVsYXRpb246IElQb3B1bGF0aW9uLFxuICAgIGNyb3Nzb3ZlcjogSUNyb3Nzb3ZlcixcbiAgICBjcm9zc292ZXJQcm9iYWJpbGl0eTogbnVtYmVyLFxuICAgIHBhcmVudHM6IElDaHJvbW9zb21lW11cbiAgKTogSUNocm9tb3NvbWVbXSB7XG4gICAgY29uc3QgbWluU2l6ZTogbnVtYmVyID0gcG9wdWxhdGlvbi5taW5TaXplO1xuICAgIGxldCBvZmZzcHJpbmc6IElDaHJvbW9zb21lW10gPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG1pblNpemU7IGkgKz0gY3Jvc3NvdmVyLnBhcmVudE51bWJlcikge1xuICAgICAgY29uc3Qgc2VsZWN0ZWRQYXJlbnRzID0gcGFyZW50cy5zbGljZSgyKS5zcGxpY2UoMCwgY3Jvc3NvdmVyLnBhcmVudE51bWJlcik7XG4gICAgICBpZiAoc2VsZWN0ZWRQYXJlbnRzLmxlbmd0aCA9PT0gY3Jvc3NvdmVyLnBhcmVudE51bWJlciAmJlxuICAgICAgICBSYW5kb21pemF0aW9uUHJvdmlkZXIuY3VycmVudC5nZXREb3VibGUoKSA8PSBjcm9zc292ZXJQcm9iYWJpbGl0eSkge1xuXG4gICAgICAgIGNvbnN0IGNyb3NzID0gY3Jvc3NvdmVyLmNyb3NzKHNlbGVjdGVkUGFyZW50cyk7XG5cbiAgICAgICAgb2Zmc3ByaW5nID0gb2Zmc3ByaW5nLmNvbmNhdChjcm9zcyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG9mZnNwcmluZztcbiAgfVxuICBtdXRhdGUoXG4gICAgbXV0YXRpb246IElNdXRhdGlvbixcbiAgICBtdXRhdGlvblByb2JhYmlsaXR5OiBudW1iZXIsXG4gICAgY2hyb21vc29tZXM6IElDaHJvbW9zb21lW11cbiAgKTogdm9pZCB7XG4gICAgZm9yIChjb25zdCBjaHJvbW9zb21lIG9mIGNocm9tb3NvbWVzKSB7XG4gICAgICBtdXRhdGlvbi5tdXRhdGUoY2hyb21vc29tZSwgbXV0YXRpb25Qcm9iYWJpbGl0eSk7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgSUNocm9tb3NvbWUgZnJvbSBcIi4vY2hyb21vc29tZS9JQ2hyb21vc29tZVwiO1xuaW1wb3J0IElDcm9zc292ZXIgZnJvbSBcIi4vY3Jvc3NvdmVycy9JQ3Jvc3NvdmVyXCI7XG5pbXBvcnQgRGVmYXVsdE9wZXJhdGlvblN0cmF0ZWd5IGZyb20gXCIuL0RlZmF1bHRPcGVyYXRpb25TdHJhdGVneVwiO1xuaW1wb3J0IElGaXRuZXNzIGZyb20gXCIuL2ZpdG5lc3Nlcy9JRml0bmVzc1wiO1xuaW1wb3J0IElHZW5ldGljQWxnb3JpdGhtIGZyb20gXCIuL0lHZW5ldGljQWxnb3JpdGhtXCI7XG5pbXBvcnQgSU9wZXJhdGlvblN0cmF0ZWd5IGZyb20gXCIuL0lPcGVyYXRpb25TdHJhdGVneVwiO1xuaW1wb3J0IElNdXRhdGlvbiBmcm9tIFwiLi9tdXRhdGlvbnMvSU11dGF0aW9uXCI7XG5pbXBvcnQgSVBvcHVsYXRpb24gZnJvbSBcIi4vcG9wdWxhdGlvbnMvSVBvcHVsYXRpb25cIjtcbmltcG9ydCBQb3B1bGF0aW9uIGZyb20gXCIuL3BvcHVsYXRpb25zL1BvcHVsYXRpb25cIjtcbmltcG9ydCB7IElSZWluc2VydGlvbiB9IGZyb20gXCIuL3JlaW5zZXJ0aW9uL0lSZWluc2VydGlvblwiO1xuaW1wb3J0IElTZWxlY3Rpb24gZnJvbSBcIi4vc2VsZWN0aW9ucy9JU2VsZWN0aW9uXCI7XG5pbXBvcnQgeyBJVGVybWluYXRpb24gfSBmcm9tIFwiLi90ZXJtaW5hdGlvbnMvSW5kZXhcIjtcblxuZW51bSBHZW5ldGljQWxnb3JpdGhtU3RhdGUge1xuICBOb3RTdGFydGVkLFxuICBTdGFydGVkLFxuICBTdG9wcGVkLFxuICBSZXN1bWVkLFxuICBUZXJtaW5hdGlvblJlYWNoZWQsXG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdlbmV0aWNBbGdvcml0aG0gaW1wbGVtZW50cyBJR2VuZXRpY0FsZ29yaXRobSB7XG4gIGJlc3RDaHJvbW9zb21lOiBJQ2hyb21vc29tZTtcbiAgY3Jvc3NPdmVyOiBJQ3Jvc3NvdmVyO1xuXG4gIGRlZmF1bHRDcm9zc092ZXJQcm9iYWJpbGl0eTogbnVtYmVyID0gMC43NTtcbiAgZGVmYXVsdE11dGF0aW9uUHJvYmFiaWxpdHk6IG51bWJlciA9IDAuMztcbiAgZml0bmVzczogSUZpdG5lc3M7XG4gIGdlbmVyYXRpb25zTnVtYmVyOiBudW1iZXI7XG4gIG11dGF0aW9uOiBJTXV0YXRpb247XG4gIG9wZXJhdG9yU3RyYXRlZ3k6IElPcGVyYXRpb25TdHJhdGVneTtcbiAgcG9wdWxhdGlvbjogSVBvcHVsYXRpb247XG4gIHJlaW5zZXJ0aW9uOiBJUmVpbnNlcnRpb247XG4gIHNlbGVjdGlvbjogSVNlbGVjdGlvbjtcbiAgdGVybWluYXRpb246IElUZXJtaW5hdGlvbjtcbiAgcHVibGljIHRpbWVFdm9sdmluZzogRGF0ZTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwb3B1bGF0aW9uOiBJUG9wdWxhdGlvbixcbiAgICBmaXRuZXNzOiBJRml0bmVzcyxcbiAgICBzZWxlY3Rpb246IElTZWxlY3Rpb24sXG4gICAgY3Jvc3NPdmVyOiBJQ3Jvc3NvdmVyLFxuICAgIG11dGF0aW9uOiBJTXV0YXRpb24sXG4gICAgcmVpbnNlcnRpb246IElSZWluc2VydGlvbixcbiAgICB0ZXJtaW5hdGlvbjogSVRlcm1pbmF0aW9uXG4gICkge1xuICAgIHRoaXMuc2VsZWN0aW9uID0gc2VsZWN0aW9uO1xuICAgIHRoaXMucG9wdWxhdGlvbiA9IHBvcHVsYXRpb247XG4gICAgdGhpcy5maXRuZXNzID0gZml0bmVzcztcbiAgICB0aGlzLmNyb3NzT3ZlciA9IGNyb3NzT3ZlcjtcbiAgICB0aGlzLm11dGF0aW9uID0gbXV0YXRpb247XG4gICAgdGhpcy50ZXJtaW5hdGlvbiA9IHRlcm1pbmF0aW9uO1xuICAgIHRoaXMub3BlcmF0b3JTdHJhdGVneSA9IG5ldyBEZWZhdWx0T3BlcmF0aW9uU3RyYXRlZ3koKTtcbiAgICB0aGlzLnJlaW5zZXJ0aW9uID0gcmVpbnNlcnRpb247XG5cbiAgICB0aGlzLmdlbmVyYXRpb25zTnVtYmVyID0gMDtcbiAgfVxuXG4gIGNsb25lKCkge1xuICAgIHJldHVybiBuZXcgR2VuZXRpY0FsZ29yaXRobShcbiAgICAgIG5ldyBQb3B1bGF0aW9uKFxuICAgICAgICB0aGlzLnBvcHVsYXRpb24ubWluU2l6ZSxcbiAgICAgICAgdGhpcy5wb3B1bGF0aW9uLm1heFNpemUsXG4gICAgICAgIHRoaXMucG9wdWxhdGlvbi5iZXN0Q2hyb21vc29tZVxuICAgICAgKSxcbiAgICAgIHRoaXMuZml0bmVzcyxcbiAgICAgIHRoaXMuc2VsZWN0aW9uLFxuICAgICAgdGhpcy5jcm9zc092ZXIsXG4gICAgICB0aGlzLm11dGF0aW9uLFxuICAgICAgdGhpcy5yZWluc2VydGlvbixcbiAgICAgIHRoaXMudGVybWluYXRpb25cbiAgICApO1xuICB9XG5cbiAgcHVibGljIGV2b2x2ZU9uZUdlbmVyYXRpb24oKTogYm9vbGVhbiB7XG4gICAgdGhpcy5ldmFsdWF0ZUZpdG5lc3MoKTtcbiAgICBjb25zdCBwYXJlbnRzID0gdGhpcy5zZWxlY3RQYXJlbnRzKCk7XG4gICAgY29uc3Qgb2Zmc3ByaW5nID0gdGhpcy5jcm9zcyhwYXJlbnRzKTtcbiAgICB0aGlzLm11dGF0ZShvZmZzcHJpbmcpO1xuICAgIGNvbnN0IG5ld0dlbmVyYXRpb25DaHJvbW9zb21lID0gdGhpcy5yZWluc2VydChvZmZzcHJpbmcsIHBhcmVudHMpO1xuICAgIHRoaXMucG9wdWxhdGlvbi5jcmVhdGVOZXdHZW5lcmF0aW9uKG5ld0dlbmVyYXRpb25DaHJvbW9zb21lKTtcblxuICAgIHJldHVybiB0aGlzLmVuZEN1cnJlbnRHZW5lcmF0aW9uKCk7XG4gIH1cblxuICBwdWJsaWMgc3RhcnQgPSAoKTogSUNocm9tb3NvbWVbXSA9PiB7XG4gICAgY29uc3QgYmVzdENocm9tb3NvbWVBcnJheSA9IFtdO1xuICAgIHRoaXMudGltZUV2b2x2aW5nID0gbmV3IERhdGUoKTtcbiAgICB3aGlsZSAodGhpcy50ZXJtaW5hdGlvbi5oYXNSZWFjaGVkKHRoaXMpID09PSBmYWxzZSkge1xuICAgICAgdGhpcy5ldm9sdmVPbmVHZW5lcmF0aW9uKCk7XG4gICAgICBiZXN0Q2hyb21vc29tZUFycmF5LnB1c2godGhpcy5iZXN0Q2hyb21vc29tZSk7XG4gICAgICB0aGlzLmdlbmVyYXRpb25zTnVtYmVyKys7XG4gICAgfVxuICAgIHJldHVybiBiZXN0Q2hyb21vc29tZUFycmF5O1xuICB9O1xuXG4gIHByaXZhdGUgY3Jvc3MocGFyZW50czogSUNocm9tb3NvbWVbXSk6IElDaHJvbW9zb21lW10ge1xuICAgIHJldHVybiB0aGlzLm9wZXJhdG9yU3RyYXRlZ3kuY3Jvc3MoXG4gICAgICB0aGlzLnBvcHVsYXRpb24sXG4gICAgICB0aGlzLmNyb3NzT3ZlcixcbiAgICAgIHRoaXMuZGVmYXVsdENyb3NzT3ZlclByb2JhYmlsaXR5LFxuICAgICAgcGFyZW50c1xuICAgICk7XG4gIH1cblxuICBwcml2YXRlIGVuZEN1cnJlbnRHZW5lcmF0aW9uKCk6IGJvb2xlYW4ge1xuICAgIHRoaXMuZXZhbHVhdGVGaXRuZXNzKCk7XG4gICAgdGhpcy5wb3B1bGF0aW9uLmVuZEN1cnJlbnRHZW5lcmF0aW9uKCk7XG4gICAgdGhpcy5iZXN0Q2hyb21vc29tZSA9IHRoaXMucG9wdWxhdGlvbi5iZXN0Q2hyb21vc29tZTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgZXZhbHVhdGUgZml0bmVzcyBmdW5jdGlvbiBieSBkZWZhdWx0IHVzZXMgYSBtYXAgdG8gbG9va3VwIGZvciBhIGZpdG5lc3NcbiAgICogdGhhdCBhbHJlYWR5IGJlZW4gY2FsY3VsYXRlZC5cbiAgICovXG4gIHByaXZhdGUgZXZhbHVhdGVGaXRuZXNzKCk6IHZvaWQge1xuICAgIC8vIFRoZSBldmFsdWF0ZSBmaXRuZXNzIG5lZWRzIHRvIGJlIGRvbmUgdXNpbmcgYXN5bmNcbiAgICBjb25zdCBjaHJvbW9zb21lcyA9IHRoaXMucG9wdWxhdGlvbi5jdXJyZW50R2VuZXJhdGlvbi5jaHJvbW9zb21lcztcbiAgICBmb3IgKGNvbnN0IGNocm9tb3NvbWUgb2YgY2hyb21vc29tZXMpIHtcbiAgICAgIGNvbnN0IGVsZW1lbnQgPSBjaHJvbW9zb21lO1xuICAgICAgLy8gY29uc3QgZml0bmVzcyA9IHRoaXMuZml0bmVzcy5ldmFsdWF0ZShlbGVtZW50KTtcbiAgICAgIGNvbnN0IGZpdG5lc3MgPSB0aGlzLmZpdG5lc3NNYXAoZWxlbWVudCk7XG4gICAgICBlbGVtZW50LmZpdG5lc3MgPSBmaXRuZXNzO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZml0bmVzc01hcCA9IChjaHJvbW9zb21lOiBJQ2hyb21vc29tZSk6IG51bWJlciA9PiB7XG4gICAgY29uc3QgaG06IE1hcDxJQ2hyb21vc29tZSwgbnVtYmVyPiA9IG5ldyBNYXAoKTtcbiAgICBpZiAoaG0uZ2V0KGNocm9tb3NvbWUpID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGNvbnN0IGZpdG5lc3MgPSB0aGlzLmZpdG5lc3MuZXZhbHVhdGUoY2hyb21vc29tZSk7XG4gICAgICBobS5zZXQoY2hyb21vc29tZSwgZml0bmVzcyk7XG4gICAgICByZXR1cm4gZml0bmVzcztcbiAgICB9XG4gICAgcmV0dXJuIGhtLmdldChjaHJvbW9zb21lKTtcbiAgfTtcblxuICBwcml2YXRlIG11dGF0ZShjaHJvbW9zb21lczogSUNocm9tb3NvbWVbXSk6IHZvaWQge1xuICAgIHRoaXMub3BlcmF0b3JTdHJhdGVneS5tdXRhdGUoXG4gICAgICB0aGlzLm11dGF0aW9uLFxuICAgICAgdGhpcy5kZWZhdWx0TXV0YXRpb25Qcm9iYWJpbGl0eSxcbiAgICAgIGNocm9tb3NvbWVzXG4gICAgKTtcbiAgfVxuXG4gIC8vIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzQwMzI4OTMyL2phdmFzY3JpcHQtZXM2LXByb21pc2UtZm9yLWxvb3BcbiAgLy8gaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMzE0MjY3NDAvaG93LXRvLXJldHVybi1tYW55LXByb21pc2VzLWFuZC13YWl0LWZvci10aGVtLWFsbC1iZWZvcmUtZG9pbmctb3RoZXItc3R1ZmZcbiAgcHJpdmF0ZSBwcm9taXNlQXJyID0gKHRvdGFsSXNsYW5kOiBudW1iZXIpOiB2b2lkID0+IHtcbiAgICBjb25zdCBwcm9tQXJyID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0b3RhbElzbGFuZDsgaSsrKSB7XG4gICAgICBjb25zdCBldm9sdmVPbmVHZW5lcmF0aW9uQXN5bmMgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIHJldHVybiByZXNvbHZlKHRoaXMuZXZvbHZlT25lR2VuZXJhdGlvbigpKTtcbiAgICAgIH0pO1xuICAgICAgcHJvbUFyci5wdXNoKGV2b2x2ZU9uZUdlbmVyYXRpb25Bc3luYyk7XG4gICAgfVxuXG4gICAgUHJvbWlzZS5hbGwocHJvbUFycikudGhlbigodmFsdWVzKSA9PiB7XG4gICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLmJlc3RDaHJvbW9zb21lLnRvU3RyaW5nKCkpO1xuICAgIH0pO1xuICB9O1xuXG4gIHByaXZhdGUgcmVpbnNlcnQob2Zmc3ByaW5nOiBJQ2hyb21vc29tZVtdLCBwYXJlbnRzOiBJQ2hyb21vc29tZVtdKSB7XG4gICAgcmV0dXJuIHRoaXMucmVpbnNlcnRpb24uc2VsZWN0Q2hyb21vc29tZSh0aGlzLnBvcHVsYXRpb24sIG9mZnNwcmluZywgcGFyZW50cyk7XG4gIH1cblxuICBwcml2YXRlIHNlbGVjdFBhcmVudHMoKTogSUNocm9tb3NvbWVbXSB7XG4gICAgcmV0dXJuIHRoaXMuc2VsZWN0aW9uLnNlbGVjdENocm9tb3NvbWVzKFxuICAgICAgdGhpcy5wb3B1bGF0aW9uLm1pblNpemUsXG4gICAgICB0aGlzLnBvcHVsYXRpb24uY3VycmVudEdlbmVyYXRpb25cbiAgICApO1xuICB9XG59XG4iLCJpbXBvcnQgeyBJQmluYXJ5Q2hyb21vc29tZSB9IGZyb20gXCIuL0lCaW5hcnlDaHJvbW9zb21lXCI7XG5pbXBvcnQgQ2hyb21vc29tZUJhc2UgZnJvbSBcIi4vQ2hyb21vc29tZUJhc2VcIjtcbmltcG9ydCBHZW5lIGZyb20gXCIuL0dlbmVcIjtcblxuZXhwb3J0IGRlZmF1bHQgYWJzdHJhY3QgY2xhc3MgQmluYXJ5Q2hyb21vc29tZUJhc2UgZXh0ZW5kcyBDaHJvbW9zb21lQmFzZVxuICBpbXBsZW1lbnRzIElCaW5hcnlDaHJvbW9zb21lIHtcbiAgY29uc3RydWN0b3IobGVuZ3RoOiBudW1iZXIpIHtcbiAgICBzdXBlcihsZW5ndGgpO1xuICB9XG5cbiAgZmxpcEdlbmUoaW5kZXg6IG51bWJlcik6IHZvaWQge1xuICAgIGNvbnN0IHZhbHVlID0gdGhpcy5nZXRHZW5lKGluZGV4KTtcbiAgICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCkgdGhyb3cgbmV3IEVycm9yKFwiQmluYXJ5Q2hyb21vc29tZUJhc2UgLSBDYW5ub3QgRmxpcCBhIGdlbmUgd2hpY2ggaXMgdW5kZWZpbmVkXCIpO1xuICAgIHRoaXMucmVwbGFjZUdlbmUoaW5kZXgsIG5ldyBHZW5lKHZhbHVlLm1WYWx1ZSA9PT0gMCA/IDEgOiAwKSk7XG4gIH1cblxuICB0b1N0cmluZygpIHtcbiAgICBjb25zdCBzdHIgPSB0aGlzLmdldEdlbmVzKCkudG9TdHJpbmcoKTtcbiAgICByZXR1cm4gc3RyO1xuICB9XG59XG4iLCJpbXBvcnQgR2VuZSBmcm9tIFwiLi9HZW5lXCI7XG5pbXBvcnQgSUNocm9tb3NvbWUgZnJvbSBcIi4vSUNocm9tb3NvbWVcIjtcblxuZXhwb3J0IGRlZmF1bHQgYWJzdHJhY3QgY2xhc3MgQ2hyb21vc29tZUJhc2UgaW1wbGVtZW50cyBJQ2hyb21vc29tZSB7XG5cbiAgcHJvdGVjdGVkIGNvbnN0cnVjdG9yKGxlbmd0aDogbnVtYmVyKSB7XG4gICAgdGhpcy52YWxpZGF0ZUxlbmd0aChsZW5ndGgpO1xuICAgIHRoaXMubGVuZ3RoID0gbGVuZ3RoO1xuICAgIHRoaXMuZ2VuZXMgPSBbXTtcbiAgfVxuICBwdWJsaWMgZml0bmVzcz86IG51bWJlcjtcbiAgcHVibGljIGdlbmVzOiBHZW5lW107XG4gIHB1YmxpYyBsZW5ndGg6IG51bWJlcjtcblxuICAvLyBjbG9uZSgpOiBJQ2hyb21vc29tZSB7XG4gIC8vICAgdGhyb3cgbmV3IEVycm9yKFwiTWV0aG9kIG5vdCBpbXBsZW1lbnRlZC5cIik7XG4gIC8vIH1cblxuICBhYnN0cmFjdCBjcmVhdGVOZXcoKTogSUNocm9tb3NvbWU7XG4gIGFic3RyYWN0IGdlbmVyYXRlR2VuZShnZW5lSW5kZXg6IG51bWJlcik6IEdlbmU7XG4gIGdldEdlbmUoaW5kZXg6IG51bWJlcik6IEdlbmUge1xuICAgIHJldHVybiB0aGlzLmdlbmVzW2luZGV4XTtcbiAgfVxuXG4gIGdldEdlbmVzKCk6IEdlbmVbXSB7XG4gICAgcmV0dXJuIHRoaXMuZ2VuZXM7XG4gIH1cblxuICByZXBsYWNlR2VuZShpbmRleDogbnVtYmVyLCBnZW5lOiBHZW5lKTogdm9pZCB7XG4gICAgaWYgKGluZGV4IDwgMCB8fCBpbmRleCA+IHRoaXMubGVuZ3RoKSB7XG4gICAgICB0aHJvdyBFcnJvcihcbiAgICAgICAgXCJDaHJvbW9zb21lQmFzZSAtIEluZGV4IGNhbm5vdCBiZSBsZXNzIHRoYW4gMCBhbmQgbW9yZSB0aGFuIHRoZSBsZW5ndGguIFwiICtcbiAgICAgICAgaW5kZXhcbiAgICAgICk7XG4gICAgfVxuXG4gICAgdGhpcy5nZW5lc1tpbmRleF0gPSBnZW5lO1xuICAgIHRoaXMuZml0bmVzcyA9IG51bGw7XG4gIH1cblxuICByZXBsYWNlR2VuZXMoc3RhcnRJbmRleDogbnVtYmVyLCBnZW5lczogR2VuZVtdKTogdm9pZCB7XG5cbiAgICBpZiAoc3RhcnRJbmRleCA8IDApXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJTdGFydCBJbmRleCBjYW5ub3QgYmUgbGVzcyB0aGFuIDBcIik7XG5cbiAgICBjb25zdCBnZW5lc1RvQmVSZXBsYWNlZExlbmd0aCA9IGdlbmVzLmxlbmd0aDtcblxuICAgIGNvbnN0IGF2YWlsYWJsZVNwYWNlTGVuZ3RoID0gdGhpcy5sZW5ndGggLSBzdGFydEluZGV4O1xuXG4gICAgaWYgKGF2YWlsYWJsZVNwYWNlTGVuZ3RoIDwgZ2VuZXNUb0JlUmVwbGFjZWRMZW5ndGgpXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDaHJvbW9zb21lQmFzZSAtIE5vdCBlbm91Z2ggc3BhY2UgdG8gcmVwbGFjZSBnZW5lcy5cIik7XG5cbiAgICBmb3IgKGxldCBpID0gc3RhcnRJbmRleDsgaSA8IGdlbmVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB0aGlzLnJlcGxhY2VHZW5lKGksIGdlbmVzW2ldKTtcbiAgICB9XG4gIH1cbiAgcmVzaXplKG5ld0xlbmd0aDogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy52YWxpZGF0ZUxlbmd0aChuZXdMZW5ndGgpO1xuICB9XG5cbiAgcHJvdGVjdGVkIGNyZWF0ZUdlbmVzKCk6IHZvaWQge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkrKykge1xuICAgICAgdGhpcy5yZXBsYWNlR2VuZShpLCB0aGlzLmdlbmVyYXRlR2VuZShpKSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSB2YWxpZGF0ZUxlbmd0aChsZW5ndGg6IG51bWJlcikge1xuICAgIGlmIChsZW5ndGggPCAyKSB7XG4gICAgICB0aHJvdyBFcnJvcihcIkVycm9yIC0gVGhlIG1pbmltdW0gbGVuZ3RoIGZvciBhIGNocm9tb3NvbWUgaXMgMiBnZW5lc1wiKTtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCBJQ2hyb21vc29tZSBmcm9tIFwiLi9JQ2hyb21vc29tZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDaHJvbW9zb21lRXh0ZW5zaW9uIHtcbiAgc3RhdGljIGFueUhhc1JlcGVhdGVkR2VuZShjaHJvbW9zb21lczogSUNocm9tb3NvbWVbXSk6IGJvb2xlYW4ge1xuICAgIGZvciAoY29uc3QgY2hyb21vc29tZSBvZiBjaHJvbW9zb21lcykge1xuICAgICAgY29uc3QgYyA9IGNocm9tb3NvbWU7XG4gICAgICAvLyBodHRwczovL2NvZGVidXJzdC5pby9qYXZhc2NyaXB0LWFycmF5LWRpc3RpbmN0LTVlZGM5MzUwMWRjNFxuICAgICAgY29uc3QgZ2VuZXMgPSBbXTtcbiAgICAgIGMuZ2V0R2VuZXMoKS5mb3JFYWNoKChzKSA9PiBnZW5lcy5wdXNoKHMubVZhbHVlKSk7XG5cbiAgICAgIGNvbnN0IG5vdFJlcGVhdGVkR2VuZXNMZW5ndGggPSBbLi4ubmV3IFNldChnZW5lcyldLmxlbmd0aDtcbiAgICAgIGlmIChub3RSZXBlYXRlZEdlbmVzTGVuZ3RoIDwgYy5sZW5ndGgpIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBzdGF0aWMgdmFsaWRhdGVHZW5lcyhcbiAgICBjaHJvbW9zb21lPzogSUNocm9tb3NvbWUsXG4gICAgY2hyb21vc29tZXM/OiBJQ2hyb21vc29tZVtdXG4gICk6IGJvb2xlYW4ge1xuXG4gICAgaWYgKGNocm9tb3NvbWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgaWYgKGNocm9tb3NvbWUuZ2V0R2VuZXMoKSA9PT0gdW5kZWZpbmVkKVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgaWYgKGNocm9tb3NvbWVzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGZvciAoY29uc3QgY2ggb2YgY2hyb21vc29tZXMpIHtcbiAgICAgICAgaWYgKGNoLmdldEdlbmVzKCkgPT09IHVuZGVmaW5lZClcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbn1cbiIsImltcG9ydCBSYW5kb21pemF0aW9uUHJvdmlkZXIgZnJvbSBcIi4uL3JhbmRvbWl6YXRpb24vUmFuZG9taXphdGlvblByb3ZpZGVyXCI7XG5pbXBvcnQgQ2hyb21vc29tZUJhc2UgZnJvbSBcIi4vQ2hyb21vc29tZUJhc2VcIjtcbmltcG9ydCBHZW5lIGZyb20gXCIuL0dlbmVcIjtcbmltcG9ydCBJQ2hyb21vc29tZSBmcm9tIFwiLi9JQ2hyb21vc29tZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEZWNpbWFsQ2hyb21vc29tZSBleHRlbmRzIENocm9tb3NvbWVCYXNlIHtcbiAgY29uc3RydWN0b3IoXG4gICAgbGVuZ3RoOiBudW1iZXIsXG4gICAgbWluVmFsdWU/OiBudW1iZXIsXG4gICAgbWF4VmFsdWU/OiBudW1iZXIsXG4gICAgdW5pcXVlPzogYm9vbGVhbixcbiAgICByYW5kb21WYWx1ZXM/OiBudW1iZXJbXVxuICApIHtcbiAgICBzdXBlcihsZW5ndGgpO1xuICAgIHRoaXMubWluVmFsdWUgPSBtaW5WYWx1ZTtcbiAgICB0aGlzLm1heFZhbHVlID0gbWF4VmFsdWU7XG4gICAgdW5pcXVlID09PSB1bmRlZmluZWQgPyAodGhpcy51bmlxdWUgPSBmYWxzZSkgOiAodGhpcy51bmlxdWUgPSB0cnVlKTtcblxuICAgIGlmIChyYW5kb21WYWx1ZXMgPT09IHVuZGVmaW5lZCkge1xuICAgICAgaWYgKHVuaXF1ZSA9PT0gdHJ1ZSlcbiAgICAgICAgdGhpcy5yYW5kb21WYWx1ZXMgPSBSYW5kb21pemF0aW9uUHJvdmlkZXIuY3VycmVudC5nZXRVbmlxdWVJbnRzKGxlbmd0aCwgbWluVmFsdWUsIG1heFZhbHVlKTtcbiAgICAgIGVsc2VcbiAgICAgICAgdGhpcy5yYW5kb21WYWx1ZXMgPSBSYW5kb21pemF0aW9uUHJvdmlkZXIuY3VycmVudC5nZXRJbnRzKGxlbmd0aCwgbWluVmFsdWUsIG1heFZhbHVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5yYW5kb21WYWx1ZXMgPSByYW5kb21WYWx1ZXM7XG4gICAgfVxuXG4gICAgdGhpcy5jcmVhdGVHZW5lcygpO1xuICB9XG4gIHByaXZhdGUgbWF4VmFsdWU6IG51bWJlcjtcbiAgcHJpdmF0ZSBtaW5WYWx1ZTogbnVtYmVyO1xuICBwcml2YXRlIHJhbmRvbVZhbHVlczogbnVtYmVyW107XG4gIHByaXZhdGUgdW5pcXVlOiBib29sZWFuO1xuXG4gIC8vIGNsb25lID0gKCkgPT4ge1xuICAvLyAgIGNvbnN0IGNsb25lID0gbmV3IERlY2ltYWxDaHJvbW9zb21lKFxuICAvLyAgICAgdGhpcy5sZW5ndGgsXG4gIC8vICAgICB0aGlzLm1pblZhbHVlLFxuICAvLyAgICAgdGhpcy5tYXhWYWx1ZSxcbiAgLy8gICAgIHRoaXMudW5pcXVlLFxuICAvLyAgICAgdGhpcy5yYW5kb21WYWx1ZXNcbiAgLy8gICApO1xuICAvLyAgIHJldHVybiBjbG9uZTtcbiAgLy8gfTtcblxuICBjcmVhdGVOZXcoKTogSUNocm9tb3NvbWUge1xuICAgIHJldHVybiBuZXcgRGVjaW1hbENocm9tb3NvbWUodGhpcy5sZW5ndGgsIHRoaXMubWluVmFsdWUsIHRoaXMubWF4VmFsdWUpO1xuICB9XG4gIGdlbmVyYXRlR2VuZShnZW5lSW5kZXg6IG51bWJlcik6IEdlbmUge1xuICAgIHJldHVybiBuZXcgR2VuZSh0aGlzLnJhbmRvbVZhbHVlc1tnZW5lSW5kZXhdKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgQmluYXJ5Q2hyb21vc29tZUJhc2UsIEdlbmUgfSBmcm9tIFwiLi5cIjtcbmltcG9ydCBSYW5kb21pemF0aW9uUHJvdmlkZXIgZnJvbSBcIi4uL3JhbmRvbWl6YXRpb24vUmFuZG9taXphdGlvblByb3ZpZGVyXCI7XG5pbXBvcnQgSUNocm9tb3NvbWUgZnJvbSBcIi4vSUNocm9tb3NvbWVcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRmxvYXRpbmdQb2ludENocm9tb3NvbWUgZXh0ZW5kcyBCaW5hcnlDaHJvbW9zb21lQmFzZSB7XG4gICAgY29uc3RydWN0b3IobWluVmFsdWU6IG51bWJlcltdLCBtYXhWYWx1ZTogbnVtYmVyW10pIHtcblxuICAgICAgICBzdXBlcigzMiAqIG1pblZhbHVlLmxlbmd0aCk7XG5cblxuICAgICAgICB0aGlzLm1pblZhbHVlID0gbWluVmFsdWU7XG4gICAgICAgIHRoaXMubWF4VmFsdWUgPSBtYXhWYWx1ZTtcbiAgICAgICAgdGhpcy5vcmlnaW5hbFZhbHVlID0gdGhpcy5mbGF0dGVuKG1pblZhbHVlLCBtYXhWYWx1ZSk7XG5cbiAgICB9XG5cbiAgICBwcml2YXRlIG1heFZhbHVlOiBudW1iZXJbXTtcbiAgICBwcml2YXRlIG1pblZhbHVlOiBudW1iZXJbXTtcbiAgICBwcml2YXRlIG9yaWdpbmFsVmFsdWU6IG51bWJlcltdO1xuXG4gICAgY3JlYXRlTmV3KCk6IElDaHJvbW9zb21lIHtcbiAgICAgICAgcmV0dXJuIG5ldyBGbG9hdGluZ1BvaW50Q2hyb21vc29tZSh0aGlzLm1pblZhbHVlLCB0aGlzLm1heFZhbHVlKTtcbiAgICB9XG5cbiAgICBleHBhbmQgPSAob3JpZ2luYWxWYWx1ZTogbnVtYmVyW10pOiBudW1iZXJbXSA9PiB7XG4gICAgICAgIGNvbnN0IHJlc3VsdDogbnVtYmVyW10gPSBbXTtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubWF4VmFsdWUubGVuZ3RoOyBpID0gaSArIDMxKSB7XG4gICAgICAgICAgICBjb25zdCBwb3J0aW9uID0gb3JpZ2luYWxWYWx1ZS5zbGljZShpLCBpICsgMSkudG9TdHJpbmcoKS5yZXBsYWNlKC8sL2csIFwiXCIpO1xuICAgICAgICAgICAgcmVzdWx0LnB1c2gocGFyc2VJbnQocG9ydGlvbiwgMTApKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBbXTtcbiAgICB9XG5cblxuICAgIGZsYXR0ZW4gPSAobWluVmFsdWU6IG51bWJlcltdLCBtYXhWYWx1ZTogbnVtYmVyW10pOiBudW1iZXJbXSA9PiB7XG5cbiAgICAgICAgbGV0IHN0ciA9IFwiXCI7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbWluVmFsdWUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IG1pbiA9IG1pblZhbHVlW2ldO1xuICAgICAgICAgICAgY29uc3QgbWF4ID0gbWF4VmFsdWVbaV07XG4gICAgICAgICAgICBjb25zdCByID0gUmFuZG9taXphdGlvblByb3ZpZGVyLmN1cnJlbnQuZ2V0SW50KG1pbiwgbWF4KTtcbiAgICAgICAgICAgIHN0ciArPSBOdW1iZXIocikudG9TdHJpbmcoMikucGFkU3RhcnQoMzIsIFwiMFwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCByZXN1bHQgPSBbXTtcbiAgICAgICAgcmVzdWx0ID0gc3RyLnNwbGl0KFwiXCIpO1xuICAgICAgICBjb25zb2xlLmxvZyhyZXN1bHQpO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIGdlbmVyYXRlR2VuZShnZW5lSW5kZXg6IG51bWJlcik6IEdlbmUge1xuICAgICAgICByZXR1cm4gbmV3IEdlbmUodGhpcy5vcmlnaW5hbFZhbHVlW2dlbmVJbmRleF0pO1xuICAgIH1cblxuXG5cbn0iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBHZW5lIHtcbiAgbVZhbHVlOiBhbnk7XG4gIGNvbnN0cnVjdG9yKHZhbHVlOiBhbnkpIHtcbiAgICB0aGlzLm1WYWx1ZSA9IHZhbHVlO1xuICB9XG5cbiAgZXF1YWxzKG90aGVyOiBHZW5lKTogYm9vbGVhbiB7XG4gICAgaWYgKG90aGVyID09IG51bGwpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIG90aGVyLm1WYWx1ZSA9PT0gdGhpcy5tVmFsdWU7XG4gIH1cbiAgZXF1YWxzT3BlcmF0b3IoZmlyc3Q6IEdlbmUsIHNlY29uZDogR2VuZSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBmaXJzdC5lcXVhbHMoc2Vjb25kKTtcbiAgfVxuXG4gIG5vdEVxdWFsc09wZXJhdG9yKGZpcnN0OiBHZW5lLCBzZWNvbmQ6IEdlbmUpOiBib29sZWFuIHtcbiAgICByZXR1cm4gIWZpcnN0LmVxdWFscyhzZWNvbmQpO1xuICB9XG5cbiAgdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuICh0aGlzLm1WYWx1ZSAhPSBudWxsID8gdGhpcy5tVmFsdWUgOiBcIlwiKS50b1N0cmluZygpO1xuICB9XG59XG4iLCJpbXBvcnQgQmluYXJ5Q2hyb21vc29tZUJhc2UgZnJvbSBcIi4vQmluYXJ5Q2hyb21vc29tZUJhc2VcIjtcbmltcG9ydCBHZW5lIGZyb20gXCIuL0dlbmVcIjtcbmltcG9ydCBJQ2hyb21vc29tZSBmcm9tIFwiLi9JQ2hyb21vc29tZVwiO1xuXG4vKipcbiAqIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzM3MDg4MTk0L2lzLXRoZXJlLWFueS13YXktdG8tc2VlLWEtbnVtYmVyLWluLWl0cy02NC1iaXQtZmxvYXQtaWVlZTc1NC1yZXByZXNlbnRhdGlvblxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJRUVFRmxvYXRpbmdQb2ludENocm9tb3NvbWUgZXh0ZW5kcyBCaW5hcnlDaHJvbW9zb21lQmFzZSB7XG5cbiAgY29uc3RydWN0b3IobVZhbHVlOiBudW1iZXIpIHtcbiAgICBzdXBlcigzMik7XG4gICAgdGhpcy5tVmFsdWUgPSBtVmFsdWU7XG4gICAgY29uc3QgcmVzdWx0ID0gdGhpcy5jb252ZXJ0RmxvYXQzMlRvQmluKG1WYWx1ZSk7XG4gICAgdGhpcy5iaW5BcnJheVN0ciA9IHJlc3VsdC5zcGxpdChcIlwiKTtcblxuICAgIHRoaXMuY3JlYXRlR2VuZXMoKTtcbiAgfVxuXG4gIHByaXZhdGUgYmluQXJyYXlTdHI6IHN0cmluZ1tdO1xuICBwcml2YXRlIG1WYWx1ZTogbnVtYmVyO1xuXG4gIGNyZWF0ZU5ldygpOiBJQ2hyb21vc29tZSB7XG4gICAgcmV0dXJuIG5ldyBJRUVFRmxvYXRpbmdQb2ludENocm9tb3NvbWUodGhpcy5tVmFsdWUpO1xuICB9XG5cbiAgZ2VuZXJhdGVHZW5lKGdlbmVJbmRleDogbnVtYmVyKTogR2VuZSB7XG4gICAgcmV0dXJuIG5ldyBHZW5lKE51bWJlcih0aGlzLmJpbkFycmF5U3RyW2dlbmVJbmRleF0pKTtcbiAgfVxuXG4gIHByaXZhdGUgY29udmVydEZsb2F0MzJUb0JpbiA9IChmbG9hdDMyKSA9PiB7XG4gICAgY29uc3QgSGV4VG9CaW4gPSBoZXggPT4gKHBhcnNlSW50KGhleCwgMTYpLnRvU3RyaW5nKDIpKS5wYWRTdGFydCgzMiwgJzAnKTtcbiAgICBjb25zdCBnZXRIZXggPSBpID0+ICgnMDAnICsgaS50b1N0cmluZygxNikpLnNsaWNlKC0yKTtcbiAgICBjb25zdCB2aWV3ID0gbmV3IERhdGFWaWV3KG5ldyBBcnJheUJ1ZmZlcig0KSlcbiAgICB2aWV3LnNldEZsb2F0MzIoMCwgZmxvYXQzMik7XG4gICAgcmV0dXJuIEhleFRvQmluKEFycmF5LmFwcGx5KG51bGwsIHsgbGVuZ3RoOiA0IH0pLm1hcCgoXywgaSkgPT4gZ2V0SGV4KHZpZXcuZ2V0VWludDgoaSkpKS5qb2luKCcnKSk7XG4gIH1cbn1cblxuZXhwb3J0IHsgSUVFRUZsb2F0aW5nUG9pbnRDaHJvbW9zb21lIH07XG4iLCJpbXBvcnQgQmluYXJ5Q2hyb21vc29tZUJhc2UgZnJvbSBcIi4vQmluYXJ5Q2hyb21vc29tZUJhc2VcIlxuaW1wb3J0IENocm9tb3NvbWVCYXNlIGZyb20gXCIuL0Nocm9tb3NvbWVCYXNlXCJcbmltcG9ydCBDaHJvbW9zb21lRXh0ZW5zaW9uIGZyb20gXCIuL0Nocm9tb3NvbWVFeHRlbnNpb25cIlxuaW1wb3J0IERlY2ltYWxDaHJvbW9zb21lIGZyb20gXCIuL0RlY2ltYWxDaHJvbW9zb21lXCJcbmltcG9ydCBJRUVFRmxvYXRpbmdQb2ludENocm9tb3NvbWUgZnJvbSBcIi4vSUVFRUZsb2F0aW5nUG9pbnRDaHJvbW9zb21lXCJcbmltcG9ydCBHZW5lIGZyb20gXCIuL0dlbmVcIlxuaW1wb3J0IEZsb2F0aW5nUG9pbnRDaHJvbW9zb21lIGZyb20gXCIuL0Zsb2F0aW5nUG9pbnRDaHJvbW9zb21lXCJcblxuZXhwb3J0IHtcbiAgICBCaW5hcnlDaHJvbW9zb21lQmFzZSxcbiAgICBDaHJvbW9zb21lQmFzZSxcbiAgICBDaHJvbW9zb21lRXh0ZW5zaW9uLFxuICAgIERlY2ltYWxDaHJvbW9zb21lLFxuICAgIEZsb2F0aW5nUG9pbnRDaHJvbW9zb21lLFxuICAgIElFRUVGbG9hdGluZ1BvaW50Q2hyb21vc29tZSxcbiAgICBHZW5lXG59IiwiaW1wb3J0IENocm9tb3NvbWVFeHRlbnNpb24gZnJvbSBcIi4uL2Nocm9tb3NvbWUvQ2hyb21vc29tZUV4dGVuc2lvblwiO1xuaW1wb3J0IERlY2ltYWxDaHJvbW9zb21lIGZyb20gXCIuLi9jaHJvbW9zb21lL0RlY2ltYWxDaHJvbW9zb21lXCI7XG5pbXBvcnQgR2VuZSBmcm9tIFwiLi4vY2hyb21vc29tZS9HZW5lXCI7XG5pbXBvcnQgSUNocm9tb3NvbWUgZnJvbSBcIi4uL2Nocm9tb3NvbWUvSUNocm9tb3NvbWVcIjtcbmltcG9ydCBDcm9zc292ZXJCYXNlIGZyb20gXCIuL0Nyb3Nzb3ZlckJhc2VcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQWx0ZXJuYXRpbmdQb2ludENyb3Nzb3ZlciBleHRlbmRzIENyb3Nzb3ZlckJhc2Uge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigyLCAyKTtcbiAgfVxuICBwZXJmb3JtQ3Jvc3MocGFyZW50czogSUNocm9tb3NvbWVbXSk6IElDaHJvbW9zb21lW10ge1xuXG4gICAgY29uc3QgcDEgPSBwYXJlbnRzWzBdO1xuICAgIGNvbnN0IHAyID0gcGFyZW50c1sxXTtcblxuICAgIGlmIChDaHJvbW9zb21lRXh0ZW5zaW9uLmFueUhhc1JlcGVhdGVkR2VuZShwYXJlbnRzKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQWx0ZXJuYXRpbmcgY3Jvc3Mgb3ZlciBoYXMgcmVwZWF0ZWRcIik7XG4gICAgfVxuXG5cbiAgICBjb25zdCBjaGlsZDEgPSB0aGlzLmNyZWF0ZUNoaWxkKHAxLCBwMik7XG4gICAgY29uc3QgY2hpbGQyID0gdGhpcy5jcmVhdGVDaGlsZChwMiwgcDEpO1xuXG4gICAgcmV0dXJuIFtjaGlsZDEsIGNoaWxkMl07XG4gIH1cblxuICBwcml2YXRlIGNyZWF0ZUNoaWxkKFxuICAgIGZpcnN0UGFyZW50OiBJQ2hyb21vc29tZSxcbiAgICBzZWNvbmRQYXJlbnQ6IElDaHJvbW9zb21lXG4gICk6IElDaHJvbW9zb21lIHtcbiAgICBjb25zdCBjaGlsZCA9IFtdO1xuICAgIGNvbnN0IGMgPSBuZXcgRGVjaW1hbENocm9tb3NvbWUoZmlyc3RQYXJlbnQubGVuZ3RoKTtcbiAgICBjb25zdCBwMSA9IFsuLi5maXJzdFBhcmVudC5nZXRHZW5lcygpXTtcbiAgICBjb25zdCBwMiA9IFsuLi5zZWNvbmRQYXJlbnQuZ2V0R2VuZXMoKV07XG4gICAgY29uc3QgcDFHZW5lcyA9IFtdO1xuICAgIGNvbnN0IHAyR2VuZXMgPSBbXTtcbiAgICBwMS5mb3JFYWNoKChlbGVtZW50KSA9PiBwMUdlbmVzLnB1c2goZWxlbWVudC5tVmFsdWUpKTtcbiAgICBwMi5mb3JFYWNoKChlbGVtZW50KSA9PiBwMkdlbmVzLnB1c2goZWxlbWVudC5tVmFsdWUpKTtcblxuICAgIGNvbnN0IGxlbmd0aCA9IHAxLmxlbmd0aDtcbiAgICB3aGlsZSAoY2hpbGQubGVuZ3RoIDwgbGVuZ3RoKSB7XG4gICAgICAhY2hpbGQuaW5jbHVkZXMocDFHZW5lc1swXSlcbiAgICAgICAgPyBjaGlsZC5wdXNoKHAxR2VuZXMuc2hpZnQoKSlcbiAgICAgICAgOiBwMUdlbmVzLnNoaWZ0KCk7XG4gICAgICAhY2hpbGQuaW5jbHVkZXMocDJHZW5lc1swXSlcbiAgICAgICAgPyBjaGlsZC5wdXNoKHAyR2VuZXMuc2hpZnQoKSlcbiAgICAgICAgOiBwMkdlbmVzLnNoaWZ0KCk7XG4gICAgfVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZmlyc3RQYXJlbnQubGVuZ3RoOyBpKyspXG4gICAgICBjLnJlcGxhY2VHZW5lKGksIG5ldyBHZW5lKGNoaWxkW2ldKSk7XG5cbiAgICByZXR1cm4gYztcbiAgfVxufVxuIiwiaW1wb3J0IFJhbmRvbWl6YXRpb25Qcm92aWRlciBmcm9tIFwiLi4vcmFuZG9taXphdGlvbi9SYW5kb21pemF0aW9uUHJvdmlkZXJcIjtcblxuLy8gaHR0cHM6Ly93d3cucmVzZWFyY2hnYXRlLm5ldC9maWd1cmUvQW4tZXhhbXBsZS1vZi1vcmRlci1jcm9zc292ZXJfZmlnNF8yODI5OTg5NTFcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENyb3NzT3ZlclV0aWwge1xuICBzdGF0aWMgb3JkZXJlZENyb3Nzb3ZlciA9IChcbiAgICBwYXJlbnRPbmU6IGFueVtdLFxuICAgIHBhcmVudFR3bzogYW55W10sXG4gICAgcG9zMT8sXG4gICAgcG9zMj9cbiAgKTogYW55W10gPT4ge1xuICAgIGNvbnN0IHBhcmVudE9uZUNsb25lID0gWy4uLnBhcmVudE9uZV07XG4gICAgbGV0IHBhcmVudFR3b0Nsb25lID0gWy4uLnBhcmVudFR3b107XG4gICAgY29uc3QgbGVuZ3RoID0gcGFyZW50T25lLmxlbmd0aDtcbiAgICBjb25zdCByYW5kb20gPSBSYW5kb21pemF0aW9uUHJvdmlkZXIuY3VycmVudFxuICAgICAgLmdldFVuaXF1ZUludHMoMiwgMCwgbGVuZ3RoKVxuICAgICAgLnNvcnQoKGEsIGIpID0+IGEgLSBiKTtcblxuICAgIGlmIChwb3MxID09PSB1bmRlZmluZWQpIHBvczEgPSByYW5kb21bMF07XG4gICAgaWYgKHBvczIgPT09IHVuZGVmaW5lZCkgcG9zMiA9IHJhbmRvbVsxXTtcblxuICAgIGNvbnN0IGNoaWxkID0gW107XG4gICAgY29uc3QgbWFya2VkT3V0ID0gW107XG4gICAgZm9yIChsZXQgaSA9IHBvczE7IGkgPCBwb3MyOyBpKyspIHtcbiAgICAgIG1hcmtlZE91dC5wdXNoKHBhcmVudE9uZUNsb25lW2ldKTtcbiAgICAgIGNoaWxkW2ldID0gcGFyZW50T25lQ2xvbmVbaV07XG4gICAgfVxuXG4gICAgcGFyZW50VHdvQ2xvbmUgPSBwYXJlbnRUd29DbG9uZS5maWx0ZXIoKHZhbCkgPT4gIW1hcmtlZE91dC5pbmNsdWRlcyh2YWwpKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBvczE7IGkrKykgY2hpbGRbaV0gPSBwYXJlbnRUd29DbG9uZS5zaGlmdCgpO1xuICAgIGZvciAobGV0IGkgPSBwb3MyOyBpIDwgbGVuZ3RoOyBpKyspIGNoaWxkW2ldID0gcGFyZW50VHdvQ2xvbmUuc2hpZnQoKTtcblxuICAgIHJldHVybiBjaGlsZDtcbiAgfTtcblxuICBzdGF0aWMgcG14Q3Jvc3NPdmVyID0ge1xuXG4gIH1cbn1cbiIsImltcG9ydCBJQ2hyb21vc29tZSBmcm9tIFwiLi4vY2hyb21vc29tZS9JQ2hyb21vc29tZVwiO1xuaW1wb3J0IElDcm9zc292ZXIgZnJvbSBcIi4vSUNyb3Nzb3ZlclwiO1xuXG5leHBvcnQgZGVmYXVsdCBhYnN0cmFjdCBjbGFzcyBDcm9zc292ZXJCYXNlIGltcGxlbWVudHMgSUNyb3Nzb3ZlciB7XG4gIHB1YmxpYyBjaGlsZHJlbk51bWJlcjogbnVtYmVyO1xuXG4gIGlzT3JkZXJlZDogYm9vbGVhbjtcbiAgcHVibGljIG1pbkNocm9tb3NvbWVMZW5ndGg6IG51bWJlcjtcbiAgcHVibGljIHBhcmVudE51bWJlcjogbnVtYmVyO1xuICBjb25zdHJ1Y3RvcihcbiAgICBwYXJlbnRzTnVtYmVyOiBudW1iZXIsXG4gICAgY2hpbGRyZW5OdW1iZXI6IG51bWJlcixcbiAgICBtaW5DaHJvbW9zb21lTGVuZ3RoPzogbnVtYmVyXG4gICkge1xuICAgIHRoaXMucGFyZW50TnVtYmVyID0gcGFyZW50c051bWJlcjtcbiAgICB0aGlzLmNoaWxkcmVuTnVtYmVyID0gY2hpbGRyZW5OdW1iZXI7XG4gICAgdGhpcy5taW5DaHJvbW9zb21lTGVuZ3RoID0gbWluQ2hyb21vc29tZUxlbmd0aDtcbiAgfVxuXG4gIGNyb3NzKHBhcmVudHM6IElDaHJvbW9zb21lW10pOiBJQ2hyb21vc29tZVtdIHtcbiAgICBpZiAocGFyZW50cyA9PSBudWxsKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiRXJyb3IgLSBDcm9zc092ZXJiYXNlOiBOdW1iZXIgb2YgcGFyZW50cyBjYW5ub3QgYmUgbnVsbC5cIik7XG4gICAgY29uc3QgZmlyc3RQYXJlbnQgPSBwYXJlbnRzWzBdO1xuXG4gICAgaWYgKGZpcnN0UGFyZW50Lmxlbmd0aCA8IHRoaXMubWluQ2hyb21vc29tZUxlbmd0aCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiRXJyb3I6IEEgY2hyb21vc29tZSBzaG91bGQgaGF2ZSBhdCBsZWFzdCAwIGdlbmVzXCIpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5wZXJmb3JtQ3Jvc3MocGFyZW50cyk7XG4gIH1cblxuICBhYnN0cmFjdCBwZXJmb3JtQ3Jvc3MocGFyZW50czogSUNocm9tb3NvbWVbXSk6IElDaHJvbW9zb21lW107XG59XG4iLCJpbXBvcnQgSUNocm9tb3NvbWUgZnJvbSBcIi4uL2Nocm9tb3NvbWUvSUNocm9tb3NvbWVcIjtcbmltcG9ydCBSYW5kb21pemF0aW9uUHJvdmlkZXIgZnJvbSBcIi4uL3JhbmRvbWl6YXRpb24vUmFuZG9taXphdGlvblByb3ZpZGVyXCI7XG5pbXBvcnQgQ3Jvc3NvdmVyQmFzZSBmcm9tIFwiLi9Dcm9zc292ZXJCYXNlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE9uZVBvaW50Q3Jvc3NPdmVyIGV4dGVuZHMgQ3Jvc3NvdmVyQmFzZSB7XG5cbiAgICBjb25zdHJ1Y3Rvcihzd2FwUG9pbnRJbmRleD86IG51bWJlcikge1xuICAgICAgICBzdXBlcigyLCAyKTtcblxuICAgICAgICBpZiAoc3dhcFBvaW50SW5kZXggIT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIHRoaXMuc3dhcFBvaW50SW5kZXggPSBzd2FwUG9pbnRJbmRleDtcbiAgICB9XG5cbiAgICBwcml2YXRlIHN3YXBQb2ludEluZGV4OiBudW1iZXI7XG5cbiAgICBwZXJmb3JtQ3Jvc3MocGFyZW50czogSUNocm9tb3NvbWVbXSk6IElDaHJvbW9zb21lW10ge1xuICAgICAgICBjb25zdCBmaXJzdFBhcmVudCA9IHBhcmVudHNbMF07XG4gICAgICAgIGNvbnN0IHNlY29uZFBhcmVudCA9IHBhcmVudHNbMV07XG5cbiAgICAgICAgY29uc3Qgc3dhcFBvaW50c0xlbmd0aCA9IGZpcnN0UGFyZW50LmdldEdlbmVzKCkubGVuZ3RoIC0gMTtcblxuICAgICAgICBpZiAodGhpcy5zd2FwUG9pbnRJbmRleCA9PT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgdGhpcy5zd2FwUG9pbnRJbmRleCA9IFJhbmRvbWl6YXRpb25Qcm92aWRlci5jdXJyZW50LmdldEludCgwLCBmaXJzdFBhcmVudC5nZXRHZW5lcygpLmxlbmd0aCAtIDEpO1xuXG4gICAgICAgIGlmICh0aGlzLnN3YXBQb2ludEluZGV4ID49IHN3YXBQb2ludHNMZW5ndGgpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlN3YXBQb2ludEluZGV4IC0gVGhlIHN3YXAgcG9pbnQgaW5kZXguXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlQ2hpbGRyZW4oZmlyc3RQYXJlbnQsIHNlY29uZFBhcmVudCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjcmVhdGVDaGlsZChsZWZ0UGFyZW50OiBJQ2hyb21vc29tZSwgcmlnaHRQYXJlbnQ6IElDaHJvbW9zb21lKSB7XG4gICAgICAgIGNvbnN0IGN1dEdlbmVDb3VudCA9IHRoaXMuc3dhcFBvaW50SW5kZXggKyAxO1xuICAgICAgICBjb25zdCBjaGlsZCA9IGxlZnRQYXJlbnQuY3JlYXRlTmV3KCk7XG4gICAgICAgIGNvbnN0IGxlZnQgPSBsZWZ0UGFyZW50LmdldEdlbmVzKCkuc2xpY2UoMCwgY3V0R2VuZUNvdW50KTtcbiAgICAgICAgY29uc3QgcmlnaHQgPSByaWdodFBhcmVudC5nZXRHZW5lcygpLnNsaWNlKGN1dEdlbmVDb3VudCwgcmlnaHRQYXJlbnQuZ2V0R2VuZXMoKS5sZW5ndGggLSAxKTtcbiAgICAgICAgY29uc3QgY29tYmluZWQgPSBsZWZ0LmNvbmNhdChyaWdodCk7XG4gICAgICAgIGNoaWxkLnJlcGxhY2VHZW5lcygwLCBjb21iaW5lZCk7XG5cbiAgICAgICAgcmV0dXJuIGNoaWxkO1xuICAgIH1cblxuICAgIHByaXZhdGUgY3JlYXRlQ2hpbGRyZW4oZmlyc3RQYXJlbnQ6IElDaHJvbW9zb21lLCBzZWNvbmRQYXJlbnQ6IElDaHJvbW9zb21lKTogSUNocm9tb3NvbWVbXSB7XG4gICAgICAgIGNvbnN0IGZpcnN0Q2hpbGQgPSB0aGlzLmNyZWF0ZUNoaWxkKGZpcnN0UGFyZW50LCBzZWNvbmRQYXJlbnQpO1xuICAgICAgICBjb25zdCBzZWNvbmRDaGlsZCA9IHRoaXMuY3JlYXRlQ2hpbGQoc2Vjb25kUGFyZW50LCBmaXJzdFBhcmVudCk7XG4gICAgICAgIHJldHVybiBbZmlyc3RDaGlsZCwgc2Vjb25kQ2hpbGRdO1xuICAgIH1cbn0iLCJpbXBvcnQgQ2hyb21vc29tZUV4dGVuc2lvbiBmcm9tIFwiLi4vY2hyb21vc29tZS9DaHJvbW9zb21lRXh0ZW5zaW9uXCI7XG5pbXBvcnQgSUNocm9tb3NvbWUgZnJvbSBcIi4uL2Nocm9tb3NvbWUvSUNocm9tb3NvbWVcIjtcbmltcG9ydCBSYW5kb21pemF0aW9uUHJvdmlkZXIgZnJvbSBcIi4uL3JhbmRvbWl6YXRpb24vUmFuZG9taXphdGlvblByb3ZpZGVyXCI7XG5pbXBvcnQgQ3Jvc3NvdmVyQmFzZSBmcm9tIFwiLi9Dcm9zc292ZXJCYXNlXCI7XG5pbXBvcnQgQ3Jvc3NPdmVyVXRpbCBmcm9tIFwiLi9Dcm9zc092ZXJVdGlsXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE9yZGVyZWRDcm9zc292ZXIgZXh0ZW5kcyBDcm9zc292ZXJCYXNlIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoMiwgMik7XG4gICAgdGhpcy5pc09yZGVyZWQgPSB0cnVlO1xuICB9XG4gIHBlcmZvcm1Dcm9zcyhwYXJlbnRzOiBJQ2hyb21vc29tZVtdKTogSUNocm9tb3NvbWVbXSB7XG4gICAgY29uc3QgcGFyZW50T25lID0gcGFyZW50c1swXTtcbiAgICBjb25zdCBwYXJlbnRUd28gPSBwYXJlbnRzWzFdO1xuXG4gICAgaWYgKCFDaHJvbW9zb21lRXh0ZW5zaW9uLnZhbGlkYXRlR2VuZXMocGFyZW50T25lKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiT3JkZXJlZCBDcm9zc292ZXIgLSBDYW5ub3QgYmUgdXNlZCEgUGFyZW50IGhhcyBkdXBsaWNhdGUgZ2VuZXMuXCIpO1xuICAgIH1cblxuICAgIGlmIChDaHJvbW9zb21lRXh0ZW5zaW9uLmFueUhhc1JlcGVhdGVkR2VuZShbcGFyZW50T25lLCBwYXJlbnRUd29dKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiT3JkZXJlZCBDcm9zc292ZXIgLSBQYXJlbnRzIGhhdmUgcmVwZWF0ZWQgZ2VuZXNcIik7XG4gICAgfVxuXG4gICAgbGV0IG1pZGRsZVNlY3Rpb25JbmRleGVzID0gUmFuZG9taXphdGlvblByb3ZpZGVyLmN1cnJlbnQuZ2V0VW5pcXVlSW50cyhcbiAgICAgIDIsXG4gICAgICAwLFxuICAgICAgcGFyZW50T25lLmxlbmd0aFxuICAgICk7XG4gICAgbWlkZGxlU2VjdGlvbkluZGV4ZXMgPSBtaWRkbGVTZWN0aW9uSW5kZXhlcy5zb3J0KChhLCBiKSA9PiBhIC0gYik7XG4gICAgY29uc3QgbWlkZGxlU2VjdGlvbkJlZ2luSW5kZXggPSBtaWRkbGVTZWN0aW9uSW5kZXhlc1swXTtcbiAgICBjb25zdCBtaWRkbGVTZWN0aW9uRW5kSW5kZXggPSBtaWRkbGVTZWN0aW9uSW5kZXhlc1sxXTtcblxuICAgIGNvbnN0IGZpcnN0Q2hpbGQgPSB0aGlzLmNyZWF0ZUNoaWxkKFxuICAgICAgcGFyZW50T25lLFxuICAgICAgcGFyZW50VHdvLFxuICAgICAgbWlkZGxlU2VjdGlvbkJlZ2luSW5kZXgsXG4gICAgICBtaWRkbGVTZWN0aW9uRW5kSW5kZXhcbiAgICApO1xuICAgIGNvbnN0IHNlY29uZENoaWxkID0gdGhpcy5jcmVhdGVDaGlsZChcbiAgICAgIHBhcmVudFR3byxcbiAgICAgIHBhcmVudE9uZSxcbiAgICAgIG1pZGRsZVNlY3Rpb25CZWdpbkluZGV4LFxuICAgICAgbWlkZGxlU2VjdGlvbkVuZEluZGV4XG4gICAgKTtcblxuICAgIHJldHVybiBbZmlyc3RDaGlsZCwgc2Vjb25kQ2hpbGRdO1xuICB9XG5cbiAgcHJpdmF0ZSBjcmVhdGVDaGlsZChcbiAgICBmaXJzdFBhcmVudDogSUNocm9tb3NvbWUsXG4gICAgc2Vjb25kUGFyZW50OiBJQ2hyb21vc29tZSxcbiAgICBtaWRkbGVTZWN0aW9uQmVnaW5JbmRleDogbnVtYmVyLFxuICAgIG1pZGRsZVNlY3Rpb25FbmRJbmRleDogbnVtYmVyXG4gICk6IElDaHJvbW9zb21lIHtcbiAgICBjb25zdCBmaXJzdFBhcmVudEdlbmVzID0gZmlyc3RQYXJlbnQuZ2V0R2VuZXMoKTtcbiAgICBjb25zdCBzZWNvbmRQYXJlbnRHZW5lcyA9IHNlY29uZFBhcmVudC5nZXRHZW5lcygpO1xuXG4gICAgY29uc3QgY2hpbGRHZW5lcyA9IENyb3NzT3ZlclV0aWwub3JkZXJlZENyb3Nzb3ZlcihcbiAgICAgIGZpcnN0UGFyZW50R2VuZXMsXG4gICAgICBzZWNvbmRQYXJlbnRHZW5lcyxcbiAgICAgIG1pZGRsZVNlY3Rpb25CZWdpbkluZGV4LFxuICAgICAgbWlkZGxlU2VjdGlvbkVuZEluZGV4XG4gICAgKTtcblxuICAgIGNvbnN0IGNoaWxkID0gZmlyc3RQYXJlbnQuY3JlYXRlTmV3KCk7XG5cbiAgICAvLyBjaGlsZC5yZXBsYWNlR2VuZXMoMCwgY2hpbGRHZW5lcyk7XG4gICAgbGV0IGluZGV4ID0gMDtcbiAgICBmb3IgKGNvbnN0IGdlbmUgb2YgY2hpbGRHZW5lcykge1xuICAgICAgY2hpbGQucmVwbGFjZUdlbmUoaW5kZXgsIGdlbmUpO1xuICAgICAgaW5kZXgrKztcbiAgICB9XG4gICAgcmV0dXJuIGNoaWxkO1xuICB9XG59XG4iLCJpbXBvcnQgSUNocm9tb3NvbWUgZnJvbSBcIi4uL2Nocm9tb3NvbWUvSUNocm9tb3NvbWVcIjtcbmltcG9ydCBDcm9zc292ZXJCYXNlIGZyb20gXCIuL0Nyb3Nzb3ZlckJhc2VcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVW5pZm9ybUNyb3Nzb3ZlciBleHRlbmRzIENyb3Nzb3ZlckJhc2Uge1xuICBjb25zdHJ1Y3RvcihtaXhQcm9iYWJpbGl0eTogbnVtYmVyKSB7XG4gICAgc3VwZXIoMiwgMik7XG4gICAgdGhpcy5taXhQcm9iYWJpbGl0eSA9IG1peFByb2JhYmlsaXR5O1xuICB9XG4gIHByaXZhdGUgbWl4UHJvYmFiaWxpdHk6IG51bWJlcjtcblxuICBwZXJmb3JtQ3Jvc3MocGFyZW50czogSUNocm9tb3NvbWVbXSk6IElDaHJvbW9zb21lW10ge1xuICAgIGNvbnN0IGZpcnN0UGFyZW50ID0gcGFyZW50c1swXTtcbiAgICBjb25zdCBzZWNvbmRQYXJlbnQgPSBwYXJlbnRzWzFdO1xuXG4gICAgY29uc3QgZmlyc3RDaGlsZCA9IGZpcnN0UGFyZW50LmNyZWF0ZU5ldygpO1xuICAgIGNvbnN0IHNlY29uZENoaWxkID0gc2Vjb25kUGFyZW50LmNyZWF0ZU5ldygpO1xuXG4gICAgY29uc3QgY2hpbGRyZW46IElDaHJvbW9zb21lW10gPSBbXTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZmlyc3RQYXJlbnQubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChNYXRoLnJhbmRvbSgpIDwgdGhpcy5taXhQcm9iYWJpbGl0eSkge1xuICAgICAgICBmaXJzdENoaWxkLnJlcGxhY2VHZW5lKGksIGZpcnN0Q2hpbGQuZ2V0R2VuZShpKSk7XG4gICAgICAgIHNlY29uZENoaWxkLnJlcGxhY2VHZW5lKGksIHNlY29uZFBhcmVudC5nZXRHZW5lKGkpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGZpcnN0Q2hpbGQucmVwbGFjZUdlbmUoaSwgc2Vjb25kUGFyZW50LmdldEdlbmUoaSkpO1xuICAgICAgICBzZWNvbmRDaGlsZC5yZXBsYWNlR2VuZShpLCBmaXJzdFBhcmVudC5nZXRHZW5lKGkpKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjaGlsZHJlbi5wdXNoKGZpcnN0Q2hpbGQpO1xuICAgIGNoaWxkcmVuLnB1c2goc2Vjb25kQ2hpbGQpO1xuXG4gICAgcmV0dXJuIGNoaWxkcmVuO1xuICB9XG59XG4iLCJpbXBvcnQgR2VuZXRpY0FsZ29yaXRobSBmcm9tIFwiLi9HZW5ldGljQWxnb3JpdGhtXCI7XG5pbXBvcnQgR2VuZSBmcm9tIFwiLi9jaHJvbW9zb21lL0dlbmVcIjtcbmltcG9ydCB7IEJpbmFyeUNocm9tb3NvbWVCYXNlLCBDaHJvbW9zb21lQmFzZSwgQ2hyb21vc29tZUV4dGVuc2lvbiwgRGVjaW1hbENocm9tb3NvbWUsIEZsb2F0aW5nUG9pbnRDaHJvbW9zb21lIH0gZnJvbSBcIi4vY2hyb21vc29tZS9JbmRleFwiO1xuaW1wb3J0IE9yZGVyZWRDcm9zc292ZXIgZnJvbSBcIi4vY3Jvc3NvdmVycy9PcmRlcmVkQ3Jvc3NvdmVyXCI7XG5pbXBvcnQgVW5pZm9ybUNyb3Nzb3ZlciBmcm9tIFwiLi9jcm9zc292ZXJzL1VuaWZvcm1Dcm9zc292ZXJcIjtcbmltcG9ydCBBbHRlcm5hdGluZ1BvaW50Q3Jvc3NvdmVyIGZyb20gXCIuL2Nyb3Nzb3ZlcnMvQWx0ZXJuYXRpbmdQb2ludENyb3Nzb3ZlclwiO1xuaW1wb3J0IE9uZVBvaW50Q3Jvc3NPdmVyIGZyb20gXCIuL2Nyb3Nzb3ZlcnMvT25lUG9pbnRDcm9zc292ZXJcIjtcbmltcG9ydCBJTXV0YXRpb24gZnJvbSBcIi4vbXV0YXRpb25zL0lNdXRhdGlvblwiO1xuaW1wb3J0IE11dGF0aW9uQmFzZSBmcm9tIFwiLi9tdXRhdGlvbnMvTXV0YXRpb25CYXNlXCI7XG5pbXBvcnQgUGFydGlhbFNodWZmbGVNdXRhdGlvbiBmcm9tIFwiLi9tdXRhdGlvbnMvUGFydGlhbFNodWZmbGVNdXRhdGlvblwiO1xuaW1wb3J0IFJldmVyc2VTZXF1ZW5jZU11dGF0aW9uIGZyb20gXCIuL211dGF0aW9ucy9SZXZlcnNlU2VxdWVuY2VNdXRhdGlvblwiO1xuaW1wb3J0IFNlcXVlbmNlTXV0YXRpb25CYXNlIGZyb20gXCIuL211dGF0aW9ucy9TZXF1ZW5jZU11dGF0aW9uQmFzZVwiO1xuaW1wb3J0IFVuaWZvcm1NdXRhdGlvbiBmcm9tIFwiLi9tdXRhdGlvbnMvVW5pZm9ybU11dGF0aW9uXCI7XG5pbXBvcnQgeyBBbmRUZXJtaW5hdGlvbiwgRml0bmVzc1N0YWduYXRpb25UZXJtaW5hdGlvbiB9IGZyb20gXCIuL3Rlcm1pbmF0aW9ucy9JbmRleFwiO1xuXG4vLyBFeHBvcnQgR2VuZXRpYyBBbGdvcml0aG0gY2xhc3NcbmV4cG9ydCB7IEdlbmV0aWNBbGdvcml0aG0gfVxuXG4vLyBFeHBvcnQgQ2hyb21vc29tZXNcbmV4cG9ydCB7IEJpbmFyeUNocm9tb3NvbWVCYXNlLCBDaHJvbW9zb21lQmFzZSwgQ2hyb21vc29tZUV4dGVuc2lvbiwgRGVjaW1hbENocm9tb3NvbWUsIEdlbmUsIEZsb2F0aW5nUG9pbnRDaHJvbW9zb21lIH1cblxuZXhwb3J0IHsgQWx0ZXJuYXRpbmdQb2ludENyb3Nzb3ZlciwgT25lUG9pbnRDcm9zc092ZXIsIE9yZGVyZWRDcm9zc292ZXIsIFVuaWZvcm1Dcm9zc292ZXIgfVxuXG5leHBvcnQgeyBBbmRUZXJtaW5hdGlvbiwgRml0bmVzc1N0YWduYXRpb25UZXJtaW5hdGlvbiB9XG5cbmV4cG9ydCB7XG4gICAgSU11dGF0aW9uLCBNdXRhdGlvbkJhc2UsIFBhcnRpYWxTaHVmZmxlTXV0YXRpb24sIFJldmVyc2VTZXF1ZW5jZU11dGF0aW9uLFxuICAgIFNlcXVlbmNlTXV0YXRpb25CYXNlLCBVbmlmb3JtTXV0YXRpb25cbn1cblxuXG5cbiIsImltcG9ydCBJQ2hyb21vc29tZSBmcm9tIFwiLi4vY2hyb21vc29tZS9JQ2hyb21vc29tZVwiO1xuaW1wb3J0IElNdXRhdGlvbiBmcm9tIFwiLi9JTXV0YXRpb25cIjtcblxuZXhwb3J0IGRlZmF1bHQgYWJzdHJhY3QgY2xhc3MgTXV0YXRpb25CYXNlIGltcGxlbWVudHMgSU11dGF0aW9uIHtcblxuICBpc09yZGVyZWQ6IGJvb2xlYW47XG4gIG11dGF0ZShjaHJvbW9zb21lOiBJQ2hyb21vc29tZSwgcHJvYmFiaWxpdHk6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMucGVyZm9ybU11dGF0ZShjaHJvbW9zb21lLCBwcm9iYWJpbGl0eSk7XG4gIH1cblxuICBhYnN0cmFjdCBwZXJmb3JtTXV0YXRlKGNocm9tb3NvbWU6IElDaHJvbW9zb21lLCBwcm9iYWJpbGl0eTogbnVtYmVyKTogdm9pZDtcbn1cbiIsImltcG9ydCBHZW5lIGZyb20gXCIuLi9jaHJvbW9zb21lL0dlbmVcIjtcbmltcG9ydCBTZXF1ZW5jZU11dGF0aW9uQmFzZSBmcm9tIFwiLi9TZXF1ZW5jZU11dGF0aW9uQmFzZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQYXJ0aWFsU2h1ZmZsZU11dGF0aW9uIGV4dGVuZHMgU2VxdWVuY2VNdXRhdGlvbkJhc2Uge1xuICBtdXRhdGVPblNlcXVlbmNlKHNlcXVlbmNlOiBHZW5lW10pOiBHZW5lW10ge1xuICAgIGNvbnN0IG11dGF0ZWQgPSBzZXF1ZW5jZS5zb3J0KCgpID0+IDAuNSAtIE1hdGgucmFuZG9tKCkpO1xuICAgIHJldHVybiBtdXRhdGVkO1xuICB9XG59XG4iLCJpbXBvcnQgR2VuZSBmcm9tIFwiLi4vY2hyb21vc29tZS9HZW5lXCI7XG5pbXBvcnQgU2VxdWVuY2VNdXRhdGlvbkJhc2UgZnJvbSBcIi4vU2VxdWVuY2VNdXRhdGlvbkJhc2VcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmV2ZXJzZVNlcXVlbmNlTXV0YXRpb24gZXh0ZW5kcyBTZXF1ZW5jZU11dGF0aW9uQmFzZSB7XG4gIG11dGF0ZU9uU2VxdWVuY2Uoc2VxdWVuY2U6IEdlbmVbXSk6IEdlbmVbXSB7XG4gICAgcmV0dXJuIHNlcXVlbmNlLnJldmVyc2UoKTtcbiAgfVxufVxuIiwiaW1wb3J0IEdlbmUgZnJvbSBcIi4uL2Nocm9tb3NvbWUvR2VuZVwiO1xuaW1wb3J0IElDaHJvbW9zb21lIGZyb20gXCIuLi9jaHJvbW9zb21lL0lDaHJvbW9zb21lXCI7XG5pbXBvcnQgUmFuZG9taXphdGlvblByb3ZpZGVyIGZyb20gXCIuLi9yYW5kb21pemF0aW9uL1JhbmRvbWl6YXRpb25Qcm92aWRlclwiO1xuaW1wb3J0IE11dGF0aW9uQmFzZSBmcm9tIFwiLi9NdXRhdGlvbkJhc2VcIjtcblxuZXhwb3J0IGRlZmF1bHQgYWJzdHJhY3QgY2xhc3MgU2VxdWVuY2VNdXRhdGlvbkJhc2UgZXh0ZW5kcyBNdXRhdGlvbkJhc2Uge1xuXG4gIGFic3RyYWN0IG11dGF0ZU9uU2VxdWVuY2Uoc2VxdWVuY2U6IEdlbmVbXSk6IEdlbmVbXTtcblxuICBwZXJmb3JtTXV0YXRlKGNocm9tb3NvbWU6IElDaHJvbW9zb21lLCBwcm9iYWJpbGl0eTogbnVtYmVyKSB7XG4gICAgdGhpcy52YWxpZGF0ZUxlbmd0aChjaHJvbW9zb21lKTtcblxuICAgIGNvbnN0IHIgPSBSYW5kb21pemF0aW9uUHJvdmlkZXIuY3VycmVudDtcblxuICAgIGlmIChyLmdldERvdWJsZSgpIDw9IHByb2JhYmlsaXR5KSB7XG4gICAgICBjb25zdCBpbmRleGVzID0gclxuICAgICAgICAuZ2V0VW5pcXVlSW50cygyLCAwLCBjaHJvbW9zb21lLmxlbmd0aClcbiAgICAgICAgLnNvcnQoKGEsIGIpID0+IGEgLSBiKTtcbiAgICAgIGNvbnN0IGZpcnN0SW5kZXggPSBpbmRleGVzWzBdO1xuICAgICAgY29uc3Qgc2Vjb25kSW5kZXggPSBpbmRleGVzWzFdO1xuICAgICAgY29uc3Qgc2VxdWVuY2VMZW5ndGggPSBzZWNvbmRJbmRleCAtIGZpcnN0SW5kZXggKyAxO1xuICAgICAgY29uc3Qgc2VxdWVuY2UgPSBjaHJvbW9zb21lLmdldEdlbmVzKCkuc2xpY2UoZmlyc3RJbmRleCwgc2Vjb25kSW5kZXgpO1xuICAgICAgY29uc3QgbXV0YXRlZFNlcXVlbmNlID0gdGhpcy5tdXRhdGVPblNlcXVlbmNlKHNlcXVlbmNlKTtcblxuICAgICAgY2hyb21vc29tZS5yZXBsYWNlR2VuZXMoZmlyc3RJbmRleCwgbXV0YXRlZFNlcXVlbmNlKTtcbiAgICB9XG4gIH1cbiAgcHJvdGVjdGVkIHZhbGlkYXRlTGVuZ3RoKGNocm9tb3NvbWU6IElDaHJvbW9zb21lKSB7XG4gICAgaWYgKGNocm9tb3NvbWUubGVuZ3RoIDwgMykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICBcIlNlcXVlbmNlTXV0YXRpb25CYXNlIC0gQSBjaHJvbW9zb21lIHNob3VsZCBoYXZlIGF0IGxlYXN0IDMgZ2VuZXNcIlxuICAgICAgKTtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCBJQ2hyb21vc29tZSBmcm9tIFwiLi4vY2hyb21vc29tZS9JQ2hyb21vc29tZVwiO1xuaW1wb3J0IE11dGF0aW9uQmFzZSBmcm9tIFwiLi9NdXRhdGlvbkJhc2VcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVW5pZm9ybU11dGF0aW9uIGV4dGVuZHMgTXV0YXRpb25CYXNlIHtcbiAgICBwZXJmb3JtTXV0YXRlKGNocm9tb3NvbWU6IElDaHJvbW9zb21lLCBwcm9iYWJpbGl0eTogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIk1ldGhvZCBub3QgaW1wbGVtZW50ZWQuXCIpO1xuICAgIH1cblxufSIsImltcG9ydCBJQ2hyb21vc29tZSBmcm9tIFwiLi4vY2hyb21vc29tZS9JQ2hyb21vc29tZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHZW5lcmF0aW9uIHtcbiAgY2hyb21vc29tZXM6IElDaHJvbW9zb21lW107XG5cbiAgY29uc3RydWN0b3IobnVtOiBudW1iZXIsIGNocm9tb3NvbWVzOiBJQ2hyb21vc29tZVtdKSB7XG4gICAgaWYgKG51bSA8IDEpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkdlbmVyYXRpb24gbnVtYmVyIFwiICsgbnVtICsgXCJpcyBpbnZhbGlkLlwiKTtcbiAgICB9XG5cbiAgICBpZiAoY2hyb21vc29tZXMubGVuZ3RoIDwgMikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQSBnZW5lcmF0aW9uIHNob3VsZCBoYXZlIGF0IGxlYXN0IDIgY2hyb21vc29tZVwiKTtcbiAgICB9XG4gICAgdGhpcy5udW0gPSBudW07XG4gICAgdGhpcy5jcmVhdGlvbkRhdGUgPSBuZXcgRGF0ZSgpO1xuICAgIHRoaXMuY2hyb21vc29tZXMgPSBjaHJvbW9zb21lcztcbiAgfVxuICBwcml2YXRlIGJlc3RDaHJvbW9zb21lczogSUNocm9tb3NvbWU7XG4gIHByaXZhdGUgY3JlYXRpb25EYXRlOiBEYXRlO1xuICBwcml2YXRlIG51bTogbnVtYmVyO1xuXG4gIGVuZChjaHJvbW9zb21lc051bWJlcjogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5jaHJvbW9zb21lcyA9IHRoaXMuY2hyb21vc29tZXNcbiAgICAgIC5maWx0ZXIoKGNocm9tb3NvbWUpID0+IHRoaXMudmFsaWRhdGVDaHJvbW9zb21lKGNocm9tb3NvbWUpID09PSB0cnVlKVxuICAgICAgLnNvcnQoKGEsIGIpID0+IGIuZml0bmVzcyAtIGEuZml0bmVzcyk7XG5cbiAgICB0aGlzLmNocm9tb3NvbWVzID0gdGhpcy5jaHJvbW9zb21lcy5zbGljZSgwLCBjaHJvbW9zb21lc051bWJlcik7XG5cbiAgICB0aGlzLmJlc3RDaHJvbW9zb21lcyA9IHRoaXMuY2hyb21vc29tZXNbMF07XG4gIH1cblxuICBnZXRDaHJvbW9zb21lKCk6IElDaHJvbW9zb21lW10ge1xuICAgIHJldHVybiB0aGlzLmNocm9tb3NvbWVzO1xuICB9XG5cbiAgdG9TdHJpbmcoKSB7XG4gICAgLy8gcmV0dXJuIFwiXCI7XG4gICAgcmV0dXJuIHRoaXMuYmVzdENocm9tb3NvbWVzLmdldEdlbmVzKCkudG9TdHJpbmcoKTtcbiAgfVxuXG4gIHZhbGlkYXRlQ2hyb21vc29tZShjaHJvbW9zb21lOiBJQ2hyb21vc29tZSk6IGJvb2xlYW4ge1xuICAgIGlmIChjaHJvbW9zb21lLmZpdG5lc3MgPT0gbnVsbCkgdGhyb3cgbmV3IEVycm9yKFwiTm8gZml0bmVzc1wiKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxufVxuIiwiaW1wb3J0IElDaHJvbW9zb21lIGZyb20gXCIuLi9jaHJvbW9zb21lL0lDaHJvbW9zb21lXCI7XG5pbXBvcnQgR2VuZXJhdGlvbiBmcm9tIFwiLi9HZW5lcmF0aW9uXCI7XG5pbXBvcnQgSVBvcHVsYXRpb24gZnJvbSBcIi4vSVBvcHVsYXRpb25cIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUG9wdWxhdGlvbiBpbXBsZW1lbnRzIElQb3B1bGF0aW9uIHtcbiAgcHVibGljIGFkYW1DaHJvbW9zb21lOiBJQ2hyb21vc29tZTtcbiAgYmVzdENocm9tb3NvbWU6IElDaHJvbW9zb21lO1xuICBjcmVhdGlvbkRhdGU6IERhdGU7XG4gIGN1cnJlbnRHZW5lcmF0aW9uOiBHZW5lcmF0aW9uO1xuICBnZW5lcmF0aW9uTnVtYmVyOiBudW1iZXI7XG4gIGdlbmVyYXRpb25zOiBHZW5lcmF0aW9uW107XG4gIG1heFNpemU6IG51bWJlcjtcbiAgbWluU2l6ZTogbnVtYmVyO1xuXG4gIGNvbnN0cnVjdG9yKG1pblNpemU6IG51bWJlciwgbWF4U2l6ZTogbnVtYmVyLCBhZGFtQ2hyb21vc29tZTogSUNocm9tb3NvbWUpIHtcbiAgICBpZiAobWluU2l6ZSA8IDIpIHRocm93IG5ldyBFcnJvcigpO1xuICAgIGlmIChtYXhTaXplIDwgbWluU2l6ZSkgdGhyb3cgbmV3IEVycm9yKCk7XG5cbiAgICB0aGlzLmNyZWF0aW9uRGF0ZSA9IG5ldyBEYXRlKCk7XG4gICAgdGhpcy5taW5TaXplID0gbWluU2l6ZTtcbiAgICB0aGlzLm1heFNpemUgPSBtYXhTaXplO1xuICAgIHRoaXMuZ2VuZXJhdGlvbnMgPSBbXTtcbiAgICB0aGlzLmFkYW1DaHJvbW9zb21lID0gYWRhbUNocm9tb3NvbWU7XG4gICAgdGhpcy5iZXN0Q2hyb21vc29tZSA9IGFkYW1DaHJvbW9zb21lO1xuXG4gICAgdGhpcy5jcmVhdGVJbml0aWFsR2VuZXJhdGlvbigpO1xuICB9XG5cbiAgY3JlYXRlSW5pdGlhbEdlbmVyYXRpb24oKTogdm9pZCB7XG4gICAgdGhpcy5nZW5lcmF0aW9ucyA9IFtdO1xuICAgIHRoaXMuZ2VuZXJhdGlvbk51bWJlciA9IDA7XG4gICAgY29uc3QgY2hyb21vc29tZXMgPSBbXTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5taW5TaXplOyBpKyspIHtcbiAgICAgIGNvbnN0IGMgPSB0aGlzLmFkYW1DaHJvbW9zb21lLmNyZWF0ZU5ldygpO1xuXG4gICAgICBpZiAoYyA9PSBudWxsKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIlwiKTtcbiAgICAgIH1cblxuICAgICAgY2hyb21vc29tZXMucHVzaChjKTtcbiAgICB9XG5cbiAgICB0aGlzLmNyZWF0ZU5ld0dlbmVyYXRpb24oY2hyb21vc29tZXMpO1xuICB9XG5cbiAgY3JlYXRlTmV3R2VuZXJhdGlvbihjaHJvbW9zb21lcz86IElDaHJvbW9zb21lW10pOiB2b2lkIHtcbiAgICB0aGlzLmN1cnJlbnRHZW5lcmF0aW9uID0gbmV3IEdlbmVyYXRpb24oXG4gICAgICArK3RoaXMuZ2VuZXJhdGlvbk51bWJlcixcbiAgICAgIGNocm9tb3NvbWVzXG4gICAgKTtcbiAgICB0aGlzLmdlbmVyYXRpb25zLnB1c2godGhpcy5jdXJyZW50R2VuZXJhdGlvbik7XG4gIH1cbiAgZW5kQ3VycmVudEdlbmVyYXRpb24oKTogdm9pZCB7XG4gICAgdGhpcy5jdXJyZW50R2VuZXJhdGlvbi5lbmQodGhpcy5tYXhTaXplKTtcbiAgICBpZiAoXG4gICAgICB0aGlzLmJlc3RDaHJvbW9zb21lLmZpdG5lc3MgPFxuICAgICAgdGhpcy5jdXJyZW50R2VuZXJhdGlvbi5jaHJvbW9zb21lc1swXS5maXRuZXNzIHx8XG4gICAgICB0aGlzLmJlc3RDaHJvbW9zb21lID09PSB1bmRlZmluZWRcbiAgICApIHtcbiAgICAgIHRoaXMuYmVzdENocm9tb3NvbWUgPSB0aGlzLmN1cnJlbnRHZW5lcmF0aW9uLmNocm9tb3NvbWVzWzBdO1xuICAgIH1cbiAgfVxuXG4gIHRvU3RyaW5nID0gKCkgPT4ge1xuICAgIGxldCBzdHIgPSBcIlwiO1xuICAgIGZvciAoY29uc3QgZ2VuZXJhdGlvbiBvZiB0aGlzLmdlbmVyYXRpb25zKSB7XG4gICAgICBzdHIgKz0gdGhpcy5nZW5lcmF0aW9ucy50b1N0cmluZygpO1xuICAgIH1cbiAgICByZXR1cm4gc3RyO1xuICB9O1xufVxuIiwiaW1wb3J0IFJhbmRvbWl6YXRpb25CYXNlIGZyb20gXCIuL1JhbmRvbWl6YXRpb25CYXNlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJhc2ljUmFuZG9taXphdGlvbiBleHRlbmRzIFJhbmRvbWl6YXRpb25CYXNlIHtcbiAgZ2V0RG91YmxlKG1pbj86IG51bWJlciwgbWF4PzogbnVtYmVyKTogbnVtYmVyIHtcbiAgICBpZiAobWluID09PSB1bmRlZmluZWQgfHwgbWF4ID09PSB1bmRlZmluZWQpIHJldHVybiBNYXRoLnJhbmRvbSgpO1xuICAgIHJldHVybiBNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbikgKyBtaW47XG4gIH1cblxuICBnZXRGbG9hdChtaW4/OiBudW1iZXIsIG1heD86IG51bWJlcik6IG51bWJlciB7XG4gICAgcmV0dXJuIE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluKSArIG1pbjtcbiAgfVxuICBnZXRJbnQobWluOiBudW1iZXIsIG1heDogbnVtYmVyKTogbnVtYmVyIHtcbiAgICBtaW4gPSBNYXRoLmNlaWwobWluKTtcbiAgICBtYXggPSBNYXRoLmZsb29yKG1heCk7XG4gICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4pICsgbWluKTsgLy8gVGhlIG1heGltdW0gaXMgZXhjbHVzaXZlIGFuZCB0aGUgbWluaW11bSBpcyBpbmNsdXNpdmVcbiAgfVxuICBnZXRVbmlxdWVJbnRzKGxlbmd0aDogbnVtYmVyLCBtaW46IG51bWJlciwgbWF4OiBudW1iZXIpOiBudW1iZXJbXSB7XG4gICAgY29uc3Qgc3R1YiA9IFtdO1xuICAgIGZvciAobGV0IGkgPSBtaW47IGkgPCBtYXg7IGkrKykge1xuICAgICAgc3R1Yi5wdXNoKGkpO1xuICAgIH1cbiAgICByZXR1cm4gc3R1YlxuICAgICAgLnNvcnQoKCkgPT4ge1xuICAgICAgICByZXR1cm4gMC41IC0gTWF0aC5yYW5kb20oKTtcbiAgICAgIH0pXG4gICAgICAuc2xpY2UoMCwgbGVuZ3RoKTtcbiAgfVxufVxuIiwiaW1wb3J0IElSYW5kb21pemF0aW9uIGZyb20gXCIuL0lSYW5kb21pemF0aW9uXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGFic3RyYWN0IGNsYXNzIFJhbmRvbWl6YXRpb25CYXNlIGltcGxlbWVudHMgSVJhbmRvbWl6YXRpb24ge1xuICBhYnN0cmFjdCBnZXREb3VibGUobWluPzogbnVtYmVyLCBtYXg/OiBudW1iZXIpOiBudW1iZXI7XG4gIGFic3RyYWN0IGdldEZsb2F0KG1pbj86IG51bWJlciwgbWF4PzogbnVtYmVyKTogbnVtYmVyO1xuICBhYnN0cmFjdCBnZXRJbnQobWluOiBudW1iZXIsIG1heDogbnVtYmVyKTogbnVtYmVyO1xuXG4gIGdldEludHMobGVuZ3RoOiBudW1iZXIsIG1pbjogbnVtYmVyLCBtYXg6IG51bWJlcik6IG51bWJlcltdIHtcbiAgICBjb25zdCByZXN1bHQgPSBbXTtcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgbGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICByZXN1bHQucHVzaCh0aGlzLmdldEludChtaW4sIG1heCkpO1xuICAgIH1cblxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBhYnN0cmFjdCBnZXRVbmlxdWVJbnRzKGxlbmd0aDogbnVtYmVyLCBtaW46IG51bWJlciwgbWF4OiBudW1iZXIpOiBudW1iZXJbXTtcbn1cbiIsImltcG9ydCBCYXNpY1JhbmRvbWl6YXRpb24gZnJvbSBcIi4vQmFzaWNSYW5kb21pemF0aW9uXCI7XG5pbXBvcnQgSVJhbmRvbWl6YXRpb24gZnJvbSBcIi4vSVJhbmRvbWl6YXRpb25cIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmFuZG9taXphdGlvblByb3ZpZGVyIHtcbiAgc3RhdGljIGN1cnJlbnQ6IElSYW5kb21pemF0aW9uID0gbmV3IEJhc2ljUmFuZG9taXphdGlvbigpO1xufVxuIiwiaW1wb3J0IElHZW5ldGljQWxnb3JpdGhtIGZyb20gXCIuLi9JR2VuZXRpY0FsZ29yaXRobVwiO1xuaW1wb3J0IElUZXJtaW5hdGlvbiBmcm9tIFwiLi9JVGVybWluYXRpb25cIjtcbmltcG9ydCBMb2dpY2FsT3BlcmF0b3JUZXJtaW5hdGlvbkJhc2UgZnJvbSBcIi4vTG9naWNhbE9wZXJhdG9yVGVybWluYXRpb25CYXNlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFuZFRlcm1pbmF0aW9uIGV4dGVuZHMgTG9naWNhbE9wZXJhdG9yVGVybWluYXRpb25CYXNlIHtcbiAgICBjb25zdHJ1Y3Rvcih0ZXJtaW5hdGlvbnM6IElUZXJtaW5hdGlvbltdKSB7XG4gICAgICAgIHN1cGVyKHRlcm1pbmF0aW9ucy5sZW5ndGgsIHRlcm1pbmF0aW9ucyk7XG4gICAgfVxuXG5cbiAgICBwZXJmb3JtSGFzUmVhY2hlZChnZW5ldGljQWxnb3JpdGhtOiBJR2VuZXRpY0FsZ29yaXRobSk6IGJvb2xlYW4ge1xuXG4gICAgICAgIGxldCBzdGF0dXM6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgICAgICBmb3IgKGNvbnN0IHRlcm1pbmF0aW9uIG9mIHRoaXMudGVybWluYXRpb25zKSB7XG4gICAgICAgICAgICBzdGF0dXMgPSB0ZXJtaW5hdGlvbi5oYXNSZWFjaGVkKGdlbmV0aWNBbGdvcml0aG0pO1xuICAgICAgICAgICAgaWYgKHN0YXR1cyA9PT0gZmFsc2UpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG59IiwiaW1wb3J0IElHZW5ldGljQWxnb3JpdGhtIGZyb20gXCIuLi9JR2VuZXRpY0FsZ29yaXRobVwiO1xuaW1wb3J0IFRlcm1pbmF0aW9uQmFzZSBmcm9tIFwiLi9UZXJtaW5hdGlvbkJhc2VcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRml0bmVzc1N0YWduYXRpb25UZXJtaW5hdGlvbiBleHRlbmRzIFRlcm1pbmF0aW9uQmFzZSB7XG4gICAgcHVibGljIGV4cGVjdGVkU3RhZ25hdGlvbkdlbmVyYXRpb25OdW1iZXI6IG51bWJlcjtcbiAgICBjb25zdHJ1Y3RvcihleHBlY3RlZFN0YWduYXRpb25HZW5lcmF0aW9uTnVtYmVyPzogbnVtYmVyKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIGlmIChcbiAgICAgICAgICAgIGV4cGVjdGVkU3RhZ25hdGlvbkdlbmVyYXRpb25OdW1iZXIgPT09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgICAgZXhwZWN0ZWRTdGFnbmF0aW9uR2VuZXJhdGlvbk51bWJlciA9PT0gbnVsbFxuICAgICAgICApXG4gICAgICAgICAgICB0aGlzLmV4cGVjdGVkU3RhZ25hdGlvbkdlbmVyYXRpb25OdW1iZXIgPSAxMDA7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHRoaXMuZXhwZWN0ZWRTdGFnbmF0aW9uR2VuZXJhdGlvbk51bWJlciA9IGV4cGVjdGVkU3RhZ25hdGlvbkdlbmVyYXRpb25OdW1iZXI7XG4gICAgfVxuICAgIHByaXZhdGUgbUxhc3RGaXRuZXNzOiBudW1iZXI7XG4gICAgcHJpdmF0ZSBtU3RhZ25hbnRHZW5lcmF0aW9uQ291bnQ6IG51bWJlcjtcblxuICAgIHBlcmZvcm1IYXNSZWFjaGVkKGdlbmV0aWNBbGdvcml0aG06IElHZW5ldGljQWxnb3JpdGhtKTogYm9vbGVhbiB7XG4gICAgICAgIGNvbnN0IGJlc3RGaXRuZXNzID0gZ2VuZXRpY0FsZ29yaXRobS5iZXN0Q2hyb21vc29tZS5maXRuZXNzO1xuXG4gICAgICAgIGlmICh0aGlzLm1MYXN0Rml0bmVzcyA9PT0gYmVzdEZpdG5lc3MpIHtcbiAgICAgICAgICAgIHRoaXMubVN0YWduYW50R2VuZXJhdGlvbkNvdW50Kys7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLm1TdGFnbmFudEdlbmVyYXRpb25Db3VudCA9IDE7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLm1MYXN0Rml0bmVzcyA9IGJlc3RGaXRuZXNzO1xuXG4gICAgICAgIHJldHVybiB0aGlzLm1TdGFnbmFudEdlbmVyYXRpb25Db3VudCA+PSB0aGlzLmV4cGVjdGVkU3RhZ25hdGlvbkdlbmVyYXRpb25OdW1iZXI7XG5cbiAgICB9XG5cbn0iLCJpbXBvcnQgSUdlbmV0aWNBbGdvcml0aG0gZnJvbSBcIi4uL0lHZW5ldGljQWxnb3JpdGhtXCI7XG5pbXBvcnQgVGVybWluYXRpb25CYXNlIGZyb20gXCIuL1Rlcm1pbmF0aW9uQmFzZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGaXRuZXNzVGhyZXNob2xkVGVybWluYXRpb24gZXh0ZW5kcyBUZXJtaW5hdGlvbkJhc2Uge1xuXG4gICAgcHVibGljIGV4cGVjdGVkRml0bmVzczogbnVtYmVyO1xuXG4gICAgY29uc3RydWN0b3IoZXhwZWN0ZWRGaXRuZXNzPzogbnVtYmVyKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIGlmIChleHBlY3RlZEZpdG5lc3MgPT09IHVuZGVmaW5lZCB8fCBleHBlY3RlZEZpdG5lc3MgPT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5leHBlY3RlZEZpdG5lc3MgPSAxO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5leHBlY3RlZEZpdG5lc3MgPSBleHBlY3RlZEZpdG5lc3M7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcGVyZm9ybUhhc1JlYWNoZWQoZ2VuZXRpY0FsZ29yaXRobTogSUdlbmV0aWNBbGdvcml0aG0pOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIGdlbmV0aWNBbGdvcml0aG0uYmVzdENocm9tb3NvbWUuZml0bmVzcyA+PSB0aGlzLmV4cGVjdGVkRml0bmVzcztcbiAgICB9XG5cbn0iLCJpbXBvcnQgSUdlbmV0aWNBbGdvcml0aG0gZnJvbSBcIi4uL0lHZW5ldGljQWxnb3JpdGhtXCI7XG5pbXBvcnQgVGVybWluYXRpb25CYXNlIGZyb20gXCIuL1Rlcm1pbmF0aW9uQmFzZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHZW5lcmF0aW9uTnVtYmVyVGVybWluYXRpb24gZXh0ZW5kcyBUZXJtaW5hdGlvbkJhc2Uge1xuICBwdWJsaWMgZXhwZWN0ZWRHZW5lcmF0aW9uTnVtYmVyOiBudW1iZXI7XG5cbiAgY29uc3RydWN0b3IoZXhwZWN0ZWRHZW5lcmF0aW9uTnVtYmVyPzogbnVtYmVyKSB7XG4gICAgc3VwZXIoKTtcbiAgICBpZiAoXG4gICAgICBleHBlY3RlZEdlbmVyYXRpb25OdW1iZXIgPT09IHVuZGVmaW5lZCB8fFxuICAgICAgZXhwZWN0ZWRHZW5lcmF0aW9uTnVtYmVyID09PSBudWxsXG4gICAgKVxuICAgICAgdGhpcy5leHBlY3RlZEdlbmVyYXRpb25OdW1iZXIgPSAxMDA7XG4gICAgZWxzZVxuICAgICAgdGhpcy5leHBlY3RlZEdlbmVyYXRpb25OdW1iZXIgPSBleHBlY3RlZEdlbmVyYXRpb25OdW1iZXI7XG4gIH1cblxuICBwZXJmb3JtSGFzUmVhY2hlZChnZW5ldGljQWxnb3JpdGhtOiBJR2VuZXRpY0FsZ29yaXRobSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBnZW5ldGljQWxnb3JpdGhtLmdlbmVyYXRpb25zTnVtYmVyID49IHRoaXMuZXhwZWN0ZWRHZW5lcmF0aW9uTnVtYmVyO1xuICB9XG59XG4iLCJpbXBvcnQgQW5kVGVybWluYXRpb24gZnJvbSBcIi4vQW5kVGVybWluYXRpb25cIjtcbmltcG9ydCBGaXRuZXNzU3RhZ25hdGlvblRlcm1pbmF0aW9uIGZyb20gXCIuL0ZpdG5lc3NTdGFnbmF0aW9uVGVybWluYXRpb25cIjtcbmltcG9ydCBGaXRuZXNzVGhyZXNob2xkVGVybWluYXRpb24gZnJvbSBcIi4vRml0bmVzc1RocmVzaG9sZFRlcm1pbmF0aW9uXCI7XG5pbXBvcnQgR2VuZXJhdGlvbk51bWJlclRlcm1pbmF0aW9uIGZyb20gXCIuL0dlbmVyYXRpb25OdW1iZXJUZXJtaW5hdGlvblwiO1xuaW1wb3J0IElUZXJtaW5hdGlvbiBmcm9tIFwiLi9JVGVybWluYXRpb25cIjtcbmltcG9ydCBMb2dpY2FsT3BlcmF0b3JUZXJtaW5hdGlvbkJhc2UgZnJvbSBcIi4vTG9naWNhbE9wZXJhdG9yVGVybWluYXRpb25CYXNlXCI7XG5pbXBvcnQgT3JUZXJtaW5hdGlvbiBmcm9tIFwiLi9PclRlcm1pbmF0aW9uXCI7XG5pbXBvcnQgVGVybWluYXRpb25CYXNlIGZyb20gXCIuL1Rlcm1pbmF0aW9uQmFzZVwiO1xuaW1wb3J0IFRpbWVFdm9sdmluZ1Rlcm1pbmF0aW9uIGZyb20gXCIuL1RpbWVFdm9sdmluZ1Rlcm1pbmF0aW9uXCI7XG5cblxuXG5leHBvcnQge1xuICAgIEFuZFRlcm1pbmF0aW9uLFxuICAgIEZpdG5lc3NTdGFnbmF0aW9uVGVybWluYXRpb24sIEZpdG5lc3NUaHJlc2hvbGRUZXJtaW5hdGlvbixcbiAgICBHZW5lcmF0aW9uTnVtYmVyVGVybWluYXRpb24sIElUZXJtaW5hdGlvbiwgTG9naWNhbE9wZXJhdG9yVGVybWluYXRpb25CYXNlLFxuICAgIE9yVGVybWluYXRpb24sIFRlcm1pbmF0aW9uQmFzZSwgVGltZUV2b2x2aW5nVGVybWluYXRpb25cbn0iLCJpbXBvcnQgSUdlbmV0aWNBbGdvcml0aG0gZnJvbSBcIi4uL0lHZW5ldGljQWxnb3JpdGhtXCI7XG5pbXBvcnQgSVRlcm1pbmF0aW9uIGZyb20gXCIuL0lUZXJtaW5hdGlvblwiO1xuXG5leHBvcnQgZGVmYXVsdCBhYnN0cmFjdCBjbGFzcyBMb2dpY2FsT3BlcmF0b3JUZXJtaW5hdGlvbkJhc2UgaW1wbGVtZW50cyBJVGVybWluYXRpb24ge1xuXG4gICAgcHJvdGVjdGVkIGNvbnN0cnVjdG9yKG1pbk9wZXJhbmRzPzogbnVtYmVyLCB0ZXJtaW5hdGlvbnM/OiBJVGVybWluYXRpb25bXSkge1xuXG4gICAgICAgIGlmIChtaW5PcGVyYW5kcyA9PT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgdGhpcy5taW5PcGVyYW5kcyA9IDI7XG5cbiAgICAgICAgdGhpcy50ZXJtaW5hdGlvbnMgPSBbXTtcblxuICAgICAgICBpZiAodGVybWluYXRpb25zICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRlcm1pbmF0aW9ucy5jb25jYXQodGVybWluYXRpb25zKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHRlcm1pbmF0aW9uczogSVRlcm1pbmF0aW9uW107XG4gICAgcHJpdmF0ZSBtaW5PcGVyYW5kczogbnVtYmVyO1xuXG4gICAgaGFzUmVhY2hlZChnZW5ldGljQWxnb3JpdGhtOiBJR2VuZXRpY0FsZ29yaXRobSk6IGJvb2xlYW4ge1xuICAgICAgICBpZiAodGhpcy50ZXJtaW5hdGlvbnMubGVuZ3RoIDwgdGhpcy5taW5PcGVyYW5kcykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVGhlcmUgc2hvdWxkIGJlIGF0IGxlYXN0IG9uZSB0ZXJtaW5hdGlvbi5cIik7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5wZXJmb3JtSGFzUmVhY2hlZChnZW5ldGljQWxnb3JpdGhtKTtcbiAgICB9XG5cbiAgICBhYnN0cmFjdCBwZXJmb3JtSGFzUmVhY2hlZChnZW5ldGljQWxnb3JpdGhtOiBJR2VuZXRpY0FsZ29yaXRobSk6IGJvb2xlYW47XG5cbn0iLCJpbXBvcnQgSUdlbmV0aWNBbGdvcml0aG0gZnJvbSBcIi4uL0lHZW5ldGljQWxnb3JpdGhtXCI7XG5pbXBvcnQgTG9naWNhbE9wZXJhdG9yVGVybWluYXRpb25CYXNlIGZyb20gXCIuL0xvZ2ljYWxPcGVyYXRvclRlcm1pbmF0aW9uQmFzZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBPclRlcm1pbmF0aW9uIGV4dGVuZHMgTG9naWNhbE9wZXJhdG9yVGVybWluYXRpb25CYXNlIHtcbiAgICBwZXJmb3JtSGFzUmVhY2hlZChnZW5ldGljQWxnb3JpdGhtOiBJR2VuZXRpY0FsZ29yaXRobSk6IGJvb2xlYW4ge1xuICAgICAgICBsZXQgc3RhdHVzOiBib29sZWFuID0gZmFsc2U7XG4gICAgICAgIGZvciAoY29uc3QgdGVybWluYXRpb24gb2YgdGhpcy50ZXJtaW5hdGlvbnMpIHtcbiAgICAgICAgICAgIHN0YXR1cyA9IHRlcm1pbmF0aW9uLmhhc1JlYWNoZWQoZ2VuZXRpY0FsZ29yaXRobSk7XG4gICAgICAgICAgICBpZiAoc3RhdHVzID09PSB0cnVlKVxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbn0iLCJpbXBvcnQgSUdlbmV0aWNBbGdvcml0aG0gZnJvbSBcIi4uL0lHZW5ldGljQWxnb3JpdGhtXCI7XG5pbXBvcnQgSVRlcm1pbmF0aW9uIGZyb20gXCIuL0lUZXJtaW5hdGlvblwiO1xuXG5leHBvcnQgZGVmYXVsdCBhYnN0cmFjdCBjbGFzcyBUZXJtaW5hdGlvbkJhc2UgaW1wbGVtZW50cyBJVGVybWluYXRpb24ge1xuICBwcml2YXRlIG1IYXNSZWFjaGVkOiBib29sZWFuO1xuXG4gIGhhc1JlYWNoZWQoZ2VuZXRpY0FsZ29yaXRobTogSUdlbmV0aWNBbGdvcml0aG0pOiBib29sZWFuIHtcbiAgICB0aGlzLm1IYXNSZWFjaGVkID0gdGhpcy5wZXJmb3JtSGFzUmVhY2hlZChnZW5ldGljQWxnb3JpdGhtKTtcbiAgICByZXR1cm4gdGhpcy5tSGFzUmVhY2hlZDtcbiAgfVxuXG4gIGFic3RyYWN0IHBlcmZvcm1IYXNSZWFjaGVkKGdlbmV0aWNBbGdvcml0aG06IElHZW5ldGljQWxnb3JpdGhtKTogYm9vbGVhbjtcbn1cbiIsImltcG9ydCBJR2VuZXRpY0FsZ29yaXRobSBmcm9tIFwiLi4vSUdlbmV0aWNBbGdvcml0aG1cIjtcbmltcG9ydCBUZXJtaW5hdGlvbkJhc2UgZnJvbSBcIi4vVGVybWluYXRpb25CYXNlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRpbWVFdm9sdmluZ1Rlcm1pbmF0aW9uIGV4dGVuZHMgVGVybWluYXRpb25CYXNlIHtcblxuICAgIGNvbnN0cnVjdG9yKG1heFRpbWU/OiBudW1iZXIpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgaWYgKG1heFRpbWUgPT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIHRoaXMubWF4VGltZSA9IDEwO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICB0aGlzLm1heFRpbWUgPSBtYXhUaW1lO1xuICAgIH1cbiAgICBwcml2YXRlIG1heFRpbWU6IG51bWJlcjtcblxuICAgIHBlcmZvcm1IYXNSZWFjaGVkKGdlbmV0aWNBbGdvcml0aG06IElHZW5ldGljQWxnb3JpdGhtKTogYm9vbGVhbiB7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRUaW1lID0gbmV3IERhdGUoKTtcbiAgICAgICAgY29uc3QgZHVyYXRpb24gPSBjdXJyZW50VGltZS5nZXRUaW1lKCkgLSBnZW5ldGljQWxnb3JpdGhtLnRpbWVFdm9sdmluZy5nZXRUaW1lKCk7XG5cbiAgICAgICAgY29uc3QgZHVyYXRpb25JblNlY29uZHMgPSBkdXJhdGlvbiAvIDEwMDA7XG4gICAgICAgIGlmIChkdXJhdGlvbkluU2Vjb25kcyA+IHRoaXMubWF4VGltZSlcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG59IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0aWYoX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSkge1xuXHRcdHJldHVybiBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8vIG1vZHVsZSBleHBvcnRzIG11c3QgYmUgcmV0dXJuZWQgZnJvbSBydW50aW1lIHNvIGVudHJ5IGlubGluaW5nIGlzIGRpc2FibGVkXG4vLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbnJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvZG9tYWluL2luZGV4LnRzXCIpO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==