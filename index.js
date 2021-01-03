/*
const app = new (require('koa'))();
const http = require('http');
const formidable = require('formidable');
const fs = require('fs');


const {router} = require('./router');
const serve = require('koa-static');

app.use(require('koa-logger')());
app.use(require('koa-body')());

//app.use(serve('app'));
app.use(router.routes());

app.listen(3000);
*/

const {testAuthor} = require('./author');
const {test} = require('./upload');

const http = require('http');
const formidable = require('formidable');
const fs = require('fs');

const express = require('express');
const app = express();

app.get('/',(req, res) => {
    res.send('Hello world')
});

app.get('/test', (req,res) => {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
    res.write('<input type="file" name="filetoupload"><br>');
    res.write('<input type="submit">');
    res.write('</form>');
    return res.end();
});

app.post('/fileupload',(req, res) => {
    const form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        const oldpath = files.filetoupload.path;
        //const newpath = 'C:/Users/cecil/Desktop/JS/Projet/storage/' + files.filetoupload.name;
        const newpath = 'C:/Users/cecil/Desktop/JS/Projet/storage/' + 'testauthor2.csv';
        if (fs.existsSync(newpath)) {
            fs.unlinkSync(newpath);
        }
        fs.rename(oldpath, newpath, function (err) {
            if (err) throw err;
            res.write('<form action="upload" method="post" enctype="multipart/form-data">');
            res.write('File uploaded and moved!');
            res.write('<input type="button" value="Train"><br>');
            res.write('<input type="submit">');
            res.write('</form>');
            res.end();
        });
    });
});


app.get('/ajoutauthor', testAuthor);
app.get('/upload', test);

app.listen(3000);

