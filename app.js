const express = require('express');
const path = require('path');
const lectures = require('./lectures');

const app = express();
const hostname = '127.0.0.1';
const port = 3000;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', lectures);

function notFoundHandler(req, res, next) { // eslint-disable-line
  res.status(404).send('404 Not Found');
}

function errorHandler(err, req, res, next) { // eslint-disable-line
  console.error(err);
  const message = 'Villa kom upp!';
  res.status(500).render('error', {
    message,
  });
}

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(port, hostname, () => {
  console.info(`Server @ http://${hostname}:${port}/`);
});
