const blogModel = require("../models/blog.model");

async function createBlogController(req, res) {
    try {
        const { title, content } = req.body;
        const userId = req.user.id;

        const blog = await blogModel.create({
            title,
            content,
            author: userId
        });

        return res.status(201).json({
            "msg": "blog created successfully",
            success: true,
            blog
        });
    } catch (error) {
        return res.status(500).json({
            "msg": "Internal server error",
            success: false
        });
    }
}

async function getBlogsController(req, res) {
    try {
        const blogs = await blogModel.find().populate();

        return res.status(201).json({
            "msg": "blogs fetched successfully",
            success: true,
            blogs
        });
    } catch (error) {
        return res.status(500).json({
            "msg": "Internal server error",
            success: false
        });
    }
}

async function updateBlogController(req, res) {
    try {
        const { title, content } = req.body;

        const blog = await blogModel.findOneAndUpdate({
            _id: req.params.id,
            author: req.user.id
        }, {
            title,
            content
        }, {
            returnDocument: "after",
            runValidators: true
        });

        if (!blog) {
            return res.status(404).json({
                "msg": "Blog not found",
                success: false
            });
        }

        return res.status(201).json({
            "msg": "blog updated successfully",
            success: true,
            blog
        });
    } catch (error) {
        return res.status(500).json({
            "msg": "Internal server error",
            success: false
        });
    }
}

async function deleteBlogController(req, res) {
    try {
        const blog = await blogModel.findOneAndDelete({
            _id: req.params.id,
            author: req.user.id
        });

        if (!blog) {
            return res.status(404).json({
                "msg": "Blog not found",
                success: false
            });
        }

        return res.status(201).json({
            "msg": "blog deleted successfully",
            success: true,
            blog
        });
    } catch (error) {
        return res.status(500).json({
            "msg": "Internal server error",
            success: false
        });
    }
}

async function getMyBlogsController(req, res) {
    try {
        const blogs = await blogModel.find({
            author: req.user.id
        }).populate();

        return res.status(201).json({
            "msg": "blogs fetched successfully",
            success: true,
            blogs
        });
    } catch (error) {
        return res.status(500).json({
            "msg": "Internal server error",
            success: false
        });
    }
}

module.exports = {
    createBlogController,
    getBlogsController,
    updateBlogController,
    deleteBlogController,
    getMyBlogsController
}