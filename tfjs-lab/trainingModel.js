import * as tf from '@tensorflow/tfjs';
import * as tfvis from '@tensorflow/tfjs-vis';

function trainModel(model, inputs, labels) {
  //prepare the model for training:
  model.compile({
    //optmizer: Algorithm to govern the updates to the model. There are a few availables on TensorFlow
    optimizer: tf.train.adam(),
    // function that will tell the model how well it is doing on learning each of the batches
    loss: tf.losses.meanSquaredError,
    metrics: ['mse']
  });
  // batch size refres to the size of the data subsets that the model will see on each interation. Common sizes: 32-512. There isnt a ideal batch size
  const batchSize = 28;
  // Number of times the model is gong to look at the entire dataset that you provide it.
  const epochs = 50;

  // model.fit is the fucntion to start the training loop.
  return model.fit(inputs, labels, {
    batchSize,
    epochs,
    suffle: true,
    //calbacks: To monitor the training progress
    callbacks: tfvis.show.fitCallbacks({
      name: 'Training Performance'
    },
    ['loss', 'mse'],
    {height:200, callbacks: ['onEpochEnd']}
    )
  })
}

export default trainModel
