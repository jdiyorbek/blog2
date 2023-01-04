const express = require("express")
const edge = require("express-edge")
const mongoose = require("mongoose")
const app = express()
const fileUpload = require("express-fileupload")
const expressSession = require("express-session")
const connectMongo = require("connect-mongo")
const connectFlash = require("connect-flash")

// Controller
const getHome = require("./controller/getHome")
const getAbout = require("./controller/getAbout")
const getContact = require("./controller/getContact")
const getPostCreate = require("./controller/getPostCreate")
const getPostId = require("./controller/getPostId")
const postPostPublish = require("./controller/postPostPublish")
const register = require("./controller/register")
const createAcc = require("./controller/createAcc")
const login = require("./controller/login")
const enterAcc = require("./controller/enterAcc")
const logout = require("./controller/logout")

// Middleware
const alertCreatePost = require("./middleware/alertCreatePost")
const authMiddleware = require("./middleware/auth")
const redirectIfAuth = require("./middleware/redirect")

const MongoUrl = "mongodb+srv://jdiyorbek:diorbek2005@cluster0.h2d06qj.mongodb.net/node-blog"

mongoose.connect(MongoUrl, () => {
    console.log("This site connected with MongoDB database");
})


app.use(fileUpload())
app.use(express.static("public"))
app.use(edge.engine)
app.set("views", `${__dirname}/views`)
app.use(express.json())
app.use(express.urlencoded({extended: true,}))
mongoose.set('strictQuery', false);
app.use(expressSession({
    secret: "jdiyorbek",
    store: connectMongo.create({mongoUrl: MongoUrl}),
}))
app.use(connectFlash())

app.use("*", (req, res, next) => {
    app.locals.auth = req.session.userId
    next()
})


app.get("/", getHome)

app.get("/about", getAbout)

app.get("/contact", getContact)

// app.get("/post", (req, res) => {
//     res.render("post")
// })

app.get("/post/create", authMiddleware, getPostCreate)
app.get("/post/:id", getPostId)
app.post("/post/publish", alertCreatePost, postPostPublish)


app.get("/register", redirectIfAuth, register)
app.post("/auth/reg", createAcc)

app.get("/login", redirectIfAuth, login)
app.post("/auth/log", enterAcc)

app.get("/logout", authMiddleware, logout)

app.use((req, res) => res.render("404"))


app.listen(5000, () => {
    console.log("Server started...");
})