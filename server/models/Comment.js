import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema({  //new database structure for comments mongodb
    userId:{        //who commented
        type: String,
        required: true
    },
    audioId:{       //song you are commenting
        type: String,
        required: true
    },
    desc:{          //textarea
        type: String,
        required: true
    },
}, {timestamps:true})

export default mongoose.model("Comment", CommentSchema)