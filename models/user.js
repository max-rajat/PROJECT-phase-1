const mongoose=require("mongoose");

const schema=mongoose.Schema;

const passportLocalMongoose=require("passport-Local-Mongoose");

const userschema=new schema({
    email:{
        type:String,
        require:true,
    },
   
});

// it's a plugin which automatically adds username and password with hashed and salted form
userschema.plugin(passportLocalMongoose);
module.exports=mongoose.model("user",userschema)