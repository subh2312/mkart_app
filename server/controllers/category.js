import Category from "../models/category.js";

const createCategory = async (req, res) => {
  const { name, image_uri } = req.body;
  const category = new Category({
    name,
    image_uri,
  });

  return res.status(201).json({
    status: "success",
    message: "Category created successfully",
    data: category,
  });
};

const getCategories = async (req, res) => {
  const categories = await Category.find().populate("products", "name");
  return res.status(200).json({
    status: "success",
    message: "Categories retrieved successfully",
    data: categories,
  });
};

const createAllCategories = async (req, res) => {
  const { categories } = req.body;

  await Category.insertMany(categories);
  return res.status(201).json({
    status: "success",
    message: "Categories created successfully",
    data: categories,
  });
};

export { createCategory, getCategories, createAllCategories };
