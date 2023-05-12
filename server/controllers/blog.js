import Blog from "../models/Blog.js";
import { createError } from "../error.js";

export const addBlog = async (req, res, next) => {
    try {
        const newBlog = new Blog({ userId: req.user.id, ...req.body });
        const savedBlog = await newBlog.save();
        res.status(200).json(savedBlog);
    } catch (err) {
        next(err);
    }
};

export const updateBlog = async (req, res, next) => {
    try {
        const blog = await Blog.findById(req.params.id);

        if (!blog) return next(createError(404, "blog not found!"));
        if (req.user.id === blog.userId) { //ensure updating by owner
            const updatedBlog = await blog.findByIdAndUpdate(
                req.params.id,
                {
                    $set: req.body,
                },
                { new: true }
            );
            res.status(200).json(updatedBlog);
        } else {
            return next(createError(403, "You can update only your own blog!"));
        }
    } catch (err) {
        next(err);
    }
};

export const deleteBlog = async (req, res, next) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) return next(createError(404, "blog not found!"));
        if (req.user.id === blog.userId) {
            await Blog.findByIdAndDelete(req.params.id);
            res.status(200).json("The blog has been deleted.");
        } else {
            return next(createError(403, "You can delete only your blog!"));
        }
    } catch (err) {
        next(err);
    }
};

export const getBlog = async (req, res, next) => {
    try {
        const blog = await Blog.findById(req.params.id);
        res.status(200).json(blog);
    } catch (err) {
        next(err);
    }
};

export const getBlogs = async (req, res, next) => {
    try {
        const page = parseInt(req.params.id);
        const blogs = await Blog.find()
        .limit(5)       //number of blogs to return 
        .skip((page - 1) * 5)  //stages to skip to maintain counts in 5's
        .exec();

        const count = await Blog.count(); //total number of blogs in db collection
        res.status(200).json({
            blogs,
            totalPages: Math.ceil(count / 5),
            currentPage: page
        });
    } catch (err) {
        next(err);
    }
};

export const getFeatured = async (req, res, next) => {
    try {
        const blog = await Blog.findOne({ featured: true }); //find blog with featured true
        res.status(200).json(blog);
    } catch (err) {
        next(err);
    }
};

export const setFeatured = async (req, res, next) => {
    try {
        const prevFeatured = await Blog.findOneAndUpdate({ featured: true },{featured: false}); //find blog with featured true and set to false

        const newFeatured = await Blog.findByIdAndUpdate(req.params.id, {featured: true}); //set new featured
        res.status(200).json(newFeatured);
    } catch (err) {
        next(err);
    }
};