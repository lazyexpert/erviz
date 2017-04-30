const ModelBase = require('./base-model');
const Schema = require('mongoose').Schema;

const modelFactory = connection => {
  const schema = new Schema({
    "meta": {
      "title": String,
      "createdAt": {
        type: Date,
        default: Date.now
      },
      "description": String
    },
    "mySchema": {}
  });
  return connection.model('Preset', schema);
};

module.exports = class PresetModel extends ModelBase {
  constructor(connectionString) {
    super(connectionString, modelFactory);
  }
};