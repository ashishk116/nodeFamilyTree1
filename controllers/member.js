const Member = require('../models/member');
const formidable = require("formidable");
const _ =require("lodash");
const fs=require("fs")



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

exports.getMembers=(req,res)=>{
    Member.find().exec((err,members)=>{

        if(err || !members){
            return res.status(400).json({
                error:"No members found"
            })
        }

        res.json(members);
    })
}


exports.createMember=(req,res)=>{
let form= new formidable.IncomingForm()
form.keepExtensionse=true;

form.parse(req,(err,fields,file)=>{


    if(err){
        return res.status(400).json({
            error:"problem with image"
        })
    }
    //destructuring the fields
    const{name,familytree,relation,familyowner}=fields;

    if(!name||!familytree||!relation){
        res.status(400).json({
            error:"Please include all fields"
        })
    }

    let member= new Member(fields)
if(file.photo){
    if(file.photo.size>3000000){
        return res.status(400).json({
            error:"photo file is too big!!"
        })
    }

    member.photo.data=fs.readFileSync(file.photo.path)
    member.photo.contentType=file.photo.type
}

//save to DB

member.save((err,member)=>{
    if(err){
        res.status(400).json({
            error:"saving Db is failed"
        })
    }

    res.json(member);
})

});

}