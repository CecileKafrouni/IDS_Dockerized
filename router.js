const R = require('ramda');
const {testAuthor} = require('./author');
const {test} = require('./upload');

const router = new (require('koa-router'))();


router.get('/ajoutauthor', testAuthor);
router.get('/upload', test);

module.exports = {router};


