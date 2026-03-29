const express = require("express");
const cookieParser = require("cookie-parser");
const authRouter = require("../routes/auth.route");
const morgan = require("morgan");
const blogRouter = require("../routes/blog.route");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

/**
 * @route /api/auth
 * @description Authentication routes
 */
app.use("/api/auth", authRouter);

/**
 * @route /api/blogs
 * @description Blog routes
 */
app.use("/api/blogs", blogRouter);

module.exports = app;