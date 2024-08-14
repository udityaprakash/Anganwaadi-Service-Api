const {postgresqlClient} = require('../database/DBconnection');
const Table = require('../database/Tables/groupsTables');
async function createAllTables(){
    try{
  
      const cli = await postgresqlClient();
  
      await cli.run.query(Table.group).then(()=>{
        console.log('group table created');
      }).catch((err)=>{
        console.log("group table not created as : "+err);
      });
      
    }catch(e){
      console.log('Error in creating tables:-',e);
    }
  }  
  
  module.exports = {createAllTables}