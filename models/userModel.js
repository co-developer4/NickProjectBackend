const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    role:{
        type: String,
        default: 'member',
    },
    password:{
        type: String,
        required: true,
    },
    phoneNumber:{
        type: String,
        default: "(208) 000 0000"
    },
    image:{
        type: String,
    }
}, {timestamps: true});

module.exports = UserModel = mongoose.model('Users', userSchema)
