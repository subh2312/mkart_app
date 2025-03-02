import AdminJS from "adminjs";
import * as AdminJSMongoose from "@adminjs/mongoose";
import AdminJsExpress from "@adminjs/express";
import session from "express-session";
import ConnectMongoDBSession from "connect-mongodb-session";
import Product from "../models/product.js";
import Category from "../models/category.js";
import Order from "../models/order.js";
import User from "../models/user.js";
import Transaction from "../models/transaction.js";
import { dark, light, noSidebar } from "@adminjs/themes";

AdminJS.registerAdapter(AdminJSMongoose);

const DEFAULT_ADMIN = {
  email: "admin@mkart.com",
  password: "root123",
};

const auth = async (email, password) => {
  if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
    return Promise.resolve(DEFAULT_ADMIN);
  }
  return null;
};

export const buildAdminJS = async (app) => {
  const admin = new AdminJS({
    resources: [
      {
        resource: Product,
      },
      {
        resource: Category,
      },
      {
        resource: Order,
      },
      {
        resource: User,
      },
      {
        resource: Transaction,
      },
    ],
    rootPath: "/admin",
    branding: {
      companyName: "M-Kart",
      withMadeWithLove: false,
    },
    defaultTheme: dark.id,
    availableThemes: [dark, light, noSidebar],
  });

  const MongoDBStore = ConnectMongoDBSession(session);
  const sessionStore = new MongoDBStore({
    uri: process.env.MONGO_URI,
    collection: "sessions",
  });
  const router = AdminJsExpress.buildAuthenticatedRouter(
    admin,
    {
      authenticate: auth,
      cookieName: "adminjs",
      cookiePassword: process.env.COOKIE_PASSWORD,
    },
    null,
    {
      resave: true,
      saveUninitialized: true,
      store: sessionStore,
      secret: process.env.COOKIE_PASSWORD,
      cookie: {
        httpOnly: process.env.NODE_ENV === "production",
        secure: process.env.NODE_ENV === "production",
      },
      name: "adminjs",
    }
  );
  app.use(admin.options.rootPath, router);
};
