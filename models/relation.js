import mongoose from 'mongoose';
const { Schema } = mongoose;

const relationSchema = new Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        maxlength:32,
        unique:true
    },
    
},{timestamps:true});

module.exports=mongoose.model("Relation",relationSchema);