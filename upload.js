const mongodb = require("mongodb").MongoClient;
const fs = require("fs");
const csv = require("fast-csv");

let url = 'mongodb://localhost:27017/authortest';

let stream = fs.createReadStream("C:/Users/cecil/Desktop/JS/Projet/storage/testauthor.csv");

let csvData = [];

let csvStream = csv
    .parse()
    .on("data", function(data) {
        csvData.push({
            firstName: data[0],
            lastName: data[1]
        });
    })
    .on("end", function() {
        // remove the first line: header
        csvData.shift();
        console.log(csvData);
        mongodb.connect(
            url,
            { useNewUrlParser: true, useUnifiedTopology: true },
            (err, client) => {
                if (err) throw err;

                client
                    .db("authortest")
                    .collection("authors")
                    .insertMany(csvData, (err, res) => {
                        if (err) throw err;

                        console.log(`Inserted: ${res.insertedCount} rows`);
                        client.close();
                    });
            }
        );
    });


const test = () => {
    stream.pipe(csvStream);
}

module.exports = {test};
