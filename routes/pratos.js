var express = require('express');
var router = express.Router();
const pratosController = require('../controller/pratosController.js');


router.get('/', pratosController.getPratos);
router.post('/criarPrato', pratosController.createPrato);

module.exports = router;