const express = require('express');
const cors = require('cors');
const { errors } = require('celebrate');

const errorHandling = require('./middlewares/errorHandling');
const { routes } = require('./routes/index');

class AppController {
  constructor() {
    this.express = express();

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.express.use(cors());
    this.express.use(express.json());
    this.express.use(errors());
    this.express.use(errorHandling);
  }

  routes() {
    this.express.use(routes);
  }
}

module.exports = new AppController().express;
