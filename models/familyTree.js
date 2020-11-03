import mongoose from 'mongoose';
const { Schema } = mongoose;
const {ObjectId} = mongoose.Schema;
const familyTreeSchema = new Schema({

    name:{
        type:String,
        required:true,
        trim:true,
        maxlength:32
    },
    relation:{
        type:ObjectId,
        ref:"Relation",
        required:true
    },
    photo:{
        data:Buffer,
        contentType:String
    }
},{timestamps:true})

module.exports=mongoose.model("FamilyTree",familyTreeSchema);
