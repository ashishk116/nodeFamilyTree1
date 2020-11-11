const mongoose =require("mongoose");
const { Schema } = mongoose;
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
    },
    { timestamps: true }
  );

  module.exports=mongoose.model("FamilyTree", familytreeSchema);