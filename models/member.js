var mongoose = require("mongoose");
const { Schema } = mongoose;
const {ObjectId} = mongoose.Schema;
const memberSchema = new Schema({

    name:{
        type:String,
        required:true,
        trim:true,
        maxlength:32
    },
    familytree:{
        type:ObjectId,
        ref:"FamilyTree"
    }, 
    relation:{
        type:String,
        required:true
    },
    
    photo:{
        data:Buffer,
        contentType:String
    }
},{timestamps:true})

module.exports=mongoose.model("Member",memberSchema);
