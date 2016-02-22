'use strict';

class Trainer {
	constructor(x, y, answer) {
    this.inputs = [];
    this.inputs[0] = x;
    this.inputs[1] = y;
    this.inputs[2] = 1;

    this.answer = answer;
	}
}

exports.Trainer = Trainer;
