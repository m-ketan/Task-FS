module.exports = app => {
  const dataController = require('../controllers/data.controller');

  router.get('/', function(req, res, next) {
    res.render('index', { title: 'Welcome' });
  });

  app.post('/data', dataController.dump);
}