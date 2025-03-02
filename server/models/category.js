import mongoose from "mongoose";

const CategorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    image_uri: {
      type: String,
      required: false,
    },
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Category = mongoose.model("Category", CategorySchema);
export default Category;
