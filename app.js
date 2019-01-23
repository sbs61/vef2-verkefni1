const express = require('express');

const app = express();
const hostname = '127.0.0.1';
const port = 3001;
const path = require('path');
const lectures = require('./lectures');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use('/img', express.static(path.join(__dirname, 'public/img')));

app.use('/', lectures);

function notFoundHandler(req, res, next) {
  res.status(404).send('404 Not Found');
}

function errorHandler(err, req, res, next) {
  console.error(err);
  res.status(500).send('Villa!');
}

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(port, hostname, () => {
  console.info(`Server @ http://${hostname}:${port}/`);
});
