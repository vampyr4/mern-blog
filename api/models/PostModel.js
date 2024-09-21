import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    userId:{
        type: String,
        required: true
    },
    content:{
        type: String,
        required: true
    },
    title:{
        type:String,
        required: true,
        unique: true
    },
    image:{
        type: String,
        default: "https://www.hostinger.com/tutorials/wp-content/uploads/sites/2/2021/09/how-to-write-a-blog-post.webp"
    },
    category:{
        type: String,
        default:"Uncategorized"
    },
    slug:{
        type: String,
        required: true,
        unique: true
    }
},{timestamps:true})

export default mongoose.model("Post", postSchema)