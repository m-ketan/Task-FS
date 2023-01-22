const mongoose = require('mongoose');
const fs = require('fs');

async function connectDB() {
  let db = null;
  try {
    db = await mongoose.connect("mongo://localhost:27017/sensordata");
    console.log("Connect to DB");
  } catch (err) {
    console.log(JSON.stringify(err));
  }
  return db;
}

exports.dump = async (req, res, next) => {
  await connectDB();

  const fileDataStream = fs.createReadStream(`${process.cwd()}/FilteredDataHuman`, 'utf8');

  fileDataStream.on('data', fileData => {
    
  })
}