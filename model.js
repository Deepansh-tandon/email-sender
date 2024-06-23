const mongoose = require("mongoose");
mongoose.connect(
   "mongodb://localhost:27017/",
  );
  
  const userSchema = new mongoose.Schema({
    email:{type: String,
    
    required: true},
    content:{
        type: String,required: true
    },
    password:{
        type: String,required: true
    },
    visited: [{
        type: Date,
    default: Date.now
    }]
},{timestamps: true});

const User = mongoose.model("user",userSchema);
module.exports =  User;