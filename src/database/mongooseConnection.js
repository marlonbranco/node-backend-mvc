const mongoose = require('mongoose');
const { ErrorsApp } = require('../errors/AppErrors');

const databaseUrl = process.env.MONGO_URL;

if (!databaseUrl) {
  throw new ErrorsApp('MongoDB URL is not defined on the environment variables.');
}
const mongoConnection = mongoose.connect(databaseUrl, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const checkConnection = mongoose.connection;

checkConnection.on('error', (error) => console.error(error));
checkConnection.once('open', () => console.log('Connected to mongoDB'));

module.exports = { mongoConnection };
