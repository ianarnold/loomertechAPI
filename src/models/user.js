const mongoose = require('../database');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({

    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        require: true,
        select: false,
    },
    cpf: {
        type: String,
        unique: true,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }, 

});


UserSchema.pre('save', async function(next) {
    const hash = await bcrypt.hash(this.password, 12);
    this.password = hash;

    next();
});

const User = mongoose.model('User', UserSchema);

module.exports = User;