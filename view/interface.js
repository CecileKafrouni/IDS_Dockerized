    const formidable = require('formidable');
    const fs = require('fs');

    const {storeToDbFct} = require('../db/storeToDb');

    const fileToUploadForm = (req,res) => {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write('<p>Choose below a csv file to upload: </p><br>');
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
            const newpath = 'D:\\MAJEURE-IA-ING3-COURS\\Tech-client-serveur\\PFE-dockerized\\IDS_Dockerized_test\\project\\Docker_Train\\storage\\' + 'storage.csv';

            fs.copyFile(oldpath, newpath, function (err) {
                if (err) throw err;
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write('<form action="store" method="post" enctype="multipart/form-data">');
                res.write('<p>File uploaded and moved!</p>');
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

    module.exports = {fileToUploadForm, storeAndTrainForm, isStored};
