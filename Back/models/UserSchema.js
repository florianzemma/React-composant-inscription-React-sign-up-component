let mongoose = require('mongoose')

let userSchema = mongoose.Schema({
    name:String,
    email :String,
    password: String,
    salt: String,
   
   });
   
  
   let userModel = mongoose.model('users', userSchema);
  
  
   module.exports = userModel;