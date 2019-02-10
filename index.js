const express = require('express');
const bodyParser = require('body-parser');
const router = require('./routes/routes');
const morgan = require('morgan');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(router);

const hostName = '127.0.0.1';
const port = 3000;

app.listen(port, () => {
  console.log(`Server running at http://${hostName}:${port}`);
});
