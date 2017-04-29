const mongoose = require('mongoose');
const Promise = require('bluebird');

mongoose.Promise = Promise;

module.exports = class ModelBase {
  constructor(connectionString, modelFactory) {
    this._connectionString = connectionString;
    this._modelFactory = modelFactory;

    this.execute = Promise.coroutine(this.execute.bind(this));
  }

  *execute(fn) {
    if (!fn) return;

    const connection = mongoose.createConnection();
    yield connection.open(this._connectionString);
    try {
      const model = this._modelFactory(connection);
      const value = yield fn(model);
      return value;
    } finally {
      yield connection.close();
    }
  }
};