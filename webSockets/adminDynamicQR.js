const { wrapJWT } = require("../src/contollers/QR handler/qrdata.wsfunc");


function registeringQR(io){
    io.of('/admin/getRegisterQR').on('connection', (socket) => {
        console.log('a user connected');
        socket.on('disconnect', () => {
          console.log('user disconnected');
        });
        socket.on('registerQR', (msg) => {
          console.log('message: ' + msg);
          setInterval(() => {
            let qrdata = wrapJWT(msg.id);
            socket.emit('registerQR', {data: qrdata});
          }, 4000);
        });
      });

}

module.exports = {registeringQR}