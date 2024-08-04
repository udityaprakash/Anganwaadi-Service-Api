const mongoose = require("mongoose");

const schema= new mongoose.Schema({
    phoneNumber : {
        type:String,
        length:10,
        required:true,
        unique:true
    },
    registeredAt: {
        type:String,
    },
    name: {
        type:String,
        required:true
    },
    registeredName: {
        type:String,
    },
    deviceId: {
        type:String,
        required:true
    },
},{timestamps:true});

const result = mongoose.model("client" , schema);

module.exports = result;