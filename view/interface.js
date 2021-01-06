    const formidable = require('formidable');
    const fs = require('fs');
    const child_process = require('child_process');

    const {storeToDbFct} = require('../db/storeFileToDb');

    const fileToUploadForm = (req,res) => {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write('<p>Choose below a csv file to upload: </p><br>');
        res.write('<form action="train" method="post" enctype="multipart/form-data">');
        res.write('<input type="file" name="filetoupload"><br>');
        res.write('<input type="submit">');
        res.write('</form>');
        return res.end();
    };

    const storeLocally = (req, res) => {
        const form = new formidable.IncomingForm();
        form.parse(req, function (err, fields, files) {
            const oldpath = files.filetoupload.path;
            const newpath = 'C:\\Users\\cecil\\Desktop\\JS\\Projet\\Docker_Train\\storage\\' + 'storage.csv';

            fs.copyFile(oldpath, newpath, function (err) {
                if (err) throw err;
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write('<form action="store" method="post" enctype="multipart/form-data">');
                res.write('<p>File moved locally into our storage.csv file!</p>');
                res.write('<input type="submit" value="store">');
                res.write('</form>');
                res.end();
            });
        });
    };

    const trainModel = () => {
        child_process.spawnSync('docker', [ 'run', '-it', 'train_docker', 'Main.py' ], {
            stdio: 'inherit'
        });
    }

    const storeModelFromDockerTrainToLocal = () => {
        child_process.spawnSync('docker', [ 'cp', 'trainer_container:/storage/finalized_model_gnb.sav', 'C:\\Users\\cecil\\Desktop\\JS\\Projet\\Docker_Train\\storage'], {
            stdio: 'inherit'
        });
    }

    const storeModelToDb = () => {
    };

    const storeAndTrainModel = (req, res) => {
        storeToDbFct();
        res.write('<p>From storeToDbFct function : The file has been stored successfully into fileDb Database </p>!<br> ');
        trainModel();
        res.write('<p>From trainModel function : The file has been trained successfully ! </p><br>');
        storeModelFromDockerTrainToLocal();
        res.write('<p> --- SOON --- From storeModelFromDockerTrainToLocal function : The file has been stored locally !</p><br> ');
        //storeModelToDb();
        //res.write('<p>--- SOON --- From storeModelToDb function : The file has been stored successfully into ModelDb Database !</p><br> ');
        res.end();
    };

    module.exports = {fileToUploadForm,storeLocally,storeAndTrainModel};
