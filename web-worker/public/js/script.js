const decimalsInput = document.getElementById('decimals');
const calculateButton = document.getElementById('submitButton');
const resultNode = document.getElementById('result');

/* **********************
 * THE CALCULATION PART
 * ********************** */

calculateButton.addEventListener('click', function (event) {
    const numberOfDecimals = parseInt(decimalsInput.value, 10);
    resultNode.innerHTML = calculatePi(numberOfDecimals);
});

/* **********************
 * THE INTERACTIVE PART
 * ********************** */

const paintMe = document.getElementById('paintMe');
const paintRedButton = document.getElementById('redButton');
const paintGreenButton = document.getElementById('greenButton');

paintRedButton.addEventListener('click', function (event) {
    paintMe.style.backgroundColor = '#ff0000';
});
paintGreenButton.addEventListener('click', function (event) {
    paintMe.style.backgroundColor = '#00ff00';
});
