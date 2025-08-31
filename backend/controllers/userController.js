import User from "../models/userModel.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"

// Generate token

const generateToken = (userId) =>{
    return jwt.sign({id:userId}, process.env.JWT_SECRET, {expiresIn:'7d'})
}

export const registerUser = async(req,res)=>{
    try {
        const {name,email,password} = req.body;

        // Check if user exists

        const userExists = await User.findOne({email})
        if(userExists)
        {
            return res.status(400).json({message:"User already exists"})
        }
        if(password.length < 8)
        {
            return res.status(400).json({success:false,message:"Password must be atleast 8 characters"})
        }
        // HAshing password
        const salt = await bcrypt.genSalt(10);
        const hashedPwd = await bcrypt.hash(password,salt)

        // Create user

        const user= await User.create({
            name,
            email,
            password:hashedPwd
        })
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            token : generateToken(user._id)
        })
    } catch (error) {
        res.status(500).json({
            message:"Server error",
            error:error.message
        })
    }
}

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // If valid, return token + user details
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id)
    });

  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};


// Get User fn

export const getUserProfile = async (req,res)=>{
    try {
        const user = await User.findById(req.user.id).select("-password")
        if(!user)
        {
            return res.status(404).json({message: "User not found"})
        }
        res.json(user)
    } catch (error) {
        res.status(500).json({
            message:"Server error",
            error:error.message
        })
    }
}