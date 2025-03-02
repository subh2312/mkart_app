import User from "../models/user.js";
import jwt from "jsonwebtoken";
const authorize = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
  const { id, role } = jwt.decode(token);
  if (!id) {
    return res.status(403).json({
      message: "Forbidden",
    });
  }

  const user = User.findById(id);
  if (!user) {
    return res.status(403).json({
      message: "Forbidden",
    });
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({
        message: "Forbidden",
      });
    }
    req.user = user;
    next();
  });
};

const admin = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  const { id, role } = jwt.decode(token);
  if (!id) {
    return res.status(403).json({
      message: "Forbidden",
    });
  }
  if (role !== "admin") {
    return res.status(403).json({
      message: "Forbidden",
    });
  }

  const user = User.findById(id);
  if (!user) {
    return res.status(403).json({
      message: "Forbidden",
    });
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({
        message: "Forbidden",
      });
    }
    req.user = user;
    next();
  });
};
export { authorize, admin };
