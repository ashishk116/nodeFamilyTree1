var mongoose = require("mongoose");
const { v4: uuidv4 } = require('uuid');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
  name :{
      type:String,
      required:true,
      maxlength:32,
      trim:true
  },
lastname:{
    type:String,
    maxlength:32,
    trim:true
},
email:{
    type:String,
    required:true,
    maxlength:45,
    unique:true,
    trim:true
},
encry_password:{
    type:String,
    required:true,
},
salt:String,
role:{
    type:Number,
    default:0
},
member:{
    type:Array,
    default:[]
}


},{timestamps:true});


userSchema.virtual("password")
            .set(function(password){
                this._password=password
                this.salt=uuidv4();
                this.encry_password=this.sercurePassword(password);
            })
            .get(function(){
               return this._password
            })

userSchema.methods = {

    authenticate:function(plainpassword){
        return this.sercurePassword(plainpassword)===this.encry_password
    },

    sercurePassword: function(plainpassword){
        if(!plainpassword) return "";

        try {
            return crypto.createHmac('sha256', this.salt)
            
            .digest('hex');
        } catch (err) {
            return "";
        }
    }
}


module.exports = mongoose.model("User", userSchema)