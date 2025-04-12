const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const schema= new Schema({
    message : {
        type:String,
        required:true
    },
    sendBy: {
        type:Schema.Types.ObjectId,
        ref: 'admin'
    },
    title: {
        type:String,
    },
    sendTo: [
        {
            type:Schema.Types.ObjectId,
            ref: 'client'
        }
    ],
    sendToAll: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now,
        // expires: 15552000 // 6 months in seconds is (6 * 30 * 24 * 60 * 60)
        expires: 86400 //one day (1 * 24 * 60 * 60)
        // expires: 777600 // 90 days in seconds (90 * 24 * 60 * 60)
    }
},{timestamps:true});

const result = mongoose.model("msgLog" , schema);

module.exports = result;