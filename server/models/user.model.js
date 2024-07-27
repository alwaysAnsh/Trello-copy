import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    firstName:{
        type : String,
        required : true,
        trim : true,
    },
    lastName:{
        type : String,
        required : true,
        trim : true,
    },
    token : {
        type : String,
    },

    email: {
        type : String,
        required : true,
        trim : true,
    },
    password :{
        type : String,
        required : true,
    },
    phoneNumber: {
        type: Number,
    },
    image:{
        type: String,
    },
    tasks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task',
      }],
    
    
    
}, {timestamps: true});

const User = mongoose.model('User',userSchema)
export default User;