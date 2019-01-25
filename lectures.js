const express = require('express');
const fs = require('fs');
const util = require('util');

const readFile = util.promisify(fs.readFile);

const router = express.Router();

// les inn json skrána
async function readJSON() {
  const skra = await readFile('./lectures.json');
  const json = JSON.parse(skra);
  return json;
}

function catchErrors(fn) {
  return (req, res, next) => fn(req, res, next).catch(next);
}

async function list(req, res) {
  // lesa inn fyrirlestra og birta þá
  const title = 'Fyrirlestrar';
  const data = await readJSON();
  const {
    lectures,
  } = data;

  // sækja list.ejs
  return res.render('list', {
    title,
    lectures,
    isLecturePage: false,
  });
}

async function lecture(req, res, next) {
  const {
    slug,
  } = req.params;
  const data = await readJSON();

  // finna viðeigandi fyrirlestur skv. slug
  const foundLecture = data.lectures.find(a => a.slug === slug);

  // ef fyrirlestur finnst ekki
  if (!foundLecture) {
    return next();
  }

  const {
    title,
  } = foundLecture;

  // sækja lecture.ejs
  return res.render('lecture', {
    title,
    lecture: foundLecture,
    content: foundLecture.content,
    isLecturePage: true,
  });
}

router.get('/', catchErrors(list));
router.get('/:slug', catchErrors(lecture));

module.exports = router;
