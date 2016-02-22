'use strict';

const p = require('./perceptron');
const t = require('./trainer');

let training = [];
let trainingLength = 2000;

let minPoint = 500;
let maxPoint = 500;
let ptron;

initialize();
function initialize() {
  ptron = new p.Perceptron(3);

  for (let i = 0; i < trainingLength; i++) {
    let x = randomIntFromInterval(minPoint, maxPoint);
    let y = randomIntFromInterval(minPoint, maxPoint);

    let answer = 1;
    if (y < f(x)) answer = -1;

    training[i] = new t.Trainer(x, y, answer);
  }
}

function f(x) {
  return 2*x+1;
}

function randomIntFromInterval(min,max) {
    return Math.floor(Math.random()*(max-min+1)+min);
}
