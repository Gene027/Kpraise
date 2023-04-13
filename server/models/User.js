import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({  //new database structure for users in mongodb
    name:{
        type: String,
        required: true,
        unique: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
    img:{
        type: String,
    },
    subscribers: {
        type: Number,
        default: 0
    },
    SubscribedUsers:{ //for showing new updates from users you subscribed to
        type: [String] 
    },
}, {timestamps:true})

export default mongoose.model("User", UserSchema)