// Enabling env variables
import dotenv from 'dotenv/config'
dotenv.config()

/////////////////////
// import dependencies
/////////////////////////
import express from "express"
import methodOverride from "method-override"
import cors from "cors"
import morgan from "morgan"
import MainController from "controllers/MainController.js"
import mongoose from "mongoose"

// global variables and instantiation
const PORT = process.env.PORT || 3333
const MONGO_URI = process.env.MONGO_URI
const mainController = new MainController()
const apiController = new APIController()

//////////////////
// MongoDB connection
/////////////////////////////
mongoose.connect(MONGO_URI)

mongoose.connection
.on("open", () => console.log("Connected to Mongo"))
.on("close", () => console.log("Disconnected to Mongo"))
.on("error", () => console.log(error))

//////////////////
// Todo model object
/////////////////////////////
const TodoSchema = mongoose.Schema({
    message: String,
    completed: Boolean
})

const Todo = mongoose.model("Todo", TodoSchema)

/////////////////////////
// creating application object
//////////////////////////////
const app = express()

///////////////////////////////
// routers
////////////////////////////////
const MainRoutes = express.Router()
const APIRoutes = express.Router()

//////////////////////////
// middleware
////////////////////////////
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(methodOverride("_method"))
app.use("/static", express.static("static"))
app.use(morgan("tiny"))
app.use((req, res, next) => {
    req.models = {
        Todo
    }
    next() 
})
app.use("/", MainRoutes)
app.use("/api", APIRoutes)
// Router specifiv middleware
APIRoutes.use(cors())

//////////////////////////////
// routes that render pages with EJS
///////////////////////////////////
MainRoutes.get("/", mainController.index)
MainRoutes.get("/", mainController.new)
MainRoutes.post("/todo", mainController.create)
MainRoutes.get("/todo/:id", mainController.show)
MainRoutes.put("/todo/complete/:id", mainController.complete)


/////////////////////////////////////
// API routes that return JSON
///////////////////////////////////
APIRoutes.get("/", apiController.example)

///////////////////////////////////
// server listeners
///////////////////////////////////
app.listen(PORT, () => console.log(`Listening on Port ${PORT}`))




















