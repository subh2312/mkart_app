import mongoose from "mongoose";
import Category from "./models/category.js";
import Product from "./models/product.js";
import { categories, products } from "./seedData.js";
import dotenv from "dotenv";
dotenv.config();

async function seedDatabase() {
  try {
    console.log("Connecting to MongoDB...");
    console.log("MONGO_URI:", process.env.MONGO_URI); // Debugging log
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB"); // Log successful connection

    console.log("Clearing existing data...");
    await Category.deleteMany({});
    await Product.deleteMany({});
    console.log("Existing data cleared"); // Log after clearing data

    console.log("Creating categories...");
    const createdCategories = await Category.insertMany(categories);
    console.log("Categories created:", createdCategories); // Log created categories

    console.log("Mapping category names to IDs...");
    const categoryMap = {};
    createdCategories.forEach((category) => {
      categoryMap[category.name] = category._id;
    });

    console.log("Preparing products with category references...");
    const productsWithCategoryIds = products.map((product) => ({
      ...product,
      category: categoryMap[product.category],
    }));

    console.log("Creating products...");
    const createdProducts = await Product.insertMany(productsWithCategoryIds);
    console.log("Products created"); // Log after creating products

    console.log("Updating categories with product IDs...");
    for (const product of createdProducts) {
      await Category.findByIdAndUpdate(
        product.category,
        { $push: { products: product._id } },
        { new: true }
      );
    }
    console.log("Categories updated with product IDs"); // Log after updating categories

    console.log("Data seeded successfully");
  } catch (error) {
    console.error("Error seeding data:", error);
  } finally {
    console.log("Closing MongoDB connection...");
    mongoose.connection.close();
  }
}

await seedDatabase();
