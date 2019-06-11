const express = require('express');
const app = express();
const path = require('path');
console.log(path.join(__dirname))

app.use(express.static('./'))

app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'index.html'));
})

app.listen(3000, ()=> (console.log('running on 3000')))
