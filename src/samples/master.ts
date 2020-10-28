const noOfWorkers = 4;

for (let index = 0; index < noOfWorkers; index++) {
  const myWorker = new Worker("worker.js");

  const generations = 100;

  myWorker.postMessage([generations]);
}
