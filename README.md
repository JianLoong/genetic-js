![Logo](./logo/cover.png)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=square)](https://opensource.org/licenses/MIT)
[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=square)](https://github.com/JianLoong/genetic-js/issues)
![Maintenance](https://img.shields.io/maintenance/yes/2020)
![ts](https://badgen.net/badge/Built%20With/TypeScript/blue)
![GitHub repo size](https://img.shields.io/github/repo-size/JianLoong/genetic-js)
![GitHub issues](https://img.shields.io/github/issues/JianLoong/genetic-js)

Genetic JS is a port of GeneticSharp done in TypeScript.

Genetic JS attempts to be a fast, extensible, multi-platform and multi-threading JavaScript Genetic Algorithm library that simples the development of applications using Genetic Algorithm.

# Motivation

The current landscape of Genetic Algorithm libraries are vast, however this library aims to provide a simple way in which various selection and crossover criteria can be introduced.

# Design Decisions and Considerations

- Usage of namespaces are abandoned in favour of modules. Refer
  [here](https://michelenasti.com/2019/01/23/is-typescript-namespace-feature-deprecated.html)
- Usage of `extensions` are still be considered. Refer [here](https://www.c-sharpcorner.com/article/learn-about-extension-methods-in-typescript/)
- Jest is used as the testing framework.
- Promise API will be used to "multi-thread".

# Quick run

Currently it is ran via command line via the `Make` file provided which is just running npx.

You can also do a `yarn test` to run the test cases.
