import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    _id: String,
    firstname: String,
    email: String,
    born: String,
    phone: String
})

const userModel = mongoose.model('User', userSchema)

export default userModel;