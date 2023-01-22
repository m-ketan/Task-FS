const mongoose = require('mongoose');
const SensorData = require('../models/sensor_data.model');
const fs = require('fs');
const JSONStream = require('JSONStream');
const streamToMongoDB = require('stream-to-mongo-db').streamToMongoDB;
const { Transform } = require("stream");

const dbConfig = { dbURL: 'mongodb://localhost:27017/sensordata', collection: 'positions' };

async function connectDB() {
  let db = null;
  try {
    db = await mongoose.connect(dbConfig.dbURL);
    console.log("Connect to DB");
  } catch (err) {
    console.log(err);
  }
  return db;
}

// function to dump data 
exports.dump = async (req, res, next) => {
  const writableStream = streamToMongoDB(dbConfig);
  const fileDataStream = fs.createReadStream(`${process.cwd()}/extras/FilteredDataHuman`, 'utf8');

  const streamHandler = new Transform({
    readableObjectMode: true,
    writableObjectMode: true,
    transform(chunk, encoding, callback) {
      this.push({
        timeStamp: chunk.timestamp.$date.$numberLong,
        personId: chunk._id.$oid,
        instances: chunk.instances
      });
      callback();
    },
  });

  fileDataStream
  .pipe(JSONStream.parse('*'))
  .pipe(streamHandler)
  .pipe(writableStream)

  fileDataStream.on('close', () => {
    return res.status(200)
  })
}