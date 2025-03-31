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
        ref: 'admin',
        required:false
    },
    name: {
        type:String,
        required:false
    },
    isFresh:{
        type:Boolean,
        required:true
    },
    otp:{
        type:String,
        length:4,
        required:true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires:1800 // 30 minutes in seconds (30 * 60 * 60)
    }
},{timestamps:true});

const result = mongoose.model("temporaryAuth" , schema);

module.exports = result;