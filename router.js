const R = require('ramda');
const {testAuthor} = require('./author');
const {test} = require('./upload');

const router = new (require('koa-router'))();

/*
router.get('/',function(req,res) {
    res.sendFile(__dirname +'index.html');
});
*/

router.get('/ajoutauthor', testAuthor);
router.get('/', test);

module.exports = {router};




