const Member = require('../models/member');

exports.getMemberById=(req,res,next,id)=>{
    Member.findById(id)
    .populate("familytree")
    .exec((err,member)=>{

        if(err){return res.status(400).json({
            error:"Member not found"
        })}

        req.member=member;
        next();
    })
}