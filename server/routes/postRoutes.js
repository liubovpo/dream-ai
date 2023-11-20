import express from "express";
import * as dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";

import Post from "../mongodb/models/post.js";

dotenv.config();

const router = express.Router();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

// GET ALL POSTS
router.route('/').get(async(req,res)=>{
    try {
        const posts = await Post.find({})

        res.status(200).json({success:true, data:posts})
    } catch (error) {
        res.status(500).json({success:false, message: error})
    }
})

// CREATE A POST
router.route('/').post(async(req,res)=>{
try {
    const {name, prompt, photo, userId} = req.body;
    const photoUrl = await cloudinary.uploader.upload(photo);

    const newPost = await Post.create({
        name,
        prompt,
        photo: photoUrl.url,
        userId,
    })

    res.status(201).json({success:true, data: newPost})
} catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({success:false, message: "Internal server error"})
}
})

// DELETE A POST

router.delete('/:postId', async (req, res) => {
    try {
      const postId = req.params.postId;

      const deletedPost = await Post.findByIdAndDelete(postId);
  
      if (!deletedPost) {
        return res.status(404).json({ success: false, message: 'Post not found' });
      }
  
      return res.status(200).json({ success: true, message: 'Post deleted successfully' });
    } catch (error) {
      console.error('Delete post error:', error);
      return res.status(500).json({ success: false, message: 'Internal server error' });
    }
  });
  

export default router;