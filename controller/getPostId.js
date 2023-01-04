const Post = require("../models/Post")

module.exports = async (req, res) => {
    const pst = await Post.findById(req.params.id).populate("author", "username")
    console.log(pst);
    res.render("post", {pst})
}