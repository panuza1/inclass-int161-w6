var express = require('express');
var router = express.Router();
const controller = require('../controller/film-controller');
const {validateFilm} = require('../middlewares/film-validate');

router.get('/', controller.list);
router.get('/:id', controller.get) ;
router.put('/:id', controller.update);
router.post('/', validateFilm, controller.create);

module.exports = router;