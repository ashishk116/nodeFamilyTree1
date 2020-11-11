const FamilyTree = require('../models/familytree')

exports.getFamilyTreeById=(req,res,next,id)=>{
    
    FamilyTree.findById(id).exec((err,fam)=>{
        if(err){return res.status(400).json({
            error:"Family not found in DB"
        })}

        req.familytree=fam;
         next();
    })
   
}

exports.createFamilyTree=(req,res)=>{
    const familytree = new FamilyTree(req.body);
    familytree.save((err,familytree)=>{
    if(err)
    {
    return res.status(400).json({
        error:"Familytree not created"
    })
    }
    res.json({familytree});
    })
}

exports.getfamilytree=(req,res)=>{

    return res.json(req.familytree);
}
exports.getallfamilytree=(req,res)=>{
 FamilyTree.find().exec((err,families)=>{
    if(err)
    {
    return res.status(400).json({
        error:"no family tree found"
    })
    }
    res.json(families)
 })   
}