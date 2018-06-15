const express = require('express');
const compression = require('compression');
const page = require('./page');

const app = express();

app.use(compression());

app.use('/static', express.static('public'));

app.use(async (req, res) => {
  res.end(page());
});

app.listen(process.env.PORT || 8080, () => {
  console.log(`Listening on port ${(process.env.PORT || 8080)}`);
});
