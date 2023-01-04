const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const AccSchema = mongoose.Schema({
    fullname: {
        type: String,
        required: [true, "Please, provide your full name"],
        unique: false
    },
    email: {
        type: String,
        required: [true, "Please, provide your email"],
        unique: true,
    },
    username: {
        type: String,
        required: [true, "Please, provide your username"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please, provide your password"],
        unique: false
    }
})

// AccSchema.pre("save", function(next){
//     const user = this;
//     bcrypt.hash("user.password", 2, function(err, encrypted) {
//         user.password = encrypted;
//         next()
//     })
// })

const Acc = mongoose.model("Acc", AccSchema)

module.exports = Acc