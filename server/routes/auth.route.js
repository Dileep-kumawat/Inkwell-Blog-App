const express = require("express");
const { registerController, loginController, logoutController, getMeController } = require("../controllers/auth.controller");
const { registerValidator, loginValidator } = require("../validators/auth.validator");
const validate = require("../middlewares/validate.middleware");
const { isAuthenticated } = require("../middlewares/auth.middleware");

const authRouter = express.Router();

/**
 * @route POST /api/auth/register
 * @description Registers a new user by accepting username, email, and password.
 * @body {username, email, password}
 * @access Public
 */
authRouter.post("/register", registerValidator, validate, registerController);

/**
 * @route POST /api/auth/login
 * @description Authenticates a user using email and password. 
 * @body {email, password}
 * @access Public
 */
authRouter.post("/login", loginValidator, validate, loginController);

/**
 * @route GET /api/auth/logout
 * @description Logs out the currently authenticated user by clearing token/session/cookie.
 * @access Private
 */
authRouter.get("/logout", isAuthenticated, logoutController);

/**
 * @route GET /api/auth/get-me
 * @description Retrieves the profile/details of the currently logged-in user 
 *              based on the authentication token/session.
 * @access Private
 */
authRouter.get("/get-me", isAuthenticated, getMeController);

module.exports = authRouter;