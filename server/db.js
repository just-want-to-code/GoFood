const mongoose = require('mongoose');
//const response = require('./foodData2.json');
//const response2 = require('./foodCategory.json');
const { Schema } = mongoose;

const connectMongo = async (mongoURL) => {
  await mongoose
    .connect(mongoURL)
    .then(async () => {
      console.log('Database is connected');
    })
    .catch((error) => console.log('Database Connection error!'));
};

module.exports = connectMongo;
