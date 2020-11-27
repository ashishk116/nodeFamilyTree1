const mongoose =require("mongoose");
const { Schema } = mongoose;
const {ObjectId} = mongoose.Schema;
const familytreeSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
            trim:true,
            maxlength:32 
        },
        familyuniqueid:{
            type:Number,
            required:true,
            unique:true,
            maxlength:32
        },
        familyowner:{
            type:ObjectId,
            ref:"User",
            required:true
        },
    },
    { timestamps: true }
  );

  module.exports=mongoose.model("FamilyTree", familytreeSchema);