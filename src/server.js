require('dotenv/config');
require('express-async-errors');

const app = require('./app');
const { mongoConnection } = require('./database/mongooseConnection');

const port = process.env.PORT || 3333;

mongoConnection.then(() => {
  app.listen(port, () => console.log(`Backend started on port ${port}!`));
});
