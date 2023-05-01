import mongoose from 'mongoose';

const AudioSchema = new mongoose.Schema({  //new database structure for audio in mongodb
    userId:{
        type: String,
        required: true
    },
    title:{
        type: String,
        required: true
    },
    desc:{
        type: String,
        required: true
    },
    imgUrl:{            //thumbnail
        type: String,
        required: true
    },
    audioUrl:{          //firebase link
        type: String,
        required: true
    },
    videoUrl:{          //youtube video link
        type: String,
    },
    views:{        
        type: Number,
        default: 0
    },
    tags:{        //for search fn
        type: [String],
        default: []
    },
    likes:{        
        type: [String],
        default: []
    },
    dislikes:{        
        type: [String],
        default: []
    },
}, {timestamps:true})

export default mongoose.model("Audio", AudioSchema)