const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    content : {
        type : String,
        required : true
    },
    author : {
        type : String,
        require : true
    }
}, {timestamps:true});

const Post = mongoose.model('post' , PostSchema);
module.exports = Post;