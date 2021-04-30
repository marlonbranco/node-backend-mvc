require('dotenv/config');
require('express-async-errors');

const express = require('express');
const { errors } = require('celebrate');
const cors = require('cors');

const { mongoConnection } = require('./database/mongooseConnection');
const { routes } = require('./routes/index');
const errorHandling = require('./middlewares/errorHandling');

const app = express();
const port = process.env.PORT || 3333;

app.use(cors());
app.use(express.json());
app.use(routes)
app.use(errors());
app.use(errorHandling);

mongoConnection.then(async () => {
  app.listen(port, () => console.log(`Backend started on port ${port}!`));
});
