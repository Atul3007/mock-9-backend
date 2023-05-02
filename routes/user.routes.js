const express=require("express");
const user_router=express.Router();
const { usermodel } = require("../models/user.model");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");

user_router.get("/users",async(req,res)=>{
    try {
        const data=await usermodel.find();
        res.send(data);    
    } catch (error) {
        console.log(error);
        res.send("Unable to fetch data");
    }
    
})

user_router.post("/register", async (req, res) => {
    const {name,email,password,dob,bio,posts,friends,friendRequests} = req.body
    //console.log(address);
    try {
        bcrypt.hash(password,5 , async(err, secure_password)=> {
            if(err){
                 console.log(err);
                 res.send("not working");
            }else{
                const user = new usermodel({name,email,password:secure_password,dob,bio,posts,friends,friendRequests});
                await user.save();
                res.send("registerd");
            }
    });
    } catch (error) {
        res.send("Error in registering");
        console.log(error);
    }
})
user_router.post("/login", async (req, res) => {
    const { email, pass } = req.body;
    try {
        const user = await usermodel.find({email});
        if (user.length) {
            bcrypt.compare(pass, user[0].pass, (err, result)=> {
              if(result){
                const token=jwt.sign({userid:user[0]._id},"masai");
                res.send({ "msg": "Login Successful", "token": token });
              }else{
                res.send("Wrong credientials")    
              }
            });
        }
        else {
            res.send("Wrong credientials")
        }
    } catch (error) {
        res.send("Error in logging");
        console.log(error);
    }
})
module.exports={
    user_router
}