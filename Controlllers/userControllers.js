const asyncHandler = require('express-async-handler');
const User = require("../models/userModel")
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

//@desc Register users
//@route POST /api/users/register
//@access public
const  registerUser= asyncHandler(async (req, res) =>{
    const {username, email, password} = req.body;
    if(!username || !email || !password){
        res.status(400);
        throw new Error("All fields are required");
    }
    const userExist = await User.findOne({email});
    if(userExist){
        res.status(400);
        throw new Error("User already exist");
    }
    const hashedpassword = await bcrypt.hash(password, 10);
    console.log("Hashed password : ", hashedpassword);
    const user = await User.create({
        username,
        email,
        password: hashedpassword
    });
    console.log(`User created : ${user}`);
    if(user){
        res.status(201).json({_id:user.id, email: user.email});
    }
    else{
        res.status(400);
        throw new Error("Invalid user data");
    }
    res.status(200).json({message:"User registered"});
});

//@desc Register users
//@route POST /api/users/login
//@access public
const  loginUser= asyncHandler(async (req, res) =>{
    const {email, password} = req.body;
    if(!email || !password){
        res.status(400);
        throw new Error("All fields are required");
    }

    const user = await User.findOne({email});
    //compare password with hashed password
    if(user && (await bcrypt.compare(password, user.password)))
    {
        const accessToken = jwt.sign({
            user:{
                username: user.username,
                email: user.email,
                id:user._id,
            },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '30m'}
    );
        res.status(200).json({accessToken});
    }else{
        res.status(401);
        throw new Error("Email or password is incorrect");
    }

    res.status(200).json({message:"Login user"});
});

//@desc Register users
//@route GET /api/users/current
//@access private
const  currentUserInfo= asyncHandler(async (req, res) =>{
    res.json(req.user);
});

module.exports = { registerUser, loginUser, currentUserInfo };