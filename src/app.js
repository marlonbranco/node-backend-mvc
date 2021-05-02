const express = require('express');
const cors = require('cors');
const { errors } = require('celebrate');

const errorHandling = require('./middlewares/errorHandling');
const { routes } = require('./routes/index');

class AppController {
  constructor() {
    this.express = express();

    this.app();
  }

  app() {
    this.express.use(cors());
    this.express.use(express.json());
    this.express.use(routes);
    this.express.use(errors());
    this.express.use(errorHandling);
  }
}

module.exports = new AppController().express;
