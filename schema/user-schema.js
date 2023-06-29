import mongoose, { model } from "mongoose";

const userSchema = new mongoose.Schema({
    created: {
        type: Date,
        required: [true],
        trim: true,
        default: new Date()
    },
    firstname: {
        type: String,
        required: [true],
        trim: true
    },
    lastname:{
        type: String,
        required: [true],
        trim: true
    },
    email: {
        type: String,
        required: [true],
        trim: true,
        unique: true,
        },
    DateOfBirth : {
        type: Date,
        required: [true],
        trim: true,
        default: new Date().toISOString()
    },
    phone: {
        type: String,
        required: [true],
        trim: true,
        unique: [true]
    },
});



const userModel = model('User', userSchema)


/* const user = {
    created: "20052006",
    firstname: "Abraham",
    lastname: "Lopez",
    email: "lolpapi039@gmail.com",
    born: "20052006",
    phone: "6504929"  
}; */

export default userModel; 