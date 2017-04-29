const ModelBase = require('./base-model');

const modelFactory = connection => {
  return connection.model('DataSource', {
    
  });
};

module.exports = class DataSourceModel extends ModelBase {
  constructor(connectionString) {
    super(connectionString, modelFactory);
  }
};