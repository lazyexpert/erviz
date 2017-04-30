const ModelBase = require('./base-model');
const Schema = require('mongoose').Schema;

const modelFactory = connection => {
  const schema = new Schema({
    hash: String,
    presetIds : [],
    data: []
  });
  return connection.model('DataSource', schema);
};

module.exports = class DataSourceModel extends ModelBase {
  constructor(connectionString) {
    super(connectionString, modelFactory);
  }
};