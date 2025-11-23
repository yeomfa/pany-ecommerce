const Product = require("../models/Product");

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
  try {
    const keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: "i",
          },
        }
      : {};

    const products = await Product.find({ ...keyword });
    res.json({ status: "success", data: { products } });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Server Error" });
  }
};

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      res.json({ status: "success", data: { product } });
    } else {
      res
        .status(404)
        .json({ status: "fail", data: { message: "Product not found" } });
    }
  } catch (error) {
    res.status(500).json({ status: "error", message: "Server Error" });
  }
};

// @desc    Create a product
// @route   POST /api/products
// @access  Public (for now)
const createProduct = async (req, res) => {
  try {
    const { name, price, description, image, category, countInStock } =
      req.body;

    const product = new Product({
      name,
      price,
      description,
      image,
      category,
      countInStock,
    });

    const createdProduct = await product.save();
    res
      .status(201)
      .json({ status: "success", data: { product: createdProduct } });
  } catch (error) {
    res
      .status(400)
      .json({ status: "fail", data: { message: "Invalid product data" } });
  }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Public (for now)
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      await product.deleteOne();
      res.json({ status: "success", data: null });
    } else {
      res
        .status(404)
        .json({ status: "fail", data: { message: "Product not found" } });
    }
  } catch (error) {
    res.status(500).json({ status: "error", message: "Server Error" });
  }
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Public
const updateProduct = async (req, res) => {
  try {
    const { name, price, description, image, category, countInStock } =
      req.body;

    const product = await Product.findById(req.params.id);

    if (product) {
      product.name = name || product.name;
      product.price = price || product.price;
      product.description = description || product.description;
      product.image = image || product.image;
      product.category = category || product.category;
      product.countInStock = countInStock || product.countInStock;

      const updatedProduct = await product.save();
      res.json({ status: "success", data: { product: updatedProduct } });
    } else {
      res
        .status(404)
        .json({ status: "fail", data: { message: "Product not found" } });
    }
  } catch (error) {
    res.status(500).json({ status: "error", message: "Server Error" });
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  deleteProduct,
  updateProduct,
};
