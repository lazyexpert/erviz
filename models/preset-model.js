const ModelBase = require('./base-model');

const modelFactory = connection => {
  return connection.model('Preset', {
    
  });
};

module.exports = class PresetModel extends ModelBase {
  constructor(connectionString) {
    super(connectionString, modelFactory);
  }
};