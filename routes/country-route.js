var express = require('express');
var router = express.Router();
const controller = require('../controller/country-controller');

const asyncWrapper = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};
router.get('/', asyncWrapper(controller.list));
router.get('/:id', asyncWrapper(controller.get));
router.put('/:id', asyncWrapper(controller.update));

module.exports = router;