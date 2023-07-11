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
        validate: function(value) {
            return value.length > 0;
            },
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
        validate: function(value) {
            return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value);},
        unique: true,
        },
    dateofbirth : {
        type: Date,
        required: [true],
        trim: true,
        default: new Date().toISOString()
    },
    phone: {
        type: String,
        minlenght: [4, `Tiene que tener al menos 4 numeros, tuvo {VALUE}`],
        maxlenght: 8,
        validate: {
            validator: function(v) {
                            return /^\d{10}$/.test(v);
                        },
                        message: props => `${props.value} no es un numero de telefono válido`
        },
        required: [true],
        trim: true,
        unique: [true]
    },
    modified: {
        type: Date,
        required: [true],
        trim: true,
        validate: function( date ) {           
            return date > new Date();
            },  
        default: new Date()
    
    }
});



const userModel = model('User', userSchema)


export default userModel; 