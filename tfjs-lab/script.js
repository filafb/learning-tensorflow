import Axios from "axios";
import * as tfvis from '@tensorflow/tfjs-vis';
import createModel from './mlModel';
import convertToTensor from './dataToTensors';
import trainModel from './trainingModel';
import testModel from './makePredicitons'

console.log('hello')

async function getData() {
  const { data: cars } = await Axios.get('https://storage.googleapis.com/tfjs-tutorials/carsData.json');
  const cleaned = cars.map(({Miles_per_Gallon: mpg, Horsepower: horsepower }) => ({
    mpg,
    horsepower,
  }))
  .filter(car => (car.mpg !== null && car.horsepower !== null ));
  return cleaned
}

async function run () {
  const data = await getData();
  const values = data.map(d => ({
    x: d.horsepower,
    y: d.mpg
  }));
  tfvis.render.scatterplot(
    {name: "Horsepower v MPG"},
    {values},
    {
      xLabel: 'Horsepower',
      yLabel: 'MPG',
      height: 300
    }
  );
  //create an instance of the model and show a summary of the layers on the webpage
  const model = createModel();
  tfvis.show.modelSummary({name: "Model Sumary"}, model);

  const tensorData = convertToTensor(data);
  const {inputs, labels} = tensorData;
  await trainModel(model, inputs, labels);
  console.log('Done training');
  testModel(model, data, tensorData)
}

document.addEventListener('DOMContentLoaded', run)




