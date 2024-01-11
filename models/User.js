const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const userSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    googleId: { type: String},
    name: { type: String},
    avatar: { type: String },
    gender: { type: String },
    phone: { type: String },
    email: { type: String, required: true },
    Decks: { type: Array},
    password: { type: String},
    publicId : { type: String,default: uuidv4().substring(0,6) },
    address: { type: Array},
    dob: { type: String},
    role: { type: String, default: 'user' },
    created_at: { type: Date, default: Date.now },
    isBaned: { type: Boolean, default: false },
    emailVerified : { type: Boolean, default: false },
    emailVerificationToken : { type: String },
    emailVerificationExpires : { type: Number  }
  });

const User = mongoose.model('User', userSchema);
module.exports = User;