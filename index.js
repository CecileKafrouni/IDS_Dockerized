const {testAuthor} = require('./db/schemaFileDb');

const {fileToUploadForm, storeLocally, storeAndTrainModel} = require('./view/interface');

const express = require('express');
const app = express();

app.get('/', fileToUploadForm);

app.post('/train',storeLocally);

app.post('/store', storeAndTrainModel);

//app.get('/ajoutauthor', testAuthor);

app.listen(3000);
