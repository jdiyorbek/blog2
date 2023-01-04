const mongoose = require("mongoose")
const Acc = require("./Acc")

// const d = new Date();
// d.getFullYear();
// `${d.getDate()}:${d.getMonth()}:${d.getFullYear()}:`

const PostSchema = new mongoose.Schema({
    title: String,
    description: String,
    content: String,
    author: {
        type: mongoose.Schema.ObjectId,
        ref: "Acc",
        require: true
    },
    image: String,
    createAt: {
        type: Date,
        default: new Date(),
    }
})

const Post = mongoose.model("Post", PostSchema)

module.exports = Post