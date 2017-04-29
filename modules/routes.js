module.exports = class Routes {
  init(app) {
    app.get('/', (req, res, next) => {
      res.send('Hello world');
    });
  }
};
