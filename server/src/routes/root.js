const { Router } = require('express');
const router = Router();
const rootController = require('../controllers/rootController');

router.route('^/$|/index(.html)?')
    .get(rootController.hello)
    .post()
    .put()
    .delete();

module.exports = router;