const Acc = require("../models/Acc")
const bcrypt = require("bcrypt")

module.exports = (req, res) => {
    Acc.create(req.body, async (err, user = req.body) => {
        // console.log(Object.keys(err.errors))
        // req.session.registrationError = registrationError
        
        if(err){
            const registrationError = Object.keys(err.errors).map((key) => err.errors[key].message )
            req.flash("registrationError", registrationError)
            req.flash("data", req.body)
            return res.redirect("/register")
        }

        console.log(req.body)

        const salt = await bcrypt.genSalt(10)
        // console.log(salt);
        console.log(user)
        user.password = await bcrypt.hash(user.password, salt)
        // console.log(user.password);
        user.save()

        res.redirect("/")
    })
}