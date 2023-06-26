import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    _id: {
        type: String,
        require: [true],
        unique: [true]
    },
    firstname: {
        type: String,
        require: [true]
    },
    lastname:{
        type: String,
        require: [true]
    },
    email: {
        type: String,
        require: [true],
        unique: true,
        },
    born: {
        type: String,
        require: [true]
    },
    phone: {
        type: String,
        require: [true],
        unique: [true]
    },
})

const userModel = mongoose.model('User', userSchema)

export default userModel;