'use strict';
const htan = require('htan');
const htanPrime = require('htan-prime');
const sigmoid = require('sigmoid');
const sigmoidPrime = require('sigmoid-prime');
const sample = require('samples');
require('node-matrix');

function Mind(opts) {
  if (!(this instanceof Mind)) return new Mind(opts);
  opts = opts || {};


  if (opts.activator === 'sigmoid') {
    this.activate = sigmoid;
    this.activatePrime = sigmoidPrime;
  } else {
    this.activate = htan;
    this.activatePrime = htanPrime;
  }

  // hyperparameters
  this.learningRate = opts.learningRate || 0.7;
  this.iterations = opts.iterations || 10000;
  this.hiddenUnits = opts.hiddenUnits || 3;
}


Mind.prototype.forward = function(examples) {
  var activate = this.activate;
  var weights = this.weights;
  var ret = {};

  ret.hiddenSum = multiply(weights.inputHidden, examples.input);
  ret.hiddenResult = ret.hiddenSum.transform(activate);
  ret.outputSum = multiply(weights.hiddenOutput, ret.hiddenResult);
  ret.outputResult = ret.outputSum.transform(activate);

  return ret;
};

Mind.prototype.back = function(examples, results) {
  var activatePrime = this.activatePrime;
  var learningRate = this.learningRate;
  var weights = this.weights;

  // compute weight adjustments
  var errorOutputLayer = subtract(examples.output, results.outputResult);
  var deltaOutputLayer = dot(results.outputSum.transform(activatePrime), errorOutputLayer);
  var hiddenOutputChanges = scalar(multiply(deltaOutputLayer, results.hiddenResult.transpose()), learningRate);
  var deltaHiddenLayer = dot(multiply(weights.hiddenOutput.transpose(), deltaOutputLayer), results.hiddenSum.transform(activatePrime));
  var inputHiddenChanges = scalar(multiply(deltaHiddenLayer, examples.input.transpose()), learningRate);

  // adjust weights
  weights.inputHidden = add(weights.inputHidden, inputHiddenChanges);
  weights.hiddenOutput = add(weights.hiddenOutput, hiddenOutputChanges);

  return errorOutputLayer;
};

Mind.prototype.learn = function(examples) {
  examples = normalize(examples);

  this.weights = {
    inputHidden: Matrix({
      columns: this.hiddenUnits,
      rows: examples.input[0].length,
      values: sample
    }),
    hiddenOutput: Matrix({
      columns: examples.output[0].length,
      rows: this.hiddenUnits,
      values: sample
    })
  };

  for (var i = 0; i < this.iterations; i++) {
    var results = this.forward(examples);
    var errors = this.back(examples, results);
  }

  return this;
};
