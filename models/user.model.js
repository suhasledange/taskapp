import mongoose, { Document, Schema } from "mongoose";

const userSchema = new Schema({
    fullname: {
        type: String,
        required: [true,"Fullname is required"],
    },
    email: {
        type: String,
        required: [true,"Email is required"],
        unique: true,
        index:true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    verifyToken: String,
    verifyTokenExpiry: Date,
}, { timestamps: true });


const User = mongoose.model("User", userSchema);
export default User;
