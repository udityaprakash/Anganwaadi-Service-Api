const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const schema= new Schema({
    phoneNumber : {
        type:String,
        length:10,
        required:true,
        unique:true
    },
    registeredAt: {
        type:Schema.Types.ObjectId,
        ref: 'admin'
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