const formidable = require('formidable');
const fs = require('fs');

const {storeToDbFct} = require('../db/storeToDb');

const fileToUploadForm = (req,res) => {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<form action="train" method="post" enctype="multipart/form-data">');
    res.write('<input type="file" name="filetoupload"><br>');
    res.write('<input type="submit">');
    res.write('</form>');
    return res.end();
};

const storeAndTrainForm = (req, res) => {
    const form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        const oldpath = files.filetoupload.path;
        const newpath = 'C:/Users/cecil/Desktop/JS/Projet/storage/' + 'storage.csv';

        fs.copyFile(oldpath, newpath, function (err) {
            if (err) throw err;
            res.write('<form action="store" method="post" enctype="multipart/form-data">');
            res.write('File uploaded and moved!');
            res.write('<input type="submit" value="store">');
            res.write('</form>');
            res.end();
        });
    });
};


const isStored = (req, res) => {
        storeToDbFct();
        res.write('The file has been stored successfully ! ');
        res.end();
};

module.exports = {fileToUploadForm, storeAndTrainForm,isStored};