# Learning TensorFlow.js
Following [codelabs tutorial](https://codelabs.developers.google.com/codelabs/tfjs-training-regression/index.html#8)

To see all the graphs:
- `npm install`
- `npm start`
- [localhost:3000](http://localhost:3000/)

## Modules:
### Script.js
  - Entry point for webpack
  - Fetch data from example
  - Run function: Execute all othe functions

### mlModel.js
  - Model architecture: Which algorithm our model will use to compute its answers

### dataToTensors.js
  - Convert data to tensors

### trainingModel.js
  - The training process

### makePredictions.js
  - Use our trained model to predict data

## Takeaways:
  1. **Formulate your task**
    - Regression problem or a classification one?
    - Supervised or unsupervised learning?
    - Input shape? Output?
  2. **Prepare your data**
    - Clean it
    - Shuffle it
    - Normalize it
    - Convert it to tensors
  3. **Build and run your model**
    - Define model
    - Choose an optimizer, batch size and number of epochs
    - Choose an appropriate loos function
    - Monitor training to see whether the loss is going down
  4. **Evaluate your model**
    - Choose and evaluation metric
    - Make some test predictions
