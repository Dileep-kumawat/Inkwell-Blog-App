const express = require("express");
const { isAuthenticated } = require("../middlewares/auth.middleware");
const { blogValidator, updateValidator } = require("../validators/blog.validator");
const { createBlogController, getBlogsController, updateBlogController, deleteBlogController, getMyBlogsController } = require("../controllers/blog.controller");
const validate = require("../middlewares/validate.middleware");

const blogRouter = express.Router();

/**
 * @route POST /api/blogs/create
 * @description Creates a new blog post for the authenticated user after validating input.
 *              Typically stores title and content, and associates the blog with the logged-in user.
 * @body {title, content}
 * @access Private
 */
blogRouter.post('/create', blogValidator, validate, isAuthenticated, createBlogController);

/**
 * @route GET /api/blogs/
 * @description Retrieves all blog posts accessible to the authenticated user.
 * @access Private
 */
blogRouter.get('/', isAuthenticated, getBlogsController);

/**
 * @route PATCH /api/blogs/:id
 * @description Updates an existing blog post by ID after validating input.
 *              Usually checks ownership before allowing update.
 * @access Private
 */
blogRouter.patch('/:id', updateValidator, validate, isAuthenticated, updateBlogController);

/**
 * @route DELETE /api/blogs/:id
 * @description Deletes a blog post by ID.
 *              Typically ensures only the owner can delete their blog.
 * @access Private
 */
blogRouter.delete('/:id', isAuthenticated, deleteBlogController);

/**
 * @route GET /api/blogs/mine
 * @description Retrieves all blog posts created by the currently authenticated user.
 *              Filters blogs based on the logged-in user's identity instead of returning all blogs.
 * @access Private
 */
blogRouter.get('/mine', isAuthenticated, getMyBlogsController);

module.exports = blogRouter;