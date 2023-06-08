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
    admin: {
        type: Boolean,
        default: false
    },
    SubscribedUsers:{ //for showing new updates from users you subscribed to, its an arr of id showing ur subscribers
        type: [String] 
    },
    token: { //for verifying each login session
        type: String,
    },
    fromGoogle: {
        type: Boolean,
        default: false,
      },
}, {timestamps:true})

export default mongoose.model("User", UserSchema)