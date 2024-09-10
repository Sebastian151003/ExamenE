const Product = require('../models/productos');

exports.createProduct = async (req, res) => {
  const newProduct = new Product(req.body);
  try {
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getProductByKey = async (req, res) => {
  const { key, value } = req.params;
  try {
    const product = await Product.findOne({ [key]: value });
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ message: 'Producto no encontrado' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateProduct = async (req, res) => {
  const { key, value } = req.params;
  try {
    const updatedProduct = await Product.findOneAndUpdate(
      { [key]: value },
      req.body,
      { new: true }
    );
    if (updatedProduct) {
      res.status(200).json(updatedProduct);
    } else {
      res.status(404).json({ message: 'Producto no encontrado' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteProduct = async (req, res) => {
  const { key, value } = req.params;
  try {
    const deletedProduct = await Product.findOneAndDelete({ [key]: value });
    if (deletedProduct) {
      res.status(200).json({ message: 'Producto eliminado' });
    } else {
      res.status(404).json({ message: 'Producto no encontrado' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
