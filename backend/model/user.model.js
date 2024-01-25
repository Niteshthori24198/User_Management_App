
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({

    userId: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String
    },
    departmentName: {
        type: String,
        required: true
    }
},
    {
        timestamps: true,
        versionKey: false
    });

const UserModel = mongoose.model('users', userSchema);

module.exports = { UserModel };

