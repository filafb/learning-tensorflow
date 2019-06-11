import * as tf from '@tensorflow/tfjs'

// Model architecture:
function createModel() {

  //create a sequential model
  //This model is sequential because its inputs flow straight down to its output. Other kind of models can have branches, or even multiple inputs and outputs
  const model = tf.sequential();

  //add a single hidden layer
  // a dense layer is a type of layer that multiplies its inputs by a matrix (called weights) and then adds a number (called bias) to the result.
  //As this is the first layer of the network, we need to define our input shape. The input shape is [1] because we have one number as our input (the horsepower of a given car)
  // units sets how big the weight matrix will be in the layer
  model.add(tf.layers.dense({
    name: 'First_hidden_Layer',
    inputShape: [1],
    units: 1,
    // bias: if not set, default is true
    useBias: true
  }));
  model.add(tf.layers.dense({
    name: 'second_hidden_Layer',
    units: 16,
    activation: 'relu',
    // bias: if not set, default is true
    useBias: true
  }));

  model.add(tf.layers.dense({
    name: 'third_hidden_Layer',
    units: 16,
    activation: 'relu',
    // bias: if not set, default is true
    useBias: true
  }));

  //add an output layer
  //We set unit 1 because we want to output one number
  model.add(tf.layers.dense({
    name: 'Output_layer',
    units: 1,
    useBias: true
  }));

  return model
}

export default createModel
