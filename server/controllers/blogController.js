import fs from 'fs';
import imageKit from '../configs/imageKit.js';
import Blog from '../models/Blog.js';
import Comment from '../models/Comment.js';
import EmailModel from '../models/EmailModel.js';
import main from '../configs/gemini.js';


export const addBlog = async (req, res) => {
  try {
    const blogPayload = typeof req.body.blog === "string"
      ? JSON.parse(req.body.blog)
      : req.body;

    const { title, subTitle, description, category, isPublished } = blogPayload;
    const imageFile = req.file;

    if (!title || !description || !category || !imageFile) {
      return res.json({ success: false, message: "Missing required fields" });
    }

    // Upload to ImageKit
    const response = await imageKit.files.upload({
        file: req.file.buffer.toString("base64"),
        fileName: req.file.originalname,
        folder: "/blogs",
    });

    console.log("Upload result:", response);

    // Optimized image URL using query params
    const optimizedImageUrl = `${response.url}?tr=w-1280,q-auto,f-webp`;

    await Blog.create({
      title,
      subTitle,
      description,
      category,
      image: optimizedImageUrl,
      isPublished: !!isPublished,
    });

    return res.json({ success: true, message: "Blog added successfully" });


  } catch (error) {
    console.error("addBlog error:", error);
    return res.json({ success: false, message: error.message });
  }
};


export const getAllBlogs = async (req, res)=> {

    try {

        const blogs = await Blog.find({isPublished: true})

        res.json({success: true, blogs})

    } catch (error) {
        res.json({success: false, message: error.message});

    }
}

export const getBlogById = async (req, res) => {

    try {

        const { blogId } = req.params;
        const blog = await Blog.findById(blogId)

        if(!blog) {
            return res.json({success: false, message: "Blog not found"});
        }

        res.json({success: true, blog})

    } catch (error) {

        res.json({success: false, message: error.message});

    }
}




export const deleteBlogById = async (req, res) => {

    try {

        const { id } = req.body;
        await Blog.findByIdAndDelete(id);

        // Delete all comments associated with the blog
        await Comment.deleteMany({blog: id});

        res.json({success: true, message: "Blog deleted Successfully"})

    } catch (error) {

        res.json({success: false, message: error.message});

    }
}


export const togglePublish = async (req, res) =>{

  try {
    
    const { id } = req.body;
    const blog = await Blog.findById(id);
    blog.isPublished = !blog.isPublished;
    await blog.save();

    res.json({success: true, message: "Blog status Updated"})

  } catch (error) {
    
    res.json({success: false, message: error.message});
  }
}



export const addComment = async (req, res) => {

  try {

    const {blog, name, content} = req.body;
    await Comment.create({blog, name, content});

    res.json({success: true, message: "Comment added for review"})
    
  } catch (error) {
    
    res.json({success: false, message: error.message});
  }
}




export const getBlogComments = async (req, res) => {

  try {

    const { blogId } = req.body;
    const comments = await Comment.find({blog: blogId, isApproved: true}).sort({createdAt: -1});

    res.json({success: true, comments});
    
  } catch (error) {
    
    res.json({success: false, message: error.message});
  }
}



export const generateContent = async (req, res) => {
  try {

    const {prompt} = req.body;

    const content = await main(prompt + ' Generate a blog content for this topic in simple text format ')
    res.json({success: true, content});


  } catch (error) {
    
    res.json({success: false, message: error.message});

  }
}
