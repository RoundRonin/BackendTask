const { Router } = require('express');
const router = Router();
const searchController = require('../../controllers/searchController');

router.route('/')
    .get(searchController.search);

module.exports = router;