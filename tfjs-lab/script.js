import Axios from "axios";
import * as tvis from '@tensorflow/tfjs-vis';

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
  console.log(data.length)
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
