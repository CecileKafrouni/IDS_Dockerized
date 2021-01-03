const {testAuthor} = require('./db/schemaFileDb');

const {fileToUploadForm, storeAndTrainForm, isStored} = require('./view/interface');

const express = require('express');
const app = express();

app.get('/', fileToUploadForm);

app.post('/train',storeAndTrainForm);

app.post('/store', isStored);

//app.get('/ajoutauthor', testAuthor);


app.listen(3000);

