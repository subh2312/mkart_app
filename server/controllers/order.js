import Razorpay from "razorpay";
import Order from "../models/order.js";
import Transaction from "../models/transaction.js";
const createTransaction = async (req, res) => {
  const { amount, userId } = req.body;
  const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });

  const options = {
    amount: amount,
    currency: "INR",
    receipt: `receipt_${userId}_${Date.now()}`,
  };

  try {
    if (!amount || !userId) {
      return res
        .status(400)
        .json({ success: false, message: "Amount and userId are required" });
    }
    const response = await razorpay.orders.create(options);
    return res.status(201).json({
      success: true,
      message: "Order created",
      data: {
        orderId: response.id,
        amount: response.amount,
        currency: response.currency,
        receipt: response.receipt,
        key: process.env.RAZORPAY_KEY_ID,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error creating transaction" });
  }
};
const createOrder = async (req, res) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    userId,
    cartItems,
    deliveryDate,
    address,
  } = req.body;

  const key_secret = process.env.RAZORPAY_KEY_SECRET;
  const generated_signature = crypto
    .createHmac("sha256", key_secret)
    .update(razorpay_order_id + "|" + razorpay_payment_id)
    .digest("hex");
  if (generated_signature === razorpay_signature) {
    try {
      const transaction = await Transaction.create({
        user: userId,
        orderId: razorpay_order_id,
        paymentId: razorpay_payment_id,
        amount: cartItems.reduce((acc, item) => acc + item.price, 0),
        status: "Completed",
      });

      const order = await Order.create({
        user: userId,
        shippingAddress: {
          address: address.street,
          city: address.city,
          postalCode: address.postalCode,
          country: address.country,
        },
        deliveryDate,
        orderItems: cartItems.map((item) => ({
          quantity: item.quantity,
          product: item.productId,
        })),
        status: "Placed",
      });

      await Transaction.findByIdAndUpdate(
        transaction._id,
        { $push: { order: order._id } }, // Add the order ID to the transaction array
        { new: true } // Return the updated document
      );
      res.status(201).json({
        success: true,
        message: "Order created successfully",
        data: order,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: "Order creation failed",
      });
    }
  } else {
    return res.status(400).json({
      success: false,
      message: "Order creation failed",
    });
  }
};

const getOrdersByUserId = async (req, res) => {
  const userId = req.params;
  try {
    const orders = await Order.find({ user: userId })
      .populate("user", "name email")
      .populate("orderItems.product", "name price image_uri")
      .sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      message: "Orders retrieved successfully",
      data: orders,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to get orders",
    });
  }
};

export { createTransaction, createOrder, getOrdersByUserId };
