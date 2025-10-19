// In a file like customer.routes.js
const express = require('express');
const router = express.Router();
const customerController = require('../controller/customer-controller');

router.post('/', customerController.create);
router.get('/', customerController.getAll);
router.get('/:id', customerController.getById);
router.put('/:id', customerController.updateById);
router.delete('/:id', customerController.deleteById);

module.exports = router;