import mongoose, { model } from "mongoose";

const userSchema = new mongoose.Schema({
    created:     { type: Date,   required: [true], trim: true, default: new Date() },
    firstname:   { type: String, required: [true], trim: true },
    lastname:    { type: String, required: [true], trim: true },
    email:       { type: String, required: [true], trim: true, unique: true },
    password:    { type: String, required: [true], trim: true, unique: true },
    dateofbirth :{ type: Date,   required: [true], trim: true, default: new Date().toISOString() },
    phone:       { type: String, required: [true], trim: true, minlength: 8, maxlenght: 8,  unique: [true] },
    modified:    { type: Date,   required: [true], trim: true, default: new Date() }
});

const userModel = model('User', userSchema)


export default userModel; 