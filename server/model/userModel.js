import mongoose from "mongoose"

import bcrypt from "bcrypt"


const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        trim: true,
        lowercase: true,
        validate: {
            validator: function (v) {
                return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
            },
            message: "Please enter a valid email address",
        },
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [8, "Password must have at least 8 characters"],
        maxlength: [32, "Password cannot have more than 32 characters"],
    },
    phone: {
        type: String,
        validate: {
            validator: function (v) {
                return /^\d{10}$/.test(v);
            },
            message: "Phone number must be a valid 10-digit number",
        },
    },
    accountVerified: {
        type: Boolean,
        default: false,
    },
    verificationCode: {
        type: Number,
        required: function () {
            return !this.accountVerified;
        },
    },
    verificationCodeExpiration: {
        type: Date,
    },
    resetPasswordToken: {
        type: String,
    },
    resetPasswordExpire: {
        type: Date,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});


userSchema.pre("save",async(next)=>{
    if(!this.isModified("password")){
        next();
    }
    this.password=await bcrypt.hash(this.password,10)

})

userSchema.methods.comparePassword=async (enteredPassword)=>{
    return await bcrypt.compare(enteredPassword,this.password)
}






export const User=mongoose.model('User',userSchema);
