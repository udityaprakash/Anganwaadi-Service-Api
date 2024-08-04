const mongoose = require("mongoose");
require('dotenv').config();
var i=0;

const connectDB =  {
  connection: async () => {
    try{
      await mongoose.set("strictQuery", false); 
      await mongoose.connect(process.env.MONGODM_URI);
      console.log("db connected successfully");

    }catch(err){
      console.log("error in db connection",err);
      i++;
      console.log("retrying to connect db time: ",i);
      connectDB.connection();
    }
  }
}
          
          
module.exports=connectDB;