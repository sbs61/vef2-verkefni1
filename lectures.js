const express = require('express');
const fs = require('fs');
const util = require('util');

const readFile = util.promisify(fs.readFile);

const router = express.Router();

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
  const { lectures } = data;

  // console.log(lectures);

  // res.send("test 123");
  res.render('index', { title, lectures });
}

async function lecture(req, res, next) {
  const { slug } = req.params;
  const data = await readJSON();
  const foundLecture = data.lectures.find(a => a.slug === slug);

  if (!foundLecture) {
    return next();
  }

  const { title } = foundLecture;

  // const html = item.createContent(foundLecture.content);
  return res.render('lecture', { title, lecture: foundLecture, content: foundLecture.content });
}

router.get('/', catchErrors(list));
router.get('/:slug', catchErrors(lecture));

module.exports = router;
