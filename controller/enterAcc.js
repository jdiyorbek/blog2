const Acc = require("../models/Acc")
const bcrypt = require("bcrypt")

module.exports = (req, res) => {
    const {username, password} = req.body
    Acc.findOne({username}, (err, user) => {
        console.log(user);
        if(user){
            const validPassword = bcrypt.compare(password, user.password)

            if(validPassword){
                req.session.userId = user._id
                res.redirect("/")
            }else{
                // const loginError = Object.keys(err.errors).map(key => err.errors[key].message)
                // req.flash("loginError", loginError)
                res.redirect("/login")
            }
            // bcrypt.compare(password, user.password, (err, same) => {
            //     console.log(password)
            //     console.log(user.password)
            //     if(same){
            //         console.log("login")
            //         res.redirect("/")
            //     }else{
            //         console.log("not")
            //         res.redirect("/login")
            //     }
            // })
        }else{
            // const loginError = Object.keys(err.errors).map(key => err.errors[key].message)
            // req.flash("loginError", loginError)
            return res.redirect("/login")
        }
    })
}