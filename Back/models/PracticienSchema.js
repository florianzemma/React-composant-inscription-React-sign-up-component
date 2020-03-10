let mongoose = require('mongoose')

let practicienSchema = mongoose.Schema({
    
    firstName:String,
    lastName: String,
    email :String,
    password: String,
    Tel :String,
    lat: Number,
    lon : Number,
    spec: String,
    numAdeli:Number,
    url : String,
   
   });
   
  
   let practicienModel = mongoose.model('praticiens', practicienSchema);
  
  
   module.exports = practicienModel;