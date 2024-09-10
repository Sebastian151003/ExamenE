const express = require('express');
const router = express.Router();
const productController = require('../controllers/controllers');
const verifyToken = require('../middleware/auth');

router.post('/', verifyToken, productController.createProduct);
router.get('/', verifyToken, productController.getAllProducts);
router.get('/:key/:value', verifyToken, productController.getProductByKey);
router.put('/:key/:value', verifyToken, productController.updateProduct);
router.delete('/:key/:value', verifyToken, productController.deleteProduct);

module.exports = router;
