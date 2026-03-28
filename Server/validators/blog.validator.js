const { body } = require("express-validator");

const blogValidator = [
    body("title")
        .trim()
        .notEmpty().withMessage("Title is required")
        .isLength({ min: 3 }).withMessage("Username must be 3 characters"),

    body("content")
        .trim()
        .notEmpty().withMessage("content is required")
];

const updateValidator = [
    body("title")
        .trim()
        .isLength({ min: 3 }).withMessage("Username must be 3 characters")
];

module.exports = {
    blogValidator,
    updateValidator
}