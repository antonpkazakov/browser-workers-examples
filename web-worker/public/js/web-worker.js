importScripts('calculate-pi.js');

onmessage = function (event) {
    const workerResult = calculatePi(event.data);
    postMessage(workerResult);
}
