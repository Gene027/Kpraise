import mongoose from 'mongoose';

const BlogSchema = new mongoose.Schema({  //new database structure for blog in mongodb
    userId: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    featured: {
        type: Boolean,
    },
    content: {
        type: String,
        required: true
    },
    imgUrl: {            //thumbnail
        type: String,
        required: true
    },
    videoUrl: {          //video link
        type: String,
    },

}, { timestamps: true })

export default mongoose.model("Blog", BlogSchema)