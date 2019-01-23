const express = require('express');

const fs = require('fs');
const util = require('util');

const readFile = util.promisify(fs.readFile);

const router = express.Router();

async function lesaskra() {
  const skra = await readFile('./lectures.json');

  const json = JSON.parse(skra);

  return json;
}

function catchErrors(fn) {
  return (req, res, next) => fn(req, res, next).catch(next);
}

async function list(req, res) {
  /* todo útfæra */
  // lesa fyrirstrana inn (render) og birta
  const title = 'Fyrirlestrar';
  const data = await lesaskra();

  console.log(data.lectures[0].slug);

  res.send('wooow virkar');
  //res.render('data', { title, data: foundLecture });

  return Promise.all(data);
}

async function lecture(req, res, next) {
  /* todo útfæra */
}

router.get('/', catchErrors(list));
router.get('/:slug', catchErrors(lecture));

module.exports = router;
