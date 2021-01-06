const mongodb = require("mongodb").MongoClient;
const fs = require("fs");
const csv = require("fast-csv");

const storeToDbFct = () => {
    console.log('debut fct');
    let url = 'mongodb://localhost:27017/fileDb';

    let stream = fs.createReadStream("C:\\Users\\cecil\\Desktop\\JS\\Projet\\Docker_Train\\storage\\storage.csv");

    let csvData = [];

    let csvStream = csv
        .parse()
        .on("data", function(data) {
            csvData.push({
                index: data[0],
                Dst_Port: data[1],
                Tot_Bwd_Pkts: data[2],
                Fwd_IAT_Std: data[3],
                Fwd_PSH_Flags: data[4],
                Fwd_Header_Len: data[5],
                Fwd_Pkts_s: data[6],
                Bwd_Pkts_s: data[7],
                Pkt_Len_Max: data[8],
                SYN_Flag_Cnt: data[9],
                Subflow_Fwd_Pkts: data[10],
                Subflow_Bwd_Pkts: data[11],
                Init_Fwd_Win_Byts: data[12],
                Init_Bwd_Win_Byts: data[13],
                Fwd_Seg_Size_Min: data[14],
                Intrusion: data[15]
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
                        .db("fileDb")
                        .collection("File")
                        .insertMany(csvData, (err, res) => {
                            if (err) throw err;

                            console.log(`Inserted: ${res.insertedCount} rows`);
                            client.close();
                        });
                }
            );
        });
    stream.pipe(csvStream);
}

module.exports = {storeToDbFct};
