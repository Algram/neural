'use strict';

class Perceptron {
	constructor(numberOfInputs) {
		this.weights = [];

		for(let i = 0; i < numberOfInputs; i++) {
      this.weights[i] = this.randomIntFromInterval(-1, 1);
    }
	}

  feedForward(inputs) {
    let sum = 0;

    for(let i = 0; i < this.weights.length; i++) {
      sum += inputs[i] * this.weights[i];
    }

    return this.activate(sum);
  }

  activate(sum) {
    if (sum > 0) return 1;
    else return -1;
  }

  randomIntFromInterval(min,max) {
    return Math.floor(Math.random()*(max-min+1)+min);
  }
}

exports.Perceptron = Perceptron;
