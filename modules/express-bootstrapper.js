const path = require('path');
const express = require('express');
const helmet = require('helmet');

module.exports = class ExpressBootstrapper {
  constructor(port, middlewares, routes) {
    this._app = express();
    this._middlewares = middlewares;
    this._routes = routes;
    this._port = port;
  }

  start(onload) {
    this._app.use(helmet.hidePoweredBy());
    this._app.use(helmet.xssFilter());

    this._app.use(express.static('public'));

    this._initMiddlewares();
    this._routes.init(this._app);
    this._app.listen(this._port, onload);
  }

  _initMiddlewares() {
    this._middlewares.forEach(middleware => this._app.use(middleware));
  }
};
