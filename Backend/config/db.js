import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://parthamaity2004:Partha988@cluster0.3rboot1.mongodb.net/food-del').then(()=>console.log("DB Connected")); // thin link from mongodb atlas
}

