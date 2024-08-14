const mongoose = require("mongoose");
const { Pool } = require('pg');
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

var postgresqlClient =async () => {
  try{

      const poll = new Pool({
          connectionString: process.env.POSTGRESQL_CONNECTION_STRING,
          // max: 20,
          idleTimeoutMillis: 30000,
          connectionTimeoutMillis: 10000,
          ssl: {
              rejectUnauthorized: false, 
            },
      });
      var client = await poll.connect();
      // console.log('Database query executed...');
      return {error:false,status:0,run:client};
  }catch(err){
      console.error('Database connection failed');
      if(err.code === 'PROTOCOL_CONNECTION_LOST'){
          console.error('Database connection was closed');
      }
      if(err.code === 'ER_CON_COUNT_ERROR'){
          console.error('Database has too many connections');
      }
      if(err.code === 'ECONNREFUSED'){
          console.error('Database connection was refused');
      }
      console.log('error in postgresql connection: ',err);
      return {error: true, status:1, data:err};
  }
}



          
          
module.exports={connectDB, postgresqlClient};