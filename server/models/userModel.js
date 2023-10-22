const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validator = require('validator');
require('dotenv').config();


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add a name"]
    },
    studentId: {
        type: String,
        required: [true, 'Please add student ID'],
        trim: true,
        validate: {
            validator: function (value) {
                // Check if the value is exactly 7 digits long and consists of numeric characters
                return /^\d{7}$/.test(value);
            },
            message: 'Invalid Student Id'
        },
    },
    department:{
        type: String,
        required: [true, "Please add department name"]
    },
    passingYear:{
        type: String,
        required: [true, "Please add passingYear"],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        trim: true,
        lowercase: true,
        unique: true,
        validate: {
            validator: (value) => {
                return validator.isEmail(value); // Use validator's isEmail method
            },
            message: 'Invalid email address',
        },
    },
    phone: {
        type: String,
        required: true,
        trim: true
    },
    company: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: [true],
        default: "customer",

    },
    password: {
        type: String,
        required: [true, "Please add a password"],
        minLength: [6, "Password must be up to 6 characters"]
    },
    confirmPassword: {
        type: String,
        required: [true, "Please add confirm password"],
        minLength: [6, "Password must be up to 6 characters"]
    },
    token: {
        type: String
    }
},
{
    timestamps: true,
    versionKey: false
})


// Hash the password before saving
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        // If the password hasn't been modified, skip hashing
        return next();
    }
    try {
        //Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(this.password, salt);
        this.password = hashedPassword;
        this.confirmPassword = hashedPassword;

        //Token generate
        let payload = {
            // exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60),
            data: this
        }
        const token = jwt.sign(payload, process.env.SECRETEKEY)
        this.token = token;


        return next();
    } catch (error) {
        return next(error);
    }
});


const User = mongoose.model('users', userSchema);
module.exports = User;