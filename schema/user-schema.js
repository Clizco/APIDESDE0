import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    _id: String,
    firstname: String,
    phone: String
})

const userModel = mongoose.model('User', userSchema)

export default userModel;