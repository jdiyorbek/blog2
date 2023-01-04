const Post = require("../models/Post")
const path = require("path")

module.exports = (req, res) => {
    console.log(req.files)
    const {image} = req.files
    image.mv(path.resolve(__dirname, "..", "public/image", image.name), (err) => {
        Post.create({...req.body, image: `/image/${image.name}`, author: req.session.userId}, (err, post) => {
            res.redirect("/")
        })
    })
}