import mongoose from "mongoose";

const ProductSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  imageUri: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  ar_uri: {
    type: String,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  countInStock: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
  },
  quantity: {
    type: String,
  },
});

const Product = mongoose.model("Product", ProductSchema);
export default Product;
