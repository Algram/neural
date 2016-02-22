'use strict';

class Perceptron {
	constructor(numberOfInputs) {
		this.weights = [];

		for(let i = 0; i < numberOfInputs; i++) {
      this.weights = this.randomIntFromInterval(-1, 1);
    }

    console.log(this.weights);
	}

  randomIntFromInterval(min,max) {
    return Math.floor(Math.random()*(max-min+1)+min);
  }
}

module.exports = Perceptron;
