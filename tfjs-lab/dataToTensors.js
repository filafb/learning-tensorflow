import * as tf from '@tensorflow/tfjs'

// Tensors: The primary data structure in TensorFlow programs. Tensors are N-dimensional (where N could be very large) data structures, most commonly scalars, vectors, or matrices. The elements of a Tensor can hold integer, floating-point, or string values

/**
 * Convert the input data to tensors that we can use for machine
 * learning. We will also do the important best practices of _shuffling_
 * the data and _normalizing_ the data
 * MPG on the y-axis.
 */
function converToTensor(data) {
  return tf.tidy(() => {
    //step 1: shuffle data
    //Always shuffle the data. It's important to the final result
    tf.util.shuffle(data);

    //2 Convert data to Tensor
    // Converting to a 2d tensor. Tensor shape: [num_examples, num_features_per_example].
    // Here we have: inputs.length examples and each example has 1 input feature (horsepower)
    const inputs = data.map(d => d.horsepower);
    const labels = data.map(d => d.mpg);

    const inputTensor = tf.tensor2d(inputs, [inputs.length, 1]);
    const labelTensor = tf.tensor2d(labels, [labels.length, 1]);
    console.log(inputTensor)

    //3 Normalize the data to the range of 0 - 1 using min-max scaling
    //Normalize data is a best practice
    const inputMax = inputTensor.max();
    const inputMin = inputTensor.min();
    const labelMax = labelTensor.max();
    const labelMin = labelTensor.min();

    const normalizedInputs = inputTensor.sub(inputMin).div(inputMax.sub(inputMin));
    const normalizedLabels = labelTensor.sub(labelMin).div(labelMax.sub(labelMin));

    return {
      inputs: normalizedInputs,
      labels: normalizedLabels,
      // return the min/max bounds so we can use them later
      inputMax,
      inputMin,
      labelMax,
      labelMin
    }
  });
}
