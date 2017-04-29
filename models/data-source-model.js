const ModelBase = require('./base-model');

const modelFactory = connection => {
  return connection.model('Event', {
    
  });
};

module.exports = class EventModel extends ModelBase {
  constructor(connectionString) {
    super(connectionString, modelFactory);
  }
};