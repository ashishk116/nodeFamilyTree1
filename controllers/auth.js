const User =require('../models/user')
const { check,validationResult } = require('express-validator');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');

exports.signup=(req,res)=>{
    const user=new User(req.body);
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({
            error:errors.array()[0].msg
        })
    }
    user.save((err,user)=>{
        if(err){
            return res.status(400).json({
                err:"not able to save user in DB"
            })
        }
    res.json({
            name:user.name,
            email:user.email,
            id:user._id
        });
    })
}


exports.signin=(req,res)=>{
    const{email,password} =req.body
    const errors=validationResult(req);

    if(!errors.isEmpty()){
        return res.status(422).json({
            error:errors.array()[0].msg
        });
    }


    User.findOne({email},(err,user)=>{
        if(err || !user){
           return res.status(400).json({
                error:"User email doesnot exist"
            })
        }

        if(!user.authenticate(password)){
           return res.status(401).json({
            error:"Email and password doesnot match"
            })
        }

//CREATE TOKEN
        const token = jwt.sign({ _id:user._id}, process.env.SECRET);

        //PUT TOKEN IN COOKIE

        res.cookie("token",token,{expire :new Date() +9999})

        //send response to frontend

        const{_id,name,email,role}=user;
        return res.json({token,user:{_id,name,email,role}})

    })
}

exports.getAllUsers=(req,res)=>{
    User.find().exec((err,users)=>{

        if(err || !users){
            return res.status(400).json({
                error:"No users found"
            })
        }

        res.json(users);
    })
}



exports.signout =(req,res)=>{

    res.clearCookie("token")
    res.json({
        message:"Signout works"
    })

}
