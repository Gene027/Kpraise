import express from "express";
import { addBlog, getBlog, getFeatured, setFeatured, getBlogs, deleteBlog, updateBlog } from "../controllers/blog.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

router.post("/", verifyToken, addBlog) //create a blog

router.put("/:id", verifyToken, updateBlog) //modify

router.delete("/:id", verifyToken, deleteBlog) //delete

router.get("/find/:id", getBlog) //fetch a blog

router.get("/page/:id", getBlogs) //fetch blogs

router.get("/featured", getFeatured) //fetch featured blog

router.put("/featured/:id", verifyToken, setFeatured) //set featured blog
export default router;