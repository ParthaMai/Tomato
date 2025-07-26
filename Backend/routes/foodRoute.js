import express from "express";
import { addFood,listFood,removeFood } from "../controllers/foodController.js";
import multer from "multer";

const foodRouter = express.Router();

//Image storage Engine

const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req,file,cb)=>{
        return cb(null,`${Date.now()}${file.originalname}`) // so it will be create a unique name bec time is added with file name
    }
})

const upload = multer({storage:storage})

// here the connect foodController by get and post method
foodRouter.post("/add",upload.single("image"), addFood)
// This is access all the food item with get method
foodRouter.get("/list",listFood)
// This is for remove food item
foodRouter.post("/remove",removeFood);



export default foodRouter;