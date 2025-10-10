var express = require('express');
var router = express.Router();
const controller = require('../controller/film-controller');
// const {validateFilm} = require('../middlewares/film-validate');
const {validate} = require('../validators/validate')
const {filmSchema, filmQuerySchema} = require('../validators/film-validator')

router.get('/', validate(filmQuerySchema, 'query'), controller.list);
router.get('/:id', controller.get) ;
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);
router.post('/',validate(filmSchema, 'body'), controller.create);
// router.post('/', validateFilm, controller.create);

module.exports = router;