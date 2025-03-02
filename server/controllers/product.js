import Category from "../models/category.js";
import Product from "../models/product.js";

const addProduct = async (req, res) => {
  const { name, price, category, image_uri, count_in_stock, description } =
    req.body;

  const categoryExists = await Category.find({ name: category });
  if (!categoryExists) {
    return res.status(400).json({
      status: "error",
      message: "Category does not exist",
    });
  }
  const product = new Product({
    name,
    price,
    category: categoryExists._id,
    image_uri,
    count_in_stock,
    description,
  });

  const newProduct = await product.save();
  await Category.findByIdAndUpdate(
    categoryExists._id,
    { $push: { products: newProduct._id } }, // Add the product ID to the products array
    { new: true } // Return the updated document
  );
};

const getAllProductsByCategory = async (req, res) => {
  const { category } = req.query;
  const products = await Product.find({
    category,
  });

  return res.status(200).json({
    status: "success",
    message: "Products retrieved successfully",
    data: products,
  });
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);

  return res.status(200).json({
    status: "success",
    message: "Product retrieved successfully",
    data: product,
  });
};

const addAllProducts = async (req, res) => {
  const { products } = req.body;

  const savedProducts = [];
  for (const productData of products) {
    const { name, price, category, image_uri, count_in_stock, description } =
      productData;

    const categoryExists = await Category.findOne({ name: category });
    if (!categoryExists) {
      return res.status(400).json({
        status: "error",
        message: `Category ${category} does not exist`,
      });
    }

    const product = new Product({
      name,
      price,
      category: categoryExists._id,
      image_uri,
      count_in_stock,
      description,
    });

    const newProduct = await product.save();
    savedProducts.push(newProduct);

    await Category.findByIdAndUpdate(
      categoryExists._id,
      { $push: { products: newProduct._id } }, // Add the product ID to the products array
      { new: true } // Return the updated document
    );
  }

  return res.status(201).json({
    status: "success",
    message: "Products created successfully",
    data: savedProducts,
  });
};
export { addProduct, getAllProductsByCategory, getProductById, addAllProducts };
