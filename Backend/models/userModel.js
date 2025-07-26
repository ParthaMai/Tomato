import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type:String,
        required: true
    },
    cartData:{
        type: Object,
        default:{}
    }

},{minimize:false})

// This means if user data already present then mongoose.models.user if not present then create. and return in userModel.
const userModel = mongoose.models.user || mongoose.model("user",userSchema);

export default userModel;