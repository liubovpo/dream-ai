import express from "express";
import * as dotenv from "dotenv";

import User from "../mongodb/models/user.js";

dotenv.config();

const router = express.Router();

// GET ALL USERS
router.route('/').get(async(req,res)=>{
    try {
        const users = await User.find({})

        res.status(200).json({success:true, data:users})
    } catch (error) {
        res.status(500).json({success:false, message: error})
    }
})

export default router;