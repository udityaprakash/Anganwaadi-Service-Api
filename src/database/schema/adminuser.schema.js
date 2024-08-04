const mongoose = require("mongoose");

const schema= new mongoose.Schema({
    phoneNumber : {
     type:String,
     length:10,
     required:true
    },
    mPin: {
        type:Number,
        length:6,
        require:true
    },
    name: {
        type:String,
        required:true
    },
    deviceId: {
        type:String,
        required:false
    },
});

const result = mongoose.model("admin" , schema);

module.exports = result;