import foodModel from "../models/foodModel.js";
import fs from 'fs';

// add food item

const addFood = async (req,res) => {
    let image_filename = `${req.file.filename}`;

    const food= new foodModel ({
         name: req.body.name,
         description: req.body.description,
         price: req.body.price,
         category: req.body.category,
         image: image_filename
    })
    try{
        await food.save(); // This is save data in mongodb
        res.json({success: true,message:"Food Added"})
    }
    catch(error){
        console.log(error)
        res.json({success:false,message:"Detect Error"})
    }
}

// All food list to get
const listFood = async (req,res) => {
    try{
        const foods= await foodModel.find({});
        res.json({success:true,data:foods})
    }catch(error){
        console.log(error);
        res.json({success: false,message:"Error"});
    }
}

// remove  food item
const removeFood = async (req,res) => {

    try{
        const food = await foodModel.findById(req.body.id);
        // delete the image
        fs.unlink(`uploads/${food.image}`,()=>{})

        // this is food data deleted from database
        await foodModel.findByIdAndDelete(req.body.id);
        res.json({success:true, message:"Food Removed"})
    }catch(error){
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

export{addFood, listFood, removeFood}