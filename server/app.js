import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import userRoutes from "./routes/user.js";
import productRoutes from "./routes/product.js";
import categoryRoutes from "./routes/category.js";
import orderRoutes from "./routes/order.js";
import connectDB from "./config/connect.js";
import { buildAdminJS } from "./config/setup.js";
dotenv.config();
const app = express();

app.use(express.json());

// Importing Routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/product", productRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/order", orderRoutes);

const start = async () => {
  try {
    const conn = await connectDB(process.env.MONGO_URI);
    if (conn) {
      console.log("Connected to database : ", conn.connection.name);
    } else {
      console.log("Error Connecting to MongoDB");
    }

    await buildAdminJS(app);
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.listen(
      { port: process.env.PORT, host: process.env.HOST },
      (err, addr) => {
        if (err) {
          console.log("Error Starting Server : ", err);
        } else {
          console.log(`🚀🚀🚀 Server is running on port ${process.env.PORT}`);
        }
      }
    );
  } catch (error) {
    console.log("Error Starting Server : ", error);
  }
};

start();
