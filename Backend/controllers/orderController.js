import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js"
import Stripe from "stripe"; // this is use for payment

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

// placing user order for frontend
const placeOrder = async (req,res) => {

    const frontend_url = "http://localhost:5173";

    try{
        const newOrder = new orderModel({
            userId: req.body.userId,
            items:req.body.items,
            amount:req.body.amount,
            address:req.body.address
        })
        await newOrder.save(); // save the order in data base
        await userModel.findByIdAndUpdate(req.body.userId,{cartData:{}});

        const line_items = req.body.items.map((item) => {
            const inrPrice = item.price*item.quantity;
            const conversionRate = 90;
            const usdPrice = (inrPrice / conversionRate);
            console.log(usdPrice);
            return {
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: item.name
                    },

                    unit_amount: Math.round(usdPrice * 100) // *100 is because this is paisa to taka convert
                },
                quantity: item.quantity
            }
        });
        line_items.push({
            price_data:{
                currency:"usd",
                product_data:{
                    name:"Delivery Charges"
                },
                unit_amount: 100
            },
            quantity:1
        })

        const session = await stripe.checkout.sessions.create({
            line_items:line_items,
            mode:'payment',
            success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
        })

        res.json({success:true,session_url:session.url});
    }catch(error){
        console.log(error);
        res.json({success:false,message:"Error"});
    }
}


//Payement verification or verify order
const verifyOrder = async(req,res) =>{

    const {orderId,success} = req.body;
    try{
        if(success=="true"){
            await orderModel.findByIdAndUpdate(orderId,{payment:true});
            res.json({success:true,message:"Paid"});
        }
        else{
            await orderModel.findOneAndDelete(orderId);
            res.json({success:false,message:"Not paid"})
        }
    }catch(error){
        console.log(error);
        res.json({success:false,message:"Error"});
    }
}


//User orders for frontend
const userOrders = async (req,res) => {
    try {
        const orders = await orderModel.find({userId:req.body.userId});
        res.json({success:true,data:ordres});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"});
    }
}

export {placeOrder,verifyOrder,userOrders};