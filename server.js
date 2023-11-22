// Enabling env variables
import dotenv from "dotenv"
dotenv.config()

/////////////////////
// import dependencies
/////////////////////////
import express from "express"
import methodoverride from "method-override"
import cors from "cors"
import morgan from "morgan"
import MainController from "controllers/MainController.js"

// global variables and instantiation
const PORT = process.env.PORT || 3333
const mainController = new MainController()
const apiController = new APIController()

// creating application object
const app = express()

// routers
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
app.use("/", MainRoutes)
app.use("/api", APIRoutes)
// Router specifiv middleware
APIRoutes.use(cors())

//////////////////////////////
// routes that render pages with EJS
///////////////////////////////////

MainRoutes.get("/", mainController.example)

/////////////////////////////////////
// API routes that return JSON
///////////////////////////////////
APIRoutes.get("/", apiController.example)

///////////////////////////////////
// server listeners
///////////////////////////////////
app.listen(PORT, () => console.log(`Listening on Port ${PORT}`))




















