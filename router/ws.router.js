const { registeringQR } = require('../webSockets/adminDynamicQR');

function webSocketHandle(server) {
    try{

        const io = require('socket.io')(server);

        registeringQR(io);



    }catch(e){
        console.log("error at connection of websocket:- "+e);
    }
  }
  
  module.exports = webSocketHandle;