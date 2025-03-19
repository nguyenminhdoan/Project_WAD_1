const express = require('express');
const router = express.Router();
const {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
} = require('../controllers/productController');
const { protect, admin } = require('../middleware/authMiddleware');
const { uploadProduct } = require('../middleware/uploadMiddleware');

// Public routes
router.get('/', getAllProducts);
router.get('/:id', getProductById);

// Protected routes (assuming you have authentication middleware)
router.post('/create', uploadProduct.single('image'), createProduct);
router.put('/:id', uploadProduct.single('image'), updateProduct);
router.delete('/:id', deleteProduct);

module.exports = router;