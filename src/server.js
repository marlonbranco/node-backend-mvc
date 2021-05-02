require('dotenv/config');
require('express-async-errors');

const { mongoConnection } = require('./database/mongooseConnection');

const app = require('./app');

const PORT = process.env.PORT || 3333;
const HOST = '0.0.0.0';

mongoConnection.then(() => {
  app.listen(PORT, HOST);
  console.log(`Backend running on http://${HOST}:${PORT}`);
});
