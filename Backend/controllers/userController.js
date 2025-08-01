import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import validator from "validator"

// Login user
const loginUser = async (req,res) => {
    const {email,password}= req.body;
    try{
        const user= await userModel.findOne({email});

        if(!user) {
            return res.json({success:false,message:"user Doesn't exist"});
        }
        const isMatch = await bcrypt.compare(password,user.password);

        if(!isMatch){
            return res.json({success:false,message:"invalid credentials"});
        }

        const token = createToken(user._id); // create token is a function define in middle 
        res.json({success:true,token});
    }
    catch(error){
        console.log(error);
        res.json({success:false,message:"Error"});
    }
}


const createToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET);
}

//register user
const registerUser = async(req,res)=> {
    const {name,password,email} = req.body;
    try{
        // checking is user already exists
        const exists = await userModel.findOne({email});
        if(exists) {
            return res.json({success:false,message:"User already Exists"});
        }

        //validating email format & strong password
        if(!validator.isEmail(email)) {
            return res.json({success:false, message:"Please enter a valid email"});
        }
        if(password.length<6) {
            return res.json({success:false,message:"Please enter a strong password"});
        }

        //hasing user password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        const newUser = new userModel({
            name:name, 
            email:email,
            password:hashedPassword
        })

        // this is save data on mongodb
        const user = await newUser.save();
        const token = createToken(user._id);
        res.json({success:true,token});

    }
    catch(error){
        console.log(error);
        res.json({success:false,message:"Error"});
    }
}

export {loginUser, registerUser};