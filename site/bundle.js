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
/* harmony import */ var _randomizations_RandomizationProvider__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./randomizations/RandomizationProvider */ "./src/domain/randomizations/RandomizationProvider.ts");

class DefaultOperationStrategy {
    cross(population, crossover, crossoverProbability, parents) {
        const minSize = population.minSize;
        let offspring = [];
        for (let i = 0; i < minSize; i += crossover.parentNumber) {
            const selectedParents = parents.slice(2).splice(0, crossover.parentNumber);
            if (selectedParents.length === crossover.parentNumber &&
                _randomizations_RandomizationProvider__WEBPACK_IMPORTED_MODULE_0__.default.current.getDouble() <= crossoverProbability) {
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
            for (let j = 0; j < generations; j++) {
                this.evolveOneGeneration();
                bestChromosomeArray.push(this.bestChromosome);
            }
            return bestChromosomeArray;
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
            const fitness = this.fitness.evaluate(element);
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
    clone() {
        throw new Error("Method not implemented.");
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
            const notRepeatedGenesLength = [...new Set(c.getGenes())].length;
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
/* harmony import */ var _randomizations_RandomizationProvider__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../randomizations/RandomizationProvider */ "./src/domain/randomizations/RandomizationProvider.ts");
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
                this.randomValues = _randomizations_RandomizationProvider__WEBPACK_IMPORTED_MODULE_0__.default.current.getUniqueInts(length, minValue, maxValue);
            else
                this.randomValues = _randomizations_RandomizationProvider__WEBPACK_IMPORTED_MODULE_0__.default.current.getInts(length, minValue, maxValue);
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
        return new _Gene__WEBPACK_IMPORTED_MODULE_1__.default(this.binArrayStr[geneIndex]);
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

/***/ "./src/domain/index.ts":
/*!*****************************!*\
  !*** ./src/domain/index.ts ***!
  \*****************************/
/*! namespace exports */
/*! export BinaryChromosomeBase [provided] [maybe used in bundle (runtime-defined)] [usage prevents renaming] -> ./src/domain/chromosome/BinaryChromosomeBase.ts .default */
/*! export ChromosomeBase [provided] [maybe used in bundle (runtime-defined)] [usage prevents renaming] -> ./src/domain/chromosome/ChromosomeBase.ts .default */
/*! export ChromosomeExtension [provided] [maybe used in bundle (runtime-defined)] [usage prevents renaming] -> ./src/domain/chromosome/ChromosomeExtension.ts .default */
/*! export DecimalChromosome [provided] [maybe used in bundle (runtime-defined)] [usage prevents renaming] -> ./src/domain/chromosome/DecimalChromosome.ts .default */
/*! export FloatingPointChromosome [provided] [maybe used in bundle (runtime-defined)] [usage prevents renaming] -> ./src/domain/chromosome/FloatingPointChromosome.ts .default */
/*! export Gene [provided] [maybe used in bundle (runtime-defined)] [usage prevents renaming] -> ./src/domain/chromosome/Gene.ts .default */
/*! export GeneticAlgorithm [provided] [maybe used in bundle (runtime-defined)] [usage prevents renaming] -> ./src/domain/GeneticAlgorithm.ts .default */
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
/* harmony export */   "Gene": () => /* reexport safe */ _chromosome_Gene__WEBPACK_IMPORTED_MODULE_2__.default
/* harmony export */ });
/* harmony import */ var _GeneticAlgorithm__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./GeneticAlgorithm */ "./src/domain/GeneticAlgorithm.ts");
/* harmony import */ var _chromosome_Gene__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./chromosome/Gene */ "./src/domain/chromosome/Gene.ts");
/* harmony import */ var _chromosome_Index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./chromosome/Index */ "./src/domain/chromosome/Index.ts");







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

/***/ "./src/domain/randomizations/BasicRandomization.ts":
/*!*********************************************************!*\
  !*** ./src/domain/randomizations/BasicRandomization.ts ***!
  \*********************************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ BasicRandomization
/* harmony export */ });
/* harmony import */ var _RandomizationBase__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./RandomizationBase */ "./src/domain/randomizations/RandomizationBase.ts");

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

/***/ "./src/domain/randomizations/RandomizationBase.ts":
/*!********************************************************!*\
  !*** ./src/domain/randomizations/RandomizationBase.ts ***!
  \********************************************************/
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

/***/ "./src/domain/randomizations/RandomizationProvider.ts":
/*!************************************************************!*\
  !*** ./src/domain/randomizations/RandomizationProvider.ts ***!
  \************************************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ RandomizationProvider
/* harmony export */ });
/* harmony import */ var _BasicRandomization__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BasicRandomization */ "./src/domain/randomizations/BasicRandomization.ts");

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
        return this.m_hasReached;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9nZW5ldGljanMvLi9zcmMvZG9tYWluL0RlZmF1bHRPcGVyYXRpb25TdHJhdGVneS50cyIsIndlYnBhY2s6Ly9nZW5ldGljanMvLi9zcmMvZG9tYWluL0dlbmV0aWNBbGdvcml0aG0udHMiLCJ3ZWJwYWNrOi8vZ2VuZXRpY2pzLy4vc3JjL2RvbWFpbi9jaHJvbW9zb21lL0JpbmFyeUNocm9tb3NvbWVCYXNlLnRzIiwid2VicGFjazovL2dlbmV0aWNqcy8uL3NyYy9kb21haW4vY2hyb21vc29tZS9DaHJvbW9zb21lQmFzZS50cyIsIndlYnBhY2s6Ly9nZW5ldGljanMvLi9zcmMvZG9tYWluL2Nocm9tb3NvbWUvQ2hyb21vc29tZUV4dGVuc2lvbi50cyIsIndlYnBhY2s6Ly9nZW5ldGljanMvLi9zcmMvZG9tYWluL2Nocm9tb3NvbWUvRGVjaW1hbENocm9tb3NvbWUudHMiLCJ3ZWJwYWNrOi8vZ2VuZXRpY2pzLy4vc3JjL2RvbWFpbi9jaHJvbW9zb21lL0Zsb2F0aW5nUG9pbnRDaHJvbW9zb21lLnRzIiwid2VicGFjazovL2dlbmV0aWNqcy8uL3NyYy9kb21haW4vY2hyb21vc29tZS9HZW5lLnRzIiwid2VicGFjazovL2dlbmV0aWNqcy8uL3NyYy9kb21haW4vY2hyb21vc29tZS9JbmRleC50cyIsIndlYnBhY2s6Ly9nZW5ldGljanMvLi9zcmMvZG9tYWluL2luZGV4LnRzIiwid2VicGFjazovL2dlbmV0aWNqcy8uL3NyYy9kb21haW4vcG9wdWxhdGlvbnMvR2VuZXJhdGlvbi50cyIsIndlYnBhY2s6Ly9nZW5ldGljanMvLi9zcmMvZG9tYWluL3BvcHVsYXRpb25zL1BvcHVsYXRpb24udHMiLCJ3ZWJwYWNrOi8vZ2VuZXRpY2pzLy4vc3JjL2RvbWFpbi9yYW5kb21pemF0aW9ucy9CYXNpY1JhbmRvbWl6YXRpb24udHMiLCJ3ZWJwYWNrOi8vZ2VuZXRpY2pzLy4vc3JjL2RvbWFpbi9yYW5kb21pemF0aW9ucy9SYW5kb21pemF0aW9uQmFzZS50cyIsIndlYnBhY2s6Ly9nZW5ldGljanMvLi9zcmMvZG9tYWluL3JhbmRvbWl6YXRpb25zL1JhbmRvbWl6YXRpb25Qcm92aWRlci50cyIsIndlYnBhY2s6Ly9nZW5ldGljanMvLi9zcmMvZG9tYWluL3Rlcm1pbmF0aW9ucy9HZW5lcmF0aW9uTnVtYmVyVGVybWluYXRpb24udHMiLCJ3ZWJwYWNrOi8vZ2VuZXRpY2pzLy4vc3JjL2RvbWFpbi90ZXJtaW5hdGlvbnMvVGVybWluYXRpb25CYXNlLnRzIiwid2VicGFjazovL2dlbmV0aWNqcy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9nZW5ldGljanMvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2dlbmV0aWNqcy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2dlbmV0aWNqcy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2dlbmV0aWNqcy93ZWJwYWNrL3N0YXJ0dXAiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFLMkU7QUFFNUQsTUFBTSx3QkFBd0I7SUFDM0MsS0FBSyxDQUNILFVBQXVCLEVBQ3ZCLFNBQXFCLEVBQ3JCLG9CQUE0QixFQUM1QixPQUFzQjtRQUV0QixNQUFNLE9BQU8sR0FBVyxVQUFVLENBQUMsT0FBTyxDQUFDO1FBQzNDLElBQUksU0FBUyxHQUFrQixFQUFFLENBQUM7UUFDbEMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE9BQU8sRUFBRSxDQUFDLElBQUksU0FBUyxDQUFDLFlBQVksRUFBRTtZQUN4RCxNQUFNLGVBQWUsR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsU0FBUyxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQzNFLElBQUksZUFBZSxDQUFDLE1BQU0s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QztRQUNSLElBQ0Usd0JBQXdCLEtBQUssU0FBUztZQUN0Qyx3QkFBd0IsS0FBSyxJQUFJO1lBRWpDLElBQUksQ0FBQyx3QkFBd0IsR0FBRyxHQUFHLENBQUM7UUFDdEMsSUFBSSxDQUFDLHdCQUF3QixHQUFHLHdCQUF3QixDQUFDO0lBQzNELENBQUM7SUFFRCxpQkFBaUIsQ0FBQyxnQkFBbUM7UUFDbkQsT0FBTyxnQkFBZ0IsQ0FBQyxpQkFBaUIsSUFBSSxJQUFJLENBQUMsd0JBQXdCLENBQUM7SUFDN0UsQ0FBQztDQUNGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDaEJjLE1BQWUsZUFBZTtJQUczQyxVQUFVLENBQUMsZ0JBQW1DO1FBQzVDLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQztJQUMzQixDQUFDO0NBR0Y7Ozs7Ozs7VUNYRDtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0NyQkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx3Q0FBd0MseUNBQXlDO1dBQ2pGO1dBQ0E7V0FDQSxFOzs7OztXQ1BBLHNGOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHNEQUFzRCxrQkFBa0I7V0FDeEU7V0FDQSwrQ0FBK0MsY0FBYztXQUM3RCxFOzs7O1VDTkE7VUFDQTtVQUNBO1VBQ0EiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IElDaHJvbW9zb21lIGZyb20gXCIuL2Nocm9tb3NvbWUvSUNocm9tb3NvbWVcIjtcbmltcG9ydCBJQ3Jvc3NvdmVyIGZyb20gXCIuL2Nyb3Nzb3ZlcnMvSUNyb3Nzb3ZlclwiO1xuaW1wb3J0IElPcGVyYXRpb25TdHJhdGVneSBmcm9tIFwiLi9JT3BlcmF0aW9uU3RyYXRlZ3lcIjtcbmltcG9ydCBJTXV0YXRpb24gZnJvbSBcIi4vbXV0YXRpb25zL0lNdXRhdGlvblwiO1xuaW1wb3J0IElQb3B1bGF0aW9uIGZyb20gXCIuL3BvcHVsYXRpb25zL0lQb3B1bGF0aW9uXCI7XG5pbXBvcnQgUmFuZG9taXphdGlvblByb3ZpZGVyIGZyb20gXCIuL3JhbmRvbWl6YXRpb25zL1JhbmRvbWl6YXRpb25Qcm92aWRlclwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEZWZhdWx0T3BlcmF0aW9uU3RyYXRlZ3kgaW1wbGVtZW50cyBJT3BlcmF0aW9uU3RyYXRlZ3kge1xuICBjcm9zcyhcbiAgICBwb3B1bGF0aW9uOiBJUG9wdWxhdGlvbixcbiAgICBjcm9zc292ZXI6IElDcm9zc292ZXIsXG4gICAgY3Jvc3NvdmVyUHJvYmFiaWxpdHk6IG51bWJlcixcbiAgICBwYXJlbnRzOiBJQ2hyb21vc29tZVtdXG4gICk6IElDaHJvbW9zb21lW10ge1xuICAgIGNvbnN0IG1pblNpemU6IG51bWJlciA9IHBvcHVsYXRpb24ubWluU2l6ZTtcbiAgICBsZXQgb2Zmc3ByaW5nOiBJQ2hyb21vc29tZVtdID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtaW5TaXplOyBpICs9IGNyb3Nzb3Zlci5wYXJlbnROdW1iZXIpIHtcbiAgICAgIGNvbnN0IHNlbGVjdGVkUGFyZW50cyA9IHBhcmVudHMuc2xpY2UoMikuc3BsaWNlKDAsIGNyb3Nzb3Zlci5wYXJlbnROdW1iZXIpO1xuICAgICAgaWYgKHNlbGVjdGVkUGFyZW50cy5sZW5ndGggPT09IGNyb3Nzb3Zlci5wYXJlbnROdW1iZXIgJiZcbiAgICAgICAgUmFuZG9taXphdGlvblByb3ZpZGVyLmN1cnJlbnQuZ2V0RG91YmxlKCkgPD0gY3Jvc3NvdmVyUHJvYmFiaWxpdHkpIHtcblxuICAgICAgICBjb25zdCBjcm9zcyA9IGNyb3Nzb3Zlci5jcm9zcyhzZWxlY3RlZFBhcmVudHMpO1xuXG4gICAgICAgIG9mZnNwcmluZyA9IG9mZnNwcmluZy5jb25jYXQoY3Jvc3MpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBvZmZzcHJpbmc7XG4gIH1cbiAgbXV0YXRlKFxuICAgIG11dGF0aW9uOiBJTXV0YXRpb24sXG4gICAgbXV0YXRpb25Qcm9iYWJpbGl0eTogbnVtYmVyLFxuICAgIGNocm9tb3NvbWVzOiBJQ2hyb21vc29tZVtdXG4gICk6IHZvaWQge1xuICAgIGZvciAoY29uc3QgY2hyb21vc29tZSBvZiBjaHJvbW9zb21lcykge1xuICAgICAgbXV0YXRpb24ubXV0YXRlKGNocm9tb3NvbWUsIG11dGF0aW9uUHJvYmFiaWxpdHkpO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IElDaHJvbW9zb21lIGZyb20gXCIuL2Nocm9tb3NvbWUvSUNocm9tb3NvbWVcIjtcbmltcG9ydCBJQ3Jvc3NvdmVyIGZyb20gXCIuL2Nyb3Nzb3ZlcnMvSUNyb3Nzb3ZlclwiO1xuaW1wb3J0IERlZmF1bHRPcGVyYXRpb25TdHJhdGVneSBmcm9tIFwiLi9EZWZhdWx0T3BlcmF0aW9uU3RyYXRlZ3lcIjtcbmltcG9ydCBJRml0bmVzcyBmcm9tIFwiLi9maXRuZXNzZXMvSUZpdG5lc3NcIjtcbmltcG9ydCBJR2VuZXRpY0FsZ29yaXRobSBmcm9tIFwiLi9JR2VuZXRpY0FsZ29yaXRobVwiO1xuaW1wb3J0IElPcGVyYXRpb25TdHJhdGVneSBmcm9tIFwiLi9JT3BlcmF0aW9uU3RyYXRlZ3lcIjtcbmltcG9ydCBJTXV0YXRpb24gZnJvbSBcIi4vbXV0YXRpb25zL0lNdXRhdGlvblwiO1xuaW1wb3J0IElQb3B1bGF0aW9uIGZyb20gXCIuL3BvcHVsYXRpb25zL0lQb3B1bGF0aW9uXCI7XG5pbXBvcnQgUG9wdWxhdGlvbiBmcm9tIFwiLi9wb3B1bGF0aW9ucy9Qb3B1bGF0aW9uXCI7XG5pbXBvcnQgeyBJUmVpbnNlcnRpb24gfSBmcm9tIFwiLi9yZWluc2VydGlvbnMvSVJlaW5zZXJ0aW9uXCI7XG5pbXBvcnQgSVNlbGVjdGlvbiBmcm9tIFwiLi9zZWxlY3Rpb25zL0lTZWxlY3Rpb25cIjtcbmltcG9ydCBHZW5lcmF0aW9uTnVtYmVyVGVybWluYXRpb24gZnJvbSBcIi4vdGVybWluYXRpb25zL0dlbmVyYXRpb25OdW1iZXJUZXJtaW5hdGlvblwiO1xuaW1wb3J0IElUZXJtaW5hdGlvbiBmcm9tIFwiLi90ZXJtaW5hdGlvbnMvSVRlcm1pbmF0aW9uXCI7XG5cbmVudW0gR2VuZXRpY0FsZ29yaXRobVN0YXRlIHtcbiAgTm90U3RhcnRlZCxcbiAgU3RhcnRlZCxcbiAgU3RvcHBlZCxcbiAgUmVzdW1lZCxcbiAgVGVybWluYXRpb25SZWFjaGVkLFxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHZW5ldGljQWxnb3JpdGhtIGltcGxlbWVudHMgSUdlbmV0aWNBbGdvcml0aG0ge1xuICBiZXN0Q2hyb21vc29tZTogSUNocm9tb3NvbWU7XG4gIGNyb3NzT3ZlcjogSUNyb3Nzb3ZlcjtcblxuICBkZWZhdWx0Q3Jvc3NPdmVyUHJvYmFiaWxpdHk6IG51bWJlciA9IDAuNzU7XG4gIGRlZmF1bHRNdXRhdGlvblByb2JhYmlsaXR5OiBudW1iZXIgPSAwLjM7XG4gIGZpdG5lc3M6IElGaXRuZXNzO1xuICBnZW5lcmF0aW9uc051bWJlcjogbnVtYmVyO1xuICBtdXRhdGlvbjogSU11dGF0aW9uO1xuICBvcGVyYXRvclN0cmF0ZWd5OiBJT3BlcmF0aW9uU3RyYXRlZ3k7XG4gIHBvcHVsYXRpb246IElQb3B1bGF0aW9uO1xuICByZWluc2VydGlvbjogSVJlaW5zZXJ0aW9uO1xuICBzZWxlY3Rpb246IElTZWxlY3Rpb247XG4gIHRlcm1pbmF0aW9uOiBJVGVybWluYXRpb247XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcG9wdWxhdGlvbjogSVBvcHVsYXRpb24sXG4gICAgZml0bmVzczogSUZpdG5lc3MsXG4gICAgc2VsZWN0aW9uOiBJU2VsZWN0aW9uLFxuICAgIGNyb3NzT3ZlcjogSUNyb3Nzb3ZlcixcbiAgICBtdXRhdGlvbjogSU11dGF0aW9uLFxuICAgIHJlaW5zZXJ0aW9uOiBJUmVpbnNlcnRpb25cbiAgKSB7XG4gICAgdGhpcy5zZWxlY3Rpb24gPSBzZWxlY3Rpb247XG4gICAgdGhpcy5wb3B1bGF0aW9uID0gcG9wdWxhdGlvbjtcbiAgICB0aGlzLmZpdG5lc3MgPSBmaXRuZXNzO1xuICAgIHRoaXMuY3Jvc3NPdmVyID0gY3Jvc3NPdmVyO1xuICAgIHRoaXMubXV0YXRpb24gPSBtdXRhdGlvbjtcbiAgICB0aGlzLnRlcm1pbmF0aW9uID0gbmV3IEdlbmVyYXRpb25OdW1iZXJUZXJtaW5hdGlvbigxMDApO1xuICAgIHRoaXMub3BlcmF0b3JTdHJhdGVneSA9IG5ldyBEZWZhdWx0T3BlcmF0aW9uU3RyYXRlZ3koKTtcbiAgICB0aGlzLnJlaW5zZXJ0aW9uID0gcmVpbnNlcnRpb247XG4gIH1cblxuICBjbG9uZSgpIHtcbiAgICByZXR1cm4gbmV3IEdlbmV0aWNBbGdvcml0aG0oXG4gICAgICBuZXcgUG9wdWxhdGlvbihcbiAgICAgICAgdGhpcy5wb3B1bGF0aW9uLm1pblNpemUsXG4gICAgICAgIHRoaXMucG9wdWxhdGlvbi5tYXhTaXplLFxuICAgICAgICB0aGlzLnBvcHVsYXRpb24uYmVzdENocm9tb3NvbWVcbiAgICAgICksXG4gICAgICB0aGlzLmZpdG5lc3MsXG4gICAgICB0aGlzLnNlbGVjdGlvbixcbiAgICAgIHRoaXMuY3Jvc3NPdmVyLFxuICAgICAgdGhpcy5tdXRhdGlvbixcbiAgICAgIHRoaXMucmVpbnNlcnRpb25cbiAgICApO1xuICB9XG5cbiAgcHVibGljIGV2b2x2ZU9uZUdlbmVyYXRpb24oKTogYm9vbGVhbiB7XG4gICAgdGhpcy5ldmFsdWF0ZUZpdG5lc3MoKTtcbiAgICBjb25zdCBwYXJlbnRzID0gdGhpcy5zZWxlY3RQYXJlbnRzKCk7XG4gICAgY29uc3Qgb2Zmc3ByaW5nID0gdGhpcy5jcm9zcyhwYXJlbnRzKTtcbiAgICB0aGlzLm11dGF0ZShvZmZzcHJpbmcpO1xuICAgIGNvbnN0IG5ld0dlbmVyYXRpb25DaHJvbW9zb21lID0gdGhpcy5yZWluc2VydChvZmZzcHJpbmcsIHBhcmVudHMpO1xuICAgIHRoaXMucG9wdWxhdGlvbi5jcmVhdGVOZXdHZW5lcmF0aW9uKG5ld0dlbmVyYXRpb25DaHJvbW9zb21lKTtcblxuICAgIHJldHVybiB0aGlzLmVuZEN1cnJlbnRHZW5lcmF0aW9uKCk7XG4gIH1cblxuICBwdWJsaWMgc3RhcnQgPSAoZ2VuZXJhdGlvbnM6IG51bWJlcik6IElDaHJvbW9zb21lW10gPT4ge1xuICAgIGNvbnN0IGJlc3RDaHJvbW9zb21lQXJyYXkgPSBbXTtcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IGdlbmVyYXRpb25zOyBqKyspIHtcbiAgICAgIHRoaXMuZXZvbHZlT25lR2VuZXJhdGlvbigpO1xuICAgICAgYmVzdENocm9tb3NvbWVBcnJheS5wdXNoKHRoaXMuYmVzdENocm9tb3NvbWUpO1xuICAgIH1cbiAgICByZXR1cm4gYmVzdENocm9tb3NvbWVBcnJheTtcbiAgfTtcblxuICBwcml2YXRlIGNyb3NzKHBhcmVudHM6IElDaHJvbW9zb21lW10pOiBJQ2hyb21vc29tZVtdIHtcbiAgICByZXR1cm4gdGhpcy5vcGVyYXRvclN0cmF0ZWd5LmNyb3NzKFxuICAgICAgdGhpcy5wb3B1bGF0aW9uLFxuICAgICAgdGhpcy5jcm9zc092ZXIsXG4gICAgICB0aGlzLmRlZmF1bHRDcm9zc092ZXJQcm9iYWJpbGl0eSxcbiAgICAgIHBhcmVudHNcbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBlbmRDdXJyZW50R2VuZXJhdGlvbigpOiBib29sZWFuIHtcbiAgICB0aGlzLmV2YWx1YXRlRml0bmVzcygpO1xuICAgIHRoaXMucG9wdWxhdGlvbi5lbmRDdXJyZW50R2VuZXJhdGlvbigpO1xuICAgIHRoaXMuYmVzdENocm9tb3NvbWUgPSB0aGlzLnBvcHVsYXRpb24uYmVzdENocm9tb3NvbWU7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBwcml2YXRlIGV2YWx1YXRlRml0bmVzcygpOiB2b2lkIHtcbiAgICAvLyBUaGUgZXZhbHVhdGUgZml0bmVzcyBuZWVkcyB0byBiZSBkb25lIHVzaW5nIGFzeW5jXG4gICAgY29uc3QgY2hyb21vc29tZXMgPSB0aGlzLnBvcHVsYXRpb24uY3VycmVudEdlbmVyYXRpb24uY2hyb21vc29tZXM7XG4gICAgZm9yIChjb25zdCBjaHJvbW9zb21lIG9mIGNocm9tb3NvbWVzKSB7XG4gICAgICBjb25zdCBlbGVtZW50ID0gY2hyb21vc29tZTtcbiAgICAgIGNvbnN0IGZpdG5lc3MgPSB0aGlzLmZpdG5lc3MuZXZhbHVhdGUoZWxlbWVudCk7XG4gICAgICBlbGVtZW50LmZpdG5lc3MgPSBmaXRuZXNzO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgbXV0YXRlKGNocm9tb3NvbWVzOiBJQ2hyb21vc29tZVtdKTogdm9pZCB7XG4gICAgdGhpcy5vcGVyYXRvclN0cmF0ZWd5Lm11dGF0ZShcbiAgICAgIHRoaXMubXV0YXRpb24sXG4gICAgICB0aGlzLmRlZmF1bHRNdXRhdGlvblByb2JhYmlsaXR5LFxuICAgICAgY2hyb21vc29tZXNcbiAgICApO1xuICB9XG5cbiAgLy8gaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvNDAzMjg5MzIvamF2YXNjcmlwdC1lczYtcHJvbWlzZS1mb3ItbG9vcFxuICAvLyBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8zMTQyNjc0MC9ob3ctdG8tcmV0dXJuLW1hbnktcHJvbWlzZXMtYW5kLXdhaXQtZm9yLXRoZW0tYWxsLWJlZm9yZS1kb2luZy1vdGhlci1zdHVmZlxuICBwcml2YXRlIHByb21pc2VBcnIgPSAodG90YWxJc2xhbmQ6IG51bWJlcik6IHZvaWQgPT4ge1xuICAgIGNvbnN0IHByb21BcnIgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRvdGFsSXNsYW5kOyBpKyspIHtcbiAgICAgIGNvbnN0IGV2b2x2ZU9uZUdlbmVyYXRpb25Bc3luYyA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgcmV0dXJuIHJlc29sdmUodGhpcy5ldm9sdmVPbmVHZW5lcmF0aW9uKCkpO1xuICAgICAgfSk7XG4gICAgICBwcm9tQXJyLnB1c2goZXZvbHZlT25lR2VuZXJhdGlvbkFzeW5jKTtcbiAgICB9XG5cbiAgICBQcm9taXNlLmFsbChwcm9tQXJyKS50aGVuKCh2YWx1ZXMpID0+IHtcbiAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMuYmVzdENocm9tb3NvbWUudG9TdHJpbmcoKSk7XG4gICAgfSk7XG4gIH07XG5cbiAgcHJpdmF0ZSByZWluc2VydChvZmZzcHJpbmc6IElDaHJvbW9zb21lW10sIHBhcmVudHM6IElDaHJvbW9zb21lW10pIHtcbiAgICByZXR1cm4gdGhpcy5yZWluc2VydGlvbi5zZWxlY3RDaHJvbW9zb21lKHRoaXMucG9wdWxhdGlvbiwgb2Zmc3ByaW5nLCBwYXJlbnRzKTtcbiAgfVxuXG4gIHByaXZhdGUgc2VsZWN0UGFyZW50cygpOiBJQ2hyb21vc29tZVtdIHtcbiAgICByZXR1cm4gdGhpcy5zZWxlY3Rpb24uc2VsZWN0Q2hyb21vc29tZXMoXG4gICAgICB0aGlzLnBvcHVsYXRpb24ubWluU2l6ZSxcbiAgICAgIHRoaXMucG9wdWxhdGlvbi5jdXJyZW50R2VuZXJhdGlvblxuICAgICk7XG4gIH1cbn1cbiIsImltcG9ydCB7IElCaW5hcnlDaHJvbW9zb21lIH0gZnJvbSBcIi4vSUJpbmFyeUNocm9tb3NvbWVcIjtcbmltcG9ydCBDaHJvbW9zb21lQmFzZSBmcm9tIFwiLi9DaHJvbW9zb21lQmFzZVwiO1xuaW1wb3J0IEdlbmUgZnJvbSBcIi4vR2VuZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBhYnN0cmFjdCBjbGFzcyBCaW5hcnlDaHJvbW9zb21lQmFzZSBleHRlbmRzIENocm9tb3NvbWVCYXNlXG4gIGltcGxlbWVudHMgSUJpbmFyeUNocm9tb3NvbWUge1xuICBjb25zdHJ1Y3RvcihsZW5ndGg6IG51bWJlcikge1xuICAgIHN1cGVyKGxlbmd0aCk7XG4gIH1cblxuICBmbGlwR2VuZShpbmRleDogbnVtYmVyKTogdm9pZCB7XG4gICAgY29uc3QgdmFsdWUgPSB0aGlzLmdldEdlbmUoaW5kZXgpO1xuICAgIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkKSB0aHJvdyBuZXcgRXJyb3IoXCJCaW5hcnlDaHJvbW9zb21lQmFzZSAtIENhbm5vdCBGbGlwIGEgZ2VuZSB3aGljaCBpcyB1bmRlZmluZWRcIik7XG4gICAgdGhpcy5yZXBsYWNlR2VuZShpbmRleCwgbmV3IEdlbmUodmFsdWUubVZhbHVlID09PSAwID8gMSA6IDApKTtcbiAgfVxuXG4gIHRvU3RyaW5nKCkge1xuICAgIGNvbnN0IHN0ciA9IHRoaXMuZ2V0R2VuZXMoKS50b1N0cmluZygpO1xuICAgIHJldHVybiBzdHI7XG4gIH1cbn1cbiIsImltcG9ydCBHZW5lIGZyb20gXCIuL0dlbmVcIjtcbmltcG9ydCBJQ2hyb21vc29tZSBmcm9tIFwiLi9JQ2hyb21vc29tZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBhYnN0cmFjdCBjbGFzcyBDaHJvbW9zb21lQmFzZSBpbXBsZW1lbnRzIElDaHJvbW9zb21lIHtcblxuICBwcm90ZWN0ZWQgY29uc3RydWN0b3IobGVuZ3RoOiBudW1iZXIpIHtcbiAgICB0aGlzLnZhbGlkYXRlTGVuZ3RoKGxlbmd0aCk7XG4gICAgdGhpcy5sZW5ndGggPSBsZW5ndGg7XG4gICAgdGhpcy5nZW5lcyA9IFtdO1xuICB9XG4gIHB1YmxpYyBmaXRuZXNzPzogbnVtYmVyO1xuICBwdWJsaWMgZ2VuZXM6IEdlbmVbXTtcbiAgcHVibGljIGxlbmd0aDogbnVtYmVyO1xuXG4gIGNsb25lKCk6IElDaHJvbW9zb21lIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJNZXRob2Qgbm90IGltcGxlbWVudGVkLlwiKTtcbiAgfVxuXG4gIGFic3RyYWN0IGNyZWF0ZU5ldygpOiBJQ2hyb21vc29tZTtcbiAgYWJzdHJhY3QgZ2VuZXJhdGVHZW5lKGdlbmVJbmRleDogbnVtYmVyKTogR2VuZTtcbiAgZ2V0R2VuZShpbmRleDogbnVtYmVyKTogR2VuZSB7XG4gICAgcmV0dXJuIHRoaXMuZ2VuZXNbaW5kZXhdO1xuICB9XG5cbiAgZ2V0R2VuZXMoKTogR2VuZVtdIHtcbiAgICByZXR1cm4gdGhpcy5nZW5lcztcbiAgfVxuXG4gIHJlcGxhY2VHZW5lKGluZGV4OiBudW1iZXIsIGdlbmU6IEdlbmUpOiB2b2lkIHtcbiAgICBpZiAoaW5kZXggPCAwIHx8IGluZGV4ID4gdGhpcy5sZW5ndGgpIHtcbiAgICAgIHRocm93IEVycm9yKFxuICAgICAgICBcIkNocm9tb3NvbWVCYXNlIC0gSW5kZXggY2Fubm90IGJlIGxlc3MgdGhhbiAwIGFuZCBtb3JlIHRoYW4gdGhlIGxlbmd0aC4gXCIgK1xuICAgICAgICBpbmRleFxuICAgICAgKTtcbiAgICB9XG5cbiAgICB0aGlzLmdlbmVzW2luZGV4XSA9IGdlbmU7XG4gICAgdGhpcy5maXRuZXNzID0gbnVsbDtcbiAgfVxuXG4gIHJlcGxhY2VHZW5lcyhzdGFydEluZGV4OiBudW1iZXIsIGdlbmVzOiBHZW5lW10pOiB2b2lkIHtcbiAgICBjb25zdCBnZW5lc1RvQmVSZXBsYWNlZExlbmd0aCA9IGdlbmVzLmxlbmd0aDtcblxuICAgIGNvbnN0IGF2YWlsYWJsZVNwYWNlTGVuZ3RoID0gdGhpcy5sZW5ndGggLSBzdGFydEluZGV4O1xuXG4gICAgaWYgKGF2YWlsYWJsZVNwYWNlTGVuZ3RoIDwgZ2VuZXNUb0JlUmVwbGFjZWRMZW5ndGgpXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDaHJvbW9zb21lQmFzZSAtIE5vdCBlbm91Z2ggc3BhY2UgdG8gcmVwbGFjZSBnZW5lcy5cIik7XG5cbiAgICBmb3IgKGxldCBpID0gc3RhcnRJbmRleDsgaSA8IGdlbmVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB0aGlzLnJlcGxhY2VHZW5lKGksIGdlbmVzW2ldKTtcbiAgICB9XG4gIH1cbiAgcmVzaXplKG5ld0xlbmd0aDogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy52YWxpZGF0ZUxlbmd0aChuZXdMZW5ndGgpO1xuICB9XG5cbiAgcHJvdGVjdGVkIGNyZWF0ZUdlbmVzKCk6IHZvaWQge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkrKykge1xuICAgICAgdGhpcy5yZXBsYWNlR2VuZShpLCB0aGlzLmdlbmVyYXRlR2VuZShpKSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSB2YWxpZGF0ZUxlbmd0aChsZW5ndGg6IG51bWJlcikge1xuICAgIGlmIChsZW5ndGggPCAyKSB7XG4gICAgICB0aHJvdyBFcnJvcihcIkVycm9yIC0gVGhlIG1pbmltdW0gbGVuZ3RoIGZvciBhIGNocm9tb3NvbWUgaXMgMiBnZW5lc1wiKTtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCBJQ2hyb21vc29tZSBmcm9tIFwiLi9JQ2hyb21vc29tZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDaHJvbW9zb21lRXh0ZW5zaW9uIHtcbiAgc3RhdGljIGFueUhhc1JlcGVhdGVkR2VuZShjaHJvbW9zb21lczogSUNocm9tb3NvbWVbXSk6IGJvb2xlYW4ge1xuICAgIGZvciAoY29uc3QgY2hyb21vc29tZSBvZiBjaHJvbW9zb21lcykge1xuICAgICAgY29uc3QgYyA9IGNocm9tb3NvbWU7XG4gICAgICAvLyBodHRwczovL2NvZGVidXJzdC5pby9qYXZhc2NyaXB0LWFycmF5LWRpc3RpbmN0LTVlZGM5MzUwMWRjNFxuICAgICAgY29uc3Qgbm90UmVwZWF0ZWRHZW5lc0xlbmd0aCA9IFsuLi5uZXcgU2V0KGMuZ2V0R2VuZXMoKSldLmxlbmd0aDtcbiAgICAgIGlmIChub3RSZXBlYXRlZEdlbmVzTGVuZ3RoIDwgYy5sZW5ndGgpIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBzdGF0aWMgdmFsaWRhdGVHZW5lcyhcbiAgICBjaHJvbW9zb21lPzogSUNocm9tb3NvbWUsXG4gICAgY2hyb21vc29tZXM/OiBJQ2hyb21vc29tZVtdXG4gICk6IGJvb2xlYW4ge1xuXG4gICAgaWYgKGNocm9tb3NvbWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgaWYgKGNocm9tb3NvbWUuZ2V0R2VuZXMoKSA9PT0gdW5kZWZpbmVkKVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgaWYgKGNocm9tb3NvbWVzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGZvciAoY29uc3QgY2ggb2YgY2hyb21vc29tZXMpIHtcbiAgICAgICAgaWYgKGNoLmdldEdlbmVzKCkgPT09IHVuZGVmaW5lZClcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbn1cbiIsImltcG9ydCBSYW5kb21pemF0aW9uUHJvdmlkZXIgZnJvbSBcIi4uL3JhbmRvbWl6YXRpb25zL1JhbmRvbWl6YXRpb25Qcm92aWRlclwiO1xuaW1wb3J0IENocm9tb3NvbWVCYXNlIGZyb20gXCIuL0Nocm9tb3NvbWVCYXNlXCI7XG5pbXBvcnQgR2VuZSBmcm9tIFwiLi9HZW5lXCI7XG5pbXBvcnQgSUNocm9tb3NvbWUgZnJvbSBcIi4vSUNocm9tb3NvbWVcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGVjaW1hbENocm9tb3NvbWUgZXh0ZW5kcyBDaHJvbW9zb21lQmFzZSB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIGxlbmd0aDogbnVtYmVyLFxuICAgIG1pblZhbHVlPzogbnVtYmVyLFxuICAgIG1heFZhbHVlPzogbnVtYmVyLFxuICAgIHVuaXF1ZT86IGJvb2xlYW4sXG4gICAgcmFuZG9tVmFsdWVzPzogbnVtYmVyW11cbiAgKSB7XG4gICAgc3VwZXIobGVuZ3RoKTtcbiAgICB0aGlzLm1pblZhbHVlID0gbWluVmFsdWU7XG4gICAgdGhpcy5tYXhWYWx1ZSA9IG1heFZhbHVlO1xuICAgIHVuaXF1ZSA9PT0gdW5kZWZpbmVkID8gKHRoaXMudW5pcXVlID0gZmFsc2UpIDogKHRoaXMudW5pcXVlID0gdHJ1ZSk7XG5cbiAgICBpZiAocmFuZG9tVmFsdWVzID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGlmICh1bmlxdWUgPT09IHRydWUpXG4gICAgICAgIHRoaXMucmFuZG9tVmFsdWVzID0gUmFuZG9taXphdGlvblByb3ZpZGVyLmN1cnJlbnQuZ2V0VW5pcXVlSW50cyhsZW5ndGgsIG1pblZhbHVlLCBtYXhWYWx1ZSk7XG4gICAgICBlbHNlXG4gICAgICAgIHRoaXMucmFuZG9tVmFsdWVzID0gUmFuZG9taXphdGlvblByb3ZpZGVyLmN1cnJlbnQuZ2V0SW50cyhsZW5ndGgsIG1pblZhbHVlLCBtYXhWYWx1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucmFuZG9tVmFsdWVzID0gcmFuZG9tVmFsdWVzO1xuICAgIH1cblxuICAgIHRoaXMuY3JlYXRlR2VuZXMoKTtcbiAgfVxuICBwcml2YXRlIG1heFZhbHVlOiBudW1iZXI7XG4gIHByaXZhdGUgbWluVmFsdWU6IG51bWJlcjtcbiAgcHJpdmF0ZSByYW5kb21WYWx1ZXM6IG51bWJlcltdO1xuICBwcml2YXRlIHVuaXF1ZTogYm9vbGVhbjtcblxuICAvLyBjbG9uZSA9ICgpID0+IHtcbiAgLy8gICBjb25zdCBjbG9uZSA9IG5ldyBEZWNpbWFsQ2hyb21vc29tZShcbiAgLy8gICAgIHRoaXMubGVuZ3RoLFxuICAvLyAgICAgdGhpcy5taW5WYWx1ZSxcbiAgLy8gICAgIHRoaXMubWF4VmFsdWUsXG4gIC8vICAgICB0aGlzLnVuaXF1ZSxcbiAgLy8gICAgIHRoaXMucmFuZG9tVmFsdWVzXG4gIC8vICAgKTtcbiAgLy8gICByZXR1cm4gY2xvbmU7XG4gIC8vIH07XG5cbiAgY3JlYXRlTmV3KCk6IElDaHJvbW9zb21lIHtcbiAgICByZXR1cm4gbmV3IERlY2ltYWxDaHJvbW9zb21lKHRoaXMubGVuZ3RoLCB0aGlzLm1pblZhbHVlLCB0aGlzLm1heFZhbHVlKTtcbiAgfVxuICBnZW5lcmF0ZUdlbmUoZ2VuZUluZGV4OiBudW1iZXIpOiBHZW5lIHtcbiAgICByZXR1cm4gbmV3IEdlbmUodGhpcy5yYW5kb21WYWx1ZXNbZ2VuZUluZGV4XSk7XG4gIH1cbn1cbiIsImltcG9ydCBCaW5hcnlDaHJvbW9zb21lQmFzZSBmcm9tIFwiLi9CaW5hcnlDaHJvbW9zb21lQmFzZVwiO1xuaW1wb3J0IEdlbmUgZnJvbSBcIi4vR2VuZVwiO1xuaW1wb3J0IElDaHJvbW9zb21lIGZyb20gXCIuL0lDaHJvbW9zb21lXCI7XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGbG9hdGluZ1BvaW50Q2hyb21vc29tZSBleHRlbmRzIEJpbmFyeUNocm9tb3NvbWVCYXNlIHtcblxuICBjb25zdHJ1Y3RvcihtVmFsdWU6IG51bWJlcikge1xuICAgIHN1cGVyKDMyKTtcbiAgICB0aGlzLm1WYWx1ZSA9IG1WYWx1ZTtcbiAgICBjb25zdCByZXN1bHQgPSB0aGlzLmNvbnZlcnRGbG9hdDMyVG9CaW4obVZhbHVlKTtcbiAgICB0aGlzLmJpbkFycmF5U3RyID0gcmVzdWx0LnNwbGl0KFwiXCIpO1xuXG4gICAgdGhpcy5jcmVhdGVHZW5lcygpO1xuICB9XG5cbiAgcHJpdmF0ZSBiaW5BcnJheVN0cjogc3RyaW5nW107XG4gIHByaXZhdGUgbVZhbHVlOiBudW1iZXI7XG5cbiAgY3JlYXRlTmV3KCk6IElDaHJvbW9zb21lIHtcbiAgICByZXR1cm4gbmV3IEZsb2F0aW5nUG9pbnRDaHJvbW9zb21lKHRoaXMubVZhbHVlKTtcbiAgfVxuXG4gIGdlbmVyYXRlR2VuZShnZW5lSW5kZXg6IG51bWJlcik6IEdlbmUge1xuICAgIHJldHVybiBuZXcgR2VuZSh0aGlzLmJpbkFycmF5U3RyW2dlbmVJbmRleF0pO1xuICB9XG5cbiAgcHJpdmF0ZSBjb252ZXJ0RmxvYXQzMlRvQmluID0gKGZsb2F0MzIpID0+IHtcbiAgICBjb25zdCBIZXhUb0JpbiA9IGhleCA9PiAocGFyc2VJbnQoaGV4LCAxNikudG9TdHJpbmcoMikpLnBhZFN0YXJ0KDMyLCAnMCcpO1xuICAgIGNvbnN0IGdldEhleCA9IGkgPT4gKCcwMCcgKyBpLnRvU3RyaW5nKDE2KSkuc2xpY2UoLTIpO1xuICAgIGNvbnN0IHZpZXcgPSBuZXcgRGF0YVZpZXcobmV3IEFycmF5QnVmZmVyKDQpKVxuICAgIHZpZXcuc2V0RmxvYXQzMigwLCBmbG9hdDMyKTtcbiAgICByZXR1cm4gSGV4VG9CaW4oQXJyYXkuYXBwbHkobnVsbCwgeyBsZW5ndGg6IDQgfSkubWFwKChfLCBpKSA9PiBnZXRIZXgodmlldy5nZXRVaW50OChpKSkpLmpvaW4oJycpKTtcbiAgfVxufVxuXG5leHBvcnQgeyBGbG9hdGluZ1BvaW50Q2hyb21vc29tZSB9O1xuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2VuZSB7XG4gIG1WYWx1ZTogYW55O1xuICBjb25zdHJ1Y3Rvcih2YWx1ZTogYW55KSB7XG4gICAgdGhpcy5tVmFsdWUgPSB2YWx1ZTtcbiAgfVxuXG4gIGVxdWFscyhvdGhlcjogR2VuZSk6IGJvb2xlYW4ge1xuICAgIGlmIChvdGhlciA9PSBudWxsKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiBvdGhlci5tVmFsdWUgPT09IHRoaXMubVZhbHVlO1xuICB9XG4gIGVxdWFsc09wZXJhdG9yKGZpcnN0OiBHZW5lLCBzZWNvbmQ6IEdlbmUpOiBib29sZWFuIHtcbiAgICByZXR1cm4gZmlyc3QuZXF1YWxzKHNlY29uZCk7XG4gIH1cblxuICBub3RFcXVhbHNPcGVyYXRvcihmaXJzdDogR2VuZSwgc2Vjb25kOiBHZW5lKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICFmaXJzdC5lcXVhbHMoc2Vjb25kKTtcbiAgfVxuXG4gIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiAodGhpcy5tVmFsdWUgIT0gbnVsbCA/IHRoaXMubVZhbHVlIDogXCJcIikudG9TdHJpbmcoKTtcbiAgfVxufVxuIiwiaW1wb3J0IEJpbmFyeUNocm9tb3NvbWVCYXNlIGZyb20gXCIuL0JpbmFyeUNocm9tb3NvbWVCYXNlXCJcbmltcG9ydCBDaHJvbW9zb21lQmFzZSBmcm9tIFwiLi9DaHJvbW9zb21lQmFzZVwiXG5pbXBvcnQgQ2hyb21vc29tZUV4dGVuc2lvbiBmcm9tIFwiLi9DaHJvbW9zb21lRXh0ZW5zaW9uXCJcbmltcG9ydCBEZWNpbWFsQ2hyb21vc29tZSBmcm9tIFwiLi9EZWNpbWFsQ2hyb21vc29tZVwiXG5pbXBvcnQgRmxvYXRpbmdQb2ludENocm9tb3NvbWUgZnJvbSBcIi4vRmxvYXRpbmdQb2ludENocm9tb3NvbWVcIlxuaW1wb3J0IEdlbmUgZnJvbSBcIi4vR2VuZVwiXG5cbmV4cG9ydCB7IEJpbmFyeUNocm9tb3NvbWVCYXNlLCBDaHJvbW9zb21lQmFzZSwgQ2hyb21vc29tZUV4dGVuc2lvbiwgRGVjaW1hbENocm9tb3NvbWUsIEZsb2F0aW5nUG9pbnRDaHJvbW9zb21lLCBHZW5lIH0iLCJpbXBvcnQgR2VuZXRpY0FsZ29yaXRobSBmcm9tIFwiLi9HZW5ldGljQWxnb3JpdGhtXCI7XG5pbXBvcnQgR2VuZSBmcm9tIFwiLi9jaHJvbW9zb21lL0dlbmVcIjtcbmltcG9ydCB7IEJpbmFyeUNocm9tb3NvbWVCYXNlLCBDaHJvbW9zb21lQmFzZSwgQ2hyb21vc29tZUV4dGVuc2lvbiwgRGVjaW1hbENocm9tb3NvbWUsIEZsb2F0aW5nUG9pbnRDaHJvbW9zb21lIH0gZnJvbSBcIi4vY2hyb21vc29tZS9JbmRleFwiO1xuXG4vLyBFeHBvcnQgR2VuZXRpYyBBbGdvcml0aG0gY2xhc3NcbmV4cG9ydCB7IEdlbmV0aWNBbGdvcml0aG0gfVxuXG4vLyBFeHBvcnQgQ2hyb21vc29tZXNcbmV4cG9ydCB7IEJpbmFyeUNocm9tb3NvbWVCYXNlLCBDaHJvbW9zb21lQmFzZSwgQ2hyb21vc29tZUV4dGVuc2lvbiwgRGVjaW1hbENocm9tb3NvbWUsIEZsb2F0aW5nUG9pbnRDaHJvbW9zb21lLCBHZW5lIH0iLCJpbXBvcnQgSUNocm9tb3NvbWUgZnJvbSBcIi4uL2Nocm9tb3NvbWUvSUNocm9tb3NvbWVcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2VuZXJhdGlvbiB7XG4gIGNocm9tb3NvbWVzOiBJQ2hyb21vc29tZVtdO1xuXG4gIGNvbnN0cnVjdG9yKG51bTogbnVtYmVyLCBjaHJvbW9zb21lczogSUNocm9tb3NvbWVbXSkge1xuICAgIGlmIChudW0gPCAxKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJHZW5lcmF0aW9uIG51bWJlciBcIiArIG51bSArIFwiaXMgaW52YWxpZC5cIik7XG4gICAgfVxuXG4gICAgaWYgKGNocm9tb3NvbWVzLmxlbmd0aCA8IDIpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkEgZ2VuZXJhdGlvbiBzaG91bGQgaGF2ZSBhdCBsZWFzdCAyIGNocm9tb3NvbWVcIik7XG4gICAgfVxuICAgIHRoaXMubnVtID0gbnVtO1xuICAgIHRoaXMuY3JlYXRpb25EYXRlID0gbmV3IERhdGUoKTtcbiAgICB0aGlzLmNocm9tb3NvbWVzID0gY2hyb21vc29tZXM7XG4gIH1cbiAgcHJpdmF0ZSBiZXN0Q2hyb21vc29tZXM6IElDaHJvbW9zb21lO1xuICBwcml2YXRlIGNyZWF0aW9uRGF0ZTogRGF0ZTtcbiAgcHJpdmF0ZSBudW06IG51bWJlcjtcblxuICBlbmQoY2hyb21vc29tZXNOdW1iZXI6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMuY2hyb21vc29tZXMgPSB0aGlzLmNocm9tb3NvbWVzXG4gICAgICAuZmlsdGVyKChjaHJvbW9zb21lKSA9PiB0aGlzLnZhbGlkYXRlQ2hyb21vc29tZShjaHJvbW9zb21lKSA9PT0gdHJ1ZSlcbiAgICAgIC5zb3J0KChhLCBiKSA9PiBiLmZpdG5lc3MgLSBhLmZpdG5lc3MpO1xuXG4gICAgdGhpcy5jaHJvbW9zb21lcyA9IHRoaXMuY2hyb21vc29tZXMuc2xpY2UoMCwgY2hyb21vc29tZXNOdW1iZXIpO1xuXG4gICAgdGhpcy5iZXN0Q2hyb21vc29tZXMgPSB0aGlzLmNocm9tb3NvbWVzWzBdO1xuICB9XG5cbiAgZ2V0Q2hyb21vc29tZSgpOiBJQ2hyb21vc29tZVtdIHtcbiAgICByZXR1cm4gdGhpcy5jaHJvbW9zb21lcztcbiAgfVxuXG4gIHRvU3RyaW5nKCkge1xuICAgIC8vIHJldHVybiBcIlwiO1xuICAgIHJldHVybiB0aGlzLmJlc3RDaHJvbW9zb21lcy5nZXRHZW5lcygpLnRvU3RyaW5nKCk7XG4gIH1cblxuICB2YWxpZGF0ZUNocm9tb3NvbWUoY2hyb21vc29tZTogSUNocm9tb3NvbWUpOiBib29sZWFuIHtcbiAgICBpZiAoY2hyb21vc29tZS5maXRuZXNzID09IG51bGwpIHRocm93IG5ldyBFcnJvcihcIk5vIGZpdG5lc3NcIik7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbn1cbiIsImltcG9ydCBJQ2hyb21vc29tZSBmcm9tIFwiLi4vY2hyb21vc29tZS9JQ2hyb21vc29tZVwiO1xuaW1wb3J0IEdlbmVyYXRpb24gZnJvbSBcIi4vR2VuZXJhdGlvblwiO1xuaW1wb3J0IElQb3B1bGF0aW9uIGZyb20gXCIuL0lQb3B1bGF0aW9uXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBvcHVsYXRpb24gaW1wbGVtZW50cyBJUG9wdWxhdGlvbiB7XG4gIHB1YmxpYyBhZGFtQ2hyb21vc29tZTogSUNocm9tb3NvbWU7XG4gIGJlc3RDaHJvbW9zb21lOiBJQ2hyb21vc29tZTtcbiAgY3JlYXRpb25EYXRlOiBEYXRlO1xuICBjdXJyZW50R2VuZXJhdGlvbjogR2VuZXJhdGlvbjtcbiAgZ2VuZXJhdGlvbk51bWJlcjogbnVtYmVyO1xuICBnZW5lcmF0aW9uczogR2VuZXJhdGlvbltdO1xuICBtYXhTaXplOiBudW1iZXI7XG4gIG1pblNpemU6IG51bWJlcjtcblxuICBjb25zdHJ1Y3RvcihtaW5TaXplOiBudW1iZXIsIG1heFNpemU6IG51bWJlciwgYWRhbUNocm9tb3NvbWU6IElDaHJvbW9zb21lKSB7XG4gICAgaWYgKG1pblNpemUgPCAyKSB0aHJvdyBuZXcgRXJyb3IoKTtcbiAgICBpZiAobWF4U2l6ZSA8IG1pblNpemUpIHRocm93IG5ldyBFcnJvcigpO1xuXG4gICAgdGhpcy5jcmVhdGlvbkRhdGUgPSBuZXcgRGF0ZSgpO1xuICAgIHRoaXMubWluU2l6ZSA9IG1pblNpemU7XG4gICAgdGhpcy5tYXhTaXplID0gbWF4U2l6ZTtcbiAgICB0aGlzLmdlbmVyYXRpb25zID0gW107XG4gICAgdGhpcy5hZGFtQ2hyb21vc29tZSA9IGFkYW1DaHJvbW9zb21lO1xuICAgIHRoaXMuYmVzdENocm9tb3NvbWUgPSBhZGFtQ2hyb21vc29tZTtcblxuICAgIHRoaXMuY3JlYXRlSW5pdGlhbEdlbmVyYXRpb24oKTtcbiAgfVxuXG4gIGNyZWF0ZUluaXRpYWxHZW5lcmF0aW9uKCk6IHZvaWQge1xuICAgIHRoaXMuZ2VuZXJhdGlvbnMgPSBbXTtcbiAgICB0aGlzLmdlbmVyYXRpb25OdW1iZXIgPSAwO1xuICAgIGNvbnN0IGNocm9tb3NvbWVzID0gW107XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubWluU2l6ZTsgaSsrKSB7XG4gICAgICBjb25zdCBjID0gdGhpcy5hZGFtQ2hyb21vc29tZS5jcmVhdGVOZXcoKTtcblxuICAgICAgaWYgKGMgPT0gbnVsbCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJcIik7XG4gICAgICB9XG5cbiAgICAgIGNocm9tb3NvbWVzLnB1c2goYyk7XG4gICAgfVxuXG4gICAgdGhpcy5jcmVhdGVOZXdHZW5lcmF0aW9uKGNocm9tb3NvbWVzKTtcbiAgfVxuXG4gIGNyZWF0ZU5ld0dlbmVyYXRpb24oY2hyb21vc29tZXM/OiBJQ2hyb21vc29tZVtdKTogdm9pZCB7XG4gICAgdGhpcy5jdXJyZW50R2VuZXJhdGlvbiA9IG5ldyBHZW5lcmF0aW9uKFxuICAgICAgKyt0aGlzLmdlbmVyYXRpb25OdW1iZXIsXG4gICAgICBjaHJvbW9zb21lc1xuICAgICk7XG4gICAgdGhpcy5nZW5lcmF0aW9ucy5wdXNoKHRoaXMuY3VycmVudEdlbmVyYXRpb24pO1xuICB9XG4gIGVuZEN1cnJlbnRHZW5lcmF0aW9uKCk6IHZvaWQge1xuICAgIHRoaXMuY3VycmVudEdlbmVyYXRpb24uZW5kKHRoaXMubWF4U2l6ZSk7XG4gICAgaWYgKFxuICAgICAgdGhpcy5iZXN0Q2hyb21vc29tZS5maXRuZXNzIDxcbiAgICAgIHRoaXMuY3VycmVudEdlbmVyYXRpb24uY2hyb21vc29tZXNbMF0uZml0bmVzcyB8fFxuICAgICAgdGhpcy5iZXN0Q2hyb21vc29tZSA9PT0gdW5kZWZpbmVkXG4gICAgKSB7XG4gICAgICB0aGlzLmJlc3RDaHJvbW9zb21lID0gdGhpcy5jdXJyZW50R2VuZXJhdGlvbi5jaHJvbW9zb21lc1swXTtcbiAgICB9XG4gIH1cblxuICB0b1N0cmluZyA9ICgpID0+IHtcbiAgICBsZXQgc3RyID0gXCJcIjtcbiAgICBmb3IgKGNvbnN0IGdlbmVyYXRpb24gb2YgdGhpcy5nZW5lcmF0aW9ucykge1xuICAgICAgc3RyICs9IHRoaXMuZ2VuZXJhdGlvbnMudG9TdHJpbmcoKTtcbiAgICB9XG4gICAgcmV0dXJuIHN0cjtcbiAgfTtcbn1cbiIsImltcG9ydCBSYW5kb21pemF0aW9uQmFzZSBmcm9tIFwiLi9SYW5kb21pemF0aW9uQmFzZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCYXNpY1JhbmRvbWl6YXRpb24gZXh0ZW5kcyBSYW5kb21pemF0aW9uQmFzZSB7XG4gIGdldERvdWJsZShtaW4/OiBudW1iZXIsIG1heD86IG51bWJlcik6IG51bWJlciB7XG4gICAgaWYgKG1pbiA9PT0gdW5kZWZpbmVkIHx8IG1heCA9PT0gdW5kZWZpbmVkKSByZXR1cm4gTWF0aC5yYW5kb20oKTtcbiAgICByZXR1cm4gTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4pICsgbWluO1xuICB9XG5cbiAgZ2V0RmxvYXQobWluPzogbnVtYmVyLCBtYXg/OiBudW1iZXIpOiBudW1iZXIge1xuICAgIHJldHVybiBNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbikgKyBtaW47XG4gIH1cbiAgZ2V0SW50KG1pbjogbnVtYmVyLCBtYXg6IG51bWJlcik6IG51bWJlciB7XG4gICAgbWluID0gTWF0aC5jZWlsKG1pbik7XG4gICAgbWF4ID0gTWF0aC5mbG9vcihtYXgpO1xuICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluKSArIG1pbik7IC8vIFRoZSBtYXhpbXVtIGlzIGV4Y2x1c2l2ZSBhbmQgdGhlIG1pbmltdW0gaXMgaW5jbHVzaXZlXG4gIH1cbiAgZ2V0VW5pcXVlSW50cyhsZW5ndGg6IG51bWJlciwgbWluOiBudW1iZXIsIG1heDogbnVtYmVyKTogbnVtYmVyW10ge1xuICAgIGNvbnN0IHN0dWIgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gbWluOyBpIDwgbWF4OyBpKyspIHtcbiAgICAgIHN0dWIucHVzaChpKTtcbiAgICB9XG4gICAgcmV0dXJuIHN0dWJcbiAgICAgIC5zb3J0KCgpID0+IHtcbiAgICAgICAgcmV0dXJuIDAuNSAtIE1hdGgucmFuZG9tKCk7XG4gICAgICB9KVxuICAgICAgLnNsaWNlKDAsIGxlbmd0aCk7XG4gIH1cbn1cbiIsImltcG9ydCBJUmFuZG9taXphdGlvbiBmcm9tIFwiLi9JUmFuZG9taXphdGlvblwiO1xuXG5leHBvcnQgZGVmYXVsdCBhYnN0cmFjdCBjbGFzcyBSYW5kb21pemF0aW9uQmFzZSBpbXBsZW1lbnRzIElSYW5kb21pemF0aW9uIHtcbiAgYWJzdHJhY3QgZ2V0RG91YmxlKG1pbj86IG51bWJlciwgbWF4PzogbnVtYmVyKTogbnVtYmVyO1xuICBhYnN0cmFjdCBnZXRGbG9hdChtaW4/OiBudW1iZXIsIG1heD86IG51bWJlcik6IG51bWJlcjtcbiAgYWJzdHJhY3QgZ2V0SW50KG1pbjogbnVtYmVyLCBtYXg6IG51bWJlcik6IG51bWJlcjtcblxuICBnZXRJbnRzKGxlbmd0aDogbnVtYmVyLCBtaW46IG51bWJlciwgbWF4OiBudW1iZXIpOiBudW1iZXJbXSB7XG4gICAgY29uc3QgcmVzdWx0ID0gW107XG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IGxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgcmVzdWx0LnB1c2godGhpcy5nZXRJbnQobWluLCBtYXgpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgYWJzdHJhY3QgZ2V0VW5pcXVlSW50cyhsZW5ndGg6IG51bWJlciwgbWluOiBudW1iZXIsIG1heDogbnVtYmVyKTogbnVtYmVyW107XG59XG4iLCJpbXBvcnQgQmFzaWNSYW5kb21pemF0aW9uIGZyb20gXCIuL0Jhc2ljUmFuZG9taXphdGlvblwiO1xuaW1wb3J0IElSYW5kb21pemF0aW9uIGZyb20gXCIuL0lSYW5kb21pemF0aW9uXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJhbmRvbWl6YXRpb25Qcm92aWRlciB7XG4gIHN0YXRpYyBjdXJyZW50OiBJUmFuZG9taXphdGlvbiA9IG5ldyBCYXNpY1JhbmRvbWl6YXRpb24oKTtcbn1cbiIsImltcG9ydCBJR2VuZXRpY0FsZ29yaXRobSBmcm9tIFwiLi4vSUdlbmV0aWNBbGdvcml0aG1cIjtcbmltcG9ydCBUZXJtaW5hdGlvbkJhc2UgZnJvbSBcIi4vVGVybWluYXRpb25CYXNlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdlbmVyYXRpb25OdW1iZXJUZXJtaW5hdGlvbiBleHRlbmRzIFRlcm1pbmF0aW9uQmFzZSB7XG4gIHB1YmxpYyBleHBlY3RlZEdlbmVyYXRpb25OdW1iZXI6IG51bWJlcjtcblxuICBjb25zdHJ1Y3RvcihleHBlY3RlZEdlbmVyYXRpb25OdW1iZXI/OiBudW1iZXIpIHtcbiAgICBzdXBlcigpO1xuICAgIGlmIChcbiAgICAgIGV4cGVjdGVkR2VuZXJhdGlvbk51bWJlciA9PT0gdW5kZWZpbmVkIHx8XG4gICAgICBleHBlY3RlZEdlbmVyYXRpb25OdW1iZXIgPT09IG51bGxcbiAgICApXG4gICAgICB0aGlzLmV4cGVjdGVkR2VuZXJhdGlvbk51bWJlciA9IDEwMDtcbiAgICB0aGlzLmV4cGVjdGVkR2VuZXJhdGlvbk51bWJlciA9IGV4cGVjdGVkR2VuZXJhdGlvbk51bWJlcjtcbiAgfVxuXG4gIHBlcmZvcm1IYXNSZWFjaGVkKGdlbmV0aWNBbGdvcml0aG06IElHZW5ldGljQWxnb3JpdGhtKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIGdlbmV0aWNBbGdvcml0aG0uZ2VuZXJhdGlvbnNOdW1iZXIgPj0gdGhpcy5leHBlY3RlZEdlbmVyYXRpb25OdW1iZXI7XG4gIH1cbn1cbiIsImltcG9ydCBJR2VuZXRpY0FsZ29yaXRobSBmcm9tIFwiLi4vSUdlbmV0aWNBbGdvcml0aG1cIjtcbmltcG9ydCBJVGVybWluYXRpb24gZnJvbSBcIi4vSVRlcm1pbmF0aW9uXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGFic3RyYWN0IGNsYXNzIFRlcm1pbmF0aW9uQmFzZSBpbXBsZW1lbnRzIElUZXJtaW5hdGlvbiB7XG4gIHByaXZhdGUgbV9oYXNSZWFjaGVkOiBib29sZWFuO1xuXG4gIGhhc1JlYWNoZWQoZ2VuZXRpY0FsZ29yaXRobTogSUdlbmV0aWNBbGdvcml0aG0pOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5tX2hhc1JlYWNoZWQ7XG4gIH1cblxuICBhYnN0cmFjdCBwZXJmb3JtSGFzUmVhY2hlZChnZW5ldGljQWxnb3JpdGhtOiBJR2VuZXRpY0FsZ29yaXRobSk6IGJvb2xlYW47XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHRpZihfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdKSB7XG5cdFx0cmV0dXJuIF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0uZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLy8gbW9kdWxlIGV4cG9ydHMgbXVzdCBiZSByZXR1cm5lZCBmcm9tIHJ1bnRpbWUgc28gZW50cnkgaW5saW5pbmcgaXMgZGlzYWJsZWRcbi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xucmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9kb21haW4vaW5kZXgudHNcIik7XG4iXSwic291cmNlUm9vdCI6IiJ9