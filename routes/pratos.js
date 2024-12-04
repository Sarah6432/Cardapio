const express = require('express');
const router = express.Router();
const pratosController = require('../controllers/pratosController');

router.get('/', pratosController.getPratos);

router.post('/', pratosController.createPrato);

module.exports = router;
