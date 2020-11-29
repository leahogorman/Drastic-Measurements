const mongoose = require("mongoose");

let actorSchema = new mongoose.Schema({
    firstname:{
        type: String,
        required: true,
    },
    lastname:{
        type: String,
        required: true,
    },
    image:{
        type: String,
    },
    measurements:[{
        chest:{
            type: Number,
            required: true,
        },
        waist:{
            type: Number,
            required: true,
        },
        weight:{
            type: Number,
            required: true,
        }
    }]    
}); 

const Actor = mongoose.model("Actor", actorSchema);

exports.Actor = Actor;