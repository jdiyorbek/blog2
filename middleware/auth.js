const Acc = require('../models/Acc')

module.exports = (req, res, next) => {
    Acc.findById(req.session.userId, (err, user) => {
        if(err || !user){
            return res.redirect("/login")
        }
        next()
    })
}