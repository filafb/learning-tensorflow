import Axios from "axios";
import * as tvis from '@tensorflow/tfjs-vis';
import createModel from './mlModel';

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
  tvis.render.scatterplot(
    {name: "Horsepower v MPG"},
    {values},
    {
      xLabel: 'Horsepower',
      yLabel: 'MPG',
      height: 300
    }
  )
}

document.addEventListener('DOMContentLoaded', run)

//create an instance of the model and show a summary of the layers on the webpage
const model = createModel();
console.log(model)
tvis.show.modelSummary({name: "Model Sumary"}, model)
