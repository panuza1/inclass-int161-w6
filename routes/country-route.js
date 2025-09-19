var express = require('express');
var router = express.Router();
const controller = require('../controller/country-controller');

router.get('/', controller.list);
router.get('/:id', controller.get) ;

module.exports = router;