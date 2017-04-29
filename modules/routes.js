module.exports = class Routes {
  init(app, parserManager) {
    app.get('/api/preset/:id', (req, res, next) => {
      // TODO: get data from DB by preset id
      const data = { lalala: 1 };

      parserManager.process(data, res, next);
    }); 
  }
};
