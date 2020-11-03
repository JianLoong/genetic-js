(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["geneticjs"] = factory();
	else
		root["geneticjs"] = factory();
})(self, function() {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/commons/Float32Encoding.ts":
/*!****************************************!*\
  !*** ./src/commons/Float32Encoding.ts ***!
  \****************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ Float32Encoding
/* harmony export */ });
class Float32Encoding {
}
Float32Encoding.convertBinToFloat32 = (str) => {
    const int = parseInt(str, 2);
    if (int > 0 || int < 0) {
        const sign = (int >>> 31) ? -1 : 1;
        let exp = (int >>> 23 & 0xff) - 127;
        const mantissa = ((int & 0x7fffff) + 0x800000).toString(2);
        let float32 = 0;
        for (let i = 0; i < mantissa.length; i += 1) {
            float32 += parseInt(mantissa[i]) ? Math.pow(2, exp) : 0;
            exp--;
        }
        return float32 * sign;
    }
    else
        return 0;
};
Float32Encoding.convertFloat32ToBin = (float32) => {
    const HexToBin = hex => (parseInt(hex, 16).toString(2)).padStart(32, '0');
    const getHex = i => ('00' + i.toString(16)).slice(-2);
    const view = new DataView(new ArrayBuffer(4));
    view.setFloat32(0, float32);
    return HexToBin(Array.apply(null, { length: 4 }).map((_, i) => getHex(view.getUint8(i))).join(''));
};
Float32Encoding.convertFloat32ToHex = (float32) => {
    const getHex = i => ('00' + i.toString(16)).slice(-2);
    const view = new DataView(new ArrayBuffer(4));
    view.setFloat32(0, float32);
    return Array.apply(null, { length: 4 }).map((_, i) => getHex(view.getUint8(i))).join('');
};
Float32Encoding.convertHexToFloat32 = (str) => {
    const int = parseInt(str, 16);
    if (int > 0 || int < 0) {
        const sign = (int >>> 31) ? -1 : 1;
        let exp = (int >>> 23 & 0xff) - 127;
        const mantissa = ((int & 0x7fffff) + 0x800000).toString(2);
        let float32 = 0;
        for (let i = 0; i < mantissa.length; i += 1) {
            float32 += parseInt(mantissa[i]) ? Math.pow(2, exp) : 0;
            exp--;
        }
        return float32 * sign;
    }
    else
        return 0;
};


/***/ }),

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
/* harmony import */ var _crossovers_UniformCrossover__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./crossovers/UniformCrossover */ "./src/domain/crossovers/UniformCrossover.ts");
/* harmony import */ var _DefaultOperationStrategy__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DefaultOperationStrategy */ "./src/domain/DefaultOperationStrategy.ts");
/* harmony import */ var _mutations_UniformMutation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./mutations/UniformMutation */ "./src/domain/mutations/UniformMutation.ts");
/* harmony import */ var _populations_Population__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./populations/Population */ "./src/domain/populations/Population.ts");
/* harmony import */ var _reinsertion_ElitistReinsertion__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./reinsertion/ElitistReinsertion */ "./src/domain/reinsertion/ElitistReinsertion.ts");
/* harmony import */ var _selections_EliteSelection__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./selections/EliteSelection */ "./src/domain/selections/EliteSelection.ts");
/* harmony import */ var _terminations_GenerationNumberTermination__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./terminations/GenerationNumberTermination */ "./src/domain/terminations/GenerationNumberTermination.ts");







var GeneticAlgorithmState;
(function (GeneticAlgorithmState) {
    GeneticAlgorithmState[GeneticAlgorithmState["NotStarted"] = 0] = "NotStarted";
    GeneticAlgorithmState[GeneticAlgorithmState["Started"] = 1] = "Started";
    GeneticAlgorithmState[GeneticAlgorithmState["Stopped"] = 2] = "Stopped";
    GeneticAlgorithmState[GeneticAlgorithmState["Resumed"] = 3] = "Resumed";
    GeneticAlgorithmState[GeneticAlgorithmState["TerminationReached"] = 4] = "TerminationReached";
})(GeneticAlgorithmState || (GeneticAlgorithmState = {}));
class GeneticAlgorithm {
    constructor(population, fitness, selection = new _selections_EliteSelection__WEBPACK_IMPORTED_MODULE_5__.default(), crossOver = new _crossovers_UniformCrossover__WEBPACK_IMPORTED_MODULE_0__.default(0.5), mutation = new _mutations_UniformMutation__WEBPACK_IMPORTED_MODULE_2__.default(), reinsertion = new _reinsertion_ElitistReinsertion__WEBPACK_IMPORTED_MODULE_4__.ElitistReinsertion(), termination = new _terminations_GenerationNumberTermination__WEBPACK_IMPORTED_MODULE_6__.default(100)) {
        this.defaultCrossOverProbability = 0.75;
        this.defaultMutationProbability = 0.3;
        this.isFitnessMaximized = true;
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
        this.operatorStrategy = new _DefaultOperationStrategy__WEBPACK_IMPORTED_MODULE_1__.default();
        this.reinsertion = reinsertion;
        this.generationsNumber = 0;
    }
    clone() {
        return new GeneticAlgorithm(new _populations_Population__WEBPACK_IMPORTED_MODULE_3__.default(this.population.minSize, this.population.maxSize, this.population.bestChromosome), this.fitness, this.selection, this.crossOver, this.mutation, this.reinsertion, this.termination);
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
/* harmony import */ var _commons_Float32Encoding__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../commons/Float32Encoding */ "./src/commons/Float32Encoding.ts");
/* harmony import */ var _randomization_RandomizationProvider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../randomization/RandomizationProvider */ "./src/domain/randomization/RandomizationProvider.ts");
/* harmony import */ var _BinaryChromosomeBase__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./BinaryChromosomeBase */ "./src/domain/chromosome/BinaryChromosomeBase.ts");
/* harmony import */ var _Gene__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Gene */ "./src/domain/chromosome/Gene.ts");




class FloatingPointChromosome extends _BinaryChromosomeBase__WEBPACK_IMPORTED_MODULE_2__.default {
    constructor(minValue, maxValue, isIntValue = true) {
        let totalBit = 0;
        maxValue.forEach(element => totalBit += element.toString(2).length);
        if (isIntValue === true)
            super(totalBit);
        else
            super(32 * minValue.length);
        this.minValue = minValue;
        this.maxValue = maxValue;
        this.isIntValue = isIntValue;
        this.originalValue = this.flatten(minValue, maxValue);
        this.createGenes();
    }
    createNew() {
        return new FloatingPointChromosome(this.minValue, this.maxValue, this.isIntValue);
    }
    ensureCapacity() {
        return true;
    }
    expand() {
        const values = [];
        const genes = this.getGenes();
        if (this.isIntValue === true) {
            const bitLength = [];
            for (const element of this.maxValue) {
                bitLength.push(element.toString(2).length);
            }
            for (let i = 0, j = 0; i < genes.length; i = i + bitLength[j], j++) {
                const sliced = genes.slice(i, i + bitLength[j]).toString().replace(/,/g, "");
                values.push(parseInt(sliced, 2));
            }
        }
        else {
            for (let i = 0; i < genes.length; i = i + 32) {
                const sliced = genes.slice(i, i + 32).toString().replace(/,/g, "");
                values.push(_commons_Float32Encoding__WEBPACK_IMPORTED_MODULE_0__.default.convertBinToFloat32(sliced));
            }
        }
        return values;
    }
    flatten(minValue, maxValue) {
        let stringRepresentation = "";
        if (this.isIntValue === true) {
            for (let i = 0; i < minValue.length; i++) {
                const min = minValue[i];
                const max = maxValue[i];
                let random = 0;
                random = _randomization_RandomizationProvider__WEBPACK_IMPORTED_MODULE_1__.default.current.getInt(min, max);
                const bitLength = max.toString(2).length;
                const stringRep = random.toString(2).padStart(bitLength, "0");
                stringRepresentation += stringRep;
            }
        }
        else {
            for (let i = 0; i < minValue.length; i++) {
                const min = minValue[i];
                const max = maxValue[i];
                let random = 0;
                random = _randomization_RandomizationProvider__WEBPACK_IMPORTED_MODULE_1__.default.current.getFloat(min, max);
                stringRepresentation += _commons_Float32Encoding__WEBPACK_IMPORTED_MODULE_0__.default.convertFloat32ToBin(random);
            }
        }
        return stringRepresentation.split("").map(Number);
    }
    generateGene(geneIndex) {
        const gene = this.originalValue[geneIndex];
        return new _Gene__WEBPACK_IMPORTED_MODULE_3__.default(gene);
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
/* harmony import */ var _chromosome_ChromosomeExtension__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../chromosome/ChromosomeExtension */ "./src/domain/chromosome/ChromosomeExtension.ts");
/* harmony import */ var _chromosome_DecimalChromosome__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../chromosome/DecimalChromosome */ "./src/domain/chromosome/DecimalChromosome.ts");
/* harmony import */ var _chromosome_Gene__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../chromosome/Gene */ "./src/domain/chromosome/Gene.ts");
/* harmony import */ var _CrossoverBase__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./CrossoverBase */ "./src/domain/crossovers/CrossoverBase.ts");




class AlternatingPointCrossover extends _CrossoverBase__WEBPACK_IMPORTED_MODULE_3__.default {
    constructor() {
        super(2, 2);
    }
    performCross(parents) {
        const p1 = parents[0];
        const p2 = parents[1];
        if (_chromosome_ChromosomeExtension__WEBPACK_IMPORTED_MODULE_0__.default.anyHasRepeatedGene(parents)) {
            throw new Error("Alternating cross over has repeated");
        }
        const child1 = this.createChild(p1, p2);
        const child2 = this.createChild(p2, p1);
        return [child1, child2];
    }
    createChild(firstParent, secondParent) {
        const child = [];
        const c = new _chromosome_DecimalChromosome__WEBPACK_IMPORTED_MODULE_1__.default(firstParent.length);
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
            c.replaceGene(i, new _chromosome_Gene__WEBPACK_IMPORTED_MODULE_2__.default(child[i]));
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
/* harmony export */   "default": () => /* binding */ OnePointCrossover
/* harmony export */ });
/* harmony import */ var _randomization_RandomizationProvider__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../randomization/RandomizationProvider */ "./src/domain/randomization/RandomizationProvider.ts");
/* harmony import */ var _CrossoverBase__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CrossoverBase */ "./src/domain/crossovers/CrossoverBase.ts");


class OnePointCrossover extends _CrossoverBase__WEBPACK_IMPORTED_MODULE_1__.default {
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
/* harmony import */ var _chromosome_ChromosomeExtension__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../chromosome/ChromosomeExtension */ "./src/domain/chromosome/ChromosomeExtension.ts");
/* harmony import */ var _randomization_RandomizationProvider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../randomization/RandomizationProvider */ "./src/domain/randomization/RandomizationProvider.ts");
/* harmony import */ var _CrossoverBase__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./CrossoverBase */ "./src/domain/crossovers/CrossoverBase.ts");
/* harmony import */ var _CrossOverUtil__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./CrossOverUtil */ "./src/domain/crossovers/CrossOverUtil.ts");




class OrderedCrossover extends _CrossoverBase__WEBPACK_IMPORTED_MODULE_2__.default {
    constructor() {
        super(2, 2);
        this.isOrdered = true;
    }
    performCross(parents) {
        const parentOne = parents[0];
        const parentTwo = parents[1];
        if (!_chromosome_ChromosomeExtension__WEBPACK_IMPORTED_MODULE_0__.default.validateGenes(parentOne)) {
            throw new Error("Ordered Crossover - Cannot be used! Parent has duplicate genes.");
        }
        if (_chromosome_ChromosomeExtension__WEBPACK_IMPORTED_MODULE_0__.default.anyHasRepeatedGene([parentOne, parentTwo])) {
            throw new Error("Ordered Crossover - Parents have repeated genes");
        }
        let middleSectionIndexes = _randomization_RandomizationProvider__WEBPACK_IMPORTED_MODULE_1__.default.current.getUniqueInts(2, 0, parentOne.length);
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
        const childGenes = _CrossOverUtil__WEBPACK_IMPORTED_MODULE_3__.default.orderedCrossover(firstParentGenes, secondParentGenes, middleSectionBeginIndex, middleSectionEndIndex);
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

/***/ "./src/domain/mutations/FlipBitMutation.ts":
/*!*************************************************!*\
  !*** ./src/domain/mutations/FlipBitMutation.ts ***!
  \*************************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ FlipBitMutation
/* harmony export */ });
/* harmony import */ var _randomization_RandomizationProvider__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../randomization/RandomizationProvider */ "./src/domain/randomization/RandomizationProvider.ts");
/* harmony import */ var _MutationBase__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MutationBase */ "./src/domain/mutations/MutationBase.ts");


class FlipBitMutation extends _MutationBase__WEBPACK_IMPORTED_MODULE_1__.default {
    constructor() {
        super();
        this.rnd = _randomization_RandomizationProvider__WEBPACK_IMPORTED_MODULE_0__.default.current;
    }
    performMutate(chromosome, probability) {
        const bc = chromosome;
        if (bc == null)
            throw new Error("Flip bit cant be done");
        if (this.rnd.getDouble() <= probability) {
            const index = this.rnd.getInt(0, chromosome.length);
            bc.flipGene(index);
        }
    }
}


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
        const mutated = [...sequence].sort(() => 0.5 - Math.random());
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
    constructor(num, chromosomes, isMaximized = true) {
        if (num < 1) {
            throw new Error("Generation number " + num + "is invalid.");
        }
        if (chromosomes.length < 2) {
            throw new Error("A generation should have at least 2 chromosome");
        }
        this.num = num;
        this.creationDate = new Date();
        this.chromosomes = chromosomes;
        this.isMaximized = isMaximized;
    }
    end(chromosomesNumber) {
        if (this.isMaximized) {
            this.chromosomes = this.chromosomes
                .filter((chromosome) => this.validateChromosome(chromosome) === true)
                .sort((a, b) => b.fitness - a.fitness);
        }
        else {
            this.chromosomes = this.chromosomes
                .filter((chromosome) => this.validateChromosome(chromosome) === true)
                .sort((a, b) => a.fitness - b.fitness);
        }
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

/***/ "./src/domain/reinsertion/ElitistReinsertion.ts":
/*!******************************************************!*\
  !*** ./src/domain/reinsertion/ElitistReinsertion.ts ***!
  \******************************************************/
/*! namespace exports */
/*! export ElitistReinsertion [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ElitistReinsertion": () => /* binding */ ElitistReinsertion
/* harmony export */ });
/* harmony import */ var _ReinsertionBase__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ReinsertionBase */ "./src/domain/reinsertion/ReinsertionBase.ts");

class ElitistReinsertion extends _ReinsertionBase__WEBPACK_IMPORTED_MODULE_0__.ReinsertionBase {
    constructor(isMaximized = true) {
        super(false, true);
        this.isMaximized = isMaximized;
    }
    performSelectChromosome(population, offspring, parents) {
        const diff = population.minSize - offspring.length;
        let best = [];
        if (diff > 0) {
            const bestParents = [...parents];
            if (this.isMaximized)
                best = bestParents.sort((a, b) => b.fitness - a.fitness).slice(0, diff);
            else
                best = bestParents.sort((a, b) => a.fitness - b.fitness).slice(0, diff);
        }
        const result = offspring.concat(best);
        return result;
    }
}


/***/ }),

/***/ "./src/domain/reinsertion/ReinsertionBase.ts":
/*!***************************************************!*\
  !*** ./src/domain/reinsertion/ReinsertionBase.ts ***!
  \***************************************************/
/*! namespace exports */
/*! export ReinsertionBase [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ReinsertionBase": () => /* binding */ ReinsertionBase
/* harmony export */ });
class ReinsertionBase {
    constructor(canCollapse, canExpand) {
        this.canCollapse = canCollapse;
        this.canExpand = canExpand;
    }
    selectChromosome(population, offspring, parents) {
        if (population === undefined)
            throw new Error("The population is undefined.");
        if (!this.canExpand && offspring.length < population.minSize) {
            throw new Error("Chromosome cannot be selected as the number of offsprings exceed the min size of the population.");
        }
        return this.performSelectChromosome(population, offspring, parents);
    }
}


/***/ }),

/***/ "./src/domain/selections/EliteSelection.ts":
/*!*************************************************!*\
  !*** ./src/domain/selections/EliteSelection.ts ***!
  \*************************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ EliteSelection
/* harmony export */ });
/* harmony import */ var _SelectionBase__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SelectionBase */ "./src/domain/selections/SelectionBase.ts");

class EliteSelection extends _SelectionBase__WEBPACK_IMPORTED_MODULE_0__.default {
    constructor(isMaximized = true) {
        super(2);
    }
    performSelectChromosome(num, generation) {
        if (generation === undefined)
            throw new Error("EliteSelection - No generation for Elite Selection");
        const ordered = generation
            .getChromosome()
            .sort((a, b) => b.fitness - a.fitness);
        return ordered.slice(0, num);
    }
}


/***/ }),

/***/ "./src/domain/selections/SelectionBase.ts":
/*!************************************************!*\
  !*** ./src/domain/selections/SelectionBase.ts ***!
  \************************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ SelectionBase
/* harmony export */ });
class SelectionBase {
    constructor(minNumberChromosome) {
        this.minNumberChromosome = minNumberChromosome;
    }
    selectChromosomes(num, generation) {
        if (num < this.minNumberChromosome) {
            throw new Error("");
        }
        return this.performSelectChromosome(num, generation);
    }
}


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
        if (geneticAlgorithm.bestChromosome === undefined)
            return false;
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
            this.terminations.concat(terminations);
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

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! namespace exports */
/*! export AlternatingPointCrossover [provided] [maybe used in bundle (runtime-defined)] [usage prevents renaming] -> ./src/domain/crossovers/AlternatingPointCrossover.ts .default */
/*! export AndTermination [provided] [maybe used in bundle (runtime-defined)] [usage prevents renaming] -> ./src/domain/terminations/AndTermination.ts .default */
/*! export BinaryChromosomeBase [provided] [maybe used in bundle (runtime-defined)] [usage prevents renaming] -> ./src/domain/chromosome/BinaryChromosomeBase.ts .default */
/*! export ChromosomeBase [provided] [maybe used in bundle (runtime-defined)] [usage prevents renaming] -> ./src/domain/chromosome/ChromosomeBase.ts .default */
/*! export ChromosomeExtension [provided] [maybe used in bundle (runtime-defined)] [usage prevents renaming] -> ./src/domain/chromosome/ChromosomeExtension.ts .default */
/*! export CrossoverBase [provided] [maybe used in bundle (runtime-defined)] [usage prevents renaming] -> ./src/domain/crossovers/CrossoverBase.ts .default */
/*! export DecimalChromosome [provided] [maybe used in bundle (runtime-defined)] [usage prevents renaming] -> ./src/domain/chromosome/DecimalChromosome.ts .default */
/*! export FitnessStagnationTermination [provided] [maybe used in bundle (runtime-defined)] [usage prevents renaming] -> ./src/domain/terminations/FitnessStagnationTermination.ts .default */
/*! export FitnessThresholdTermination [provided] [maybe used in bundle (runtime-defined)] [usage prevents renaming] -> ./src/domain/terminations/FitnessThresholdTermination.ts .default */
/*! export FlipBitMutation [provided] [maybe used in bundle (runtime-defined)] [usage prevents renaming] -> ./src/domain/mutations/FlipBitMutation.ts .default */
/*! export FloatingPointChromosome [provided] [maybe used in bundle (runtime-defined)] [usage prevents renaming] -> ./src/domain/chromosome/FloatingPointChromosome.ts .default */
/*! export Generation [provided] [maybe used in bundle (runtime-defined)] [usage prevents renaming] -> ./src/domain/populations/Generation.ts .default */
/*! export GenerationNumberTermination [provided] [maybe used in bundle (runtime-defined)] [usage prevents renaming] -> ./src/domain/terminations/GenerationNumberTermination.ts .default */
/*! export GeneticAlgorithm [provided] [maybe used in bundle (runtime-defined)] [usage prevents renaming] -> ./src/domain/GeneticAlgorithm.ts .default */
/*! export MutationBase [provided] [maybe used in bundle (runtime-defined)] [usage prevents renaming] -> ./src/domain/mutations/MutationBase.ts .default */
/*! export OnePointCrossover [provided] [maybe used in bundle (runtime-defined)] [usage prevents renaming] -> ./src/domain/crossovers/OnePointCrossover.ts .default */
/*! export OrderedCrossover [provided] [maybe used in bundle (runtime-defined)] [usage prevents renaming] -> ./src/domain/crossovers/OrderedCrossover.ts .default */
/*! export PartialShuffleMutation [provided] [maybe used in bundle (runtime-defined)] [usage prevents renaming] -> ./src/domain/mutations/PartialShuffleMutation.ts .default */
/*! export Population [provided] [maybe used in bundle (runtime-defined)] [usage prevents renaming] -> ./src/domain/populations/Population.ts .default */
/*! export ReverseSequenceMutation [provided] [maybe used in bundle (runtime-defined)] [usage prevents renaming] -> ./src/domain/mutations/ReverseSequenceMutation.ts .default */
/*! export UniformCrossover [provided] [maybe used in bundle (runtime-defined)] [usage prevents renaming] -> ./src/domain/crossovers/UniformCrossover.ts .default */
/*! export UniformMutation [provided] [maybe used in bundle (runtime-defined)] [usage prevents renaming] -> ./src/domain/mutations/UniformMutation.ts .default */
/*! other exports [not provided] [maybe used in bundle (runtime-defined)] */
/*! runtime requirements: __webpack_require__, __webpack_exports__, __webpack_require__.d, __webpack_require__.r, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BinaryChromosomeBase": () => /* reexport safe */ _domain_chromosome_BinaryChromosomeBase__WEBPACK_IMPORTED_MODULE_0__.default,
/* harmony export */   "ChromosomeBase": () => /* reexport safe */ _domain_chromosome_ChromosomeBase__WEBPACK_IMPORTED_MODULE_1__.default,
/* harmony export */   "ChromosomeExtension": () => /* reexport safe */ _domain_chromosome_ChromosomeExtension__WEBPACK_IMPORTED_MODULE_2__.default,
/* harmony export */   "DecimalChromosome": () => /* reexport safe */ _domain_chromosome_DecimalChromosome__WEBPACK_IMPORTED_MODULE_3__.default,
/* harmony export */   "FloatingPointChromosome": () => /* reexport safe */ _domain_chromosome_FloatingPointChromosome__WEBPACK_IMPORTED_MODULE_4__.default,
/* harmony export */   "GeneticAlgorithm": () => /* reexport safe */ _domain_GeneticAlgorithm__WEBPACK_IMPORTED_MODULE_10__.default,
/* harmony export */   "AlternatingPointCrossover": () => /* reexport safe */ _domain_crossovers_AlternatingPointCrossover__WEBPACK_IMPORTED_MODULE_5__.default,
/* harmony export */   "CrossoverBase": () => /* reexport safe */ _domain_crossovers_CrossoverBase__WEBPACK_IMPORTED_MODULE_6__.default,
/* harmony export */   "OnePointCrossover": () => /* reexport safe */ _domain_crossovers_OnePointCrossover__WEBPACK_IMPORTED_MODULE_7__.default,
/* harmony export */   "OrderedCrossover": () => /* reexport safe */ _domain_crossovers_OrderedCrossover__WEBPACK_IMPORTED_MODULE_8__.default,
/* harmony export */   "UniformCrossover": () => /* reexport safe */ _domain_crossovers_UniformCrossover__WEBPACK_IMPORTED_MODULE_9__.default,
/* harmony export */   "FlipBitMutation": () => /* reexport safe */ _domain_mutations_FlipBitMutation__WEBPACK_IMPORTED_MODULE_11__.default,
/* harmony export */   "MutationBase": () => /* reexport safe */ _domain_mutations_MutationBase__WEBPACK_IMPORTED_MODULE_12__.default,
/* harmony export */   "PartialShuffleMutation": () => /* reexport safe */ _domain_mutations_PartialShuffleMutation__WEBPACK_IMPORTED_MODULE_13__.default,
/* harmony export */   "ReverseSequenceMutation": () => /* reexport safe */ _domain_mutations_ReverseSequenceMutation__WEBPACK_IMPORTED_MODULE_14__.default,
/* harmony export */   "UniformMutation": () => /* reexport safe */ _domain_mutations_UniformMutation__WEBPACK_IMPORTED_MODULE_15__.default,
/* harmony export */   "Generation": () => /* reexport safe */ _domain_populations_Generation__WEBPACK_IMPORTED_MODULE_16__.default,
/* harmony export */   "Population": () => /* reexport safe */ _domain_populations_Population__WEBPACK_IMPORTED_MODULE_17__.default,
/* harmony export */   "AndTermination": () => /* reexport safe */ _domain_terminations_AndTermination__WEBPACK_IMPORTED_MODULE_18__.default,
/* harmony export */   "FitnessStagnationTermination": () => /* reexport safe */ _domain_terminations_FitnessStagnationTermination__WEBPACK_IMPORTED_MODULE_19__.default,
/* harmony export */   "FitnessThresholdTermination": () => /* reexport safe */ _domain_terminations_FitnessThresholdTermination__WEBPACK_IMPORTED_MODULE_20__.default,
/* harmony export */   "GenerationNumberTermination": () => /* reexport safe */ _domain_terminations_GenerationNumberTermination__WEBPACK_IMPORTED_MODULE_21__.default
/* harmony export */ });
/* harmony import */ var _domain_chromosome_BinaryChromosomeBase__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./domain/chromosome/BinaryChromosomeBase */ "./src/domain/chromosome/BinaryChromosomeBase.ts");
/* harmony import */ var _domain_chromosome_ChromosomeBase__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./domain/chromosome/ChromosomeBase */ "./src/domain/chromosome/ChromosomeBase.ts");
/* harmony import */ var _domain_chromosome_ChromosomeExtension__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./domain/chromosome/ChromosomeExtension */ "./src/domain/chromosome/ChromosomeExtension.ts");
/* harmony import */ var _domain_chromosome_DecimalChromosome__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./domain/chromosome/DecimalChromosome */ "./src/domain/chromosome/DecimalChromosome.ts");
/* harmony import */ var _domain_chromosome_FloatingPointChromosome__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./domain/chromosome/FloatingPointChromosome */ "./src/domain/chromosome/FloatingPointChromosome.ts");
/* harmony import */ var _domain_crossovers_AlternatingPointCrossover__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./domain/crossovers/AlternatingPointCrossover */ "./src/domain/crossovers/AlternatingPointCrossover.ts");
/* harmony import */ var _domain_crossovers_CrossoverBase__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./domain/crossovers/CrossoverBase */ "./src/domain/crossovers/CrossoverBase.ts");
/* harmony import */ var _domain_crossovers_OnePointCrossover__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./domain/crossovers/OnePointCrossover */ "./src/domain/crossovers/OnePointCrossover.ts");
/* harmony import */ var _domain_crossovers_OrderedCrossover__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./domain/crossovers/OrderedCrossover */ "./src/domain/crossovers/OrderedCrossover.ts");
/* harmony import */ var _domain_crossovers_UniformCrossover__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./domain/crossovers/UniformCrossover */ "./src/domain/crossovers/UniformCrossover.ts");
/* harmony import */ var _domain_GeneticAlgorithm__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./domain/GeneticAlgorithm */ "./src/domain/GeneticAlgorithm.ts");
/* harmony import */ var _domain_mutations_FlipBitMutation__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./domain/mutations/FlipBitMutation */ "./src/domain/mutations/FlipBitMutation.ts");
/* harmony import */ var _domain_mutations_MutationBase__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./domain/mutations/MutationBase */ "./src/domain/mutations/MutationBase.ts");
/* harmony import */ var _domain_mutations_PartialShuffleMutation__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./domain/mutations/PartialShuffleMutation */ "./src/domain/mutations/PartialShuffleMutation.ts");
/* harmony import */ var _domain_mutations_ReverseSequenceMutation__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./domain/mutations/ReverseSequenceMutation */ "./src/domain/mutations/ReverseSequenceMutation.ts");
/* harmony import */ var _domain_mutations_UniformMutation__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./domain/mutations/UniformMutation */ "./src/domain/mutations/UniformMutation.ts");
/* harmony import */ var _domain_populations_Generation__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./domain/populations/Generation */ "./src/domain/populations/Generation.ts");
/* harmony import */ var _domain_populations_Population__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./domain/populations/Population */ "./src/domain/populations/Population.ts");
/* harmony import */ var _domain_terminations_AndTermination__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./domain/terminations/AndTermination */ "./src/domain/terminations/AndTermination.ts");
/* harmony import */ var _domain_terminations_FitnessStagnationTermination__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./domain/terminations/FitnessStagnationTermination */ "./src/domain/terminations/FitnessStagnationTermination.ts");
/* harmony import */ var _domain_terminations_FitnessThresholdTermination__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./domain/terminations/FitnessThresholdTermination */ "./src/domain/terminations/FitnessThresholdTermination.ts");
/* harmony import */ var _domain_terminations_GenerationNumberTermination__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./domain/terminations/GenerationNumberTermination */ "./src/domain/terminations/GenerationNumberTermination.ts");






























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
/******/ 	return __webpack_require__("./src/index.ts");
/******/ })()
;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9nZW5ldGljanMvd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovL2dlbmV0aWNqcy8uL3NyYy9jb21tb25zL0Zsb2F0MzJFbmNvZGluZy50cyIsIndlYnBhY2s6Ly9nZW5ldGljanMvLi9zcmMvZG9tYWluL0RlZmF1bHRPcGVyYXRpb25TdHJhdGVneS50cyIsIndlYnBhY2s6Ly9nZW5ldGljanMvLi9zcmMvZG9tYWluL0dlbmV0aWNBbGdvcml0aG0udHMiLCJ3ZWJwYWNrOi8vZ2VuZXRpY2pzLy4vc3JjL2RvbWFpbi9jaHJvbW9zb21lL0JpbmFyeUNocm9tb3NvbWVCYXNlLnRzIiwid2VicGFjazovL2dlbmV0aWNqcy8uL3NyYy9kb21haW4vY2hyb21vc29tZS9DaHJvbW9zb21lQmFzZS50cyIsIndlYnBhY2s6Ly9nZW5ldGljanMvLi9zcmMvZG9tYWluL2Nocm9tb3NvbWUvQ2hyb21vc29tZUV4dGVuc2lvbi50cyIsIndlYnBhY2s6Ly9nZW5ldGljanMvLi9zcmMvZG9tYWluL2Nocm9tb3NvbWUvRGVjaW1hbENocm9tb3NvbWUudHMiLCJ3ZWJwYWNrOi8vZ2VuZXRpY2pzLy4vc3JjL2RvbWFpbi9jaHJvbW9zb21lL0Zsb2F0aW5nUG9pbnRDaHJvbW9zb21lLnRzIiwid2VicGFjazovL2dlbmV0aWNqcy8uL3NyYy9kb21haW4vY2hyb21vc29tZS9HZW5lLnRzIiwid2VicGFjazovL2dlbmV0aWNqcy8uL3NyYy9kb21haW4vY3Jvc3NvdmVycy9BbHRlcm5hdGluZ1BvaW50Q3Jvc3NvdmVyLnRzIiwid2VicGFjazovL2dlbmV0aWNqcy8uL3NyYy9kb21haW4vY3Jvc3NvdmVycy9Dcm9zc092ZXJVdGlsLnRzIiwid2VicGFjazovL2dlbmV0aWNqcy8uL3NyYy9kb21haW4vY3Jvc3NvdmVycy9Dcm9zc292ZXJCYXNlLnRzIiwid2VicGFjazovL2dlbmV0aWNqcy8uL3NyYy9kb21haW4vY3Jvc3NvdmVycy9PbmVQb2ludENyb3Nzb3Zlci50cyIsIndlYnBhY2s6Ly9nZW5ldGljanMvLi9zcmMvZG9tYWluL2Nyb3Nzb3ZlcnMvT3JkZXJlZENyb3Nzb3Zlci50cyIsIndlYnBhY2s6Ly9nZW5ldGljanMvLi9zcmMvZG9tYWluL2Nyb3Nzb3ZlcnMvVW5pZm9ybUNyb3Nzb3Zlci50cyIsIndlYnBhY2s6Ly9nZW5ldGljanMvLi9zcmMvZG9tYWluL211dGF0aW9ucy9GbGlwQml0TXV0YXRpb24udHMiLCJ3ZWJwYWNrOi8vZ2VuZXRpY2pzLy4vc3JjL2RvbWFpbi9tdXRhdGlvbnMvTXV0YXRpb25CYXNlLnRzIiwid2VicGFjazovL2dlbmV0aWNqcy8uL3NyYy9kb21haW4vbXV0YXRpb25zL1BhcnRpYWxTaHVmZmxlTXV0YXRpb24udHMiLCJ3ZWJwYWNrOi8vZ2VuZXRpY2pzLy4vc3JjL2RvbWFpbi9tdXRhdGlvbnMvUmV2ZXJzZVNlcXVlbmNlTXV0YXRpb24udHMiLCJ3ZWJwYWNrOi8vZ2VuZXRpY2pzLy4vc3JjL2RvbWFpbi9tdXRhdGlvbnMvU2VxdWVuY2VNdXRhdGlvbkJhc2UudHMiLCJ3ZWJwYWNrOi8vZ2VuZXRpY2pzLy4vc3JjL2RvbWFpbi9tdXRhdGlvbnMvVW5pZm9ybU11dGF0aW9uLnRzIiwid2VicGFjazovL2dlbmV0aWNqcy8uL3NyYy9kb21haW4vcG9wdWxhdGlvbnMvR2VuZXJhdGlvbi50cyIsIndlYnBhY2s6Ly9nZW5ldGljanMvLi9zcmMvZG9tYWluL3BvcHVsYXRpb25zL1BvcHVsYXRpb24udHMiLCJ3ZWJwYWNrOi8vZ2VuZXRpY2pzLy4vc3JjL2RvbWFpbi9yYW5kb21pemF0aW9uL0Jhc2ljUmFuZG9taXphdGlvbi50cyIsIndlYnBhY2s6Ly9nZW5ldGljanMvLi9zcmMvZG9tYWluL3JhbmRvbWl6YXRpb24vUmFuZG9taXphdGlvbkJhc2UudHMiLCJ3ZWJwYWNrOi8vZ2VuZXRpY2pzLy4vc3JjL2RvbWFpbi9yYW5kb21pemF0aW9uL1JhbmRvbWl6YXRpb25Qcm92aWRlci50cyIsIndlYnBhY2s6Ly9nZW5ldGljanMvLi9zcmMvZG9tYWluL3JlaW5zZXJ0aW9uL0VsaXRpc3RSZWluc2VydGlvbi50cyIsIndlYnBhY2s6Ly9nZW5ldGljanMvLi9zcmMvZG9tYWluL3JlaW5zZXJ0aW9uL1JlaW5zZXJ0aW9uQmFzZS50cyIsIndlYnBhY2s6Ly9nZW5ldGljanMvLi9zcmMvZG9tYWluL3NlbGVjdGlvbnMvRWxpdGVTZWxlY3Rpb24udHMiLCJ3ZWJwYWNrOi8vZ2VuZXRpY2pzLy4vc3JjL2RvbWFpbi9zZWxlY3Rpb25zL1NlbGVjdGlvbkJhc2UudHMiLCJ3ZWJwYWNrOi8vZ2VuZXRpY2pzLy4vc3JjL2RvbWFpbi90ZXJtaW5hdGlvbnMvQW5kVGVybWluYXRpb24udHMiLCJ3ZWJwYWNrOi8vZ2VuZXRpY2pzLy4vc3JjL2RvbWFpbi90ZXJtaW5hdGlvbnMvRml0bmVzc1N0YWduYXRpb25UZXJtaW5hdGlvbi50cyIsIndlYnBhY2s6Ly9nZW5ldGljanMvLi9zcmMvZG9tYWluL3Rlcm1pbmF0aW9ucy9GaXRuZXNzVGhyZXNob2xkVGVybWluYXRpb24udHMiLCJ3ZWJwYWNrOi8vZ2VuZXRpY2pzLy4vc3JjL2RvbWFpbi90ZXJtaW5hdGlvbnMvR2VuZXJhdGlvbk51bWJlclRlcm1pbmF0aW9uLnRzIiwid2VicGFjazovL2dlbmV0aWNqcy8uL3NyYy9kb21haW4vdGVybWluYXRpb25zL0xvZ2ljYWxPcGVyYXRvclRlcm1pbmF0aW9uQmFzZS50cyIsIndlYnBhY2s6Ly9nZW5ldGljanMvLi9zcmMvZG9tYWluL3Rlcm1pbmF0aW9ucy9UZXJtaW5hdGlvbkJhc2UudHMiLCJ3ZWJwYWNrOi8vZ2VuZXRpY2pzLy4vc3JjL2luZGV4LnRzIiwid2VicGFjazovL2dlbmV0aWNqcy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9nZW5ldGljanMvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2dlbmV0aWNqcy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2dlbmV0aWNqcy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2dlbmV0aWNqcy93ZWJwYWNrL3N0YXJ0dXAiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ1ZlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixxQkFBcUI7QUFDNUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1Q0FBdUMsWUFBWTtBQUNuRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOEJBQThCLFlBQVk7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixxQkFBcUI7QUFDNUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM5QzBFO0FBQzNEO0FBQ2Y7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLGFBQWE7QUFDcEM7QUFDQTtBQUNBLGdCQUFnQiwyRkFBdUM7QUFDdkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3BCNkQ7QUFDSztBQUNSO0FBQ1I7QUFDb0I7QUFDYjtBQUM0QjtBQUNyRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsc0RBQXNEO0FBQ3hDO0FBQ2YscURBQXFELCtEQUFjLG9CQUFvQixpRUFBZ0Isc0JBQXNCLCtEQUFlLHNCQUFzQiwrRUFBa0Isc0JBQXNCLDhFQUEyQjtBQUNyTztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2JlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDZmU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0w0RTtBQUNaO0FBQ1U7QUFDSjtBQUNZO0FBQ0k7QUFDeEI7QUFDUTtBQUNGO0FBQ0E7QUFDWDtBQUNRO0FBQ047QUFDb0I7QUFDRTtBQUNoQjtBQUNSO0FBQ0E7QUFDUztBQUM0QjtBQUNGO0FBQ0E7QUFDcUI7QUFDckY7QUFDK0U7QUFDQTtBQUN6RTtBQUNnRjs7Ozs7OztVQzNCbEg7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDckJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0Esd0NBQXdDLHlDQUF5QztXQUNqRjtXQUNBO1dBQ0EsRTs7Ozs7V0NQQSxzRjs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSxzREFBc0Qsa0JBQWtCO1dBQ3hFO1dBQ0EsK0NBQStDLGNBQWM7V0FDN0QsRTs7OztVQ05BO1VBQ0E7VUFDQTtVQUNBIiwiZmlsZSI6ImJ1bmRsZS5tanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJnZW5ldGljanNcIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1wiZ2VuZXRpY2pzXCJdID0gZmFjdG9yeSgpO1xufSkoc2VsZiwgZnVuY3Rpb24oKSB7XG5yZXR1cm4gIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgRmxvYXQzMkVuY29kaW5nIHtcbn1cbkZsb2F0MzJFbmNvZGluZy5jb252ZXJ0QmluVG9GbG9hdDMyID0gKHN0cikgPT4ge1xuICAgIGNvbnN0IGludCA9IHBhcnNlSW50KHN0ciwgMik7XG4gICAgaWYgKGludCA+IDAgfHwgaW50IDwgMCkge1xuICAgICAgICBjb25zdCBzaWduID0gKGludCA+Pj4gMzEpID8gLTEgOiAxO1xuICAgICAgICBsZXQgZXhwID0gKGludCA+Pj4gMjMgJiAweGZmKSAtIDEyNztcbiAgICAgICAgY29uc3QgbWFudGlzc2EgPSAoKGludCAmIDB4N2ZmZmZmKSArIDB4ODAwMDAwKS50b1N0cmluZygyKTtcbiAgICAgICAgbGV0IGZsb2F0MzIgPSAwO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG1hbnRpc3NhLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgICAgICBmbG9hdDMyICs9IHBhcnNlSW50KG1hbnRpc3NhW2ldKSA/IE1hdGgucG93KDIsIGV4cCkgOiAwO1xuICAgICAgICAgICAgZXhwLS07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZsb2F0MzIgKiBzaWduO1xuICAgIH1cbiAgICBlbHNlXG4gICAgICAgIHJldHVybiAwO1xufTtcbkZsb2F0MzJFbmNvZGluZy5jb252ZXJ0RmxvYXQzMlRvQmluID0gKGZsb2F0MzIpID0+IHtcbiAgICBjb25zdCBIZXhUb0JpbiA9IGhleCA9PiAocGFyc2VJbnQoaGV4LCAxNikudG9TdHJpbmcoMikpLnBhZFN0YXJ0KDMyLCAnMCcpO1xuICAgIGNvbnN0IGdldEhleCA9IGkgPT4gKCcwMCcgKyBpLnRvU3RyaW5nKDE2KSkuc2xpY2UoLTIpO1xuICAgIGNvbnN0IHZpZXcgPSBuZXcgRGF0YVZpZXcobmV3IEFycmF5QnVmZmVyKDQpKTtcbiAgICB2aWV3LnNldEZsb2F0MzIoMCwgZmxvYXQzMik7XG4gICAgcmV0dXJuIEhleFRvQmluKEFycmF5LmFwcGx5KG51bGwsIHsgbGVuZ3RoOiA0IH0pLm1hcCgoXywgaSkgPT4gZ2V0SGV4KHZpZXcuZ2V0VWludDgoaSkpKS5qb2luKCcnKSk7XG59O1xuRmxvYXQzMkVuY29kaW5nLmNvbnZlcnRGbG9hdDMyVG9IZXggPSAoZmxvYXQzMikgPT4ge1xuICAgIGNvbnN0IGdldEhleCA9IGkgPT4gKCcwMCcgKyBpLnRvU3RyaW5nKDE2KSkuc2xpY2UoLTIpO1xuICAgIGNvbnN0IHZpZXcgPSBuZXcgRGF0YVZpZXcobmV3IEFycmF5QnVmZmVyKDQpKTtcbiAgICB2aWV3LnNldEZsb2F0MzIoMCwgZmxvYXQzMik7XG4gICAgcmV0dXJuIEFycmF5LmFwcGx5KG51bGwsIHsgbGVuZ3RoOiA0IH0pLm1hcCgoXywgaSkgPT4gZ2V0SGV4KHZpZXcuZ2V0VWludDgoaSkpKS5qb2luKCcnKTtcbn07XG5GbG9hdDMyRW5jb2RpbmcuY29udmVydEhleFRvRmxvYXQzMiA9IChzdHIpID0+IHtcbiAgICBjb25zdCBpbnQgPSBwYXJzZUludChzdHIsIDE2KTtcbiAgICBpZiAoaW50ID4gMCB8fCBpbnQgPCAwKSB7XG4gICAgICAgIGNvbnN0IHNpZ24gPSAoaW50ID4+PiAzMSkgPyAtMSA6IDE7XG4gICAgICAgIGxldCBleHAgPSAoaW50ID4+PiAyMyAmIDB4ZmYpIC0gMTI3O1xuICAgICAgICBjb25zdCBtYW50aXNzYSA9ICgoaW50ICYgMHg3ZmZmZmYpICsgMHg4MDAwMDApLnRvU3RyaW5nKDIpO1xuICAgICAgICBsZXQgZmxvYXQzMiA9IDA7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbWFudGlzc2EubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgICAgIGZsb2F0MzIgKz0gcGFyc2VJbnQobWFudGlzc2FbaV0pID8gTWF0aC5wb3coMiwgZXhwKSA6IDA7XG4gICAgICAgICAgICBleHAtLTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmxvYXQzMiAqIHNpZ247XG4gICAgfVxuICAgIGVsc2VcbiAgICAgICAgcmV0dXJuIDA7XG59O1xuIiwiaW1wb3J0IFJhbmRvbWl6YXRpb25Qcm92aWRlciBmcm9tIFwiLi9yYW5kb21pemF0aW9uL1JhbmRvbWl6YXRpb25Qcm92aWRlclwiO1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGVmYXVsdE9wZXJhdGlvblN0cmF0ZWd5IHtcbiAgICBjcm9zcyhwb3B1bGF0aW9uLCBjcm9zc292ZXIsIGNyb3Nzb3ZlclByb2JhYmlsaXR5LCBwYXJlbnRzKSB7XG4gICAgICAgIGNvbnN0IG1pblNpemUgPSBwb3B1bGF0aW9uLm1pblNpemU7XG4gICAgICAgIGxldCBvZmZzcHJpbmcgPSBbXTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtaW5TaXplOyBpICs9IGNyb3Nzb3Zlci5wYXJlbnROdW1iZXIpIHtcbiAgICAgICAgICAgIGNvbnN0IHNlbGVjdGVkUGFyZW50cyA9IHBhcmVudHMuc2xpY2UoMikuc3BsaWNlKDAsIGNyb3Nzb3Zlci5wYXJlbnROdW1iZXIpO1xuICAgICAgICAgICAgaWYgKHNlbGVjdGVkUGFyZW50cy5sZW5ndGggPT09IGNyb3Nzb3Zlci5wYXJlbnROdW1iZXIgJiZcbiAgICAgICAgICAgICAgICBSYW5kb21pemF0aW9uUHJvdmlkZXIuY3VycmVudC5nZXREb3VibGUoKSA8PSBjcm9zc292ZXJQcm9iYWJpbGl0eSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGNyb3NzID0gY3Jvc3NvdmVyLmNyb3NzKHNlbGVjdGVkUGFyZW50cyk7XG4gICAgICAgICAgICAgICAgb2Zmc3ByaW5nID0gb2Zmc3ByaW5nLmNvbmNhdChjcm9zcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG9mZnNwcmluZztcbiAgICB9XG4gICAgbXV0YXRlKG11dGF0aW9uLCBtdXRhdGlvblByb2JhYmlsaXR5LCBjaHJvbW9zb21lcykge1xuICAgICAgICBmb3IgKGNvbnN0IGNocm9tb3NvbWUgb2YgY2hyb21vc29tZXMpIHtcbiAgICAgICAgICAgIG11dGF0aW9uLm11dGF0ZShjaHJvbW9zb21lLCBtdXRhdGlvblByb2JhYmlsaXR5KTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImltcG9ydCBVbmlmb3JtQ3Jvc3NvdmVyIGZyb20gXCIuL2Nyb3Nzb3ZlcnMvVW5pZm9ybUNyb3Nzb3ZlclwiO1xuaW1wb3J0IERlZmF1bHRPcGVyYXRpb25TdHJhdGVneSBmcm9tIFwiLi9EZWZhdWx0T3BlcmF0aW9uU3RyYXRlZ3lcIjtcbmltcG9ydCBVbmlmb3JtTXV0YXRpb24gZnJvbSBcIi4vbXV0YXRpb25zL1VuaWZvcm1NdXRhdGlvblwiO1xuaW1wb3J0IFBvcHVsYXRpb24gZnJvbSBcIi4vcG9wdWxhdGlvbnMvUG9wdWxhdGlvblwiO1xuaW1wb3J0IHsgRWxpdGlzdFJlaW5zZXJ0aW9uIH0gZnJvbSBcIi4vcmVpbnNlcnRpb24vRWxpdGlzdFJlaW5zZXJ0aW9uXCI7XG5pbXBvcnQgRWxpdGVTZWxlY3Rpb24gZnJvbSBcIi4vc2VsZWN0aW9ucy9FbGl0ZVNlbGVjdGlvblwiO1xuaW1wb3J0IEdlbmVyYXRpb25OdW1iZXJUZXJtaW5hdGlvbiBmcm9tIFwiLi90ZXJtaW5hdGlvbnMvR2VuZXJhdGlvbk51bWJlclRlcm1pbmF0aW9uXCI7XG52YXIgR2VuZXRpY0FsZ29yaXRobVN0YXRlO1xuKGZ1bmN0aW9uIChHZW5ldGljQWxnb3JpdGhtU3RhdGUpIHtcbiAgICBHZW5ldGljQWxnb3JpdGhtU3RhdGVbR2VuZXRpY0FsZ29yaXRobVN0YXRlW1wiTm90U3RhcnRlZFwiXSA9IDBdID0gXCJOb3RTdGFydGVkXCI7XG4gICAgR2VuZXRpY0FsZ29yaXRobVN0YXRlW0dlbmV0aWNBbGdvcml0aG1TdGF0ZVtcIlN0YXJ0ZWRcIl0gPSAxXSA9IFwiU3RhcnRlZFwiO1xuICAgIEdlbmV0aWNBbGdvcml0aG1TdGF0ZVtHZW5ldGljQWxnb3JpdGhtU3RhdGVbXCJTdG9wcGVkXCJdID0gMl0gPSBcIlN0b3BwZWRcIjtcbiAgICBHZW5ldGljQWxnb3JpdGhtU3RhdGVbR2VuZXRpY0FsZ29yaXRobVN0YXRlW1wiUmVzdW1lZFwiXSA9IDNdID0gXCJSZXN1bWVkXCI7XG4gICAgR2VuZXRpY0FsZ29yaXRobVN0YXRlW0dlbmV0aWNBbGdvcml0aG1TdGF0ZVtcIlRlcm1pbmF0aW9uUmVhY2hlZFwiXSA9IDRdID0gXCJUZXJtaW5hdGlvblJlYWNoZWRcIjtcbn0pKEdlbmV0aWNBbGdvcml0aG1TdGF0ZSB8fCAoR2VuZXRpY0FsZ29yaXRobVN0YXRlID0ge30pKTtcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdlbmV0aWNBbGdvcml0aG0ge1xuICAgIGNvbnN0cnVjdG9yKHBvcHVsYXRpb24sIGZpdG5lc3MsIHNlbGVjdGlvbiA9IG5ldyBFbGl0ZVNlbGVjdGlvbigpLCBjcm9zc092ZXIgPSBuZXcgVW5pZm9ybUNyb3Nzb3ZlcigwLjUpLCBtdXRhdGlvbiA9IG5ldyBVbmlmb3JtTXV0YXRpb24oKSwgcmVpbnNlcnRpb24gPSBuZXcgRWxpdGlzdFJlaW5zZXJ0aW9uKCksIHRlcm1pbmF0aW9uID0gbmV3IEdlbmVyYXRpb25OdW1iZXJUZXJtaW5hdGlvbigxMDApKSB7XG4gICAgICAgIHRoaXMuZGVmYXVsdENyb3NzT3ZlclByb2JhYmlsaXR5ID0gMC43NTtcbiAgICAgICAgdGhpcy5kZWZhdWx0TXV0YXRpb25Qcm9iYWJpbGl0eSA9IDAuMztcbiAgICAgICAgdGhpcy5pc0ZpdG5lc3NNYXhpbWl6ZWQgPSB0cnVlO1xuICAgICAgICB0aGlzLnN0YXJ0ID0gKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgYmVzdENocm9tb3NvbWVBcnJheSA9IFtdO1xuICAgICAgICAgICAgdGhpcy50aW1lRXZvbHZpbmcgPSBuZXcgRGF0ZSgpO1xuICAgICAgICAgICAgd2hpbGUgKHRoaXMudGVybWluYXRpb24uaGFzUmVhY2hlZCh0aGlzKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmV2b2x2ZU9uZUdlbmVyYXRpb24oKTtcbiAgICAgICAgICAgICAgICBiZXN0Q2hyb21vc29tZUFycmF5LnB1c2godGhpcy5iZXN0Q2hyb21vc29tZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5nZW5lcmF0aW9uc051bWJlcisrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGJlc3RDaHJvbW9zb21lQXJyYXk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuZml0bmVzc01hcCA9IChjaHJvbW9zb21lKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBobSA9IG5ldyBNYXAoKTtcbiAgICAgICAgICAgIGlmIChobS5nZXQoY2hyb21vc29tZSkgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGZpdG5lc3MgPSB0aGlzLmZpdG5lc3MuZXZhbHVhdGUoY2hyb21vc29tZSk7XG4gICAgICAgICAgICAgICAgaG0uc2V0KGNocm9tb3NvbWUsIGZpdG5lc3MpO1xuICAgICAgICAgICAgICAgIHJldHVybiBmaXRuZXNzO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGhtLmdldChjaHJvbW9zb21lKTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5wcm9taXNlQXJyID0gKHRvdGFsSXNsYW5kKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBwcm9tQXJyID0gW107XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRvdGFsSXNsYW5kOyBpKyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCBldm9sdmVPbmVHZW5lcmF0aW9uQXN5bmMgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKHRoaXMuZXZvbHZlT25lR2VuZXJhdGlvbigpKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBwcm9tQXJyLnB1c2goZXZvbHZlT25lR2VuZXJhdGlvbkFzeW5jKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFByb21pc2UuYWxsKHByb21BcnIpLnRoZW4oKHZhbHVlcykgPT4ge1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuc2VsZWN0aW9uID0gc2VsZWN0aW9uO1xuICAgICAgICB0aGlzLnBvcHVsYXRpb24gPSBwb3B1bGF0aW9uO1xuICAgICAgICB0aGlzLmZpdG5lc3MgPSBmaXRuZXNzO1xuICAgICAgICB0aGlzLmNyb3NzT3ZlciA9IGNyb3NzT3ZlcjtcbiAgICAgICAgdGhpcy5tdXRhdGlvbiA9IG11dGF0aW9uO1xuICAgICAgICB0aGlzLnRlcm1pbmF0aW9uID0gdGVybWluYXRpb247XG4gICAgICAgIHRoaXMub3BlcmF0b3JTdHJhdGVneSA9IG5ldyBEZWZhdWx0T3BlcmF0aW9uU3RyYXRlZ3koKTtcbiAgICAgICAgdGhpcy5yZWluc2VydGlvbiA9IHJlaW5zZXJ0aW9uO1xuICAgICAgICB0aGlzLmdlbmVyYXRpb25zTnVtYmVyID0gMDtcbiAgICB9XG4gICAgY2xvbmUoKSB7XG4gICAgICAgIHJldHVybiBuZXcgR2VuZXRpY0FsZ29yaXRobShuZXcgUG9wdWxhdGlvbih0aGlzLnBvcHVsYXRpb24ubWluU2l6ZSwgdGhpcy5wb3B1bGF0aW9uLm1heFNpemUsIHRoaXMucG9wdWxhdGlvbi5iZXN0Q2hyb21vc29tZSksIHRoaXMuZml0bmVzcywgdGhpcy5zZWxlY3Rpb24sIHRoaXMuY3Jvc3NPdmVyLCB0aGlzLm11dGF0aW9uLCB0aGlzLnJlaW5zZXJ0aW9uLCB0aGlzLnRlcm1pbmF0aW9uKTtcbiAgICB9XG4gICAgZXZvbHZlT25lR2VuZXJhdGlvbigpIHtcbiAgICAgICAgdGhpcy5ldmFsdWF0ZUZpdG5lc3MoKTtcbiAgICAgICAgY29uc3QgcGFyZW50cyA9IHRoaXMuc2VsZWN0UGFyZW50cygpO1xuICAgICAgICBjb25zdCBvZmZzcHJpbmcgPSB0aGlzLmNyb3NzKHBhcmVudHMpO1xuICAgICAgICB0aGlzLm11dGF0ZShvZmZzcHJpbmcpO1xuICAgICAgICBjb25zdCBuZXdHZW5lcmF0aW9uQ2hyb21vc29tZSA9IHRoaXMucmVpbnNlcnQob2Zmc3ByaW5nLCBwYXJlbnRzKTtcbiAgICAgICAgdGhpcy5wb3B1bGF0aW9uLmNyZWF0ZU5ld0dlbmVyYXRpb24obmV3R2VuZXJhdGlvbkNocm9tb3NvbWUpO1xuICAgICAgICByZXR1cm4gdGhpcy5lbmRDdXJyZW50R2VuZXJhdGlvbigpO1xuICAgIH1cbiAgICBjcm9zcyhwYXJlbnRzKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm9wZXJhdG9yU3RyYXRlZ3kuY3Jvc3ModGhpcy5wb3B1bGF0aW9uLCB0aGlzLmNyb3NzT3ZlciwgdGhpcy5kZWZhdWx0Q3Jvc3NPdmVyUHJvYmFiaWxpdHksIHBhcmVudHMpO1xuICAgIH1cbiAgICBlbmRDdXJyZW50R2VuZXJhdGlvbigpIHtcbiAgICAgICAgdGhpcy5ldmFsdWF0ZUZpdG5lc3MoKTtcbiAgICAgICAgdGhpcy5wb3B1bGF0aW9uLmVuZEN1cnJlbnRHZW5lcmF0aW9uKCk7XG4gICAgICAgIHRoaXMuYmVzdENocm9tb3NvbWUgPSB0aGlzLnBvcHVsYXRpb24uYmVzdENocm9tb3NvbWU7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBldmFsdWF0ZUZpdG5lc3MoKSB7XG4gICAgICAgIGNvbnN0IGNocm9tb3NvbWVzID0gdGhpcy5wb3B1bGF0aW9uLmN1cnJlbnRHZW5lcmF0aW9uLmNocm9tb3NvbWVzO1xuICAgICAgICBmb3IgKGNvbnN0IGNocm9tb3NvbWUgb2YgY2hyb21vc29tZXMpIHtcbiAgICAgICAgICAgIGNvbnN0IGVsZW1lbnQgPSBjaHJvbW9zb21lO1xuICAgICAgICAgICAgY29uc3QgZml0bmVzcyA9IHRoaXMuZml0bmVzc01hcChlbGVtZW50KTtcbiAgICAgICAgICAgIGVsZW1lbnQuZml0bmVzcyA9IGZpdG5lc3M7XG4gICAgICAgIH1cbiAgICB9XG4gICAgbXV0YXRlKGNocm9tb3NvbWVzKSB7XG4gICAgICAgIHRoaXMub3BlcmF0b3JTdHJhdGVneS5tdXRhdGUodGhpcy5tdXRhdGlvbiwgdGhpcy5kZWZhdWx0TXV0YXRpb25Qcm9iYWJpbGl0eSwgY2hyb21vc29tZXMpO1xuICAgIH1cbiAgICByZWluc2VydChvZmZzcHJpbmcsIHBhcmVudHMpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVpbnNlcnRpb24uc2VsZWN0Q2hyb21vc29tZSh0aGlzLnBvcHVsYXRpb24sIG9mZnNwcmluZywgcGFyZW50cyk7XG4gICAgfVxuICAgIHNlbGVjdFBhcmVudHMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNlbGVjdGlvbi5zZWxlY3RDaHJvbW9zb21lcyh0aGlzLnBvcHVsYXRpb24ubWluU2l6ZSwgdGhpcy5wb3B1bGF0aW9uLmN1cnJlbnRHZW5lcmF0aW9uKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgQ2hyb21vc29tZUJhc2UgZnJvbSBcIi4vQ2hyb21vc29tZUJhc2VcIjtcbmltcG9ydCBHZW5lIGZyb20gXCIuL0dlbmVcIjtcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJpbmFyeUNocm9tb3NvbWVCYXNlIGV4dGVuZHMgQ2hyb21vc29tZUJhc2Uge1xuICAgIGNvbnN0cnVjdG9yKGxlbmd0aCkge1xuICAgICAgICBzdXBlcihsZW5ndGgpO1xuICAgIH1cbiAgICBmbGlwR2VuZShpbmRleCkge1xuICAgICAgICBjb25zdCB2YWx1ZSA9IHRoaXMuZ2V0R2VuZShpbmRleCk7XG4gICAgICAgIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQmluYXJ5Q2hyb21vc29tZUJhc2UgLSBDYW5ub3QgRmxpcCBhIGdlbmUgd2hpY2ggaXMgdW5kZWZpbmVkXCIpO1xuICAgICAgICB0aGlzLnJlcGxhY2VHZW5lKGluZGV4LCBuZXcgR2VuZSh2YWx1ZS5tVmFsdWUgPT09IDAgPyAxIDogMCkpO1xuICAgIH1cbiAgICB0b1N0cmluZygpIHtcbiAgICAgICAgY29uc3Qgc3RyID0gdGhpcy5nZXRHZW5lcygpLnRvU3RyaW5nKCk7XG4gICAgICAgIHJldHVybiBzdHI7XG4gICAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2hyb21vc29tZUJhc2Uge1xuICAgIGNvbnN0cnVjdG9yKGxlbmd0aCkge1xuICAgICAgICB0aGlzLnZhbGlkYXRlTGVuZ3RoKGxlbmd0aCk7XG4gICAgICAgIHRoaXMubGVuZ3RoID0gbGVuZ3RoO1xuICAgICAgICB0aGlzLmdlbmVzID0gW107XG4gICAgfVxuICAgIGdldEdlbmUoaW5kZXgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2VuZXNbaW5kZXhdO1xuICAgIH1cbiAgICBnZXRHZW5lcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2VuZXM7XG4gICAgfVxuICAgIHJlcGxhY2VHZW5lKGluZGV4LCBnZW5lKSB7XG4gICAgICAgIGlmIChpbmRleCA8IDAgfHwgaW5kZXggPiB0aGlzLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhyb3cgRXJyb3IoXCJDaHJvbW9zb21lQmFzZSAtIEluZGV4IGNhbm5vdCBiZSBsZXNzIHRoYW4gMCBhbmQgbW9yZSB0aGFuIHRoZSBsZW5ndGguIFwiICtcbiAgICAgICAgICAgICAgICBpbmRleCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5nZW5lc1tpbmRleF0gPSBnZW5lO1xuICAgICAgICB0aGlzLmZpdG5lc3MgPSBudWxsO1xuICAgIH1cbiAgICByZXBsYWNlR2VuZXMoc3RhcnRJbmRleCwgZ2VuZXMpIHtcbiAgICAgICAgaWYgKHN0YXJ0SW5kZXggPCAwKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiU3RhcnQgSW5kZXggY2Fubm90IGJlIGxlc3MgdGhhbiAwXCIpO1xuICAgICAgICBjb25zdCBnZW5lc1RvQmVSZXBsYWNlZExlbmd0aCA9IGdlbmVzLmxlbmd0aDtcbiAgICAgICAgY29uc3QgYXZhaWxhYmxlU3BhY2VMZW5ndGggPSB0aGlzLmxlbmd0aCAtIHN0YXJ0SW5kZXg7XG4gICAgICAgIGlmIChhdmFpbGFibGVTcGFjZUxlbmd0aCA8IGdlbmVzVG9CZVJlcGxhY2VkTGVuZ3RoKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ2hyb21vc29tZUJhc2UgLSBOb3QgZW5vdWdoIHNwYWNlIHRvIHJlcGxhY2UgZ2VuZXMuXCIpO1xuICAgICAgICBmb3IgKGxldCBpID0gc3RhcnRJbmRleDsgaSA8IGdlbmVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB0aGlzLnJlcGxhY2VHZW5lKGksIGdlbmVzW2ldKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXNpemUobmV3TGVuZ3RoKSB7XG4gICAgICAgIHRoaXMudmFsaWRhdGVMZW5ndGgobmV3TGVuZ3RoKTtcbiAgICB9XG4gICAgY3JlYXRlR2VuZXMoKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdGhpcy5yZXBsYWNlR2VuZShpLCB0aGlzLmdlbmVyYXRlR2VuZShpKSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgdmFsaWRhdGVMZW5ndGgobGVuZ3RoKSB7XG4gICAgICAgIGlmIChsZW5ndGggPCAyKSB7XG4gICAgICAgICAgICB0aHJvdyBFcnJvcihcIkVycm9yIC0gVGhlIG1pbmltdW0gbGVuZ3RoIGZvciBhIGNocm9tb3NvbWUgaXMgMiBnZW5lc1wiKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIENocm9tb3NvbWVFeHRlbnNpb24ge1xuICAgIHN0YXRpYyBhbnlIYXNSZXBlYXRlZEdlbmUoY2hyb21vc29tZXMpIHtcbiAgICAgICAgZm9yIChjb25zdCBjaHJvbW9zb21lIG9mIGNocm9tb3NvbWVzKSB7XG4gICAgICAgICAgICBjb25zdCBjID0gY2hyb21vc29tZTtcbiAgICAgICAgICAgIGNvbnN0IGdlbmVzID0gW107XG4gICAgICAgICAgICBjLmdldEdlbmVzKCkuZm9yRWFjaCgocykgPT4gZ2VuZXMucHVzaChzLm1WYWx1ZSkpO1xuICAgICAgICAgICAgY29uc3Qgbm90UmVwZWF0ZWRHZW5lc0xlbmd0aCA9IFsuLi5uZXcgU2V0KGdlbmVzKV0ubGVuZ3RoO1xuICAgICAgICAgICAgaWYgKG5vdFJlcGVhdGVkR2VuZXNMZW5ndGggPCBjLmxlbmd0aClcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHN0YXRpYyB2YWxpZGF0ZUdlbmVzKGNocm9tb3NvbWUsIGNocm9tb3NvbWVzKSB7XG4gICAgICAgIGlmIChjaHJvbW9zb21lICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGlmIChjaHJvbW9zb21lLmdldEdlbmVzKCkgPT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNocm9tb3NvbWVzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGZvciAoY29uc3QgY2ggb2YgY2hyb21vc29tZXMpIHtcbiAgICAgICAgICAgICAgICBpZiAoY2guZ2V0R2VuZXMoKSA9PT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxufVxuIiwiaW1wb3J0IFJhbmRvbWl6YXRpb25Qcm92aWRlciBmcm9tIFwiLi4vcmFuZG9taXphdGlvbi9SYW5kb21pemF0aW9uUHJvdmlkZXJcIjtcbmltcG9ydCBDaHJvbW9zb21lQmFzZSBmcm9tIFwiLi9DaHJvbW9zb21lQmFzZVwiO1xuaW1wb3J0IEdlbmUgZnJvbSBcIi4vR2VuZVwiO1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGVjaW1hbENocm9tb3NvbWUgZXh0ZW5kcyBDaHJvbW9zb21lQmFzZSB7XG4gICAgY29uc3RydWN0b3IobGVuZ3RoLCBtaW5WYWx1ZSwgbWF4VmFsdWUsIHVuaXF1ZSwgcmFuZG9tVmFsdWVzKSB7XG4gICAgICAgIHN1cGVyKGxlbmd0aCk7XG4gICAgICAgIHRoaXMubWluVmFsdWUgPSBtaW5WYWx1ZTtcbiAgICAgICAgdGhpcy5tYXhWYWx1ZSA9IG1heFZhbHVlO1xuICAgICAgICB1bmlxdWUgPT09IHVuZGVmaW5lZCA/ICh0aGlzLnVuaXF1ZSA9IGZhbHNlKSA6ICh0aGlzLnVuaXF1ZSA9IHRydWUpO1xuICAgICAgICBpZiAocmFuZG9tVmFsdWVzID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGlmICh1bmlxdWUgPT09IHRydWUpXG4gICAgICAgICAgICAgICAgdGhpcy5yYW5kb21WYWx1ZXMgPSBSYW5kb21pemF0aW9uUHJvdmlkZXIuY3VycmVudC5nZXRVbmlxdWVJbnRzKGxlbmd0aCwgbWluVmFsdWUsIG1heFZhbHVlKTtcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICB0aGlzLnJhbmRvbVZhbHVlcyA9IFJhbmRvbWl6YXRpb25Qcm92aWRlci5jdXJyZW50LmdldEludHMobGVuZ3RoLCBtaW5WYWx1ZSwgbWF4VmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5yYW5kb21WYWx1ZXMgPSByYW5kb21WYWx1ZXM7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jcmVhdGVHZW5lcygpO1xuICAgIH1cbiAgICBjcmVhdGVOZXcoKSB7XG4gICAgICAgIHJldHVybiBuZXcgRGVjaW1hbENocm9tb3NvbWUodGhpcy5sZW5ndGgsIHRoaXMubWluVmFsdWUsIHRoaXMubWF4VmFsdWUpO1xuICAgIH1cbiAgICBnZW5lcmF0ZUdlbmUoZ2VuZUluZGV4KSB7XG4gICAgICAgIHJldHVybiBuZXcgR2VuZSh0aGlzLnJhbmRvbVZhbHVlc1tnZW5lSW5kZXhdKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgRmxvYXQzMkVuY29kaW5nIGZyb20gXCIuLi8uLi9jb21tb25zL0Zsb2F0MzJFbmNvZGluZ1wiO1xuaW1wb3J0IFJhbmRvbWl6YXRpb25Qcm92aWRlciBmcm9tIFwiLi4vcmFuZG9taXphdGlvbi9SYW5kb21pemF0aW9uUHJvdmlkZXJcIjtcbmltcG9ydCBCaW5hcnlDaHJvbW9zb21lQmFzZSBmcm9tIFwiLi9CaW5hcnlDaHJvbW9zb21lQmFzZVwiO1xuaW1wb3J0IEdlbmUgZnJvbSBcIi4vR2VuZVwiO1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRmxvYXRpbmdQb2ludENocm9tb3NvbWUgZXh0ZW5kcyBCaW5hcnlDaHJvbW9zb21lQmFzZSB7XG4gICAgY29uc3RydWN0b3IobWluVmFsdWUsIG1heFZhbHVlLCBpc0ludFZhbHVlID0gdHJ1ZSkge1xuICAgICAgICBsZXQgdG90YWxCaXQgPSAwO1xuICAgICAgICBtYXhWYWx1ZS5mb3JFYWNoKGVsZW1lbnQgPT4gdG90YWxCaXQgKz0gZWxlbWVudC50b1N0cmluZygyKS5sZW5ndGgpO1xuICAgICAgICBpZiAoaXNJbnRWYWx1ZSA9PT0gdHJ1ZSlcbiAgICAgICAgICAgIHN1cGVyKHRvdGFsQml0KTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgc3VwZXIoMzIgKiBtaW5WYWx1ZS5sZW5ndGgpO1xuICAgICAgICB0aGlzLm1pblZhbHVlID0gbWluVmFsdWU7XG4gICAgICAgIHRoaXMubWF4VmFsdWUgPSBtYXhWYWx1ZTtcbiAgICAgICAgdGhpcy5pc0ludFZhbHVlID0gaXNJbnRWYWx1ZTtcbiAgICAgICAgdGhpcy5vcmlnaW5hbFZhbHVlID0gdGhpcy5mbGF0dGVuKG1pblZhbHVlLCBtYXhWYWx1ZSk7XG4gICAgICAgIHRoaXMuY3JlYXRlR2VuZXMoKTtcbiAgICB9XG4gICAgY3JlYXRlTmV3KCkge1xuICAgICAgICByZXR1cm4gbmV3IEZsb2F0aW5nUG9pbnRDaHJvbW9zb21lKHRoaXMubWluVmFsdWUsIHRoaXMubWF4VmFsdWUsIHRoaXMuaXNJbnRWYWx1ZSk7XG4gICAgfVxuICAgIGVuc3VyZUNhcGFjaXR5KCkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgZXhwYW5kKCkge1xuICAgICAgICBjb25zdCB2YWx1ZXMgPSBbXTtcbiAgICAgICAgY29uc3QgZ2VuZXMgPSB0aGlzLmdldEdlbmVzKCk7XG4gICAgICAgIGlmICh0aGlzLmlzSW50VmFsdWUgPT09IHRydWUpIHtcbiAgICAgICAgICAgIGNvbnN0IGJpdExlbmd0aCA9IFtdO1xuICAgICAgICAgICAgZm9yIChjb25zdCBlbGVtZW50IG9mIHRoaXMubWF4VmFsdWUpIHtcbiAgICAgICAgICAgICAgICBiaXRMZW5ndGgucHVzaChlbGVtZW50LnRvU3RyaW5nKDIpLmxlbmd0aCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMCwgaiA9IDA7IGkgPCBnZW5lcy5sZW5ndGg7IGkgPSBpICsgYml0TGVuZ3RoW2pdLCBqKyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCBzbGljZWQgPSBnZW5lcy5zbGljZShpLCBpICsgYml0TGVuZ3RoW2pdKS50b1N0cmluZygpLnJlcGxhY2UoLywvZywgXCJcIik7XG4gICAgICAgICAgICAgICAgdmFsdWVzLnB1c2gocGFyc2VJbnQoc2xpY2VkLCAyKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGdlbmVzLmxlbmd0aDsgaSA9IGkgKyAzMikge1xuICAgICAgICAgICAgICAgIGNvbnN0IHNsaWNlZCA9IGdlbmVzLnNsaWNlKGksIGkgKyAzMikudG9TdHJpbmcoKS5yZXBsYWNlKC8sL2csIFwiXCIpO1xuICAgICAgICAgICAgICAgIHZhbHVlcy5wdXNoKEZsb2F0MzJFbmNvZGluZy5jb252ZXJ0QmluVG9GbG9hdDMyKHNsaWNlZCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB2YWx1ZXM7XG4gICAgfVxuICAgIGZsYXR0ZW4obWluVmFsdWUsIG1heFZhbHVlKSB7XG4gICAgICAgIGxldCBzdHJpbmdSZXByZXNlbnRhdGlvbiA9IFwiXCI7XG4gICAgICAgIGlmICh0aGlzLmlzSW50VmFsdWUgPT09IHRydWUpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbWluVmFsdWUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCBtaW4gPSBtaW5WYWx1ZVtpXTtcbiAgICAgICAgICAgICAgICBjb25zdCBtYXggPSBtYXhWYWx1ZVtpXTtcbiAgICAgICAgICAgICAgICBsZXQgcmFuZG9tID0gMDtcbiAgICAgICAgICAgICAgICByYW5kb20gPSBSYW5kb21pemF0aW9uUHJvdmlkZXIuY3VycmVudC5nZXRJbnQobWluLCBtYXgpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGJpdExlbmd0aCA9IG1heC50b1N0cmluZygyKS5sZW5ndGg7XG4gICAgICAgICAgICAgICAgY29uc3Qgc3RyaW5nUmVwID0gcmFuZG9tLnRvU3RyaW5nKDIpLnBhZFN0YXJ0KGJpdExlbmd0aCwgXCIwXCIpO1xuICAgICAgICAgICAgICAgIHN0cmluZ1JlcHJlc2VudGF0aW9uICs9IHN0cmluZ1JlcDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbWluVmFsdWUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCBtaW4gPSBtaW5WYWx1ZVtpXTtcbiAgICAgICAgICAgICAgICBjb25zdCBtYXggPSBtYXhWYWx1ZVtpXTtcbiAgICAgICAgICAgICAgICBsZXQgcmFuZG9tID0gMDtcbiAgICAgICAgICAgICAgICByYW5kb20gPSBSYW5kb21pemF0aW9uUHJvdmlkZXIuY3VycmVudC5nZXRGbG9hdChtaW4sIG1heCk7XG4gICAgICAgICAgICAgICAgc3RyaW5nUmVwcmVzZW50YXRpb24gKz0gRmxvYXQzMkVuY29kaW5nLmNvbnZlcnRGbG9hdDMyVG9CaW4ocmFuZG9tKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc3RyaW5nUmVwcmVzZW50YXRpb24uc3BsaXQoXCJcIikubWFwKE51bWJlcik7XG4gICAgfVxuICAgIGdlbmVyYXRlR2VuZShnZW5lSW5kZXgpIHtcbiAgICAgICAgY29uc3QgZ2VuZSA9IHRoaXMub3JpZ2luYWxWYWx1ZVtnZW5lSW5kZXhdO1xuICAgICAgICByZXR1cm4gbmV3IEdlbmUoZ2VuZSk7XG4gICAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2VuZSB7XG4gICAgY29uc3RydWN0b3IodmFsdWUpIHtcbiAgICAgICAgdGhpcy5tVmFsdWUgPSB2YWx1ZTtcbiAgICB9XG4gICAgZXF1YWxzKG90aGVyKSB7XG4gICAgICAgIGlmIChvdGhlciA9PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG90aGVyLm1WYWx1ZSA9PT0gdGhpcy5tVmFsdWU7XG4gICAgfVxuICAgIGVxdWFsc09wZXJhdG9yKGZpcnN0LCBzZWNvbmQpIHtcbiAgICAgICAgcmV0dXJuIGZpcnN0LmVxdWFscyhzZWNvbmQpO1xuICAgIH1cbiAgICBub3RFcXVhbHNPcGVyYXRvcihmaXJzdCwgc2Vjb25kKSB7XG4gICAgICAgIHJldHVybiAhZmlyc3QuZXF1YWxzKHNlY29uZCk7XG4gICAgfVxuICAgIHRvU3RyaW5nKCkge1xuICAgICAgICByZXR1cm4gKHRoaXMubVZhbHVlICE9IG51bGwgPyB0aGlzLm1WYWx1ZSA6IFwiXCIpLnRvU3RyaW5nKCk7XG4gICAgfVxufVxuIiwiaW1wb3J0IENocm9tb3NvbWVFeHRlbnNpb24gZnJvbSBcIi4uL2Nocm9tb3NvbWUvQ2hyb21vc29tZUV4dGVuc2lvblwiO1xuaW1wb3J0IERlY2ltYWxDaHJvbW9zb21lIGZyb20gXCIuLi9jaHJvbW9zb21lL0RlY2ltYWxDaHJvbW9zb21lXCI7XG5pbXBvcnQgR2VuZSBmcm9tIFwiLi4vY2hyb21vc29tZS9HZW5lXCI7XG5pbXBvcnQgQ3Jvc3NvdmVyQmFzZSBmcm9tIFwiLi9Dcm9zc292ZXJCYXNlXCI7XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBbHRlcm5hdGluZ1BvaW50Q3Jvc3NvdmVyIGV4dGVuZHMgQ3Jvc3NvdmVyQmFzZSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKDIsIDIpO1xuICAgIH1cbiAgICBwZXJmb3JtQ3Jvc3MocGFyZW50cykge1xuICAgICAgICBjb25zdCBwMSA9IHBhcmVudHNbMF07XG4gICAgICAgIGNvbnN0IHAyID0gcGFyZW50c1sxXTtcbiAgICAgICAgaWYgKENocm9tb3NvbWVFeHRlbnNpb24uYW55SGFzUmVwZWF0ZWRHZW5lKHBhcmVudHMpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJBbHRlcm5hdGluZyBjcm9zcyBvdmVyIGhhcyByZXBlYXRlZFwiKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBjaGlsZDEgPSB0aGlzLmNyZWF0ZUNoaWxkKHAxLCBwMik7XG4gICAgICAgIGNvbnN0IGNoaWxkMiA9IHRoaXMuY3JlYXRlQ2hpbGQocDIsIHAxKTtcbiAgICAgICAgcmV0dXJuIFtjaGlsZDEsIGNoaWxkMl07XG4gICAgfVxuICAgIGNyZWF0ZUNoaWxkKGZpcnN0UGFyZW50LCBzZWNvbmRQYXJlbnQpIHtcbiAgICAgICAgY29uc3QgY2hpbGQgPSBbXTtcbiAgICAgICAgY29uc3QgYyA9IG5ldyBEZWNpbWFsQ2hyb21vc29tZShmaXJzdFBhcmVudC5sZW5ndGgpO1xuICAgICAgICBjb25zdCBwMSA9IFsuLi5maXJzdFBhcmVudC5nZXRHZW5lcygpXTtcbiAgICAgICAgY29uc3QgcDIgPSBbLi4uc2Vjb25kUGFyZW50LmdldEdlbmVzKCldO1xuICAgICAgICBjb25zdCBwMUdlbmVzID0gW107XG4gICAgICAgIGNvbnN0IHAyR2VuZXMgPSBbXTtcbiAgICAgICAgcDEuZm9yRWFjaCgoZWxlbWVudCkgPT4gcDFHZW5lcy5wdXNoKGVsZW1lbnQubVZhbHVlKSk7XG4gICAgICAgIHAyLmZvckVhY2goKGVsZW1lbnQpID0+IHAyR2VuZXMucHVzaChlbGVtZW50Lm1WYWx1ZSkpO1xuICAgICAgICBjb25zdCBsZW5ndGggPSBwMS5sZW5ndGg7XG4gICAgICAgIHdoaWxlIChjaGlsZC5sZW5ndGggPCBsZW5ndGgpIHtcbiAgICAgICAgICAgICFjaGlsZC5pbmNsdWRlcyhwMUdlbmVzWzBdKVxuICAgICAgICAgICAgICAgID8gY2hpbGQucHVzaChwMUdlbmVzLnNoaWZ0KCkpXG4gICAgICAgICAgICAgICAgOiBwMUdlbmVzLnNoaWZ0KCk7XG4gICAgICAgICAgICAhY2hpbGQuaW5jbHVkZXMocDJHZW5lc1swXSlcbiAgICAgICAgICAgICAgICA/IGNoaWxkLnB1c2gocDJHZW5lcy5zaGlmdCgpKVxuICAgICAgICAgICAgICAgIDogcDJHZW5lcy5zaGlmdCgpO1xuICAgICAgICB9XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZmlyc3RQYXJlbnQubGVuZ3RoOyBpKyspXG4gICAgICAgICAgICBjLnJlcGxhY2VHZW5lKGksIG5ldyBHZW5lKGNoaWxkW2ldKSk7XG4gICAgICAgIHJldHVybiBjO1xuICAgIH1cbn1cbiIsImltcG9ydCBSYW5kb21pemF0aW9uUHJvdmlkZXIgZnJvbSBcIi4uL3JhbmRvbWl6YXRpb24vUmFuZG9taXphdGlvblByb3ZpZGVyXCI7XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDcm9zc092ZXJVdGlsIHtcbn1cbkNyb3NzT3ZlclV0aWwub3JkZXJlZENyb3Nzb3ZlciA9IChwYXJlbnRPbmUsIHBhcmVudFR3bywgcG9zMSwgcG9zMikgPT4ge1xuICAgIGNvbnN0IHBhcmVudE9uZUNsb25lID0gWy4uLnBhcmVudE9uZV07XG4gICAgbGV0IHBhcmVudFR3b0Nsb25lID0gWy4uLnBhcmVudFR3b107XG4gICAgY29uc3QgbGVuZ3RoID0gcGFyZW50T25lLmxlbmd0aDtcbiAgICBjb25zdCByYW5kb20gPSBSYW5kb21pemF0aW9uUHJvdmlkZXIuY3VycmVudFxuICAgICAgICAuZ2V0VW5pcXVlSW50cygyLCAwLCBsZW5ndGgpXG4gICAgICAgIC5zb3J0KChhLCBiKSA9PiBhIC0gYik7XG4gICAgaWYgKHBvczEgPT09IHVuZGVmaW5lZClcbiAgICAgICAgcG9zMSA9IHJhbmRvbVswXTtcbiAgICBpZiAocG9zMiA9PT0gdW5kZWZpbmVkKVxuICAgICAgICBwb3MyID0gcmFuZG9tWzFdO1xuICAgIGNvbnN0IGNoaWxkID0gW107XG4gICAgY29uc3QgbWFya2VkT3V0ID0gW107XG4gICAgZm9yIChsZXQgaSA9IHBvczE7IGkgPCBwb3MyOyBpKyspIHtcbiAgICAgICAgbWFya2VkT3V0LnB1c2gocGFyZW50T25lQ2xvbmVbaV0pO1xuICAgICAgICBjaGlsZFtpXSA9IHBhcmVudE9uZUNsb25lW2ldO1xuICAgIH1cbiAgICBwYXJlbnRUd29DbG9uZSA9IHBhcmVudFR3b0Nsb25lLmZpbHRlcigodmFsKSA9PiAhbWFya2VkT3V0LmluY2x1ZGVzKHZhbCkpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcG9zMTsgaSsrKVxuICAgICAgICBjaGlsZFtpXSA9IHBhcmVudFR3b0Nsb25lLnNoaWZ0KCk7XG4gICAgZm9yIChsZXQgaSA9IHBvczI7IGkgPCBsZW5ndGg7IGkrKylcbiAgICAgICAgY2hpbGRbaV0gPSBwYXJlbnRUd29DbG9uZS5zaGlmdCgpO1xuICAgIHJldHVybiBjaGlsZDtcbn07XG5Dcm9zc092ZXJVdGlsLnBteENyb3NzT3ZlciA9IHt9O1xuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ3Jvc3NvdmVyQmFzZSB7XG4gICAgY29uc3RydWN0b3IocGFyZW50c051bWJlciwgY2hpbGRyZW5OdW1iZXIsIG1pbkNocm9tb3NvbWVMZW5ndGgpIHtcbiAgICAgICAgdGhpcy5wYXJlbnROdW1iZXIgPSBwYXJlbnRzTnVtYmVyO1xuICAgICAgICB0aGlzLmNoaWxkcmVuTnVtYmVyID0gY2hpbGRyZW5OdW1iZXI7XG4gICAgICAgIHRoaXMubWluQ2hyb21vc29tZUxlbmd0aCA9IG1pbkNocm9tb3NvbWVMZW5ndGg7XG4gICAgfVxuICAgIGNyb3NzKHBhcmVudHMpIHtcbiAgICAgICAgaWYgKHBhcmVudHMgPT0gbnVsbClcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkVycm9yIC0gQ3Jvc3NPdmVyYmFzZTogTnVtYmVyIG9mIHBhcmVudHMgY2Fubm90IGJlIG51bGwuXCIpO1xuICAgICAgICBjb25zdCBmaXJzdFBhcmVudCA9IHBhcmVudHNbMF07XG4gICAgICAgIGlmIChmaXJzdFBhcmVudC5sZW5ndGggPCB0aGlzLm1pbkNocm9tb3NvbWVMZW5ndGgpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkVycm9yOiBBIGNocm9tb3NvbWUgc2hvdWxkIGhhdmUgYXQgbGVhc3QgMCBnZW5lc1wiKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5wZXJmb3JtQ3Jvc3MocGFyZW50cyk7XG4gICAgfVxufVxuIiwiaW1wb3J0IFJhbmRvbWl6YXRpb25Qcm92aWRlciBmcm9tIFwiLi4vcmFuZG9taXphdGlvbi9SYW5kb21pemF0aW9uUHJvdmlkZXJcIjtcbmltcG9ydCBDcm9zc292ZXJCYXNlIGZyb20gXCIuL0Nyb3Nzb3ZlckJhc2VcIjtcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE9uZVBvaW50Q3Jvc3NvdmVyIGV4dGVuZHMgQ3Jvc3NvdmVyQmFzZSB7XG4gICAgY29uc3RydWN0b3Ioc3dhcFBvaW50SW5kZXgpIHtcbiAgICAgICAgc3VwZXIoMiwgMik7XG4gICAgICAgIGlmIChzd2FwUG9pbnRJbmRleCAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgdGhpcy5zd2FwUG9pbnRJbmRleCA9IHN3YXBQb2ludEluZGV4O1xuICAgIH1cbiAgICBwZXJmb3JtQ3Jvc3MocGFyZW50cykge1xuICAgICAgICBjb25zdCBmaXJzdFBhcmVudCA9IHBhcmVudHNbMF07XG4gICAgICAgIGNvbnN0IHNlY29uZFBhcmVudCA9IHBhcmVudHNbMV07XG4gICAgICAgIGNvbnN0IHN3YXBQb2ludHNMZW5ndGggPSBmaXJzdFBhcmVudC5nZXRHZW5lcygpLmxlbmd0aCAtIDE7XG4gICAgICAgIGlmICh0aGlzLnN3YXBQb2ludEluZGV4ID09PSB1bmRlZmluZWQpXG4gICAgICAgICAgICB0aGlzLnN3YXBQb2ludEluZGV4ID0gUmFuZG9taXphdGlvblByb3ZpZGVyLmN1cnJlbnQuZ2V0SW50KDAsIGZpcnN0UGFyZW50LmdldEdlbmVzKCkubGVuZ3RoIC0gMSk7XG4gICAgICAgIGlmICh0aGlzLnN3YXBQb2ludEluZGV4ID49IHN3YXBQb2ludHNMZW5ndGgpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlN3YXBQb2ludEluZGV4IC0gVGhlIHN3YXAgcG9pbnQgaW5kZXguXCIpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZUNoaWxkcmVuKGZpcnN0UGFyZW50LCBzZWNvbmRQYXJlbnQpO1xuICAgIH1cbiAgICBjcmVhdGVDaGlsZChsZWZ0UGFyZW50LCByaWdodFBhcmVudCkge1xuICAgICAgICBjb25zdCBjdXRHZW5lQ291bnQgPSB0aGlzLnN3YXBQb2ludEluZGV4ICsgMTtcbiAgICAgICAgY29uc3QgY2hpbGQgPSBsZWZ0UGFyZW50LmNyZWF0ZU5ldygpO1xuICAgICAgICBjb25zdCBsZWZ0ID0gbGVmdFBhcmVudC5nZXRHZW5lcygpLnNsaWNlKDAsIGN1dEdlbmVDb3VudCk7XG4gICAgICAgIGNvbnN0IHJpZ2h0ID0gcmlnaHRQYXJlbnQuZ2V0R2VuZXMoKS5zbGljZShjdXRHZW5lQ291bnQsIHJpZ2h0UGFyZW50LmdldEdlbmVzKCkubGVuZ3RoIC0gMSk7XG4gICAgICAgIGNvbnN0IGNvbWJpbmVkID0gbGVmdC5jb25jYXQocmlnaHQpO1xuICAgICAgICBjaGlsZC5yZXBsYWNlR2VuZXMoMCwgY29tYmluZWQpO1xuICAgICAgICByZXR1cm4gY2hpbGQ7XG4gICAgfVxuICAgIGNyZWF0ZUNoaWxkcmVuKGZpcnN0UGFyZW50LCBzZWNvbmRQYXJlbnQpIHtcbiAgICAgICAgY29uc3QgZmlyc3RDaGlsZCA9IHRoaXMuY3JlYXRlQ2hpbGQoZmlyc3RQYXJlbnQsIHNlY29uZFBhcmVudCk7XG4gICAgICAgIGNvbnN0IHNlY29uZENoaWxkID0gdGhpcy5jcmVhdGVDaGlsZChzZWNvbmRQYXJlbnQsIGZpcnN0UGFyZW50KTtcbiAgICAgICAgcmV0dXJuIFtmaXJzdENoaWxkLCBzZWNvbmRDaGlsZF07XG4gICAgfVxufVxuIiwiaW1wb3J0IENocm9tb3NvbWVFeHRlbnNpb24gZnJvbSBcIi4uL2Nocm9tb3NvbWUvQ2hyb21vc29tZUV4dGVuc2lvblwiO1xuaW1wb3J0IFJhbmRvbWl6YXRpb25Qcm92aWRlciBmcm9tIFwiLi4vcmFuZG9taXphdGlvbi9SYW5kb21pemF0aW9uUHJvdmlkZXJcIjtcbmltcG9ydCBDcm9zc292ZXJCYXNlIGZyb20gXCIuL0Nyb3Nzb3ZlckJhc2VcIjtcbmltcG9ydCBDcm9zc092ZXJVdGlsIGZyb20gXCIuL0Nyb3NzT3ZlclV0aWxcIjtcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE9yZGVyZWRDcm9zc292ZXIgZXh0ZW5kcyBDcm9zc292ZXJCYXNlIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoMiwgMik7XG4gICAgICAgIHRoaXMuaXNPcmRlcmVkID0gdHJ1ZTtcbiAgICB9XG4gICAgcGVyZm9ybUNyb3NzKHBhcmVudHMpIHtcbiAgICAgICAgY29uc3QgcGFyZW50T25lID0gcGFyZW50c1swXTtcbiAgICAgICAgY29uc3QgcGFyZW50VHdvID0gcGFyZW50c1sxXTtcbiAgICAgICAgaWYgKCFDaHJvbW9zb21lRXh0ZW5zaW9uLnZhbGlkYXRlR2VuZXMocGFyZW50T25lKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiT3JkZXJlZCBDcm9zc292ZXIgLSBDYW5ub3QgYmUgdXNlZCEgUGFyZW50IGhhcyBkdXBsaWNhdGUgZ2VuZXMuXCIpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChDaHJvbW9zb21lRXh0ZW5zaW9uLmFueUhhc1JlcGVhdGVkR2VuZShbcGFyZW50T25lLCBwYXJlbnRUd29dKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiT3JkZXJlZCBDcm9zc292ZXIgLSBQYXJlbnRzIGhhdmUgcmVwZWF0ZWQgZ2VuZXNcIik7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IG1pZGRsZVNlY3Rpb25JbmRleGVzID0gUmFuZG9taXphdGlvblByb3ZpZGVyLmN1cnJlbnQuZ2V0VW5pcXVlSW50cygyLCAwLCBwYXJlbnRPbmUubGVuZ3RoKTtcbiAgICAgICAgbWlkZGxlU2VjdGlvbkluZGV4ZXMgPSBtaWRkbGVTZWN0aW9uSW5kZXhlcy5zb3J0KChhLCBiKSA9PiBhIC0gYik7XG4gICAgICAgIGNvbnN0IG1pZGRsZVNlY3Rpb25CZWdpbkluZGV4ID0gbWlkZGxlU2VjdGlvbkluZGV4ZXNbMF07XG4gICAgICAgIGNvbnN0IG1pZGRsZVNlY3Rpb25FbmRJbmRleCA9IG1pZGRsZVNlY3Rpb25JbmRleGVzWzFdO1xuICAgICAgICBjb25zdCBmaXJzdENoaWxkID0gdGhpcy5jcmVhdGVDaGlsZChwYXJlbnRPbmUsIHBhcmVudFR3bywgbWlkZGxlU2VjdGlvbkJlZ2luSW5kZXgsIG1pZGRsZVNlY3Rpb25FbmRJbmRleCk7XG4gICAgICAgIGNvbnN0IHNlY29uZENoaWxkID0gdGhpcy5jcmVhdGVDaGlsZChwYXJlbnRUd28sIHBhcmVudE9uZSwgbWlkZGxlU2VjdGlvbkJlZ2luSW5kZXgsIG1pZGRsZVNlY3Rpb25FbmRJbmRleCk7XG4gICAgICAgIHJldHVybiBbZmlyc3RDaGlsZCwgc2Vjb25kQ2hpbGRdO1xuICAgIH1cbiAgICBjcmVhdGVDaGlsZChmaXJzdFBhcmVudCwgc2Vjb25kUGFyZW50LCBtaWRkbGVTZWN0aW9uQmVnaW5JbmRleCwgbWlkZGxlU2VjdGlvbkVuZEluZGV4KSB7XG4gICAgICAgIGNvbnN0IGZpcnN0UGFyZW50R2VuZXMgPSBmaXJzdFBhcmVudC5nZXRHZW5lcygpO1xuICAgICAgICBjb25zdCBzZWNvbmRQYXJlbnRHZW5lcyA9IHNlY29uZFBhcmVudC5nZXRHZW5lcygpO1xuICAgICAgICBjb25zdCBjaGlsZEdlbmVzID0gQ3Jvc3NPdmVyVXRpbC5vcmRlcmVkQ3Jvc3NvdmVyKGZpcnN0UGFyZW50R2VuZXMsIHNlY29uZFBhcmVudEdlbmVzLCBtaWRkbGVTZWN0aW9uQmVnaW5JbmRleCwgbWlkZGxlU2VjdGlvbkVuZEluZGV4KTtcbiAgICAgICAgY29uc3QgY2hpbGQgPSBmaXJzdFBhcmVudC5jcmVhdGVOZXcoKTtcbiAgICAgICAgbGV0IGluZGV4ID0gMDtcbiAgICAgICAgZm9yIChjb25zdCBnZW5lIG9mIGNoaWxkR2VuZXMpIHtcbiAgICAgICAgICAgIGNoaWxkLnJlcGxhY2VHZW5lKGluZGV4LCBnZW5lKTtcbiAgICAgICAgICAgIGluZGV4Kys7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNoaWxkO1xuICAgIH1cbn1cbiIsImltcG9ydCBDcm9zc292ZXJCYXNlIGZyb20gXCIuL0Nyb3Nzb3ZlckJhc2VcIjtcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVuaWZvcm1Dcm9zc292ZXIgZXh0ZW5kcyBDcm9zc292ZXJCYXNlIHtcbiAgICBjb25zdHJ1Y3RvcihtaXhQcm9iYWJpbGl0eSkge1xuICAgICAgICBzdXBlcigyLCAyKTtcbiAgICAgICAgdGhpcy5taXhQcm9iYWJpbGl0eSA9IG1peFByb2JhYmlsaXR5O1xuICAgIH1cbiAgICBwZXJmb3JtQ3Jvc3MocGFyZW50cykge1xuICAgICAgICBjb25zdCBmaXJzdFBhcmVudCA9IHBhcmVudHNbMF07XG4gICAgICAgIGNvbnN0IHNlY29uZFBhcmVudCA9IHBhcmVudHNbMV07XG4gICAgICAgIGNvbnN0IGZpcnN0Q2hpbGQgPSBmaXJzdFBhcmVudC5jcmVhdGVOZXcoKTtcbiAgICAgICAgY29uc3Qgc2Vjb25kQ2hpbGQgPSBzZWNvbmRQYXJlbnQuY3JlYXRlTmV3KCk7XG4gICAgICAgIGNvbnN0IGNoaWxkcmVuID0gW107XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZmlyc3RQYXJlbnQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChNYXRoLnJhbmRvbSgpIDwgdGhpcy5taXhQcm9iYWJpbGl0eSkge1xuICAgICAgICAgICAgICAgIGZpcnN0Q2hpbGQucmVwbGFjZUdlbmUoaSwgZmlyc3RDaGlsZC5nZXRHZW5lKGkpKTtcbiAgICAgICAgICAgICAgICBzZWNvbmRDaGlsZC5yZXBsYWNlR2VuZShpLCBzZWNvbmRQYXJlbnQuZ2V0R2VuZShpKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBmaXJzdENoaWxkLnJlcGxhY2VHZW5lKGksIHNlY29uZFBhcmVudC5nZXRHZW5lKGkpKTtcbiAgICAgICAgICAgICAgICBzZWNvbmRDaGlsZC5yZXBsYWNlR2VuZShpLCBmaXJzdFBhcmVudC5nZXRHZW5lKGkpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjaGlsZHJlbi5wdXNoKGZpcnN0Q2hpbGQpO1xuICAgICAgICBjaGlsZHJlbi5wdXNoKHNlY29uZENoaWxkKTtcbiAgICAgICAgcmV0dXJuIGNoaWxkcmVuO1xuICAgIH1cbn1cbiIsImltcG9ydCBSYW5kb21pemF0aW9uUHJvdmlkZXIgZnJvbSBcIi4uL3JhbmRvbWl6YXRpb24vUmFuZG9taXphdGlvblByb3ZpZGVyXCI7XG5pbXBvcnQgTXV0YXRpb25CYXNlIGZyb20gXCIuL011dGF0aW9uQmFzZVwiO1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRmxpcEJpdE11dGF0aW9uIGV4dGVuZHMgTXV0YXRpb25CYXNlIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5ybmQgPSBSYW5kb21pemF0aW9uUHJvdmlkZXIuY3VycmVudDtcbiAgICB9XG4gICAgcGVyZm9ybU11dGF0ZShjaHJvbW9zb21lLCBwcm9iYWJpbGl0eSkge1xuICAgICAgICBjb25zdCBiYyA9IGNocm9tb3NvbWU7XG4gICAgICAgIGlmIChiYyA9PSBudWxsKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiRmxpcCBiaXQgY2FudCBiZSBkb25lXCIpO1xuICAgICAgICBpZiAodGhpcy5ybmQuZ2V0RG91YmxlKCkgPD0gcHJvYmFiaWxpdHkpIHtcbiAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5ybmQuZ2V0SW50KDAsIGNocm9tb3NvbWUubGVuZ3RoKTtcbiAgICAgICAgICAgIGJjLmZsaXBHZW5lKGluZGV4KTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIE11dGF0aW9uQmFzZSB7XG4gICAgbXV0YXRlKGNocm9tb3NvbWUsIHByb2JhYmlsaXR5KSB7XG4gICAgICAgIHRoaXMucGVyZm9ybU11dGF0ZShjaHJvbW9zb21lLCBwcm9iYWJpbGl0eSk7XG4gICAgfVxufVxuIiwiaW1wb3J0IFNlcXVlbmNlTXV0YXRpb25CYXNlIGZyb20gXCIuL1NlcXVlbmNlTXV0YXRpb25CYXNlXCI7XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQYXJ0aWFsU2h1ZmZsZU11dGF0aW9uIGV4dGVuZHMgU2VxdWVuY2VNdXRhdGlvbkJhc2Uge1xuICAgIG11dGF0ZU9uU2VxdWVuY2Uoc2VxdWVuY2UpIHtcbiAgICAgICAgY29uc3QgbXV0YXRlZCA9IFsuLi5zZXF1ZW5jZV0uc29ydCgoKSA9PiAwLjUgLSBNYXRoLnJhbmRvbSgpKTtcbiAgICAgICAgcmV0dXJuIG11dGF0ZWQ7XG4gICAgfVxufVxuIiwiaW1wb3J0IFNlcXVlbmNlTXV0YXRpb25CYXNlIGZyb20gXCIuL1NlcXVlbmNlTXV0YXRpb25CYXNlXCI7XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZXZlcnNlU2VxdWVuY2VNdXRhdGlvbiBleHRlbmRzIFNlcXVlbmNlTXV0YXRpb25CYXNlIHtcbiAgICBtdXRhdGVPblNlcXVlbmNlKHNlcXVlbmNlKSB7XG4gICAgICAgIHJldHVybiBzZXF1ZW5jZS5yZXZlcnNlKCk7XG4gICAgfVxufVxuIiwiaW1wb3J0IFJhbmRvbWl6YXRpb25Qcm92aWRlciBmcm9tIFwiLi4vcmFuZG9taXphdGlvbi9SYW5kb21pemF0aW9uUHJvdmlkZXJcIjtcbmltcG9ydCBNdXRhdGlvbkJhc2UgZnJvbSBcIi4vTXV0YXRpb25CYXNlXCI7XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTZXF1ZW5jZU11dGF0aW9uQmFzZSBleHRlbmRzIE11dGF0aW9uQmFzZSB7XG4gICAgcGVyZm9ybU11dGF0ZShjaHJvbW9zb21lLCBwcm9iYWJpbGl0eSkge1xuICAgICAgICB0aGlzLnZhbGlkYXRlTGVuZ3RoKGNocm9tb3NvbWUpO1xuICAgICAgICBjb25zdCByID0gUmFuZG9taXphdGlvblByb3ZpZGVyLmN1cnJlbnQ7XG4gICAgICAgIGlmIChyLmdldERvdWJsZSgpIDw9IHByb2JhYmlsaXR5KSB7XG4gICAgICAgICAgICBjb25zdCBpbmRleGVzID0gclxuICAgICAgICAgICAgICAgIC5nZXRVbmlxdWVJbnRzKDIsIDAsIGNocm9tb3NvbWUubGVuZ3RoKVxuICAgICAgICAgICAgICAgIC5zb3J0KChhLCBiKSA9PiBhIC0gYik7XG4gICAgICAgICAgICBjb25zdCBmaXJzdEluZGV4ID0gaW5kZXhlc1swXTtcbiAgICAgICAgICAgIGNvbnN0IHNlY29uZEluZGV4ID0gaW5kZXhlc1sxXTtcbiAgICAgICAgICAgIGNvbnN0IHNlcXVlbmNlTGVuZ3RoID0gc2Vjb25kSW5kZXggLSBmaXJzdEluZGV4ICsgMTtcbiAgICAgICAgICAgIGNvbnN0IHNlcXVlbmNlID0gY2hyb21vc29tZS5nZXRHZW5lcygpLnNsaWNlKGZpcnN0SW5kZXgsIHNlY29uZEluZGV4KTtcbiAgICAgICAgICAgIGNvbnN0IG11dGF0ZWRTZXF1ZW5jZSA9IHRoaXMubXV0YXRlT25TZXF1ZW5jZShzZXF1ZW5jZSk7XG4gICAgICAgICAgICBjaHJvbW9zb21lLnJlcGxhY2VHZW5lcyhmaXJzdEluZGV4LCBtdXRhdGVkU2VxdWVuY2UpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHZhbGlkYXRlTGVuZ3RoKGNocm9tb3NvbWUpIHtcbiAgICAgICAgaWYgKGNocm9tb3NvbWUubGVuZ3RoIDwgMykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiU2VxdWVuY2VNdXRhdGlvbkJhc2UgLSBBIGNocm9tb3NvbWUgc2hvdWxkIGhhdmUgYXQgbGVhc3QgMyBnZW5lc1wiKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImltcG9ydCBNdXRhdGlvbkJhc2UgZnJvbSBcIi4vTXV0YXRpb25CYXNlXCI7XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVbmlmb3JtTXV0YXRpb24gZXh0ZW5kcyBNdXRhdGlvbkJhc2Uge1xuICAgIHBlcmZvcm1NdXRhdGUoY2hyb21vc29tZSwgcHJvYmFiaWxpdHkpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTWV0aG9kIG5vdCBpbXBsZW1lbnRlZC5cIik7XG4gICAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2VuZXJhdGlvbiB7XG4gICAgY29uc3RydWN0b3IobnVtLCBjaHJvbW9zb21lcywgaXNNYXhpbWl6ZWQgPSB0cnVlKSB7XG4gICAgICAgIGlmIChudW0gPCAxKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJHZW5lcmF0aW9uIG51bWJlciBcIiArIG51bSArIFwiaXMgaW52YWxpZC5cIik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNocm9tb3NvbWVzLmxlbmd0aCA8IDIpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkEgZ2VuZXJhdGlvbiBzaG91bGQgaGF2ZSBhdCBsZWFzdCAyIGNocm9tb3NvbWVcIik7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5udW0gPSBudW07XG4gICAgICAgIHRoaXMuY3JlYXRpb25EYXRlID0gbmV3IERhdGUoKTtcbiAgICAgICAgdGhpcy5jaHJvbW9zb21lcyA9IGNocm9tb3NvbWVzO1xuICAgICAgICB0aGlzLmlzTWF4aW1pemVkID0gaXNNYXhpbWl6ZWQ7XG4gICAgfVxuICAgIGVuZChjaHJvbW9zb21lc051bWJlcikge1xuICAgICAgICBpZiAodGhpcy5pc01heGltaXplZCkge1xuICAgICAgICAgICAgdGhpcy5jaHJvbW9zb21lcyA9IHRoaXMuY2hyb21vc29tZXNcbiAgICAgICAgICAgICAgICAuZmlsdGVyKChjaHJvbW9zb21lKSA9PiB0aGlzLnZhbGlkYXRlQ2hyb21vc29tZShjaHJvbW9zb21lKSA9PT0gdHJ1ZSlcbiAgICAgICAgICAgICAgICAuc29ydCgoYSwgYikgPT4gYi5maXRuZXNzIC0gYS5maXRuZXNzKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuY2hyb21vc29tZXMgPSB0aGlzLmNocm9tb3NvbWVzXG4gICAgICAgICAgICAgICAgLmZpbHRlcigoY2hyb21vc29tZSkgPT4gdGhpcy52YWxpZGF0ZUNocm9tb3NvbWUoY2hyb21vc29tZSkgPT09IHRydWUpXG4gICAgICAgICAgICAgICAgLnNvcnQoKGEsIGIpID0+IGEuZml0bmVzcyAtIGIuZml0bmVzcyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jaHJvbW9zb21lcyA9IHRoaXMuY2hyb21vc29tZXMuc2xpY2UoMCwgY2hyb21vc29tZXNOdW1iZXIpO1xuICAgICAgICB0aGlzLmJlc3RDaHJvbW9zb21lcyA9IHRoaXMuY2hyb21vc29tZXNbMF07XG4gICAgfVxuICAgIGdldENocm9tb3NvbWUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNocm9tb3NvbWVzO1xuICAgIH1cbiAgICB0b1N0cmluZygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYmVzdENocm9tb3NvbWVzLmdldEdlbmVzKCkudG9TdHJpbmcoKTtcbiAgICB9XG4gICAgdmFsaWRhdGVDaHJvbW9zb21lKGNocm9tb3NvbWUpIHtcbiAgICAgICAgaWYgKGNocm9tb3NvbWUuZml0bmVzcyA9PSBudWxsKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTm8gZml0bmVzc1wiKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxufVxuIiwiaW1wb3J0IEdlbmVyYXRpb24gZnJvbSBcIi4vR2VuZXJhdGlvblwiO1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUG9wdWxhdGlvbiB7XG4gICAgY29uc3RydWN0b3IobWluU2l6ZSwgbWF4U2l6ZSwgYWRhbUNocm9tb3NvbWUpIHtcbiAgICAgICAgdGhpcy50b1N0cmluZyA9ICgpID0+IHtcbiAgICAgICAgICAgIGxldCBzdHIgPSBcIlwiO1xuICAgICAgICAgICAgZm9yIChjb25zdCBnZW5lcmF0aW9uIG9mIHRoaXMuZ2VuZXJhdGlvbnMpIHtcbiAgICAgICAgICAgICAgICBzdHIgKz0gdGhpcy5nZW5lcmF0aW9ucy50b1N0cmluZygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHN0cjtcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKG1pblNpemUgPCAyKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCk7XG4gICAgICAgIGlmIChtYXhTaXplIDwgbWluU2l6ZSlcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcigpO1xuICAgICAgICB0aGlzLmNyZWF0aW9uRGF0ZSA9IG5ldyBEYXRlKCk7XG4gICAgICAgIHRoaXMubWluU2l6ZSA9IG1pblNpemU7XG4gICAgICAgIHRoaXMubWF4U2l6ZSA9IG1heFNpemU7XG4gICAgICAgIHRoaXMuZ2VuZXJhdGlvbnMgPSBbXTtcbiAgICAgICAgdGhpcy5hZGFtQ2hyb21vc29tZSA9IGFkYW1DaHJvbW9zb21lO1xuICAgICAgICB0aGlzLmJlc3RDaHJvbW9zb21lID0gYWRhbUNocm9tb3NvbWU7XG4gICAgICAgIHRoaXMuY3JlYXRlSW5pdGlhbEdlbmVyYXRpb24oKTtcbiAgICB9XG4gICAgY3JlYXRlSW5pdGlhbEdlbmVyYXRpb24oKSB7XG4gICAgICAgIHRoaXMuZ2VuZXJhdGlvbnMgPSBbXTtcbiAgICAgICAgdGhpcy5nZW5lcmF0aW9uTnVtYmVyID0gMDtcbiAgICAgICAgY29uc3QgY2hyb21vc29tZXMgPSBbXTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLm1pblNpemU7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgYyA9IHRoaXMuYWRhbUNocm9tb3NvbWUuY3JlYXRlTmV3KCk7XG4gICAgICAgICAgICBpZiAoYyA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2hyb21vc29tZXMucHVzaChjKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNyZWF0ZU5ld0dlbmVyYXRpb24oY2hyb21vc29tZXMpO1xuICAgIH1cbiAgICBjcmVhdGVOZXdHZW5lcmF0aW9uKGNocm9tb3NvbWVzKSB7XG4gICAgICAgIHRoaXMuY3VycmVudEdlbmVyYXRpb24gPSBuZXcgR2VuZXJhdGlvbigrK3RoaXMuZ2VuZXJhdGlvbk51bWJlciwgY2hyb21vc29tZXMpO1xuICAgICAgICB0aGlzLmdlbmVyYXRpb25zLnB1c2godGhpcy5jdXJyZW50R2VuZXJhdGlvbik7XG4gICAgfVxuICAgIGVuZEN1cnJlbnRHZW5lcmF0aW9uKCkge1xuICAgICAgICB0aGlzLmN1cnJlbnRHZW5lcmF0aW9uLmVuZCh0aGlzLm1heFNpemUpO1xuICAgICAgICBpZiAodGhpcy5iZXN0Q2hyb21vc29tZS5maXRuZXNzIDxcbiAgICAgICAgICAgIHRoaXMuY3VycmVudEdlbmVyYXRpb24uY2hyb21vc29tZXNbMF0uZml0bmVzcyB8fFxuICAgICAgICAgICAgdGhpcy5iZXN0Q2hyb21vc29tZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLmJlc3RDaHJvbW9zb21lID0gdGhpcy5jdXJyZW50R2VuZXJhdGlvbi5jaHJvbW9zb21lc1swXTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImltcG9ydCBSYW5kb21pemF0aW9uQmFzZSBmcm9tIFwiLi9SYW5kb21pemF0aW9uQmFzZVwiO1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQmFzaWNSYW5kb21pemF0aW9uIGV4dGVuZHMgUmFuZG9taXphdGlvbkJhc2Uge1xuICAgIGdldERvdWJsZShtaW4sIG1heCkge1xuICAgICAgICBpZiAobWluID09PSB1bmRlZmluZWQgfHwgbWF4ID09PSB1bmRlZmluZWQpXG4gICAgICAgICAgICByZXR1cm4gTWF0aC5yYW5kb20oKTtcbiAgICAgICAgcmV0dXJuIE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluKSArIG1pbjtcbiAgICB9XG4gICAgZ2V0RmxvYXQobWluLCBtYXgpIHtcbiAgICAgICAgcmV0dXJuIE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluKSArIG1pbjtcbiAgICB9XG4gICAgZ2V0SW50KG1pbiwgbWF4KSB7XG4gICAgICAgIG1pbiA9IE1hdGguY2VpbChtaW4pO1xuICAgICAgICBtYXggPSBNYXRoLmZsb29yKG1heCk7XG4gICAgICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluKSArIG1pbik7XG4gICAgfVxuICAgIGdldFVuaXF1ZUludHMobGVuZ3RoLCBtaW4sIG1heCkge1xuICAgICAgICBjb25zdCBzdHViID0gW107XG4gICAgICAgIGZvciAobGV0IGkgPSBtaW47IGkgPCBtYXg7IGkrKykge1xuICAgICAgICAgICAgc3R1Yi5wdXNoKGkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzdHViXG4gICAgICAgICAgICAuc29ydCgoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gMC41IC0gTWF0aC5yYW5kb20oKTtcbiAgICAgICAgfSlcbiAgICAgICAgICAgIC5zbGljZSgwLCBsZW5ndGgpO1xuICAgIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFJhbmRvbWl6YXRpb25CYXNlIHtcbiAgICBnZXRJbnRzKGxlbmd0aCwgbWluLCBtYXgpIHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gW107XG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBsZW5ndGg7IGluZGV4KyspIHtcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKHRoaXMuZ2V0SW50KG1pbiwgbWF4KSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG59XG4iLCJpbXBvcnQgQmFzaWNSYW5kb21pemF0aW9uIGZyb20gXCIuL0Jhc2ljUmFuZG9taXphdGlvblwiO1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmFuZG9taXphdGlvblByb3ZpZGVyIHtcbn1cblJhbmRvbWl6YXRpb25Qcm92aWRlci5jdXJyZW50ID0gbmV3IEJhc2ljUmFuZG9taXphdGlvbigpO1xuIiwiaW1wb3J0IHsgUmVpbnNlcnRpb25CYXNlIH0gZnJvbSBcIi4vUmVpbnNlcnRpb25CYXNlXCI7XG5leHBvcnQgY2xhc3MgRWxpdGlzdFJlaW5zZXJ0aW9uIGV4dGVuZHMgUmVpbnNlcnRpb25CYXNlIHtcbiAgICBjb25zdHJ1Y3Rvcihpc01heGltaXplZCA9IHRydWUpIHtcbiAgICAgICAgc3VwZXIoZmFsc2UsIHRydWUpO1xuICAgICAgICB0aGlzLmlzTWF4aW1pemVkID0gaXNNYXhpbWl6ZWQ7XG4gICAgfVxuICAgIHBlcmZvcm1TZWxlY3RDaHJvbW9zb21lKHBvcHVsYXRpb24sIG9mZnNwcmluZywgcGFyZW50cykge1xuICAgICAgICBjb25zdCBkaWZmID0gcG9wdWxhdGlvbi5taW5TaXplIC0gb2Zmc3ByaW5nLmxlbmd0aDtcbiAgICAgICAgbGV0IGJlc3QgPSBbXTtcbiAgICAgICAgaWYgKGRpZmYgPiAwKSB7XG4gICAgICAgICAgICBjb25zdCBiZXN0UGFyZW50cyA9IFsuLi5wYXJlbnRzXTtcbiAgICAgICAgICAgIGlmICh0aGlzLmlzTWF4aW1pemVkKVxuICAgICAgICAgICAgICAgIGJlc3QgPSBiZXN0UGFyZW50cy5zb3J0KChhLCBiKSA9PiBiLmZpdG5lc3MgLSBhLmZpdG5lc3MpLnNsaWNlKDAsIGRpZmYpO1xuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIGJlc3QgPSBiZXN0UGFyZW50cy5zb3J0KChhLCBiKSA9PiBhLmZpdG5lc3MgLSBiLmZpdG5lc3MpLnNsaWNlKDAsIGRpZmYpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IG9mZnNwcmluZy5jb25jYXQoYmVzdCk7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxufVxuIiwiZXhwb3J0IGNsYXNzIFJlaW5zZXJ0aW9uQmFzZSB7XG4gICAgY29uc3RydWN0b3IoY2FuQ29sbGFwc2UsIGNhbkV4cGFuZCkge1xuICAgICAgICB0aGlzLmNhbkNvbGxhcHNlID0gY2FuQ29sbGFwc2U7XG4gICAgICAgIHRoaXMuY2FuRXhwYW5kID0gY2FuRXhwYW5kO1xuICAgIH1cbiAgICBzZWxlY3RDaHJvbW9zb21lKHBvcHVsYXRpb24sIG9mZnNwcmluZywgcGFyZW50cykge1xuICAgICAgICBpZiAocG9wdWxhdGlvbiA9PT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVGhlIHBvcHVsYXRpb24gaXMgdW5kZWZpbmVkLlwiKTtcbiAgICAgICAgaWYgKCF0aGlzLmNhbkV4cGFuZCAmJiBvZmZzcHJpbmcubGVuZ3RoIDwgcG9wdWxhdGlvbi5taW5TaXplKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDaHJvbW9zb21lIGNhbm5vdCBiZSBzZWxlY3RlZCBhcyB0aGUgbnVtYmVyIG9mIG9mZnNwcmluZ3MgZXhjZWVkIHRoZSBtaW4gc2l6ZSBvZiB0aGUgcG9wdWxhdGlvbi5cIik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMucGVyZm9ybVNlbGVjdENocm9tb3NvbWUocG9wdWxhdGlvbiwgb2Zmc3ByaW5nLCBwYXJlbnRzKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgU2VsZWN0aW9uQmFzZSBmcm9tIFwiLi9TZWxlY3Rpb25CYXNlXCI7XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFbGl0ZVNlbGVjdGlvbiBleHRlbmRzIFNlbGVjdGlvbkJhc2Uge1xuICAgIGNvbnN0cnVjdG9yKGlzTWF4aW1pemVkID0gdHJ1ZSkge1xuICAgICAgICBzdXBlcigyKTtcbiAgICB9XG4gICAgcGVyZm9ybVNlbGVjdENocm9tb3NvbWUobnVtLCBnZW5lcmF0aW9uKSB7XG4gICAgICAgIGlmIChnZW5lcmF0aW9uID09PSB1bmRlZmluZWQpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJFbGl0ZVNlbGVjdGlvbiAtIE5vIGdlbmVyYXRpb24gZm9yIEVsaXRlIFNlbGVjdGlvblwiKTtcbiAgICAgICAgY29uc3Qgb3JkZXJlZCA9IGdlbmVyYXRpb25cbiAgICAgICAgICAgIC5nZXRDaHJvbW9zb21lKClcbiAgICAgICAgICAgIC5zb3J0KChhLCBiKSA9PiBiLmZpdG5lc3MgLSBhLmZpdG5lc3MpO1xuICAgICAgICByZXR1cm4gb3JkZXJlZC5zbGljZSgwLCBudW0pO1xuICAgIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFNlbGVjdGlvbkJhc2Uge1xuICAgIGNvbnN0cnVjdG9yKG1pbk51bWJlckNocm9tb3NvbWUpIHtcbiAgICAgICAgdGhpcy5taW5OdW1iZXJDaHJvbW9zb21lID0gbWluTnVtYmVyQ2hyb21vc29tZTtcbiAgICB9XG4gICAgc2VsZWN0Q2hyb21vc29tZXMobnVtLCBnZW5lcmF0aW9uKSB7XG4gICAgICAgIGlmIChudW0gPCB0aGlzLm1pbk51bWJlckNocm9tb3NvbWUpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlwiKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5wZXJmb3JtU2VsZWN0Q2hyb21vc29tZShudW0sIGdlbmVyYXRpb24pO1xuICAgIH1cbn1cbiIsImltcG9ydCBMb2dpY2FsT3BlcmF0b3JUZXJtaW5hdGlvbkJhc2UgZnJvbSBcIi4vTG9naWNhbE9wZXJhdG9yVGVybWluYXRpb25CYXNlXCI7XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBbmRUZXJtaW5hdGlvbiBleHRlbmRzIExvZ2ljYWxPcGVyYXRvclRlcm1pbmF0aW9uQmFzZSB7XG4gICAgY29uc3RydWN0b3IodGVybWluYXRpb25zKSB7XG4gICAgICAgIHN1cGVyKHRlcm1pbmF0aW9ucy5sZW5ndGgsIHRlcm1pbmF0aW9ucyk7XG4gICAgfVxuICAgIHBlcmZvcm1IYXNSZWFjaGVkKGdlbmV0aWNBbGdvcml0aG0pIHtcbiAgICAgICAgbGV0IHN0YXR1cyA9IGZhbHNlO1xuICAgICAgICBmb3IgKGNvbnN0IHRlcm1pbmF0aW9uIG9mIHRoaXMudGVybWluYXRpb25zKSB7XG4gICAgICAgICAgICBzdGF0dXMgPSB0ZXJtaW5hdGlvbi5oYXNSZWFjaGVkKGdlbmV0aWNBbGdvcml0aG0pO1xuICAgICAgICAgICAgaWYgKHN0YXR1cyA9PT0gZmFsc2UpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbn1cbiIsImltcG9ydCBUZXJtaW5hdGlvbkJhc2UgZnJvbSBcIi4vVGVybWluYXRpb25CYXNlXCI7XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGaXRuZXNzU3RhZ25hdGlvblRlcm1pbmF0aW9uIGV4dGVuZHMgVGVybWluYXRpb25CYXNlIHtcbiAgICBjb25zdHJ1Y3RvcihleHBlY3RlZFN0YWduYXRpb25HZW5lcmF0aW9uTnVtYmVyKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIGlmIChleHBlY3RlZFN0YWduYXRpb25HZW5lcmF0aW9uTnVtYmVyID09PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICAgIGV4cGVjdGVkU3RhZ25hdGlvbkdlbmVyYXRpb25OdW1iZXIgPT09IG51bGwpXG4gICAgICAgICAgICB0aGlzLmV4cGVjdGVkU3RhZ25hdGlvbkdlbmVyYXRpb25OdW1iZXIgPSAxMDA7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHRoaXMuZXhwZWN0ZWRTdGFnbmF0aW9uR2VuZXJhdGlvbk51bWJlciA9IGV4cGVjdGVkU3RhZ25hdGlvbkdlbmVyYXRpb25OdW1iZXI7XG4gICAgfVxuICAgIHBlcmZvcm1IYXNSZWFjaGVkKGdlbmV0aWNBbGdvcml0aG0pIHtcbiAgICAgICAgaWYgKGdlbmV0aWNBbGdvcml0aG0uYmVzdENocm9tb3NvbWUgPT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgY29uc3QgYmVzdEZpdG5lc3MgPSBnZW5ldGljQWxnb3JpdGhtLmJlc3RDaHJvbW9zb21lLmZpdG5lc3M7XG4gICAgICAgIGlmICh0aGlzLm1MYXN0Rml0bmVzcyA9PT0gYmVzdEZpdG5lc3MpIHtcbiAgICAgICAgICAgIHRoaXMubVN0YWduYW50R2VuZXJhdGlvbkNvdW50Kys7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLm1TdGFnbmFudEdlbmVyYXRpb25Db3VudCA9IDE7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5tTGFzdEZpdG5lc3MgPSBiZXN0Rml0bmVzcztcbiAgICAgICAgcmV0dXJuIHRoaXMubVN0YWduYW50R2VuZXJhdGlvbkNvdW50ID49IHRoaXMuZXhwZWN0ZWRTdGFnbmF0aW9uR2VuZXJhdGlvbk51bWJlcjtcbiAgICB9XG59XG4iLCJpbXBvcnQgVGVybWluYXRpb25CYXNlIGZyb20gXCIuL1Rlcm1pbmF0aW9uQmFzZVwiO1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRml0bmVzc1RocmVzaG9sZFRlcm1pbmF0aW9uIGV4dGVuZHMgVGVybWluYXRpb25CYXNlIHtcbiAgICBjb25zdHJ1Y3RvcihleHBlY3RlZEZpdG5lc3MpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgaWYgKGV4cGVjdGVkRml0bmVzcyA9PT0gdW5kZWZpbmVkIHx8IGV4cGVjdGVkRml0bmVzcyA9PSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLmV4cGVjdGVkRml0bmVzcyA9IDE7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmV4cGVjdGVkRml0bmVzcyA9IGV4cGVjdGVkRml0bmVzcztcbiAgICAgICAgfVxuICAgIH1cbiAgICBwZXJmb3JtSGFzUmVhY2hlZChnZW5ldGljQWxnb3JpdGhtKSB7XG4gICAgICAgIHJldHVybiBnZW5ldGljQWxnb3JpdGhtLmJlc3RDaHJvbW9zb21lLmZpdG5lc3MgPj0gdGhpcy5leHBlY3RlZEZpdG5lc3M7XG4gICAgfVxufVxuIiwiaW1wb3J0IFRlcm1pbmF0aW9uQmFzZSBmcm9tIFwiLi9UZXJtaW5hdGlvbkJhc2VcIjtcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdlbmVyYXRpb25OdW1iZXJUZXJtaW5hdGlvbiBleHRlbmRzIFRlcm1pbmF0aW9uQmFzZSB7XG4gICAgY29uc3RydWN0b3IoZXhwZWN0ZWRHZW5lcmF0aW9uTnVtYmVyKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIGlmIChleHBlY3RlZEdlbmVyYXRpb25OdW1iZXIgPT09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgICAgZXhwZWN0ZWRHZW5lcmF0aW9uTnVtYmVyID09PSBudWxsKVxuICAgICAgICAgICAgdGhpcy5leHBlY3RlZEdlbmVyYXRpb25OdW1iZXIgPSAxMDA7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHRoaXMuZXhwZWN0ZWRHZW5lcmF0aW9uTnVtYmVyID0gZXhwZWN0ZWRHZW5lcmF0aW9uTnVtYmVyO1xuICAgIH1cbiAgICBwZXJmb3JtSGFzUmVhY2hlZChnZW5ldGljQWxnb3JpdGhtKSB7XG4gICAgICAgIHJldHVybiBnZW5ldGljQWxnb3JpdGhtLmdlbmVyYXRpb25zTnVtYmVyID49IHRoaXMuZXhwZWN0ZWRHZW5lcmF0aW9uTnVtYmVyO1xuICAgIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIExvZ2ljYWxPcGVyYXRvclRlcm1pbmF0aW9uQmFzZSB7XG4gICAgY29uc3RydWN0b3IobWluT3BlcmFuZHMsIHRlcm1pbmF0aW9ucykge1xuICAgICAgICBpZiAobWluT3BlcmFuZHMgPT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIHRoaXMubWluT3BlcmFuZHMgPSAyO1xuICAgICAgICB0aGlzLnRlcm1pbmF0aW9ucyA9IFtdO1xuICAgICAgICBpZiAodGVybWluYXRpb25zICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMudGVybWluYXRpb25zLmNvbmNhdCh0ZXJtaW5hdGlvbnMpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGhhc1JlYWNoZWQoZ2VuZXRpY0FsZ29yaXRobSkge1xuICAgICAgICBpZiAodGhpcy50ZXJtaW5hdGlvbnMubGVuZ3RoIDwgdGhpcy5taW5PcGVyYW5kcykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVGhlcmUgc2hvdWxkIGJlIGF0IGxlYXN0IG9uZSB0ZXJtaW5hdGlvbi5cIik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMucGVyZm9ybUhhc1JlYWNoZWQoZ2VuZXRpY0FsZ29yaXRobSk7XG4gICAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGVybWluYXRpb25CYXNlIHtcbiAgICBoYXNSZWFjaGVkKGdlbmV0aWNBbGdvcml0aG0pIHtcbiAgICAgICAgdGhpcy5tSGFzUmVhY2hlZCA9IHRoaXMucGVyZm9ybUhhc1JlYWNoZWQoZ2VuZXRpY0FsZ29yaXRobSk7XG4gICAgICAgIHJldHVybiB0aGlzLm1IYXNSZWFjaGVkO1xuICAgIH1cbn1cbiIsImltcG9ydCBCaW5hcnlDaHJvbW9zb21lQmFzZSBmcm9tIFwiLi9kb21haW4vY2hyb21vc29tZS9CaW5hcnlDaHJvbW9zb21lQmFzZVwiO1xuaW1wb3J0IENocm9tb3NvbWVCYXNlIGZyb20gXCIuL2RvbWFpbi9jaHJvbW9zb21lL0Nocm9tb3NvbWVCYXNlXCI7XG5pbXBvcnQgQ2hyb21vc29tZUV4dGVuc2lvbiBmcm9tIFwiLi9kb21haW4vY2hyb21vc29tZS9DaHJvbW9zb21lRXh0ZW5zaW9uXCI7XG5pbXBvcnQgRGVjaW1hbENocm9tb3NvbWUgZnJvbSBcIi4vZG9tYWluL2Nocm9tb3NvbWUvRGVjaW1hbENocm9tb3NvbWVcIjtcbmltcG9ydCBGbG9hdGluZ1BvaW50Q2hyb21vc29tZSBmcm9tIFwiLi9kb21haW4vY2hyb21vc29tZS9GbG9hdGluZ1BvaW50Q2hyb21vc29tZVwiO1xuaW1wb3J0IEFsdGVybmF0aW5nUG9pbnRDcm9zc292ZXIgZnJvbSBcIi4vZG9tYWluL2Nyb3Nzb3ZlcnMvQWx0ZXJuYXRpbmdQb2ludENyb3Nzb3ZlclwiO1xuaW1wb3J0IENyb3Nzb3ZlckJhc2UgZnJvbSBcIi4vZG9tYWluL2Nyb3Nzb3ZlcnMvQ3Jvc3NvdmVyQmFzZVwiO1xuaW1wb3J0IE9uZVBvaW50Q3Jvc3NvdmVyIGZyb20gXCIuL2RvbWFpbi9jcm9zc292ZXJzL09uZVBvaW50Q3Jvc3NvdmVyXCI7XG5pbXBvcnQgT3JkZXJlZENyb3Nzb3ZlciBmcm9tIFwiLi9kb21haW4vY3Jvc3NvdmVycy9PcmRlcmVkQ3Jvc3NvdmVyXCI7XG5pbXBvcnQgVW5pZm9ybUNyb3Nzb3ZlciBmcm9tIFwiLi9kb21haW4vY3Jvc3NvdmVycy9Vbmlmb3JtQ3Jvc3NvdmVyXCI7XG5pbXBvcnQgR2VuZXRpY0FsZ29yaXRobSBmcm9tIFwiLi9kb21haW4vR2VuZXRpY0FsZ29yaXRobVwiO1xuaW1wb3J0IEZsaXBCaXRNdXRhdGlvbiBmcm9tIFwiLi9kb21haW4vbXV0YXRpb25zL0ZsaXBCaXRNdXRhdGlvblwiO1xuaW1wb3J0IE11dGF0aW9uQmFzZSBmcm9tIFwiLi9kb21haW4vbXV0YXRpb25zL011dGF0aW9uQmFzZVwiO1xuaW1wb3J0IFBhcnRpYWxTaHVmZmxlTXV0YXRpb24gZnJvbSBcIi4vZG9tYWluL211dGF0aW9ucy9QYXJ0aWFsU2h1ZmZsZU11dGF0aW9uXCI7XG5pbXBvcnQgUmV2ZXJzZVNlcXVlbmNlTXV0YXRpb24gZnJvbSBcIi4vZG9tYWluL211dGF0aW9ucy9SZXZlcnNlU2VxdWVuY2VNdXRhdGlvblwiO1xuaW1wb3J0IFVuaWZvcm1NdXRhdGlvbiBmcm9tIFwiLi9kb21haW4vbXV0YXRpb25zL1VuaWZvcm1NdXRhdGlvblwiO1xuaW1wb3J0IEdlbmVyYXRpb24gZnJvbSBcIi4vZG9tYWluL3BvcHVsYXRpb25zL0dlbmVyYXRpb25cIjtcbmltcG9ydCBQb3B1bGF0aW9uIGZyb20gXCIuL2RvbWFpbi9wb3B1bGF0aW9ucy9Qb3B1bGF0aW9uXCI7XG5pbXBvcnQgQW5kVGVybWluYXRpb24gZnJvbSBcIi4vZG9tYWluL3Rlcm1pbmF0aW9ucy9BbmRUZXJtaW5hdGlvblwiO1xuaW1wb3J0IEZpdG5lc3NTdGFnbmF0aW9uVGVybWluYXRpb24gZnJvbSBcIi4vZG9tYWluL3Rlcm1pbmF0aW9ucy9GaXRuZXNzU3RhZ25hdGlvblRlcm1pbmF0aW9uXCI7XG5pbXBvcnQgRml0bmVzc1RocmVzaG9sZFRlcm1pbmF0aW9uIGZyb20gXCIuL2RvbWFpbi90ZXJtaW5hdGlvbnMvRml0bmVzc1RocmVzaG9sZFRlcm1pbmF0aW9uXCI7XG5pbXBvcnQgR2VuZXJhdGlvbk51bWJlclRlcm1pbmF0aW9uIGZyb20gXCIuL2RvbWFpbi90ZXJtaW5hdGlvbnMvR2VuZXJhdGlvbk51bWJlclRlcm1pbmF0aW9uXCI7XG5leHBvcnQgeyBCaW5hcnlDaHJvbW9zb21lQmFzZSwgQ2hyb21vc29tZUJhc2UsIENocm9tb3NvbWVFeHRlbnNpb24sIERlY2ltYWxDaHJvbW9zb21lLCBGbG9hdGluZ1BvaW50Q2hyb21vc29tZSB9O1xuZXhwb3J0IHsgR2VuZXRpY0FsZ29yaXRobSB9O1xuZXhwb3J0IHsgQWx0ZXJuYXRpbmdQb2ludENyb3Nzb3ZlciwgQ3Jvc3NvdmVyQmFzZSwgT25lUG9pbnRDcm9zc292ZXIsIE9yZGVyZWRDcm9zc292ZXIsIFVuaWZvcm1Dcm9zc292ZXIgfTtcbmV4cG9ydCB7IEZsaXBCaXRNdXRhdGlvbiwgTXV0YXRpb25CYXNlLCBQYXJ0aWFsU2h1ZmZsZU11dGF0aW9uLCBSZXZlcnNlU2VxdWVuY2VNdXRhdGlvbiwgVW5pZm9ybU11dGF0aW9uIH07XG5leHBvcnQgeyBHZW5lcmF0aW9uLCBQb3B1bGF0aW9uIH07XG5leHBvcnQgeyBBbmRUZXJtaW5hdGlvbiwgRml0bmVzc1N0YWduYXRpb25UZXJtaW5hdGlvbiwgRml0bmVzc1RocmVzaG9sZFRlcm1pbmF0aW9uLCBHZW5lcmF0aW9uTnVtYmVyVGVybWluYXRpb24gfTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdGlmKF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0pIHtcblx0XHRyZXR1cm4gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvLyBtb2R1bGUgZXhwb3J0cyBtdXN0IGJlIHJldHVybmVkIGZyb20gcnVudGltZSBzbyBlbnRyeSBpbmxpbmluZyBpcyBkaXNhYmxlZFxuLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG5yZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL2luZGV4LnRzXCIpO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==