import * as tf from '@tensorflow/tfjs';
import * as tfvis from '@tensorflow/tfjs-vis';

function testModel(model, inputData, normalizationData) {
  const { inputMax, inputMin, labelMin, labelMax } = normalizationData;

  /**
   * Generate predictions for a uniform range of number bteween 0 and 1;
   * We un-normalize the data by doing the inverse of the min-max scaling that we did earlier
   */

  const [ xs, preds ] = tf.tidy(() => {
    // We generate 100 new examples to feed the model. Model.predict is how we feed those examples into the model. They need to have a similiar shape ([num_examples, num_features_per_example])
    const xs = tf.linspace(0,1,100);
    const preds = model.predict(xs.reshape([100,1]));

    // To get the data back to our original range (rater than 0-1) we use the values we calculated while normalizaing, but just invert the operations
    const unNormXs = xs
    .mul(inputMax.sub(inputMin))
    .add(inputMin);

    const unNormPreds = preds
    .mul(labelMax.sub(labelMin))
    .add(labelMin);

    //Un-normalize the data
    return [unNormXs.dataSync(), unNormPreds.dataSync()]
  });

  const predictedPoints = Array.from(xs).map((val, i) => {
    return { x: val, y: preds[i]}
  });

  const originalPoints = inputData.map(d => ({
    x: d.horsepower, y: d.mpg
  }));
  tfvis.render.scatterplot(
    {name: 'Model Predictions vs Original Data'},
    {values: [originalPoints, predictedPoints], series: ['original', 'predicted']},
    {
      xLabel: 'Horsepower',
      yLabel: 'MPG',
      height: 300
    }
  );
}

export default testModel
