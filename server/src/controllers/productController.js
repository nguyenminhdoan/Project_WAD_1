const Product = require('../models/productModel');

// Get all products
const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get single product by ID
const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Create new product
const createProduct = async (req, res) => {
    try {
        const { name, description, price, amount } = req.body;

        // Handle image upload
        const image = req.file ? `/uploads/products/${req.file.filename}` : '/uploads/products/default.jpg';

        const product = await Product.create({
            name,
            description,
            price,
            amount: amount || 0,
            image
        });

        res.status(201).json(product);
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Update product
const updateProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Update fields
        if (req.body.name) product.name = req.body.name;
        if (req.body.description) product.description = req.body.description;
        if (req.body.price) product.price = req.body.price;
        if (req.body.amount) product.amount = req.body.amount;

        // Handle image update (similar to avatar update in user controller)
        if (req.file) {
            product.image = `/uploads/products/${req.file.filename}`;
        }

        const updatedProduct = await product.save();
        res.json(updatedProduct);
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Delete product
const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        await product.deleteOne();
        res.json({ message: 'Product removed' });
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = {
    deleteProduct,
    createProduct,
    updateProduct,
    getProductById,
    getAllProducts
}