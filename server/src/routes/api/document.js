const { Router } = require('express');
const router = Router();
const documentController = require('../../controllers/documentController');

router.route('/')
    .post(documentController.addDocument)
    .patch(documentController.updateDocument);

module.exports = router;