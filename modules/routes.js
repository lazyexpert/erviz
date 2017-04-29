module.exports = class Routes {
  init(app, parserManager) {
    app.get('/api/preset/:id', (req, res, next) => {
      // TODO: get data from DB by preset id
      const data = { lalala: 1 };
      res.send(data);
    });

    app.post('/api/source-data/', (req, res, next) => {
      parserManager.process(req.body, res, next);      
    })
  }
};
